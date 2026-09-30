// TEMPORARY diagnostic route — reports which KV-related env vars are set
// (presence only, values never exposed). Removed once KV is confirmed live.
export const config = { runtime: 'nodejs', maxDuration: 10 };

const NAMES = [
  'UPSTASH_REDIS_REST_URL',
  'UPSTASH_REDIS_REST_TOKEN',
  'Storage_KV_REST_API_URL',
  'Storage_KV_REST_API_TOKEN',
  'Storage_KV_REST_API_READ_ONLY_TOKEN',
  'Storage_KV_URL',
  'Storage_REDIS_URL',
  'ADMIN_PASSWORD',
];

export default function handler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': 'no-store',
  });
  res.end(
    JSON.stringify({
      node: process.version,
      env: Object.fromEntries(NAMES.map((n) => [n, Boolean(process.env[n])])),
    })
  );
}
