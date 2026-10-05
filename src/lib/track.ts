// ─── Analytics event tracking (GA4) ──────────────────────────
// Events are fired through gtag() when the GA4 tag is loaded
// (see the gtag snippet in index.html, G-XXXXXXXXXX), and through
// dataLayer as a fallback. No-op when analytics is not configured,
// so the app works identically in dev / offline.
//
// Conversion events (mark as conversion in GA4 Admin → Events):
//   application_submitted   — application form submitted
//   kickoff_payment_confirmed — kickoff fee confirmed on payment page

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: string, params?: Record<string, unknown>): void {
  try {
    if (typeof window === 'undefined') return;
    if (window.gtag) {
      window.gtag('event', event, params ?? {});
    } else if (window.dataLayer) {
      window.dataLayer.push({ event, ...params });
    }
  } catch {
    // analytics must never break the app
  }
}
