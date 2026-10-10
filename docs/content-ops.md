# Content Operations — recurring rhythms (visaindiaexpert.com)

All monitoring for the site lives in three rhythms: **weekly** (Monday GSC
review), **monthly** (last Monday: AI citation + social + backlinks),
**quarterly** (content refresh). This file defines the weekly and quarterly
rhythms; the monthly pointers below link out to their own docs.

## (a) Quarterly content refresh

**Rule:** every post older than **6 months** gets refreshed. The sweep runs
quarterly on the **15th of Jan / Apr / Jul / Oct**, targeting all posts
published before 6 months prior to that date.

**First batch:** the four posts published **2026-10-05**
(/blog/india-tourist-visa-requirements, /blog/india-visa-processing-times-2026,
/blog/e-1-vs-b-1-visa-india, /blog/india-visa-rejection-reasons) come due for
their first refresh review at the **2027-04** sweep. The four posts
published 2026-10-09 → 2026-10-30 (per the
[content calendar](content-calendar.md)) also come due at the 2027-04 sweep;
November/December 2026 posts come due at the 2027-07 sweep.

### Refresh procedure (per post, ~45 min)

- [ ] **1. Verify facts are still current.** Visa fees, our USD
      kickoff+success pricing, processing times, category rules — re-check
      against the official portals (e-Visa portal / indianvisaonline.gov.in)
      and the embassy pages for the key nationalities. Note the check date in
      the refresh log.
- [ ] **2. Update year references (2026 → 2027).** Title, H1, body, meta
      description, JSON-LD — only where the content is genuinely
      time-bound; keep historical references intact (e.g. "processing times
      in 2026" stays if it reports 2026 data).
- [ ] **3. Re-check all internal links resolve.** Every /visa/*, /blog/* and
      /apply link returns 200; update or remove links to posts that moved,
      merged or were dropped.
- [ ] **4. Add new data / FAQs if the topic evolved.** New categories, policy
      changes, or questions that came up on client calls since publication.
      Add at most 1–2 FAQ blocks per refresh — enough to signal freshness,
      not a rewrite.
- [ ] **5. Update `dateModified`; keep the original `datePublished`.** In the
      JSON-LD and in `src/data/blog.ts`. Never back-date.
- [ ] **6. Re-run Lighthouse + SEO checks.** Perf/A11y/SEO/BP (target ≥ 90),
      title ≤ 60 chars, meta description 150–160, single H1, self-canonical.
- [ ] **7. Log in the refresh log below** (one row per post, even if the
      result is "no changes needed").

### Refresh log

| Date | Post | Changes | Result |
|------|------|---------|--------|
| | | | |

Result values: `refreshed` / `verified, no changes` / `deferred (<reason>)`.

## (b) Weekly GSC review (every Monday, 15 min)

Google Search Console → visaindiaexpert.com property. Work top to bottom;
stop at 15 min and log the actions.

| # | Check | What to look for | Action if… |
|---|-------|------------------|------------|
| 1 | Property healthy | GSC home: no "property issues" alerts, no new coverage warnings | Escalate to a same-week fix task |
| 2 | Indexing | Pages report: indexed count vs sitemap (20 URLs at launch, +1 per published post). **Target: ≥ 10 indexed by end of Nov 2026.** Cross-check with `site:` via the DuckDuckGo HTML endpoint (plain `bing.com/search?q=site:` ignores the operator for non-browser clients) | Below target: resubmit sitemap in GSC, verify robots.txt, record count in [ops-status.md](ops-status.md) |
| 3 | Top queries by impressions | Query view sorted by impressions: queries with meaningful impressions (≥ 100/mo) and **0 clicks** at position < 30 | Rewrite title/description for the page; log in the tracking sheet ([seo-keywords.md](seo-keywords.md)) |
| 4 | CTR anomalies | Queries with **position < 10 but CTR < 2%** | Draft a new title/description, test next week, log |
| 5 | Coverage errors | Pages report: any new 4xx/5xx | Fix the page or the linking URL the same week |
| 6 | New backlinks | Links → Top linking pages: new referring domains? | Log in the backlink log ([backlink-plan.md](backlink-plan.md) §f); thank the source / follow up |
| 7 | AI Overviews | Check **3 money queries** in Google (desktop): "india visa assistance", "india tourist visa requirements", "india business visa". Note (a) whether an AI Overview appears, (b) whether visaindiaexpert.com is cited | Note in the log below; feeds the monthly AI citation check |
| 8 | Core Web Vitals (field data) | Page Experience: INP / LCP / CLS — any "Poor" or "Some URLs have poor" alerts | Open a fix task; re-check next week until clear |

**Monday action log** (append one row per week):

| Week (Mon date) | New indexed (cum.) | 0-click queries flagged | CTR fixes | 4xx/5xx | New backlinks | AI Overview noted (query: yes/no, cited?) | CWV alerts | Actions taken |
|-----------------|--------------------|-------------------------|-----------|---------|---------------|--------------------------------------------|------------|---------------|
| | | | | | | | | |

## (c) Monthly rhythm pointers (last Monday)

So all monitoring lives in one rhythm:

- **AI citation check — monthly:** follow the procedure in
  [docs/ai-search.md](ai-search.md) (check the money queries across
  AI-search surfaces and log citation presence). The weekly AI Overviews
  note (check 7 above) is the early-warning input for this check.
- **Social tracking — monthly:** fill
  [docs/social-tracking-template.md](social-tracking-template.md) from the
  metrics table in [social.md](social.md) (followers, impressions, site
  clicks by `?src=li` / `?src=x` in GA4, top posts to save as evergreen).
- **Backlink cadence check — monthly:** review the month's link log
  ([backlink-plan.md](backlink-plan.md) §e–f); confirm the week-by-week
  cadence was hit and plan next month's targets.

**Full rhythm at a glance**

| Cadence | When | What | Where logged |
|---------|------|------|--------------|
| Weekly | Monday, 15 min | GSC review (section b) | Monday action log above; ops-status.md |
| Monthly | Last Monday | AI citation check · social tracking · backlink review | ai-search.md log · social-tracking-template.md · backlink log |
| Quarterly | 15th Jan/Apr/Jul/Oct | Content refresh (section a) | Refresh log above |

*Note:* `ai-search.md` and `social-tracking-template.md` are the companion
docs for the AI-search and social tracks. If either is missing when the
monthly check is due, create it (from the pointers above) before running the
check — the rhythm does not pause for missing paperwork.
