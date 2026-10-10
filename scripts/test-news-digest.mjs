#!/usr/bin/env node
/**
 * test-news-digest.mjs — zero-dependency end-to-end test of the news-digest pipeline
 * (docs/agents/news-digest.md + docs/agents/news-digest-make.json).
 *
 * What it does:
 *   1. Fetches the 5 RSS feeds used by the Make scenario (20 s timeout each).
 *   2. Parses <item> blocks with a tolerant regex parser (title/pubDate/description/link,
 *      basic XML entity decoding, tags stripped from description).
 *   3. Filters to the last 24 h whose title/description contains one of the keywords
 *      (visa, immigration, e-visa, FRRO, work permit, foreign investment, MCA, embassy,
 *      consulate — case-insensitive).
 *   4. Builds the digest text (max 8 items, newest first, oldest last) and prints it.
 *   5. If ANTHROPIC_API_KEY is set: POSTs to https://api.anthropic.com/v1/messages
 *      (model claude-sonnet-4-20250514, max_tokens 1024, same 200-word-briefing prompt
 *      as the Make scenario) and prints the model's briefing.
 *      Otherwise: prints the template email (subject "India visa news digest — YYYY-MM-DD"
 *      + body with the digest) and notes that the real model call was skipped.
 *
 * Exit codes:
 *   0 — success (even if 0 items matched; prints "0 relevant items")
 *   1 — hard failure (ALL feeds unreachable)
 *
 * How to run (Node 20+, no npm packages — uses global fetch):
 *   node scripts/test-news-digest.mjs
 *   ANTHROPIC_API_KEY=sk-ant-... node scripts/test-news-digest.mjs
 */

