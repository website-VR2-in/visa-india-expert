// Vercel serverless route: /api/applications/:id
// GET   — fetch one application (public, by unguessable invoice id)
// PATCH — update payment status (public) or status/notes (admin token)
import { handleApplicationId } from '../../lib/server/handlers.js';

export const config = { runtime: 'nodejs', maxDuration: 10 };

export default function handler(req, res) {
  return handleApplicationId(req, res);
}
