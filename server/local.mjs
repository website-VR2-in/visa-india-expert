// ─── Local dev/preview server ────────────────────────────────
// Serves the built frontend (dist/) AND the /api routes, so the
// full app + backend can be exercised locally with zero extra deps.
//
//   node server/local.mjs            → http://localhost:4173
//   PORT=8080 node server/local.mjs  → http://localhost:8080
//
// Data: server/data.json (override with VISA_DATA_FILE).
// With UPSTASH_REDIS_REST_URL/TOKEN env vars set, the same handlers
// talk to Vercel KV instead of the local file.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { handleHealth, handleApplications, handleApplicationId, handleAdminLogin } from '../lib/server/handlers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const PORT = Number(process.env.PORT || 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

function sendFile(res, file) {
  const ext = path.extname(file).toLowerCase();
  fs.readFile(file, (err, buf) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      return;
    }
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    });
    res.end(buf);
  });
}

function send404(res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
}

function notFound() {
  return (res) => send404(res);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  // ── API routes ──────────────────────────────────────────────
  if (pathname === '/api/health') return void handleHealth(req, res);
  if (pathname === '/api/applications') return void handleApplications(req, res);
  const appMatch = pathname.match(/^\/api\/applications\/([^/]+)$/);
  if (appMatch) {
    req.query = { id: appMatch[1] };
    return void handleApplicationId(req, res);
  }
  if (pathname === '/api/admin/login') return void handleAdminLogin(req, res);
  if (pathname.startsWith('/api/')) return void send404(res);

  // ── Static frontend ─────────────────────────────────────────
  let filePath;
  if (pathname === '/') filePath = path.join(DIST, 'index.html');
  else {
    filePath = path.normalize(path.join(DIST, pathname));
    if (!filePath.startsWith(DIST)) return void send404(res); // path traversal guard
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(DIST, 'index.html'); // SPA fallback
    }
  }
  sendFile(res, filePath);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Visa India Expert (frontend + API) → http://localhost:${PORT}`);
  console.log(`Data file: ${process.env.VISA_DATA_FILE || path.join(__dirname, 'data.json')}`);
});
