import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY, VISA_OPTIONS } from '../data/config';
import { usePageMeta } from '../hooks/usePageMeta';
import { ABOUT_SEO, SITE_URL } from '../data/seo';
import { Header } from '../components/Header';
import { Footer } from '../sections/Footer';

/**
 * Fact-dense About page (Step 10 — AI search readiness):
 * who we are, what we do, where we operate, who we serve,
 * how pricing works, and the real experience behind the service.
 */
export const AboutPage: React.FC = () => {
  usePageMeta(ABOUT_SEO, '/about');

  return (
    <>
      <Header />
      <main>
        {/* JSON-LD: AboutPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              name: 'About Visa India Expert',
              url: `${SITE_URL}/about`,
              mainEntity: {
                '@type': 'Organization',
                name: 'Visa India Expert',
                url: SITE_URL,
                email: COMPANY.email,
                telephone: COMPANY.phone,
                description: 'Specialist India visa assistance service. One dedicated consultant per case, transparent kickoff + success fee pricing, WhatsApp support.',
                foundingDate: '2026',
                areaServed: 'IN',
                knowsAbout: VISA_OPTIONS.map((v) => `India ${v.label} assistance`),
              },
            }),
          }}
        />

        {/* Hero */}
        <section className="bg-navy-500 text-white">
          <div className="container-custom section">
            <div className="max-w-3xl mx-auto">
              <nav aria-label="Breadcrumb" className="text-warmgray-300 text-sm mb-6">
                <Link to="/" className="hover:text-saffron-400">Home</Link>
                <span className="mx-2">/</span>
                <span>About</span>
              </nav>
              <h1 className="section-title text-white mb-4">About Visa India Expert</h1>
              <p className="text-warmgray-200 text-lg leading-relaxed">
                Visa India Expert is a specialist <a href="https://visaindiaexpert.com" className="underline decoration-saffron-500">India visa assistance service</a> — an India visa service company focused on one thing: preparing, reviewing and managing
                India visa applications from start to approval, with one dedicated consultant per case and pricing you can verify before you commit.
              </p>
            </div>
          </div>
        </section>

        {/* Facts */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto space-y-10">
              <div>
                <h2 className="section-title text-navy-500 mb-4">Who we are</h2>
                <p className="text-warmgray-600 leading-relaxed">
                  Visa India Expert is a private visa assistance service specialising exclusively in Indian visas. We are not a government agency,
                  not an embassy, and not a travel agency — we are the people who prepare your file, know what the mission checks, and keep it
                  moving until it is resolved. Our lead consultant has personally processed an E-1 visa case in India — including the
                  rejection, the FRRO exit order, and the successful restart — and built this service around the lessons of that experience.
                </p>
              </div>

              <div>
                <h2 className="section-title text-navy-500 mb-4">What we do</h2>
                <p className="text-warmgray-600 leading-relaxed mb-4">
                  For every case, the service covers:
                </p>
                <ul className="space-y-3">
                  {[
                    'Category selection — which visa category matches your actual situation (the #1 cause of rejections when it is wrong)',
                    'Document preparation — every document built to the mission\'s exact specifications, including apostilles and translations',
                    'Sponsor & invitation letters — with the detail set that avoids clarification rounds',
                    'Application filing — completed, checked and submitted, with consistency verified across every document',
                    'Status tracking — we follow the file after submission and respond to any clarification requests',
                    'Post-arrival steps where applicable — FRRO registration guidance for E-1 and B-1 holders',
                    'WhatsApp support throughout — a real consultant answers, not a ticket queue',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-warmgray-600">
                      <span className="text-indiangreen-500 mt-0.5 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="section-title text-navy-500 mb-4">Who we serve</h2>
                <p className="text-warmgray-600 leading-relaxed mb-4">
                  We work with applicants worldwide — travellers, business people and families — on the following India visa categories:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {VISA_OPTIONS.map((v) => (
                    <Link key={v.id} to={`/visa/${v.id}`} className="flex items-center gap-2 border border-navy-100 rounded-lg px-4 py-3 hover:border-saffron-400 transition-colors text-warmgray-700">
                      <span>{v.icon}</span>
                      <span className="font-semibold text-sm">{v.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="section-title text-navy-500 mb-4">How pricing works</h2>
                <p className="text-warmgray-600 leading-relaxed">
                  Every service is priced as a <strong>kickoff fee + success fee</strong>, both published on the website before you apply — never
                  quoted privately. The kickoff fee covers the full preparation and filing of your application; the success fee is due only after
                  your application is successfully processed. You always know the total cost before you commit, and you never pay the success
                  fee unless the work succeeds.
                </p>
              </div>

              <div>
                <h2 className="section-title text-navy-500 mb-4">Where we operate</h2>
                <p className="text-warmgray-600 leading-relaxed">
                  Visa India Expert operates online worldwide. Applications are prepared and filed remotely; payments are handled through
                  Wise (international transfer) or in person; and all communication happens over WhatsApp and email. We are based in the
                  Philippines and work with Indian missions and Indian companies globally.
                </p>
              </div>

              <div>
                <h2 className="section-title text-navy-500 mb-4">Contact</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="border border-navy-100 rounded-lg p-4">
                    <div className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-1">Email</div>
                    <a href={`mailto:${COMPANY.email}`} className="text-navy-500 font-semibold hover:text-saffron-600 break-all">{COMPANY.email}</a>
                  </div>
                  <div className="border border-navy-100 rounded-lg p-4">
                    <div className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-1">WhatsApp</div>
                    <a href={COMPANY.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-navy-500 font-semibold hover:text-saffron-600">{COMPANY.whatsapp}</a>
                  </div>
                  <div className="border border-navy-100 rounded-lg p-4">
                    <div className="text-xs font-bold text-saffron-600 uppercase tracking-wide mb-1">Phone</div>
                    <a href={`tel:${COMPANY.phone}`} className="text-navy-500 font-semibold hover:text-saffron-600">{COMPANY.phone}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
