// ─── Application store ───────────────────────────────────────
// Two backends behind one interface:
//   • Upstash KV (Vercel KV) — production. Plain REST via fetch, no SDK.
//   • JSON file — local dev / any host without KV env vars.
//
// Keys (KV):  visa:app:<invoiceId>  → JSON document
//             visa:idx               → SET of invoice ids

import fs from 'node:fs';
import path from 'node:path';

const APP_PREFIX = 'visa:app:';
const IDX_KEY = 'visa:idx';

// ── Upstash KV backend ───────────────────────────────────────

class UpstashStore {
  constructor() {
    this.url = process.env.UPSTASH_REDIS_REST_URL;
    this.token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (!this.url || !this.token) throw new Error('UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN missing');
  }

  async cmd(...args) {
    const res = await fetch(this.url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(args),
    });
    if (!res.ok) throw new Error(`KV error ${res.status}`);
    return res.json();
  }

  async createApp(app) {
    await this.cmd(
      ['SET', APP_PREFIX + app.invoiceId, JSON.stringify(app)],
      ['SADD', IDX_KEY, app.invoiceId]
    );
    return app;
  }

  async getApp(id) {
    const [v] = await this.cmd(['GET', APP_PREFIX + id]);
    return v ? JSON.parse(v) : null;
  }

  async listApps() {
    const [ids] = await this.cmd(['SMEMBERS', IDX_KEY]);
    if (!ids || !ids.length) return [];
    const keys = ids.map((i) => APP_PREFIX + i);
    const vals = await this.cmd(['MGET', ...keys]);
    return ids
      .map((id, i) => (vals[i] ? JSON.parse(vals[i]) : null))
      .filter(Boolean)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  async updateApp(id, patch) {
    const current = await this.getApp(id);
    if (!current) return null;
    const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
    await this.cmd(['SET', APP_PREFIX + id, JSON.stringify(next)]);
    return next;
  }

  async deleteApp(id) {
    await this.cmd(['DEL', APP_PREFIX + id], ['SREM', IDX_KEY, id]);
  }

  async health() {
    return { ok: true, store: 'kv' };
  }
}

// ── JSON file backend ────────────────────────────────────────

class FileStore {
  constructor(file) {
    this.file = file;
    this.data = { apps: {} };
    try {
      if (fs.existsSync(file)) {
        const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
        if (parsed && typeof parsed === 'object' && parsed.apps) this.data = parsed;
      }
    } catch {
      // corrupt file — start fresh rather than crash
    }
  }

  save() {
    const tmp = this.file + '.tmp';
    fs.mkdirSync(path.dirname(this.file), { recursive: true });
    fs.writeFileSync(tmp, JSON.stringify(this.data, null, 2));
    fs.renameSync(tmp, this.file);
  }

  async createApp(app) {
    this.data.apps[app.invoiceId] = app;
    this.save();
    return app;
  }

  async getApp(id) {
    return this.data.apps[id] || null;
  }

  async listApps() {
    return Object.values(this.data.apps).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  async updateApp(id, patch) {
    const current = this.data.apps[id];
    if (!current) return null;
    const next = { ...current, ...patch, updatedAt: new Date().toISOString() };
    this.data.apps[id] = next;
    this.save();
    return next;
  }

  async deleteApp(id) {
    delete this.data.apps[id];
    this.save();
  }

  async health() {
    return { ok: true, store: 'file', file: this.file };
  }
}

// ── Selection ────────────────────────────────────────────────

let _store = null;

/** Returns the active store (KV when env vars are set, file store otherwise). */
export function getStore(dataFile) {
  if (_store) return _store;
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    _store = new UpstashStore();
  } else {
    _store = new FileStore(dataFile || process.env.VISA_DATA_FILE || path.join(process.cwd(), 'server', 'data.json'));
  }
  return _store;
}

export function resetStoreForTests() {
  _store = null;
}
