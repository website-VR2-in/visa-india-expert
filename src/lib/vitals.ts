import { onINP, onCLS, onLCP, onTTFB } from 'web-vitals';
import { trackEvent } from './track';

/**
 * Field Core Web Vitals → GA4 (Step 9: real INP measurement, not just lab TBT).
 * Sends one `web_vital` event per metric (last value wins, per web-vitals
 * attribution rules). Target: INP < 100ms, LCP < 2.5s, CLS < 0.1.
 * Also reported to Vercel Analytics via @vercel/speed-insights.
 */
const send =
  (name: string) =>
  (m: { name: string; value: number; id: string }) => {
    trackEvent('web_vital', {
      vital_name: name,
      vital_value: Math.round(m.value * 100) / 100,
      vital_id: m.id,
    });
  };

export const reportVitals = (): void => {
  onINP(send('INP'));
  onCLS(send('CLS'));
  onLCP(send('LCP'));
  onTTFB(send('TTFB'));
};
