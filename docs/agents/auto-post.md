# Step 8 — Auto-Post Agent (build spec)

**Goal:** Claude drafts 3 platform variants per topic → human approves in a
review sheet → Buffer API publishes at the scheduled times. Nothing goes live
without a human click.

## Pipeline

```
[Make: Schedule (Fri 16:00, weekly)]
  → [HTTP GET: latest post from /blog (or a "topics" row in GSheet)]
  → [HTTP: Claude API — generate 3 variants (one call)]
  → [GSheet: add 3 rows, Status=Pending]
  → (human reviews in the sheet: edits allowed, sets Status=Approved)
[Make: Schedule (daily 07:00)]
  → [GSheet: get rows where Status=Approved AND PublishDate=Today]
  → [HTTP: Buffer API — schedule per platform time]
  → [GSheet: set Status=Published + Buffer link]
```

## 1. Draft generation — Claude prompt

```
You write social content for Visa India Expert (visaindiaexpert.com), a
specialist India visa assistance service. Tone: expert, calm, factual, zero
hype. Never promise visa approval. Always say "we prepare and manage the
application; approval is at the mission's discretion" when relevant.

Source topic: {{TOPIC}}
Source article: {{ARTICLE_URL}} ({{ARTICLE_SUMMARY}})

Produce EXACTLY 3 variants as JSON:
{
  "linkedin": "~150 words, professional, 3-5 short paragraphs, MUST end with a direct question to the reader. 2-3 hashtags max, keyword-first.",
  "x": "3-tweet thread. Tweet 1: hook/claim (under 280 chars). Tweet 2: the substance. Tweet 3: CTA to the website page. Number them 1/ 2/ 3/.",
  "blog_intro": "250 words. SEO title line first (include the primary keyword), then a fact-dense intro that teases the full guide and links it."
}
Every variant must include the correct website URL ({{ARTICLE_URL}} or the
visa page). No emoji except at most one on LinkedIn.
```

## 2. Review sheet (Google Sheet "Social queue")

| Column | Meaning |
|---|---|
| Date | creation date |
| Topic | source topic |
| Platform | linkedin / x / blog_intro |
| Draft | the text (editable) |
| Score (1–10) | your 1–10 rating of the draft (keep ≥ 7) |
| Status | Pending → Approved / Rejected |
| PublishDate | date it should go out |
| BufferLink | filled by the agent after scheduling |

Rules: only `Status=Approved` rows are published. `Score < 7` → edit before
approving (Claude drafts are a floor, not a ceiling).

## 3. Buffer publish times (CET)

| Platform | Days | Times |
|---|---|---|
| LinkedIn | Tue, Thu, Fri | 08:00 |
| X | Mon–Fri | 08:00, 12:00, 17:00 |
| Blog | Fri | 09:00 (post to site first, then the social variants reference it) |

Buffer API: `POST https://api.bufferapp.com/1.0/update/` per platform profile
with `schedule_at` per the table; app token in Make credentials.

## 4. Scoring rubric (1–10)

- 9–10: publish as-is
- 7–8: minor edits, publish
- 4–6: rewrite with Claude (send the critique back: "Fix: …")
- 1–3: reject, pick a different angle

## 5. Verification (first two weeks)

- Every published post: check the Buffer profile + the live platform.
- Weekly: compare scheduled vs. published counts in the sheet (0 drift).
- Track clicks with `?src=li` / `?src=x` in GA4 (Step 3).
