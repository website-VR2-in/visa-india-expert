#!/usr/bin/env bash
# verify-mail-dns.sh — one-shot verification of the Step 2 email DNS setup.
# Usage: bash scripts/verify-mail-dns.sh
# Exit 0 = all 5 record types present and correct; 1 = one or more missing/wrong.
# Values checked against docs/email-dns-setup.md (Google Workspace Business Starter).
set -u
DOMAIN="visaindiaexpert.com"
PASS=0; FAIL=0
ok()  { printf '  PASS: %s\n' "$1"; PASS=$((PASS+1)); }
bad() { printf '  FAIL: %s\n' "$1"; FAIL=$((FAIL+1)); }

echo "=== Step 2 email DNS verification — $DOMAIN ($(date -u '+%F %R')Z) ==="

TXT_AT=$(dig +short TXT "$DOMAIN" | tr -d '"' | tr '\n' ' ')

echo "[1/5] Google Workspace verification TXT"
if printf '%s' "$TXT_AT" | grep -q "google-site-verification="; then
  ok "google-site-verification TXT present at @"
else
  bad "no google-site-verification TXT at @ (add the value shown in the Workspace purchase flow)"
fi

echo "[2/5] MX records (expect the 5 Google targets)"
MX_GOT=$(dig +short MX "$DOMAIN" | awk '{print $2}' | sed 's/\.$//' | tr 'A-Z' 'a-z' | sort | tr '\n' ' ')
MX_WANT="aspmx.l.google.com brmx.l.google.com yrelmx.l.google.com ysmx.l.google.com ysmtpmx.l.google.com"
if [ -n "$MX_GOT" ] && [ "$MX_GOT" = "$MX_WANT" ]; then
  ok "all 5 Google MX targets present"
else
  bad "MX mismatch. got: [${MX_GOT:-<none>}] want: [$MX_WANT]"
fi

echo "[3/5] SPF"
if printf '%s' "$TXT_AT" | grep -q "v=spf1 include:_spf.google.com ~all"; then
  ok "SPF 'v=spf1 include:_spf.google.com ~all' present"
else
  bad "SPF missing or wrong at @ (want: v=spf1 include:_spf.google.com ~all)"
fi

echo "[4/5] DKIM (google._domainkey)"
DKIM=$(dig +short TXT "google._domainkey.$DOMAIN" | tr -d '"' | tr '\n' ' ')
if printf '%s' "$DKIM" | grep -q "k=rsa" && printf '%s' "$DKIM" | grep -q "p=MI"; then
  ok "DKIM google record present (k=rsa)"
else
  bad "DKIM google._domainkey missing (Google Admin → Apps → Gmail → Authenticate email → Generate DKIM key)"
fi

echo "[5/5] DMARC (_dmarc)"
DMARC=$(dig +short TXT "_dmarc.$DOMAIN" | tr -d '"' | tr '\n' ' ')
if printf '%s' "$DMARC" | grep -q "v=DMARC1" && printf '%s' "$DMARC" | grep -q "p=none"; then
  ok "DMARC 'v=DMARC1; p=none' present"
else
  bad "DMARC missing or wrong (want: v=DMARC1; p=none; rua=mailto:admin@$DOMAIN)"
fi

echo
echo "=== Result: $PASS/5 passed ==="
if [ "$FAIL" -gt 0 ]; then
  echo "Next: add the missing records per docs/email-dns-setup.md, wait for propagation (1–5 min), re-run."
  exit 1
fi
echo "All DNS records verified — next: send a test to tests@mail-tester.com (target score >= 9/10), see docs/email-dns-setup.md §7."
exit 0
