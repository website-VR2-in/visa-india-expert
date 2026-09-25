// TEMPORARY diagnostic route — no imports, no store, no env parsing.
// Tells us: (1) the actual Node runtime version on Vercel,
// (2) which env vars are present (values never exposed),
// (3) whether a bare function can run at all.
export const config = { runtime: 'nodejs', maxDuration: 10 };

export default function handler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  });
  res.end(
    JSON.stringify({
      node: process.version,
      platform: process.platform,
      cwd: process.cwd(),
      env: {
        upstash_url_set: Boolean(process.env.UPSTASH_REDIS_REST_URL),
        upstash_token_set: Boolean(process.env.UPSTASH_REDIS_REST_TOKEN),
        admin_password_set: Boolean(process.env.ADMIN_PASSWORD),
        vercel: process.env.VERCEL,
        vercelUrl: process.env.VERCEL_URL,
      },
    })
  );
}
