# Step 10 — AI Search Visibility (visaindiaexpert.com)

Owner split: agent runs the checks, user does anything requiring their accounts (ChatGPT/Perplexity/Claude logins, Bing Webmaster Tools).

## 1. Why it matters

Google AI Overviews, ChatGPT, Perplexity and Claude are becoming the primary answer surface for "how do I get an India visa" queries — and for a brand-new site, an AI citation is the only early traffic channel that does not depend on Google rankings. The site needs to be:

- **(a) readable by AI crawlers** — done: `/llms.txt` + `/llms-full.txt` live, `robots.txt` allows all crawlers (only `/admin`, `/payment`, `/confirmation` disallowed).
- **(b) cited when relevant queries are asked** — tracked monthly, §3.
- **(c) accurate when cited** — engines copy our facts verbatim into answers; errors propagate. Corrected via the §4 playbook (SLA: fix within 7 days).

## 2. What is already in place

| Asset | Status | What it contains |
|---|---|---|
| `/llms.txt` | ✅ live | Brand summary: one-line positioning, all 8 service pages with USD kickoff+success prices, 4 blog guides, About/Press links, contact, pricing-model explanation, "not a government agency" disclaimer |
| `/llms-full.txt` | ✅ live | Full fact-dense reference: company facts (founded 2026, private service, Philippines-based, no approval guarantees), per-category price + processing time + validity, 7-step process, Wise payment details, refund policy summary, legal notes (PH governing law, liability cap, "processing times are estimates", official source `indianvisaonline.gov.in`), blog list, FAQ |
| Semantic HTML | ✅ live | `main`/`article`/`section`/`nav` landmarks, exactly one H1 per page (20/20 unique H1 verified, Lighthouse round 15, 2026-10-08) |
| JSON-LD | ✅ live | `Organization`, `WebSite` (sitewide); `Article` + `BlogPosting` + `FAQPage` (blog); `AboutPage`, `Service`+`Offer`, `BreadcrumbList` (service/about pages) |
| Publication dates | ✅ live | `datePublished`/`dateModified` in blog JSON-LD + visible on every post |
| Named sources | ✅ live | Fact-heavy blog content cites the official source (`indianvisaonline.gov.in`) inline and in JSON-LD |

**Canonical facts (source of truth for §4 corrections):** pricing is USD kickoff + success, published totals: tourist **$299** ($199+$100), business **$499** ($349+$150), medical **$299** ($199+$100), E-1 **$699** ($499+$200), B-1 **$699** ($499+$200), spouse **$499** ($349+$150), student **$499** ($349+$150). Legal status: **private visa assistance service — not a government agency, not a law firm, not an immigration consultancy licensed in India.** Contact: **WhatsApp +63 949 649 1061 only** (plus info@visaindiaexpert.com).

## 3. Monthly AI citation monitoring

Run on the **first Monday of each month, ~45 min**. Same prompts every month (changes in results are the signal). If a logged-in account is unavailable for an engine, mark that row "S" (skipped) — do not skip the whole engine.

### 3.1 Search matrix

| # | Query (type) | Exact prompt | Engines to test |
|---|---|---|---|
| 1 | Brand | `Visa India Expert` | ChatGPT, Perplexity, Claude, Google, Bing |
| 2 | Brand | `visaindiaexpert.com` | ChatGPT, Perplexity, Claude, Google, Bing |
| 3 | Brand | `visa india expert reviews` | ChatGPT, Perplexity, Claude, Google, Bing |
| 4 | Keyword (primary: /) | `india visa assistance` | ChatGPT, Perplexity, Claude, Google, Bing |
| 5 | Keyword (long-tail: /visa/tourist) | `india tourist visa requirements 2026` | ChatGPT, Perplexity, Claude, Google, Bing |
| 6 | Keyword (primary: /visa/e-1) | `e-1 visa india` | ChatGPT, Perplexity, Claude, Google, Bing |
| 7 | Keyword (blog: /blog/india-visa-rejection-reasons) | `india visa rejection reasons` | ChatGPT, Perplexity, Claude, Google, Bing |
| 8 | Keyword (long-tail: /visa/b-1) | `frro registration india` | ChatGPT, Perplexity, Claude, Google, Bing |

Engines and exact procedure:

