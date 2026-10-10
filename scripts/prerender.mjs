#!/usr/bin/env node
/**
 * Static generation for no-JS crawlers (Step 10).
 *
 * Runs after `vite build` (client) + `vite build --ssr` (server bundle):
 *   1. dist/404.html must already be a copy of the ORIGINAL SPA shell
 *      (postbuild does `cp dist/index.html dist/404.html` BEFORE this script
 *      rewrites dist/index.html).
 *   2. Imports the SSR bundle (dist-server/entry-server.js), which provides
 *      render(path) and the public route list.
 *   3. For each route: renders the route to HTML, injects it into the built
 *      dist/index.html template and patches the per-route head (title,
 *      description, canonical, og:*, twitter:*).
 *   4. Writes dist/<route>/index.html for every public route.
 *
 * Vercel serves static files before rewrites, so no-JS crawlers (and
 * first-paint users) get fully rendered HTML for all public routes.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ── Browser API stubs ─────────────────────────────────────────────────────
// zustand v5 persist reads localStorage when stores are created at module
// scope; stub it with an in-memory map before importing the SSR bundle.
const mem = new Map();
globalThis.localStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => void mem.set(k, String(v)),
  removeItem: (k) => void mem.delete(k),
  clear: () => mem.clear(),
  key: (i) => [...mem.keys()][i] ?? null,
  get length() {
    return mem.size;
  },
};

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const { render, getRoutes } = await import(join(root, 'dist-server/entry-server.js'));
const template = readFileSync(join(root, 'dist/index.html'), 'utf8');
const SITE = 'https://visaindiaexpert.com';

let count = 0;
for (const route of getRoutes()) {
  const body = render(route.path);

  const title = esc(route.title);
  const desc = esc(route.description);
  const url = route.canonical ?? `${SITE}${route.path === '/' ? '/' : route.path}`;

  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${desc}">`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${url}">`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${title}">`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${desc}">`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${url}">`
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${title}">`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${desc}">`
    )
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

  if (!html.includes(`<div id="root">${body.slice(0, 40)}`)) {
    throw new Error(`Prerender failed for ${route.path}: body not injected`);
  }

  const out = join(root, 'dist', route.file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  count += 1;
  console.log(`✓ ${route.file} (${html.length} bytes)`);
}

// Sanity: every public route's static file exists
const routes = getRoutes();
for (const route of routes) {
  const p = join(root, 'dist', route.file);
  const size = readFileSync(p).length;
  if (size < 5000) throw new Error(`Prerendered ${route.file} suspiciously small (${size} bytes)`);
}
console.log(`Prerendered ${count} routes → static HTML for no-JS crawlers. 404.html left as original SPA shell.`);
