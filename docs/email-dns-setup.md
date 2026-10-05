# Step 2 — Email / DNS Setup (visaindiaexpert.com)

Status audit (2026-10-05): domain DNS is on **Spaceship** (`launch1/launch2.spaceship.net`),
A record already points to Vercel (site + TLS working). **No MX / SPF / DKIM / DMARC
records exist yet** — no Google Workspace purchased yet.

## 1. Buy Google Workspace Business Starter

1. Go to https://workspace.google.com/intl/en/business/starter
2. Price: ~$7/user/month (billed annually) or $9 monthly. 1 user is all we need (~€7–9 + VAT/month).
3. Choose **"I already have a domain"** → enter `visaindiaexpert.com`.
4. Google will show a **domain verification TXT record**:
   - Host/name: `@` (or leave blank)
   - Value: `google-site-verification=XXXXXXXXXXXXXXXX` (Google generates this)
5. Add it in **Spaceship**: customer area → your domain → **DNS records** → add TXT.
6. Back in Google's flow, click **Verify**. Takes 1–5 minutes.

> DNS management for this domain lives in the **Spaceship customer area**, not Cloudflare.

## 2. MX records (after verification)

Google's standard 5 MX records. Add all five in Spaceship DNS (type MX),
**replacing any existing MX records** (there are currently none):

| Priority | MX target |
|---|---|
| 1 | `ASPMX.L.GOOGLE.COM` |
| 5 | `BRMX.L.GOOGLE.COM` |
| 5 | `YSMTPMX.L.GOOGLE.COM` |
| 10 | `YSMX.L.GOOGLE.COM` |
| 10 | `YRELMX.L.GOOGLE.COM` |

Spaceship MX record format: name `@`, target as above (Spaceship appends the trailing dot).

## 3. SPF (TXT record)

| Name | Type | Value |
|---|---|---|
| `@` | TXT | `v=spf1 include:_spf.google.com ~all` |

## 4. DKIM (after purchase)

1. Google Admin console → **Apps → Gmail → Authenticate email**.
2. Click **Generate DKIM key** (default selector `google`).
3. Copy the TXT record Google shows (name looks like `google._domainkey`), add it in Spaceship DNS.
4. Back in Google Admin, click **Start Authentication**. It can take up to 48 h to show "authenticated", usually ~30 min.

## 5. DMARC (TXT record)

| Name | Type | Value |
|---|---|---|
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:admin@visaindiaexpert.com` |

(`p=none` = monitor only. After ~2 weeks of clean reports, upgrade to `p=quarantine`.)

## 6. Email aliases

Once your main user (e.g. `admin@visaindiaexpert.com`) exists:

1. Google Admin → **Users** → select the user → **More actions (⋮) → Add alias**.
2. Add these aliases, each pointing to the same main inbox:
   - `hello@visaindiaexpert.com`
   - `contact@visaindiaexpert.com`
   - `support@visaindiaexpert.com`
   - `noreply@visaindiaexpert.com`
3. The main address also works for sending as any alias (Gmail → Settings → Send as).

## 7. Deliverability test

1. From `hello@visaindiaexpert.com` (or the main address), send a short email to `tests@mail-tester.com`.
2. Reply from mail-tester contains a score + report link. **Target: ≥ 9/10.**
3. If score < 9: the usual culprits are missing SPF/DMARC or a PTR record — MXToolbox
   (https://mxtoolbox.com/spf.aspx) and DMARC Analyzer (https://dmarcanalyzer.org) show exactly which check failed.

## Verification checklist (run after each change)

```bash
dig +short MX visaindiaexpert.com        # → 5 Google MX hosts
dig +short TXT visaindiaexpert.com       # → google-site-verification + v=spf1
dig +short TXT _dmarc.visaindiaexpert.com # → v=DMARC1; p=none; ...
dig +short TXT google._domainkey.visaindiaexpert.com  # → k=rsa... (DKIM)
```
