// Vercel serverless route: /api/health
// GET → { ok, store: 'kv' | 'file' }
import { handleHealth } from '../lib/server/handlers.js';

export const config = { runtime: 'nodejs', maxDuration: 10 };

export default function handler(req, res) {
  return handleHealth(req, res);
}
