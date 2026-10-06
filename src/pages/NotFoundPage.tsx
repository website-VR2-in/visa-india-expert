import React from 'react';
import { Link } from 'react-router-dom';
import { VISA_OPTIONS, COMPANY } from '../data/config';
import { usePageMeta } from '../hooks/usePageMeta';
import { Header } from '../components/Header';
import { Footer } from '../sections/Footer';

/**
 * Branded 404 (Step 9 — technical): unknown routes render a real
 * "Page not found" page with useful links. Vercel serves this with a
 * genuine HTTP 404 status via the build-time 404.html copy.
 */
export const NotFoundPage: React.FC = () => {
  usePageMeta(
    {
      title: 'Page not found | Visa India Expert',
      description: 'This page does not exist. Browse our India visa services — tourist, business, E-1, B-1, spouse and student — or get in touch on WhatsApp.',
    },
    '/404',
    { noindex: true },
  );

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory">
        <section className="section">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center py-10">
              <div className="text-7xl md:text-8xl font-bold text-saffron-600 mb-4" aria-hidden="true">404</div>
              <h1 className="section-title text-navy-500 mb-4">Page not found</h1>
              <p className="text-warmgray-600 text-lg leading-relaxed mb-8">
                The page you are looking for does not exist — it may have been moved or the link is broken.
                You can start with one of our India visa services below, or contact us directly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
                <Link to="/" className="btn-primary">Back to home</Link>
                <a href="https://wa.me/639496491061?text=Hello%20Visa%20India%20Expert%2C%20I%20was%20looking%20for%20a%20page%20on%20your%20site%20that%20no%20longer%20loads." target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
                  WhatsApp us
                </a>
              </div>

              <h2 className="text-sm font-bold text-saffron-700 uppercase tracking-wide mb-4">Popular India visa services</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {VISA_OPTIONS.slice(0, 8).map((v) => (
                  <Link key={v.id} to={`/visa/${v.id}`} className="border border-navy-100 rounded-lg px-3 py-3 text-sm font-bold text-navy-500 hover:text-saffron-700 hover:border-saffron-400 transition-colors">
                    {v.label}
                  </Link>
                ))}
              </div>

              <p className="text-warmgray-600 text-sm mt-8">
                Questions about your application? Reach us at{' '}
                <a href={`mailto:${COMPANY.email}`} className="font-bold text-saffron-700 hover:text-saffron-600">{COMPANY.email}</a> or{' '}
                <a href="https://wa.me/639496491061?text=Hello%20Visa%20India%20Expert%2C%20I%20need%20help%20with%20my%20India%20visa." target="_blank" rel="noopener noreferrer" className="font-bold text-saffron-700 hover:text-saffron-600">WhatsApp</a>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
