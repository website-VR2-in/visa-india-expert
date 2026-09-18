// ─── Stateless admin authentication ──────────────────────────
// Token = base64url(sha256(ADMIN_PASSWORD + "::admin::v1")).
// Stateless: verified by recomputing, nothing stored server-side.
// Password comes from the ADMIN_PASSWORD env var (default for local dev only).

import { createHash, timingSafeEqual } from 'node:crypto';

const TOKEN_SECRET_SUFFIX = '::admin::v1';

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || 'admin123'; // default is local-dev only
}

export function issueToken(password) {
  return createHash('sha256').update(`${password}${TOKEN_SECRET_SUFFIX}`).digest('base64url');
}

export function verifyToken(token) {
  if (typeof token !== 'string' || !token) return false;
  const expected = issueToken(adminPassword());
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Extract and verify a Bearer token from an Authorization header. */
export function bearerToken(req) {
  const header = req.headers['authorization'] || '';
  if (!header.startsWith('Bearer ')) return null;
  const token = header.slice(7).trim();
  return verifyToken(token) ? token : null;
}
