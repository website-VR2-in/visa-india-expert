// ─── API handlers (plain Node http types — run on Vercel and locally) ──
// req: http.IncomingMessage  (+ req.query on Vercel for [id] routes)
// res: http.ServerResponse

import { getStore } from './store.js';
import { bearerToken, issueToken, adminPassword } from './auth.js';
import { validateApplication, validatePatch } from './validate.js';
import { generateInvoiceId, isValidInvoiceId } from './invoice.js';
import { priceFor } from './prices.js';

const MAX_BODY = 100 * 1024; // 100 KB

// ── helpers ──────────────────────────────────────────────────

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

function corsPreflight(res) {
  res.writeHead(204, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  });
  res.end();
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BODY) {
        reject(new Error('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      if (!chunks.length) return resolve({});
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function serviceDescription(visaType, label) {
  return `India Visa Assistance — ${label || visaType}`;
}

// ── defensive wrapper: unexpected handler errors → clean JSON 500 ──
// (without this, Vercel surfaces an opaque FUNCTION_INVOCATION_FAILED)
function safe(fn) {
  return (req, res) =>
    Promise.resolve(fn(req, res)).catch((err) => {
      console.error('[api error]', (err && err.stack) || err);
      try {
        if (!res.headersSent) {
          sendJson(res, 500, { error: 'Server error', detail: String((err && err.message) || err) });
        } else if (!res.writableEnded) {
          res.end();
        }
      } catch {
        /* response already closed */
      }
    });
}

// ── /api/health ──────────────────────────────────────────────

async function handleHealthImpl(req, res) {
  if (req.method === 'OPTIONS') return corsPreflight(res);
  const store = getStore();
  sendJson(res, 200, await store.health());
}

// ── /api/applications  (POST create | GET list, admin) ──────

async function handleApplicationsImpl(req, res) {
  if (req.method === 'OPTIONS') return corsPreflight(res);

  if (req.method === 'POST') {
    let body;
    try {
      body = await readJsonBody(req);
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }

    const { ok, errors, value: formData } = validateApplication(body);
    if (!ok) return sendJson(res, 400, { error: 'Validation failed', details: errors });

    const { kickoff, success, total } = priceFor(formData.visaType);
    const now = new Date().toISOString();
    const invoiceId = generateInvoiceId();

    const application = {
      id: invoiceId,
      invoiceId,
      formData,
      status: 'new',
      paymentStatus: 'awaiting_payment',
      amount: total,
      kickoffAmount: kickoff,
      successAmount: success,
      currency: 'USD',
      serviceDescription: serviceDescription(formData.visaType),
      createdAt: now,
      updatedAt: now,
      notes: '',
      documents: [],
      source: 'web',
    };

    const store = getStore();
    await store.createApp(application);
    return sendJson(res, 201, { invoiceId, application });
  }

  if (req.method === 'GET') {
    if (!bearerToken(req)) return sendJson(res, 401, { error: 'Admin token required' });
    const apps = await getStore().listApps();
    return sendJson(res, 200, { applications: apps, count: apps.length });
  }

  return sendJson(res, 405, { error: 'Method not allowed' });
}

// ── /api/applications/:id  (GET one | PATCH update) ─────────
// id is provided as req.query.id on Vercel; the local server attaches it.

async function handleApplicationIdImpl(req, res) {
  if (req.method === 'OPTIONS') return corsPreflight(res);

  const id = (req.query && req.query.id) || (req.params && req.params.id) || '';
  if (!isValidInvoiceId(id)) return sendJson(res, 400, { error: 'Invalid invoice id' });

  const store = getStore();

  if (req.method === 'GET') {
    const app = await store.getApp(id);
    if (!app) return sendJson(res, 404, { error: 'Application not found' });
    return sendJson(res, 200, { application: app });
  }

  if (req.method === 'PATCH') {
    let body;
    try {
      body = await readJsonBody(req);
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
    const token = bearerToken(req);
    const { ok, errors, patch } = validatePatch(body, Boolean(token));
    if (!ok) return sendJson(res, 400, { error: 'Validation failed', details: errors });
    if (!Object.keys(patch).length) return sendJson(res, 400, { error: 'No valid fields to update' });

    const updated = await store.updateApp(id, patch);
    if (!updated) return sendJson(res, 404, { error: 'Application not found' });
    return sendJson(res, 200, { application: updated });
  }

  return sendJson(res, 405, { error: 'Method not allowed' });
}

// ── /api/admin/login (POST) ──────────────────────────────────

async function handleAdminLoginImpl(req, res) {
  if (req.method === 'OPTIONS') return corsPreflight(res);
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  let body;
  try {
    body = await readJsonBody(req);
  } catch (e) {
    return sendJson(res, 400, { error: e.message });
  }

  const password = typeof body.password === 'string' ? body.password : '';
  if (!password || password !== adminPassword()) {
    return sendJson(res, 401, { error: 'Incorrect password' });
  }
  return sendJson(res, 200, { token: issueToken(password), expiresIn: 'session' });
}

// ── exported handlers (wrapped so any unexpected throw becomes a JSON 500) ──

export const handleHealth = safe(handleHealthImpl);
export const handleApplications = safe(handleApplicationsImpl);
export const handleApplicationId = safe(handleApplicationIdImpl);
export const handleAdminLogin = safe(handleAdminLoginImpl);
