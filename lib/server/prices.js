// ─── Server-side price list (USD) ────────────────────────────
// SOURCE OF TRUTH for invoice amounts: the server always computes
// amounts from this list and ignores any `amount` sent by the client.
//
// ⚠️ Keep in sync with VISA_OPTIONS in src/data/config.ts.

export const VISA_PRICES = {
  tourist: 199,
  business: 249,
  medical: 229,
  'e-1': 399,
  'b-1': 399,
  spouse: 349,
  student: 229,
  other: 199,
};

export const CURRENCY = 'USD';
export const ADVANCE_PERCENT = 0.7;
export const BALANCE_PERCENT = 0.3;

const round2 = (n) => Math.round(n * 100) / 100;

/** 70/30 split of a total (advance is rounded to 2dp; balance is the exact remainder). */
export function splitPayment(total) {
  const advance = round2(total * ADVANCE_PERCENT);
  return { advance, balance: round2(total - advance) };
}

export function priceFor(visaType) {
  return Object.prototype.hasOwnProperty.call(VISA_PRICES, visaType) ? VISA_PRICES[visaType] : null;
}