const FEEDS = [
  {
    source: "Google News: India visa policy",
    url: "https://news.google.com/rss/search?q=India+visa+policy&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    source: "Google News: India immigration e-visa",
    url: "https://news.google.com/rss/search?q=India+immigration+OR+e-visa&hl=en-IN&gl=IN&ceid=IN:en",
  },
  {
    source: "Google News: India business setup MCA",
    url: "https://news.google.com/rss/search?q=India+business+setup+OR+MCA+OR+foreign+investment&hl=en-IN&gl=IN&ceid=IN:en",
  },
  { source: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { source: "E27 (India business)", url: "https://www.e27.co/feed/" },
];

const KEYWORDS = [
  "visa",
  "immigration",
  "e-visa",
  "frro",
  "work permit",
  "foreign investment",
  "mca",
  "embassy",
  "consulate",
];

const DAY_MS = 24 * 60 * 60 * 1000;
const MODEL = "claude-sonnet-4-20250514"; // update to the current Claude model if needed

// ---------------------------------------------------------------------------
// Tolerant RSS parsing
// ---------------------------------------------------------------------------

function decodeEntities(s) {
  // &amp; last, so "&amp;lt;" decodes to "&lt;" and not to "<"
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

function stripTags(s) {
  let t = s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
  // Google News wraps description HTML as entities ("&lt;a href=...&gt;"),
  // so decode entities FIRST, then strip the revealed tags, then decode any
  // entities left in the visible text (e.g. "&amp;nbsp;" -> "&nbsp;" -> space).
  t = decodeEntities(t);
  t = t.replace(/<[^>]*>/g, " ");
  t = decodeEntities(t);
  return t.replace(/\s+/g, " ").trim();
}

function extractTag(block, tag) {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return m ? m[1].trim() : "";
}

function parseItems(xml) {
  const items = [];
  const blocks = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
  for (const b of blocks) {
    items.push({
      title: stripTags(extractTag(b, "title")),
      pubDate: extractTag(b, "pubDate"),
      description: stripTags(extractTag(b, "description")),
      link: extractTag(b, "link"),
    });
  }
  return items;
}

async function fetchFeed(feed) {
  const res = await fetch(feed.url, {
    redirect: "follow",
    signal: AbortSignal.timeout(20_000),
    headers: { "user-agent": "Mozilla/5.0 (compatible; visaindiaexpert-digest-test/1.0)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.text();
}

// ---------------------------------------------------------------------------
// Briefing prompt (same as docs/agents/news-digest-make.json, step ai_anthropic_briefing)
// ---------------------------------------------------------------------------

function briefingPrompt(digest) {
  return (
    "You are the news analyst for Visa India Expert (visaindiaexpert.com), a specialist India visa assistance service serving foreign investors, business travellers and employees applying for Indian visas.\n\n" +
    "Below is a digest of news items from the last 24 hours.\n\n" +
    "Write a daily briefing of about 200 words: a one-line summary of the overall news day, then '3 key developments' — each development as a short paragraph ending with one sentence starting 'Business implication: ' explaining what it means for foreign nationals applying for Indian visas (tourist, business, E-1, B-1, spouse, student). If fewer than 3 items are relevant, say so and give as many as exist. Plain text only, no markdown, no tables.\n\n" +
    `DIGEST:\n${digest}`
  );
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("=== news-digest pipeline test ===\n");

  // 1–2. Fetch + parse all feeds (a failing feed is not fatal unless ALL fail)
  const all = [];
  let reachable = 0;
  for (const feed of FEEDS) {
    try {
      const xml = await fetchFeed(feed);
      const items = parseItems(xml).map((it) => ({ ...it, source: feed.source }));
      all.push(...items);
      reachable += 1;
      console.log(`[feed] ${feed.source}: OK — ${items.length} items parsed`);
    } catch (err) {
      console.warn(`[feed] ${feed.source}: FAILED — ${err.message}`);
    }
  }
  if (reachable === 0) {
    console.error("\nAll feeds unreachable — hard failure.");
    process.exit(1);
  }
  console.log(`\n[feeds] ${reachable}/${FEEDS.length} reachable, ${all.length} items total\n`);

  // 3. Filter: last 24 h + keyword in title/description (case-insensitive)
  const now = Date.now();
  const relevant = all.filter((it) => {
    const ts = Date.parse(it.pubDate);
    if (isNaN(ts)) return false;
    if (now - ts > DAY_MS) return false; // older than 24 h
    if (ts > now + 60 * 60 * 1000) return false; // future-dated (allow 1 h clock skew)
    const hay = `${it.title} ${it.description}`.toLowerCase();
    return KEYWORDS.some((k) => hay.includes(k));
  });
  console.log(`[filter] ${relevant.length} relevant items in the last 24 h (of ${all.length})`);

  // 4. Dedupe by link, keep 8 newest, present oldest last (same as the Make Code step)
  const seen = new Set();
  const unique = [];
  for (const it of relevant) {
    const key = it.link || it.title || "";
    if (!key || seen.has(key)) continue;
    seen.add(key);
    unique.push({ ...it, ts: Date.parse(it.pubDate) });
  }
  unique.sort((a, b) => b.ts - a.ts);
  const top = unique.slice(0, 8); // newest first → oldest of the 8 last
  const digest = top
    .map((it) => {
      const date = new Date(it.ts).toISOString().slice(0, 16).replace("T", " ");
      const snippet = it.description.slice(0, 300);
      return `— ${it.title} (${it.source}, ${date})\n${snippet}\n`;
    })
    .join("\n");

  if (top.length === 0) {
    console.log("0 relevant items\n");
  }
  console.log("=== DIGEST ===\n" + (digest || "(empty)\n") + "\n");

  // 5. AI briefing (if key present) or template email
  const dateStr = new Date().toISOString().slice(0, 10);
  let briefingShown = false;

  if (process.env.ANTHROPIC_API_KEY) {
    console.log("[anthropic] ANTHROPIC_API_KEY set — calling Messages API…");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        signal: AbortSignal.timeout(120_000),
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 1024,
          messages: [{ role: "user", content: briefingPrompt(digest) }],
        }),
      });
      const body = await res.text();
      if (!res.ok) {
        console.error(`[anthropic] HTTP ${res.status}: ${body.slice(0, 500)}`);
        console.log("\n[anthropic] model call failed — printing template email instead.");
      } else {
        const data = JSON.parse(body);
        const text =
          data?.content?.[0]?.text ??
          (data?.content ? JSON.stringify(data.content) : "(no text in response)");
        console.log("=== AI BRIEFING (Claude) ===\n" + text + "\n");
        briefingShown = true;
      }
    } catch (err) {
      console.error(`[anthropic] request failed: ${err.message}`);
      console.log("\n[anthropic] model call failed — printing template email instead.");
    }
  } else {
    console.log(
      "[anthropic] ANTHROPIC_API_KEY not set — real model call skipped. Template email:\n"
    );
  }

  if (!briefingShown) {
    console.log(
      `Subject: India visa news digest — ${dateStr}\n\n${digest || "(no items in the last 24 h)"}`
    );
  }

  console.log("\nDone — exit 0 (feeds reachable).");
  process.exit(0);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
