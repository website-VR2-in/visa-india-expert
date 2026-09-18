// Vercel serverless route: /api/applications
// POST — create application (public)
// GET  — list applications (admin token required)
import { handleApplications } from '../../lib/server/handlers.js';

export const config = { runtime: 'nodejs', maxDuration: 10 };

export default function handler(req, res) {
  return handleApplications(req, res);
}