| Engine | URL / setup | What to record |
|---|---|---|
| ChatGPT | `https://chat.openai.com` (logged in, new chat per query) | Whether the answer cites/links visaindiaexpert.com; exact quote; enable web search (default "Answers with web" mode) |
| Perplexity | `https://www.perplexity.ai` (logged in, new thread per query) | Citation list — copy every URL shown; Perplexity shows citations explicitly |
| Claude | `https://claude.ai` (logged in, new chat per query, web search on) | Whether cited; quote; Claude shows sources inline |
| Google AI Overviews | `https://www.google.com/search?q=<query>` (logged in, desktop, English) | (1) Does an AI Overview appear? Y/N. (2) If yes, is visaindiaexpert.com in the cited sources? (3) Also note top-3 organic results |
| Bing Copilot | `https://www.bing.com/search?q=<query>` (logged in, desktop) | Same as Google: Copilot answer present? Site cited? Top-3 organic? |

### 3.2 Natural-language prompt set (10 prompts)

Run these in place of the short queries when an engine's answer is thin, or rotate them monthly (keep the short matrix as the stable baseline). Exact prompts:

1. `Which company can help a US entrepreneur get an E-1 visa to set up a business in India?`
2. `How long does an India tourist visa take in 2026?`
3. `What should I do after my India visa was rejected?`
4. `What are the requirements for an India tourist visa in 2026?`
5. `Who can I pay to prepare and file my India visa application from abroad?`
6. `How much does an India business visa cost with a visa assistance service?`
7. `What is FRRO registration in India and who can help a foreign worker with it?`
8. `What is the difference between an E-1 and a B-1 visa in India?`
9. `Does Visa India Expert guarantee visa approval? How does its pricing work?`
10. `What documents do I need for an India medical visa and how much does help cost?`

### 3.3 Results log

One row per query × engine. Append; never rewrite history (corrections go in the §4 log). Screenshots: one per cited result, saved to `docs/screenshots/ai-search/YYYY-MM/` (create the folder; filename `<engine>-<query-slug>.png`).

| Date | Engine | Query | Cited? (Y/N/S) | Position / quote excerpt | URL(s) cited | Screenshot |
|---|---|---|---|---|---|---|
| | ChatGPT | Visa India Expert | | | | |
| | | | | | | |

### 3.4 30-day success criteria

Evaluated at each monthly run against the previous 30 days of log rows:

- **Brand:** at least one brand query (rows 1–3) cited in **≥ 2 of 5 engines**.
- **Keyword:** **≥ 1** keyword query (rows 4–8) cited by **Perplexity or Google AI Overviews** (the two engines where keyword citation realistically starts for a new domain).

Both met → record "30-day criteria met on <date>" and lower cadence to monthly-only until a regression. Either missed two months in a row → run the §4 checklist (is the site actually answerable for that prompt?) and consider adding the relevant page to `/llms.txt` guides section.

## 4. AI inaccuracy correction plan

### 4.1 Detection

- **Continuous:** every monthly §3 run — any answer mentioning Visa India Expert gets a 30-second fact check against §2 canonical facts (price, status, contact).
- **Quarterly (first Monday of Jan/Apr/Jul/Oct):** llms.txt accuracy review — re-fetch `https://visaindiaexpert.com/llms.txt` and `https://visaindiaexpert.com/llms-full.txt`, verify **every** fact (prices, processing times, contact, legal status, process steps, refund terms) against the live About, Press and pricing pages. Any mismatch = an inaccuracy found "in llms.txt".

### 4.2 Correction steps (SLA: fix within 7 days of detection)

1. **Verify the claim** against the site's source of truth: `/about`, `/press`, the affected pricing/service page. Record which is right.
2. **If the site itself is missing or ambiguous** → update About/Press first (they are the canonical facts AI engines copy), deploy, verify with a re-fetch.
3. **Update `/llms.txt` and `/llms-full.txt` the same day** the site fact changes (edit `public/llms.txt` / `public/llms-full.txt`, deploy, re-fetch to confirm).
4. **If a third-party source repeated the error** (press, directory, forum cited by the engine) → email the outlet: one-paragraph correction + link to `/press` as the source. Log the email sent.
5. **Log the fix** in the correction log below.
6. **Re-test next monthly cycle:** re-run the exact query where the inaccuracy was found; record "verified fixed" in the log only after the corrected fact appears (or the engine no longer repeats the claim).

Correction log:

