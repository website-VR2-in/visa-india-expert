# Step 7 — Daily News Digest Agent (build spec)

**Goal:** every workday at 07:00, a 200-word briefing of the 3 most relevant
India-visa items from the past 24 h, each with a one-line business implication,
delivered by email (and optionally Slack/Notion).

## Stack

- **Make.com** (automation host) — schedule + HTTP + aggregator
- **Claude API** (drafting) — `POST https://api.anthropic.com/v1/messages`
- Delivery: Gmail SMTP module (to `info@visaindiaexpert.com`) — add Slack/Notion modules later

## RSS sources (Make: RSS → Get Items, or HTTP GET + parse)

1. Google News RSS: `https://news.google.com/rss/search?q=India+visa&hl=en-IN&gl=IN&ceid=IN:en`
2. India Visa e-Visa updates (manual watch): `https://indianvisaonline.gov.in/evisa/` (no RSS — Make "Browse website" step, scrape headline area only)
3. Optional: `https://feeds.bbci.co.uk/news/world/india/rss.xml` (filter for visa mentions)

## Make.com scenario

```
[Schedule: weekdays 07:00 CET]
  → [RSS Get Items] (source 1, filter: last 24h)
  → [Aggregate: merge items from all sources, dedupe by URL]
  → [HTTP: POST https://api.anthropic.com/v1/messages]
       headers: x-api-key: {{ANTHROPIC_API_KEY}}, anthropic-version: 2023-06-01,
                content-type: application/json
       body: { "model": "claude-sonnet-4-20250514", "max_tokens": 600,
               "messages": [{ "role": "user", "content": "<prompt below>" }] }
  → [Text Extractor: parse `content[0].text` from the response JSON]
  → [Gmail: Send Email] subject: "India visa brief — {{date}}"
```

## Claude prompt (paste verbatim into the HTTP step's template)

```
You are the visa-desk analyst for Visa India Expert, a specialist India visa
assistance service (tourist, business, medical, E-1, B-1, spouse, student).

Below are news headlines + snippets from the past 24 hours about India visas,
immigration or business travel to India:

{{ITEMS}}

Write a briefing of EXACTLY 3 items (pick the most relevant; if fewer than 3
are genuinely relevant, list fewer and say so). For each item:
1. One-sentence summary of the news (with source name and date).
2. One line starting with "Business implication:" — what it means for visa
   applicants or for our service (pricing, demand, requirements, risk).
End with one line: "Net: " + a 10-word overall take.
Total length: about 200 words. Plain text, no markdown.
If nothing relevant exists, reply exactly: "No significant India visa news in the past 24 hours."
```

## Setup steps

1. Make.com → New scenario → Schedule module → weekdays, 07:00.
2. Add the RSS module(s); set "Fetch only items from the last 1 day".
3. Add the HTTP module with the body above; store `ANTHROPIC_API_KEY` in Make's
   credentials (never hard-code it).
4. Test with "Run once"; check the output, then add the Gmail module.
5. Optional: duplicate the scenario with a Slack module for `#news`.

## Verification

- Run once manually → email arrives at info@ (after email/DNS step is complete;
  until then deliver to your personal address).
- Confirm the digest is ≤ 250 words and every item has a "Business implication" line.
