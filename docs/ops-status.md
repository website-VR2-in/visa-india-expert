# Ops checklist status — visaindiaexpert.com

Single source of truth for the 9-step ops checklist. Updated after every verification round.

**Last verified: 2026-10-10** (round 16)

| # | Step | Status | Evidence / last verified |
|---|------|--------|--------------------------|
| 2 | Email / DNS (Google Workspace) | ⏳ **Waiting on user** | DNS re-checked 2026-10-08 (rounds 12–14): MX / SPF / DKIM / DMARC all still absent (A record only). Records to add: [email-dns-setup.md](email-dns-setup.md). One-shot verification: `bash scripts/verify-mail-dns.sh` (currently 0/5). After DNS: re-run script (expect 5/5) → send mail-tester test (target ≥ 9/10) → 2 weeks later upgrade DMARC `p=none` → `p=quarantine`. |
| 3 | GA4 analytics | ✅ **Done** | `G-H2F942Z23H` (stream 16067096332) gtag snippet live in prod head (2× in HTML). Conversions `application_submitted` + `kickoff_payment_confirmed` verified firing in prod E2E (127/127) AND real `google-analytics.com/g/collect?tid=G-H2F942Z23H` hits observed from the live site (2026-10-08). |
| 4 | SEO: sitemap / robots / GSC / Bing | ✅ Done (code) · ⏳ user: Bing import | `sitemap.xml` (**24 URLs** — 8 visa + 8 blog + 8 other; 4 batch-2 blog URLs added 2026-10-10), `robots.txt` (allows /, disallows /admin /payment /confirmation, sitemap ref). GSC property verified by user. **Bing Webmaster Tools: import from Google + submit sitemap (user).** |
| 5 | Keyword research + meta | ✅ Done | [seo-keywords.md](seo-keywords.md): every primary keyword mapped to a dedicated page; 8 blog posts ↔ 8 long-tail keywords (4 added 2026-10-10). Automated audit `scripts/keyword-audit.mjs` (H1 + first-100-words + secondary occurrence): **24/24 routes PASS** after 2026-10-10 H1 fixes (/visa/other, rejection-reasons post, /disclaimer) + natural secondary-keyword copy pass (all 8 visa pages, home, about, press, blog index, 3 legal pages). [keyword-tracking.csv](keyword-tracking.csv) created (24 rows). |
| 6 | Social setup | ✅ Done (code) · ⏳ user: accounts | OG/Twitter cards live (og-image 1200×630), handles + pillars in [social.md](social.md). 2026-10-10: 30-day content plan [social-content-30d.md](social-content-30d.md) (LI 13 + X 22 + 4 Friday promos, 10/05→11/03), [social-tracking-template.md](social-tracking-template.md), [social-handles-checklist.md](social-handles-checklist.md) (char-verified bios, logo crops, 48h action list). Account creation is on the user. |
| 7 | Daily news digest agent | ✅ Done (spec) | [agents/news-digest-make.json](agents/news-digest-make.json) Make.com blueprint (schedule → 5× RSS → filter → dedupe → Claude → Gmail) + zero-dep test script `scripts/test-news-digest.mjs` (ran 2026-10-10: 4/5 feeds, 8-item digest) + [agents/news-digest-test.md](agents/news-digest-test.md). User: import into Make, re-pick merged inputs, add Anthropic credential. |
| 8 | Auto-post agent (1 blog/week) | ✅ Done (spec) | [agents/auto-post-make.json](agents/auto-post-make.json) Make.com blueprint (webhook → Claude 3 drafts → Sheets approval gate → Buffer scheduled → Gmail confirm) + [agents/sheets-template.csv](agents/sheets-template.csv) + [agents/sheets-setup.md](agents/sheets-setup.md). User: import, re-pick gdrive inputs, add Buffer credential. |
| 9 | On-page / technical | ✅ Done · 🔄 SSG deploy pending | Lighthouse prod (2026-10-08, with live gtag.js): **Perf 96–99 / A11y 100 / SEO 100 / BP 100** (3 runs; one 86 was lab jitter — raw TTFB 110–140ms), LCP 1.7s, CLS 0. 20/20 unique H1, 20/20 self-canonical, JSON-LD (Organization + WebSite) valid, 29 internal links resolve. Long-term cache headers live: `/assets/*` `max-age=31536000, immutable`, favicon/og-image 7d, HTML + sitemap kept fresh. **2026-10-10: SSG prerender in build** — `scripts/prerender.mjs` renders 24 routes to static HTML (no-JS crawlers get full body + per-route title/desc/canonical/OG + 3 JSON-LD blocks each); `404.html` = original SPA shell (postbuild copy before prerender); real HTTP 404 for unknown paths; noindex routes stay SPA-only. INP/CLS/LCP/TTFB → GA4 `web_vital` events (`src/lib/vitals.ts`). 8 blog posts (all 800–1500 words) + hub-and-spoke (cluster tags on index, "Related guides" per post, hub link to `/visa/:id`). After deploy: mobile Lighthouse sweep of 16 unaudited pages + no-JS prod curl on 24 routes. Ongoing: 1 blog/week (step 8), 5 backlinks/mo, weekly GSC review. |
| 10 | AI search visibility | ✅ Done (code) · 📈 indexing in progress | `llms.txt` + `llms-full.txt` live (currency-verified), semantic HTML, `/about` + `/press` live (200). **Bing index re-check 2026-10-10 (~48h after GSC verification): 1 result** (homepage, stale cached title "India Visa Expert — Business · Employment · Family" — cache refreshes as SSG re-crawl lands). Target ≥ 10 indexed by 2026-11-30. |

## Time-boxed follow-ups

- ~~**2026-10-10 (~48h after GSC verification): re-run index check**~~ — **done 2026-10-10**: 1 result (homepage; stale title cache). Next re-check 2026-10-17.
- **2 weeks after first DMARC (p=none) record goes live:** check DMARC aggregate reports, then upgrade to `p=quarantine`.
- **After SSG deploy (2026-10-10):** no-JS prod curl on all 24 routes (body text + per-route title), Lighthouse **mobile** sweep of the 16 previously unaudited pages (7 non-tourist /visa/*, 8 blog posts, /about, /press, /blog + 4 legal), cache-header matrix re-verify, Rich Results Test (manual, user) for FAQPage/Service/BlogPosting/Article.

## Production test baselines

- Frontend E2E (local, preview :4173): **99/99** — includes 6 GA4 checks (gtag.js load is blocked in-harness so dataLayer stays readable; the inline snippet still defines `gtag()`).
- Backend E2E (local, :4199): **61/61**.
- Production E2E: **127/127** on both `visa-india-expert.vercel.app` and the custom domain `visaindiaexpert.com` (2026-10-08, round 15) — includes the 6 GA4 checks (first flow). Each run adds 8 test invoices to Upstash (INV-20261005- / INV-20261008- prefixes) — cleanup can be requested.
- Local E2E re-verified **99/99** on 2026-10-10 after the SSG + 8-blog-post + copy changes (round 16).
- Lighthouse reports are gitignored (`lh-*`, `vh-*`).
