#!/usr/bin/env node
/**
 * Step 5 keyword audit on the PRERENDERED static HTML (dist/).
 * Checks, per public route:
 *   1. primary keyword present in the H1 (all words, case-insensitive)
 *   2. primary keyword present in the first 100 words of visible body text
 *   3. secondary keywords occurring in the body (occurrence count, informational)
 *
 * Usage: node scripts/keyword-audit.mjs   (after `npm run build`)
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const dist = join(root, 'dist');
const esbuild = join(root, 'node_modules', '.bin', 'esbuild');

const compile = (file) => {
  const out = join(tmpdir(), `audit-${file.replace(/[/]/g, '-')}.mjs`);
  execFileSync(esbuild, [join(root, file), '--bundle', '--format=esm', `--outfile=${out}`, '--log-level=error']);
  return import(out);
};

const seo = await compile('src/data/seo.ts');
const blog = await compile('src/data/blog.ts');

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

const first100 = (html) => strip(html).split(' ').slice(0, 100).join(' ');
const h1Text = (html) => {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? strip(m[1]) : '(no h1)';
};
const hasAllWords = (haystack, kw) => {
  const h = haystack.toLowerCase();
  return kw.toLowerCase().split(/\s+/).every((w) => h.includes(w));
};
const exactPhrase = (haystack, kw) => haystack.toLowerCase().includes(kw.toLowerCase());
const count = (haystack, kw) => haystack.toLowerCase().split(kw.toLowerCase()).length - 1;

// route → { file, primary, secondary[] }
const routes = [
  { file: 'index.html', primary: seo.HOME_SEO.keywords[0], secondary: seo.HOME_SEO.keywords.slice(1) },
  ...Object.entries(seo.VISAS_SEO).map(([id, s]) => ({
    file: `visa/${id}/index.html`,
    primary: s.keywords[0],
    secondary: s.keywords.slice(1),
  })),
  { file: 'about/index.html', primary: seo.ABOUT_SEO.keywords[0], secondary: seo.ABOUT_SEO.keywords.slice(1) },
  { file: 'press/index.html', primary: seo.PRESS_SEO.keywords[0], secondary: seo.PRESS_SEO.keywords.slice(1) },
  { file: 'blog/index.html', primary: seo.BLOG_INDEX_SEO.keywords[0], secondary: seo.BLOG_INDEX_SEO.keywords.slice(1) },
  ...blog.BLOG_POSTS.map((p) => ({ file: `blog/${p.slug}/index.html`, primary: p.primaryKeyword, secondary: [] })),
  { file: 'privacy/index.html', primary: seo.PRIVACY_SEO.keywords[0], secondary: seo.PRIVACY_SEO.keywords.slice(1) },
  { file: 'terms/index.html', primary: seo.TERMS_SEO.keywords[0], secondary: seo.TERMS_SEO.keywords.slice(1) },
  { file: 'refund/index.html', primary: seo.REFUND_SEO.keywords[0], secondary: seo.REFUND_SEO.keywords.slice(1) },
  { file: 'disclaimer/index.html', primary: seo.DISCLAIMER_SEO.keywords[0], secondary: seo.DISCLAIMER_SEO.keywords.slice(1) },
];

let failures = 0;
console.log('Keyword audit (prerendered dist HTML)\n' + '='.repeat(78));
for (const r of routes) {
  const p = join(dist, r.file);
  if (!existsSync(p)) {
    console.log(`✗ ${r.file} — MISSING`);
    failures++;
    continue;
  }
  const html = readFileSync(p, 'utf8');
  const h1 = h1Text(html);
  const body = strip(html);
  const f100 = first100(html);
  const h1ok = hasAllWords(h1, r.primary);
  const f100ok = hasAllWords(f100, r.primary);
  const secCounts = r.secondary.map((k) => `${k}:${count(body, k)}`).join('  ');
  const ok = h1ok && f100ok;
  if (!ok) failures++;
  console.log(`${ok ? '✓' : '✗'} ${r.file}`);
  console.log(`    H1: "${h1}"  [${h1ok ? 'kw ✓' : 'KW MISSING'}${exactPhrase(h1, r.primary) ? '' : ' (words present, not exact phrase)'}]`);
  console.log(`    first100: ${f100ok ? 'kw ✓' : 'KW MISSING'} | secondary { ${secCounts || 'n/a'} }`);
}
console.log('='.repeat(78));
console.log(failures === 0 ? `PASS: all ${routes.length} routes carry their primary keyword in H1 + first 100 words.` : `FAIL: ${failures} route(s) need fixes.`);
process.exit(failures === 0 ? 0 : 1);
