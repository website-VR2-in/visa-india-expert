// Authoritative pricing source for the server.
// Per-visa: kickoff fee (paid upfront) + success fee (paid after success).
// Keep in sync with VISA_OPTIONS in src/data/config.ts.
export const VISA_PRICES = {
  tourist: { kickoff: 199, success: 100 },
  business: { kickoff: 349, success: 150 },
  medical: { kickoff: 199, success: 100 },
  'e-1': { kickoff: 499, success: 200 },
  'b-1': { kickoff: 499, success: 200 },
  spouse: { kickoff: 349, success: 150 },
  student: { kickoff: 349, success: 150 },
  other: { kickoff: 199, success: 100 },
};

export function priceFor(visaType) {
  const p = VISA_PRICES[visaType] || VISA_PRICES.other;
  return {
    kickoff: p.kickoff,
    success: p.success,
    total: p.kickoff + p.success,
  };
}
