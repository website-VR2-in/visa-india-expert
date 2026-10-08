# Ops checklist status — visaindiaexpert.com

Single source of truth for the 9-step ops checklist. Updated after every verification round.

**Last verified: 2026-10-08** (round 14)

| # | Step | Status | Evidence / last verified |
|---|------|--------|--------------------------|
| 2 | Email / DNS (Google Workspace) | ⏳ **Waiting on user** | DNS re-checked 2026-10-08 (rounds 12–14): MX / SPF / DKIM / DMARC all still absent (A record only). Records to add: [email-dns-setup.md](email-dns-setup.md). One-shot verification: `bash scripts/verify-mail-dns.sh` (currently 0/5). After DNS: re-run script (expect 5/5) → send mail-tester test (target ≥ 9/10) → 2 weeks later upgrade DMARC `p=none` → `p=quarantine`. |
| 3 | GA4 analytics | ✅ **Done** | `G-H2F942Z23H` (stream 16067096332) gtag snippet live in prod head (2× in HTML). Conversions `application_submitted` + `kickoff_payment_confirmed` verified firing in prod E2E (127/127) AND real `google-analytics.com/g/collect?tid=G-H2F942Z23H` hits observed from the live site (2026-10-08). |
| 4 | SEO: sitemap / robots / GSC / Bing | ✅ Done (code) · ⏳ user: Bing import | `sitemap.xml` (20 URLs — all 200 on prod domain, verified 2026-10-08), `robots.txt` (allows /, disallows /admin /payment /confirmation, sitemap ref). GSC property verified by user. **Bing Webmaster Tools: import from Google + submit sitemap (user).** |
| 5 | Keyword research + meta | ✅ Done | [seo-keywords.md](seo-keywords.md): every primary keyword mapped to a dedicated page; 4 blog posts ↔ 4 long-tail keywords. 21 indexable pages, titles ≤ 60, descriptions 150–160 (audited). |
| 6 | Social setup | ✅ Done (code) · ⏳ user: accounts | OG/Twitter cards live (og-image 1200×630), handles + content pillars in [social.md](social.md). Account creation is on the user. |
| 7 | Daily news digest agent | ✅ Done (spec) | [agents/news-digest.md](agents/news-digest.md). |
| 8 | Auto-post agent (1 blog/week) | ✅ Done (spec) | [agents/auto-post.md](agents/auto-post.md). Weekly cadence pending a scheduled runner (user infra). |
| 9 | On-page / technical | ✅ Done | Lighthouse prod (2026-10-08, with live gtag.js): **Perf 99 / A11y 100 / SEO 100 / BP 100**, LCP 1.7s, CLS 0, TBT 100ms. 20/20 unique H1, 20/20 self-canonical, JSON-LD (Organization + WebSite) valid, 29 internal links resolve. Ongoing: 1 blog/week (step 8), 5 backlinks/mo, weekly GSC review. |
| 10 | AI search visibility | ✅ Done (code) · 📈 indexing in progress | `llms.txt` + `llms-full.txt` live (currency-verified), semantic HTML, `/about` + `/press` live (200). **Bing index: 1/20 pages indexed as of 2026-10-08** (homepage appeared in Bing index same day as GSC verification). Target ≥ 10 indexed. |

## Time-boxed follow-ups

- **2026-10-10 (~48h after GSC verification):** re-run index check — `https://html.duckduckgo.com/html/?q=site%3Avisaindiaexpert.com` (Bing index; plain `bing.com/search?q=site:` ignores the operator for non-browser clients). Expect more of the 20 sitemap URLs; record count here.
- **2 weeks after first DMARC (p=none) record goes live:** check DMARC aggregate reports, then upgrade to `p=quarantine`.

## Production test baselines

- Frontend E2E (local, preview :4173): **99/99** — includes 6 GA4 checks (gtag.js load is blocked in-harness so dataLayer stays readable; the inline snippet still defines `gtag()`).
- Backend E2E (local, :4199): **61/61**.
- Production E2E (visa-india-expert.vercel.app): **127/127** — includes the 6 GA4 checks (first flow). Each run adds 8 test invoices to Upstash (INV-20261005- / INV-20261008- prefixes) — cleanup can be requested.
- Lighthouse reports are gitignored (`lh-*`, `vh-*`).
