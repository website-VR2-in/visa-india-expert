import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY, VISA_OPTIONS } from '../data/config';
import { usePageMeta } from '../hooks/usePageMeta';
import { PRESS_SEO, SITE_URL, OG_IMAGE } from '../data/seo';
import { Header } from '../components/Header';
import { Footer } from '../sections/Footer';

/**
 * Press & Media Kit page (Step 10 pro tip): external citations,
 * brand facts and a journalist contact point.
 */
export const PressPage: React.FC = () => {
  usePageMeta(PRESS_SEO, '/press');

  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              name: 'Visa India Expert — Press & Media Kit',
              url: `${SITE_URL}/press`,
            }),
          }}
        />

        <section className="bg-navy-500 text-white">
          <div className="container-custom section">
            <div className="max-w-3xl mx-auto">
              <nav aria-label="Breadcrumb" className="text-warmgray-300 text-sm mb-6">
                <Link to="/" className="hover:text-saffron-400">Home</Link>
                <span className="mx-2">/</span>
                <span>Press</span>
              </nav>
              <h1 className="section-title text-white mb-4">Press & Media Kit</h1>
              <p className="text-warmgray-200 text-lg leading-relaxed">
                Facts, brand assets and contact details for journalists, researchers and partners writing about India visas,
                immigration services, or cross-border business setup.
              </p>
            </div>
          </div>
        </section>

        <section className="section bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto space-y-10">
              <div>
                <h2 className="section-title text-navy-500 mb-4">Company at a glance</h2>
                <dl className="grid sm:grid-cols-2 gap-4">
                  {[
                    ['Company', 'Visa India Expert'],
                    ['Founded', '2026'],
                    ['Focus', 'Indian visas only — specialist service, not a generalist agency'],
                    ['Categories served', `${VISA_OPTIONS.length} visa categories: tourist, business, medical, E-1, B-1, spouse/dependent, student, and complex case review`],
                    ['Pricing model', 'Published kickoff + success fees, quoted before any work begins'],
                    ['Support', 'Dedicated consultant per case, WhatsApp-first communication'],
                    ['Website', 'visaindiaexpert.com'],
                    ['Press contact', COMPANY.email],
                  ].map(([k, v]) => (
                    <div key={k} className="border border-navy-100 rounded-lg p-4">
                      <dt className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-1">{k}</dt>
                      <dd className="text-warmgray-700 text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h2 className="section-title text-navy-500 mb-4">About the service</h2>
                <p className="text-warmgray-600 leading-relaxed mb-4">
                  Visa India Expert assists applicants worldwide with Indian visa applications across eight categories, from preparation and
                  document verification through filing and post-submission tracking. The service is built on the founder\'s direct experience
                  processing an E-1 visa case in India — including a rejection, an FRRO exit order, and the successful restart on the correct
                  category — and is structured so that applicants know the total cost before committing.
                </p>
                <p className="text-warmgray-600 leading-relaxed">
                  Visa India Expert is a private assistance service, not a government agency. Visa approval decisions are made solely by Indian
                  missions and immigration authorities.
                </p>
              </div>

              <div>
                <h2 className="section-title text-navy-500 mb-4">Brand assets</h2>
                <ul className="space-y-2 text-warmgray-600">
                  <li>
                    · Brand image (1200×630, for articles and social):{' '}
                    <a href={OG_IMAGE} target="_blank" rel="noopener noreferrer" className="text-navy-500 font-semibold underline">
                      visaindiaexpert.com/og-image.png
                    </a>
                  </li>
                  <li>· Brand colours: navy #1A2332, saffron #D4762C, ivory #FBF7F0</li>
                  <li>· Tagline: "Your India visa, made simple."</li>
                </ul>
              </div>

              <div>
                <h2 className="section-title text-navy-500 mb-4">Speaking & interviews</h2>
                <p className="text-warmgray-600 leading-relaxed">
                  For interviews, fact-checking or expert commentary on India visa topics (processing times, rejection causes, E-1/B-1
                  differences, business setup for foreign nationals), contact{' '}
                  <a href={`mailto:${COMPANY.email}`} className="text-navy-500 font-semibold hover:text-saffron-600">{COMPANY.email}</a> —
                  responses within one business day.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
