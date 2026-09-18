# Deploying Visa India Expert to Vercel

One Vercel project hosts everything: the static React site (`dist/`), four API
functions (`api/*.js`), and a KV database that stores all applications.

```
Applicant (any device) ──► https://your-site.vercel.app
                              │
                              ├─ /            React SPA (static)
                              ├─ /payment/…   payment page (static)
                              └─ /api/…       Node functions ──► KV store
                                                          ▲
Admin (any device) ──── /admin ───────────────────────────┘
```

Because applications live in the shared KV store, an applicant on a phone and
the admin on a laptop always see the same data.

---

## 1. Prerequisites

- Node 18+ on this machine (already installed).
- A Vercel account (free Hobby plan is fine).
- The Vercel CLI is already installed here (`npx vercel --version` → v56.x).
- A production build already exists (`npm run build` → `dist/`). Vercel also
  rebuilds automatically (`buildCommand` in `vercel.json`).

## 2. Log in to Vercel

```bash
cd /home/realmont/workspace/visa-india-expert
vercel login
```

Follow the browser prompt and authorize. Verify:

```bash
vercel whoami        # should print your account email
```

## 3. Create the project + first deploy

```bash
vercel
```

First run in this folder — answer the prompts:

- *Set up and deploy?* → **Yes**
- *Which scope?* → your account
- *Link to a git repo?* → **No** (or skip; this deploys the local folder)
- *Project name / framework / settings?* → accept defaults (it detects Vite
  from `vercel.json`)

This creates the project and gives you a URL like
`https://visa-india-expert-xxxxx.vercel.app`.

> Without the KV environment variables yet, this first deploy works but uses
> an **ephemeral file store** (data is lost between function invocations).
> That is fine for smoke-testing; do step 4 before real use.

## 4. Create the KV store (dashboard)

The `vercel kv` CLI command no longer exists in recent CLI versions — KV
stores are created in the dashboard:

1. Open your project in the Vercel dashboard.
2. **Storage** tab → **Add Database** → **KV**.
3. **Create New Store** — name it e.g. `visa-db`, region `eu-central-1`
   (Brussels — closest to the business) or `iad`.
4. Open the new store → **Settings** tab → copy the **REST URL** and
   **REST Token**.

## 5. Set the environment variables

Add these to the project (dashboard: **Settings → Environment Variables**,
or via CLI — see below). Apply to **Production, Preview and Development**:

| Name                       | Value                          | Required? |
| -------------------------- | ------------------------------ | --------- |
| `UPSTASH_REDIS_REST_URL`   | KV REST URL from step 4        | **Yes**   |
| `UPSTASH_REDIS_REST_TOKEN` | KV REST token from step 4      | **Yes**   |
| `ADMIN_PASSWORD`           | your chosen admin password     | **Yes** (default is `admin123`) |

CLI equivalent (paste the value at the prompt):

```bash
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
vercel env add ADMIN_PASSWORD
```

> `VITE_API_BASE` is **not needed** — the frontend calls the API same-origin
> by default. Only set it if you ever host the site on a different domain
> than the API.

## 6. Redeploy

Environment variables are baked in at build time, so deploy again:

```bash
vercel --prod
```

## 7. Verify

```bash
# 1. Health — must report the KV store (not "file"):
curl https://YOUR-SITE.vercel.app/api/health
#    → {"ok":true,"store":"kv"}

# 2. API auth:
curl https://YOUR-SITE.vercel.app/api/applications
#    → 401 {"error":"Admin token required"}
```

3. Open the site, submit a test application (Tourist, any data), pay the
   70% advance.
4. Open `/admin` on a **different browser/profile** and log in with
   `ADMIN_PASSWORD`. The header badge must say **● Cloud**, and the test
   application must be listed — it was created on another device, so this
   proves the shared backend works.
5. Change its status and reload — the change must persist.

---

## Day-2 operations

**Change the admin password** — update the `ADMIN_PASSWORD` env var, then
`vercel --prod`. Existing logged-in admins keep working until their token is
re-validated (tokens are stateless hashes of the password, so a password
change invalidates all old tokens).

**View / export the data** — KV store → **Console** in the dashboard:

```
KEYS visa:app:*        # all application keys
GET visa:app:<INV-…>   # one application (JSON)
SMEMBERS visa:idx      # all invoice ids
```

**Change visa prices** — edit `lib/server/prices.js` (`VISA_PRICES`), keep
`src/data/config.ts` (`VISA_OPTIONS`) in sync, then `vercel --prod`. The
server is the source of truth: it always recomputes amounts from
`VISA_PRICES`, ignoring whatever the client sent.

**Test locally first** — no Vercel needed:

```bash
npm run build
PORT=4199 VISA_DATA_FILE=/tmp/visa-data.json node server/local.mjs
# → serves dist/ + /api/* on http://127.0.0.1:4199
node e2e/run-backend.mjs   # 49-check multi-device E2E against it
```

**Offline behaviour** — if the API is ever unreachable, the frontend
automatically falls back to localStorage (the admin header shows **○ Local**
instead of **● Cloud**). Nothing breaks; data just isn't shared cross-device.

## What is deployed where

| Path                | Runtime                     | Notes                                   |
| ------------------- | --------------------------- | --------------------------------------- |
| `dist/*`            | static CDN                  | the React app                           |
| `api/health.js`     | Node serverless (10 s max)  | `GET /api/health`                       |
| `api/applications/index.js` | Node serverless     | `POST` create (public), `GET` list (admin token) |
| `api/applications/[id].js` | Node serverless       | `GET` one (public), `PATCH` update (public: payment fields; admin token: status/notes) |
| `api/admin/login.js`| Node serverless             | `POST` → `{token}`                      |
| `lib/server/*`      | bundled into the functions  | shared handlers, validation, pricing    |
| `server/local.mjs`  | **not deployed**            | local dev server only                   |
| `e2e/*`             | **not deployed**            | test scripts only                       |
