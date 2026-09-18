// Vercel serverless route: /api/admin/login
// POST { password } → { token } (401 on wrong password)
import { handleAdminLogin } from '../../lib/server/handlers.js';

export const config = { runtime: 'nodejs', maxDuration: 10 };

export default function handler(req, res) {
  return handleAdminLogin(req, res);
}
