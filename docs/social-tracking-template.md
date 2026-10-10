# Monthly Social Growth Tracking — visaindiaexpert

One row per platform per month. Fill it **on the last Monday of each month** (data lag: LinkedIn/X analytics settle within ~48h of month end; GA4 data is near real-time). Keep every month's snapshot — the first month is October 2026.

## 1. Tracking table

| Month | Platform | Followers (start) | Followers (end) | Net change | Posts published | Best post (why) | Avg engagement rate | Site clicks (utm) | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Oct 2026 | LinkedIn |  |  |  |  |  |  |  |  |
| Oct 2026 | X |  |  |  |  |  |  |  |  |
| Nov 2026 | LinkedIn |  |  |  |  |  |  |  |  |
| Nov 2026 | X |  |  |  |  |  |  |  |  |
| Dec 2026 | LinkedIn |  |  |  |  |  |  |  |  |
| Dec 2026 | X |  |  |  |  |  |  |  |  |

- **Followers (start):** follower count at 00:00 on the first day of the month (LinkedIn: page analytics; X: profile).
- **Followers (end):** follower count at 23:59 on the last day of the month.
- **Net change:** end − start.
- **Posts published:** count of posts actually published that month (plan of record: LinkedIn 12–13/mo, X 20–22/mo — from [`social-content-30d.md`](social-content-30d.md) and the ongoing calendar).
- **Best post (why):** the post with the highest engagement rate that month — title/hook + one line on why it worked (hook type, topic, timing). Save it to the "Content log" spreadsheet tab as evergreen material.
- **Avg engagement rate:** engagements ÷ impressions × 100 (see formula below).
- **Site clicks (utm):** sessions in GA4 where `utm_source` = `li` or `x` (see below).
- **Notes:** anything that breaks comparability (outage, viral spike, cadence change, new blog post, AMA week, campaign).

## 2. How to fill it

### Where each metric comes from

| Metric | Source | How |
|---|---|---|
| Followers (start/end) | **LinkedIn page analytics** (Admin → Analytics → Follower count) / **X profile** (your follower count at the two timestamps) | Record the number at the exact timestamps; screenshot both for the archive. |
| Impressions, engagements | LinkedIn analytics (impressions, interactions) / X analytics (impressions, engagements per post) | Sum or average across the month as noted per column. |
| Avg engagement rate | Computed from the above | `engagements ÷ impressions × 100` |
| Site clicks (utm) | **GA4 → Reports → Acquisition → Traffic acquisition** (Sessions by source/medium) | Filter `session_source` = `li` (LinkedIn) or `x` (X). All social links must carry the utm param: `?src=li` for LinkedIn posts, `?src=x` for X posts (e.g. `https://visaindiaexpert.com/visa/e-1?src=x`). Sum the month's sessions. |
| Best post | LinkedIn analytics top posts / X analytics per-post engagement rate | Pick the highest engagement-rate post of the month; note hook + topic. |
| Posts published | Our content calendar / publishing tool | Count posts actually published (not planned). |

### Engagement-rate formula

```
engagement rate = engagements ÷ impressions × 100
```

- **LinkedIn:** "engagements" = interactions reported in page analytics (likes, comments, reposts, clicks). "Impressions" = impressions from the same analytics view.
- **X:** "engagements" = replies + retweets + likes + bookmarks (X analytics defines engagements this way per post). "Impressions" = post impressions.
- Report the **monthly average** (mean of per-post rates, or total engagements ÷ total impressions — pick one method and stay consistent; note the method in Notes for month 1).

### When to fill it

- **Last Monday of the month**, covering the just-finished month (e.g. Mon 2026-11-02 fills Oct 2026).
- Fill LinkedIn and X rows the same day; both dashboards are settled by then.
- If a metric can't be captured (e.g. analytics lag), mark it `n/a` in Notes rather than guessing — a wrong baseline poisons every future "net change."

### Baseline rule

The **Oct 2026 rows are the baseline month** (launch month). Every future "net change" should be compared against this trend, and any month with fewer than 4 weeks of cadence must be flagged in Notes.
