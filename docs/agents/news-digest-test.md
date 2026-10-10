# End-to-end test procedure — news-digest + auto-post agents

Covers both Make scenarios built from `news-digest-make.json` and
`auto-post-make.json` (specs: `news-digest.md`, `auto-post.md`).

## (a) Local test (no Make, no credentials)

```bash
# digest only (template email, no API key needed)
node scripts/test-news-digest.mjs

# digest + real Claude briefing
ANTHROPIC_API_KEY=sk-ant-... node scripts/test-news-digest.mjs
```

Expected output checklist — all of these must appear:

- [ ] 5× `[feed] …: OK — N items parsed` lines (a feed may FAIL with a warning —
      that's acceptable as long as at least one feed is reachable; **all** failing →
      exit 1 "All feeds unreachable").
- [ ] `[feeds] k/5 reachable, N items total`.
- [ ] `[filter] M relevant items in the last 24 h (of N)` — `M` may be 0 (weekends /
      quiet news days); if 0, the script prints **`0 relevant items`** and still exits 0.
- [ ] `=== DIGEST ===` block: lines of the form
      `— {title} ({source}, {date})` + snippet, max 8 items, oldest last.
- [ ] With `ANTHROPIC_API_KEY`: `=== AI BRIEFING (Claude) ===` — ~200 words, one-line
      summary, up to 3 key developments, each ending with a `Business implication:`
      sentence. Without the key: a note that the model call was skipped, plus
      `Subject: India visa news digest — YYYY-MM-DD` and the digest as body.
- [ ] Exit code 0 (`echo $?` → 0).

## (b) Make import — news-digest scenario

1. Make.com → Scenarios → **Import** → upload `docs/agents/news-digest-make.json`.
2. Fix up after import (best-effort format — expect some re-picking):
   - **Schedule step:** confirm 07:00 Asia/Kolkata (toggle to weekdays if desired).
   - **5 RSS steps:** confirm each feed URL matches the spec (Google News ×3,
     TechCrunch, E27).
   - **Filter step:** re-create the conditions if lost — pubDate newer than now−24h
     **AND** (title/description contains any of: visa, immigration, e-visa, FRRO,
     work permit, foreign investment, MCA, embassy, consulate — **OR group**). Wire its
     input to the merged output of the 5 RSS steps (add a Merge module if required).
   - **Code step:** confirm the JS is intact; map the filter output to its `items`
     input.
   - **HTTP (Anthropic) step:** update the model id
     (`claude-sonnet-4-20250514` → current Claude model) before the first run.
   - **Credentials:** add HTTP credential **anthropic** (field `xApiKey` = your
     `sk-ant-…` key); connect the **Gmail** account that sends the digest.
   - **Gmail step:** confirm `to` = info@visaindiaexpert.com, subject
     `India visa news digest — {{date}}`; the body mapping
     `{{anthropic.content.0.text}}` is best-effort — check the HTTP step output after
     the first run and repoint it (or insert an Extract step) if the field path differs.
3. **Run once** (not "Activate").
4. Verify: the digest email arrives in the Gmail inbox **within ~2 minutes**; body is
   ≤ ~250 words; every development has a `Business implication:` line.
5. Only then **Activate** the scenario (daily 07:00 IST).

## (c) Auto-post test

1. Import `docs/agents/auto-post-make.json` the same way.
2. Create the Google Sheet per `docs/agents/sheets-setup.md` (import
   `sheets-template.csv` → **Auto-Post Drafts** sheet, columns
   date/platform/draft/score/status, status dropdown Pending/Approved/Rejected).
3. Connect **Google** (Sheets) + **Gmail** in Make; add the **buffer** credential
   (field `apiKey` = Buffer API key) and fill the platform → channel_id mapping
   (LinkedIn / X / Blog) + next-slot mapping (LinkedIn 08:00 Tue/Thu/Fri CET ·
   X 08:00/12:00/17:00 CET · Blog Fri 08:00 CET).
4. Re-pick the broken Google Sheets modules if import shows them broken
   (*Append row* on the Auto-Post Drafts sheet; *Watch rows* filtered on
   status = "Approved").
5. **Manually trigger the webhook** with a sample payload (replace the hook URL with
   the one Make shows on the webhook step):

   ```bash
   curl -sS -X POST "https://hook.eu1.make.com/YOUR_WEBHOOK_PATH/auto-post-digest" \
     -H "Content-Type: application/json" \
     -d '{
       "digestText": "India visa news digest — 2025-01-15\n\nSummary: e-Visa processing times shortened and photo rules relaxed.\n\n1) India e-Visa processing time cut from 4 to 3 business days for most nationalities (PTI, 2025-01-14). Business implication: quote shorter turnaround in client promises this week.\n2) New e-Visa photo rules: white background, 35x45 mm, no headwear (MoHA advisory, 2025-01-14). Business implication: update the client checklist and offer a free photo pre-check.\n3) RBI eases FDI reporting for foreign founders (E27, 2025-01-13). Business implication: easier company setup for investors holding B-1/E-1 visas — cross-sell the setup desk."
     }'
   ```

6. Verify (within ~1–2 min):
   - [ ] 3 new rows appear in **Auto-Post Drafts** — one each for `LinkedIn`, `X`,
         `Blog`, all with `status = Pending` and a numeric `score` 1–10.
   - [ ] The X row draft contains 3 tweets; the Blog row has SEO title + blank line +
         intro.
7. Set **one** row (e.g. the X row) to `Approved`. Wait for the next watch tick
   (~15 min max):
   - [ ] Buffer → scheduled posts shows the update queued for the **next X slot**
         (08:00/12:00/17:00 CET).
   - [ ] Gmail receives `Auto-post: X draft queued to Buffer (score N)`.
8. Leave the other rows `Pending` → confirm they are **not** queued (human gate works).

## (d) Go/no-go checklist before leaving it unattended

1. ☐ **Digest email:** 2 consecutive manual "Run once" runs produced a clean email at
   info@ within 2 min (≤ ~250 words, every development has a `Business implication:`
   line).
2. ☐ **No hardcoded secrets:** both scenarios read `anthropic.xApiKey` and
   `buffer.apiKey` from Make credentials — grep the scenario for `sk-ant-` finds
   nothing.
3. ☐ **Model id current:** the Anthropic model id in both HTTP steps is the current
   Claude model and both calls succeeded in test runs.
4. ☐ **Sheet gate verified:** webhook test produced 3 `Pending` rows; `Approved` row
   was queued to Buffer + Gmail confirmation arrived; `Rejected`/`Pending` rows were
   not queued.
5. ☐ **Buffer slots sane:** the queued test update landed on the correct channel at a
   future slot matching the platform schedule (delete the test post before it goes
   live).
6. ☐ **Cleanup + fail-safe:** test rows deleted or marked, webhook only reachable via
   the Make hook URL, and the operator knows the daily loop (open sheet → read → set
   Approved → queued within ~15 min).
