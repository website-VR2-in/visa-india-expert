# Google Sheet setup — "Auto-Post Drafts"

Sheet used by the **auto-post** Make scenario (see `auto-post-make.json`).
Columns (exact order, header row required):

```
date,platform,draft,score,status
```

| Column | Meaning |
|---|---|
| date | creation date (YYYY-MM-DD, from the agent) |
| platform | `LinkedIn` / `X` / `Blog` |
| draft | the draft text (editable; X = 3 tweets separated by a line + `—`, Blog = SEO title, blank line, intro) |
| score | agent's 1–10 engagement score (keep ≥ 7; below that → edit before approving) |
| status | `Pending` → `Approved` / `Rejected` (dropdown) |

## 1. Create the sheet

1. Go to [sheets.new](https://sheets.new) → name it **Auto-Post Drafts** (exact name — the
   Make steps reference it by name).
2. Menu → **File → Import → Upload** → select `docs/agents/sheets-template.csv` →
   **Import data** (defaults: replace/insert sheet is fine). The import creates a
   `Sheet1` (or similarly named) tab with the header row + 3 example rows.
   - The X and Blog example rows contain **multi-line cells** (real newlines inside
     quoted CSV fields). That is intentional and matches what the agent appends.
   - If the import lands the data in a second tab, delete the empty default tab and
     rename the imported tab to **Auto-Post Drafts**.
3. **Column widths:** A (date) ~110 px · B (platform) ~110 px · C (draft) ~600 px
   (wrap text ON) · D (score) ~70 px, centered · E (status) ~110 px, centered.
4. **Status dropdown (validation):** select the `status` column header →
   **Data → Data validation → Dropdown** with list items `Pending,Approved,Rejected`,
   apply to the whole column (e.g. `E2:E5000`) so manual entry is constrained.
   (Optionally do the same for `platform` with `LinkedIn,X,Blog`.)
5. Freeze row 1 (View → Freeze → 1 row). Delete the example rows whenever you like —
   the scenario appends below the last row.

## 2. Connect Google in Make

1. Make.com → **My Profile → Connections** → add a **Google** connection
   (Google Drive/Sheets OAuth) using the Google account that owns the sheet.
   Authorize; the scenario's *Append row* and *Watch rows* steps use this connection.
2. Add a **Gmail** connection (same or a different account) — used for the
   confirmation email ("Auto-post: {platform} draft queued to Buffer…").
3. In the auto-post scenario, on the two Google Sheets steps, confirm the spreadsheet
   resolves to **Auto-Post Drafts** (if the import left the `gdrive:AppendRow` /
   `gdrive:WatchRows` modules broken, re-pick *Append row* / *Watch rows* and select the
   sheet by name here).

## 3. Buffer channel IDs

1. In Buffer: connect the **LinkedIn**, **X** and **Blog** channels (the blog channel
   can be a Buffer "website/blog" channel or a custom one you post from).
2. Buffer → **Settings → Apps** → create an app (or use an existing one) and copy the
   **API key**.
3. In Make: add an HTTP credential named **buffer** with field **apiKey** = that key.
4. **Where to paste the channel IDs:** Buffer → **Settings → Channels** shows each
   channel's id. Write the three ids (LinkedIn=…, X=…, Blog=…) into the Make credential
   (extra fields, e.g. `liChannelId` / `xChannelId` / `blogChannelId`) or directly into
   the Buffer step's `channel_id` mapping via a small per-platform lookup
   (`{{#platform}}` → id). Same place: the **next-slot** mapping that computes
   `schedule_at` (LinkedIn 08:00 Tue/Thu/Fri CET · X 08:00/12:00/17:00 CET ·
   Blog Fri 08:00 CET — pick the *next* matching slot).

## 4. Approval workflow (human in the loop)

**Nothing publishes until a human sets `status = Approved`.** Daily loop:

1. **Morning (after 07:00 IST):** the news-digest scenario has emailed the briefing and
   the webhook has triggered the auto-post scenario → 3 new rows appear in
   **Auto-Post Drafts** with `status = Pending`.
2. **Read the drafts** in the sheet (expand the draft column; edit freely — drafts are
   editable and the edited text is what gets queued). Check the `score` column:
   9–10 publish as-is · 7–8 minor edits · 4–6 rewrite · 1–3 reject.
3. **Set `status`** on each row: `Approved` for what should go out, `Rejected` for the
   rest.
4. The **Watch rows** step ticks every ~15 minutes: each row that flips to `Approved`
   is queued to Buffer at the next slot for that platform (CET schedule above) and a
   Gmail confirmation ("Auto-post: {platform} draft queued to Buffer (score {score})")
   arrives at info@visaindiaexpert.com.
5. **Verify** in Buffer → scheduled posts that the update landed, then (optional) set
   the sheet row to `Published` after it goes live for weekly drift checks.

## 5. Notes & gotchas

- Watch rows detects **changes** to the status column; setting `Approved` on an already
  `Approved` row does nothing. If a row is missed, toggle it to `Pending` and back.
- Keep the sheet in the same Google account Make is connected to — no sharing tricks.
- The sheet is append-only from the agent; never delete the header row.
- If the model returns fewer than 3 drafts (rare), the Code step still emits up to 3
  rows with empty drafts — reject those rows.