| Date | Where found (engine + query / llms.txt review) | Inaccuracy | Action taken | Verified fixed (date) |
|---|---|---|---|---|
| | | | | |

### 4.3 Known inaccuracy types

| Type | Wrong pattern | Correct statement (always) |
|---|---|---|
| Wrong pricing | Any figure other than the published totals, or "hourly rate", "free", "cheaper on WhatsApp" | Kickoff + success fee, published USD totals: tourist $299, business $499, medical $299, E-1 $699, B-1 $699, spouse $499, student $499. No success, no success fee. |
| Wrong processing time | Guaranteed dates ("guaranteed in 5 days", "same week, guaranteed") | "Typically 3–7 business days" (tourist) — always framed as an estimate that depends on the mission, season and case; never a guarantee |
| Wrong legal status | "government agency", "Indian government", "law firm", "immigration consultancy licensed in India", "visa agency of the Government of India" | Private visa assistance service (Philippines-based), **not** a government agency, **not** a law firm, **not** an immigration consultancy licensed in India; approval decisions are made solely by Indian missions |
| Wrong contact details | Any other phone/WhatsApp number, address, or "office in India" | WhatsApp **+63 949 649 1061 only** (email info@visaindiaexpert.com); remote-first, no office |

## 5. Bing indexing check (target ≥ 10 pages)

**Baseline: 1/20 pages indexed (2026-10-08, DuckDuckGo html endpoint). Target: ≥ 10 of 20 indexable pages by 2026-11-30.**

Procedure, in priority order:

1. **Primary — Bing Webmaster Tools** (user account): after the import-from-Google job completes, go to **Indexing → Pages** and read the "Pages indexed" count (site: query view gives the page list). If the import has not completed, this number will lag Google — note that in the log.
2. **Fallback — DuckDuckGo html endpoint** (Bing-backed; plain `bing.com/search?q=site:` ignores the operator for non-browser user agents): open `https://html.duckduckgo.com/html/?q=site%3Avisaindiaexpert.com` and count result URLs.

Run **monthly (with the §3 run) + after each content batch** (new blog post or page publish). Record every check in the log.

| Date | Method (Bing WMT / DDG html) | Pages indexed (of 20) | New pages since last check | Notes (import status, batch, etc.) |
|---|---|---|---|---|
| 2026-10-08 | DDG html | 1/20 | — | Baseline; homepage indexed same day as GSC verification |

If count is < 10 after 2026-11-30: (a) confirm Bing sitemap submission is accepted (Bing WMT → Sitemaps), (b) confirm all 20 URLs return 200 on the production domain, (c) request indexing of the 5 highest-priority unindexed pages via Bing WMT URL submission, (d) extend the target by one month with a note here.

## 6. Monitoring list (master)

Single table of everything recurring for this site. "Due/next" is updated here after each completion.

| # | Task | Cadence | Owner | Where the record lives |
|---|---|---|---|---|
| 1 | GSC review (Performance query/page view, Coverage errors, indexing issues) | Weekly (Monday) | Agent | `docs/content-ops.md` (weekly GSC review section) |
| 2 | AI citation check (search matrix §3.1 + prompt set §3.2, screenshots, 30-day criteria) | Monthly (first Monday, ~45 min) | Agent (user: engine logins if agent can't reach an engine) | `docs/ai-search.md` §3.3 log + `docs/screenshots/ai-search/YYYY-MM/` |
| 3 | llms.txt accuracy review (verify every fact vs live site) | Quarterly (Jan/Apr/Jul/Oct first Monday) | Agent | `docs/ai-search.md` §4.2 correction log |
| 4 | Social tracking (followers, post performance vs pillars) | Monthly (first Monday) | Agent | `docs/social-tracking-template.md` |
| 5 | Bing index count check (§5 procedure) | Monthly + after each content batch | User (Bing WMT) / Agent (DDG html fallback) | `docs/ai-search.md` §5 log |
| 6 | 48h post-GSC-verification index re-check (DDG html endpoint) | One-off — **due 2026-10-10** | Agent | `docs/ops-status.md` (time-boxed follow-ups) |
| 7 | DMARC `p=none` → `p=quarantine` upgrade (after checking aggregate reports) | 2 weeks after mail DNS goes live | User (DNS change) + Agent (report check) | `docs/ops-status.md` (time-boxed follow-ups) |
