import React from 'react';
import { Link } from 'react-router-dom';
import { COMPANY } from '../data/config';
import { usePageMeta } from '../hooks/usePageMeta';
import {
  PRIVACY_SEO,
  TERMS_SEO,
  REFUND_SEO,
  DISCLAIMER_SEO,
  SITE_URL,
} from '../data/seo';
import { Header } from '../components/Header';
import { Footer } from '../sections/Footer';
import type { PageSeo } from '../data/seo';

export type LegalKind = 'privacy' | 'terms' | 'refund' | 'disclaimer';

interface Section {
  heading: string;
  body: string[];
  list?: string[];
}

const LEGAL: Record<
  LegalKind,
  { path: string; seo: PageSeo; title: string; intro: string; sections: Section[] }
> = {
  privacy: {
    path: '/privacy',
    seo: PRIVACY_SEO,
    title: 'Privacy Policy',
    intro:
      'This policy explains what data Visa India Expert collects when you use this website and our India visa assistance services, how it is stored, and your rights. We keep it deliberately simple: we collect only what is needed to prepare your visa file, we never sell data, and we never use tracking cookies.',
    sections: [
      {
        heading: 'What we collect',
        body: [
          'When you complete the application form we collect: your full name, email address, phone number (WhatsApp), country of residence, passport details (full name as printed, number, nationality, date of birth, expiry date), your visa category, and the case-specific details for that category — for example travel dates and destination for tourist visas, employer and company details for business and employment visas, or the sponsoring company and its registration details for E-1 cases.',
          'We also store the payment reference of your kickoff transfer (the Wise invoice number) so we can match your payment to your application.',
        ],
      },
      {
        heading: 'How it is stored',
        body: [
          'Application data is stored in a serverless key-value database (Upstash) that our backend service uses to manage invoices and application status. Data is transmitted only over HTTPS (TLS 1.2+). We do not store bank card numbers — payment is made by bank transfer to our Wise account and no card data ever touches our systems.',
          'Draft form entries are kept in your own browser (localStorage) until you submit; they never leave your device before submission.',
        ],
      },
      {
        heading: 'How it is used',
        body: [
          'Your data is used exclusively to: prepare and file your visa application, communicate with you about your case (WhatsApp, email, phone), generate and track your invoice, and respond to government queries about your file. We do not use your data for advertising, profiling, or any purpose unrelated to your application.',
        ],
        list: [
          'No third-party advertising or analytics cookies are used on this site.',
          'Your data is never sold, rented or shared with advertisers.',
          'We share your documents only with the Indian mission (embassy/consulate) processing your application, or with you, your sponsor or your employer where you have asked us to coordinate with them.',
        ],
      },
      {
        heading: 'Retention',
        body: [
          'We keep application records for the life of your case and for a reasonable period afterwards (up to 24 months) to handle follow-up questions, renewals or disputes. After that, data is deleted unless a legal obligation requires us to keep it.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You can ask us at any time what data we hold about you, request a correction, or request deletion of your data (subject to the retention rule above and any legal obligation). Contact us at the address below and we will respond within 30 days.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          `Questions about this policy or your data: ${COMPANY.email} · ${COMPANY.whatsapp} (WhatsApp) · ${COMPANY.phone}.`,
        ],
      },
    ],
  },
  terms: {
    path: '/terms',
    seo: TERMS_SEO,
    title: 'Terms & Conditions',
    intro:
      'These terms govern the use of this website and the India visa assistance services provided by Visa India Expert ("we", "us"). By submitting an application or paying a kickoff fee you agree to these terms. Please read them — especially the sections on fees, your responsibilities, and what we do not guarantee.',
    sections: [
      {
        heading: 'Scope of service',
        body: [
          'We are a private visa assistance service. For a fixed, published fee we prepare, review and file your India visa application and manage it through to a decision: category selection, document preparation (including apostilles and translations where required), sponsor and invitation letters, application filing, status tracking, and responses to clarification requests from the mission. Post-arrival FRRO registration guidance is included for E-1 and B-1 cases.',
          'We do not provide immigration legal representation in court or before tribunals, and we do not act as a power of attorney for any purpose other than your visa application.',
        ],
      },
      {
        heading: 'Fees & payment',
        body: [
          'Each service is priced as a kickoff fee plus a success fee, both published on the relevant visa page before you apply. The kickoff fee is due to start work and covers preparation and filing. The success fee is due only after your application has been successfully processed. Government visa fees (payable to the Indian government) are separate and are never collected by us.',
          'Payment is made by bank transfer to our Wise account; your invoice page shows the exact amount, reference and full bank details. Fees are in US dollars.',
        ],
        list: [
          'The kickoff fee is refundable within 48 hours of payment if no work has yet started on your file (see the Refund Policy).',
          'Once work has started (documents requested, drafts prepared, or filing begun) the kickoff fee is non-refundable.',
          'If your application is not successful you never owe the success fee.',
        ],
      },
      {
        heading: 'Your responsibilities',
        body: [
          'You must provide accurate, complete and timely information and documents. We rely on the details you give us — passport data, employment history, travel plans, sponsor details — and we are not responsible for delays or refusals caused by information that is wrong, outdated or withheld. You are responsible for any government fees you pay directly, and for keeping us informed of changes to your circumstances (new passport, changed employer, changed travel dates) as soon as they happen.',
        ],
      },
      {
        heading: 'What we do not guarantee',
        body: [
          'Visa approval is solely at the discretion of the Government of India. We prepare files to the mission\'s standards and respond to queries, but we cannot guarantee approval, and we do not represent that we can. Processing times are estimates — the mission controls the actual timeline. Any statement on this site about approval rates or processing times is a historical observation, not a promise.',
        ],
      },
      {
        heading: 'Liability',
        body: [
          'Our total liability for any claim relating to a service is limited to the kickoff fee you paid for that service. We are not liable for indirect or consequential losses (missed flights, lost business, visa-related losses suffered by third parties) even if we were told they might happen.',
        ],
      },
      {
        heading: 'Intellectual property & the website',
        body: [
          'Site content, branding and materials we prepare for you (letters, checklists, templates) belong to us; you receive a personal, non-transferable licence to use the documents prepared for your own application. You may not copy, resell or republish our materials for anyone else.',
        ],
      },
      {
        heading: 'Changes & governing law',
        body: [
          'We may update these terms as the service evolves; the version on this page at the time you apply applies to your case. These terms are governed by the laws of the Republic of the Philippines; disputes are subject to the exclusive jurisdiction of its courts. For anything urgent, contact us directly — we would rather resolve it over WhatsApp than in court.',
        ],
      },
    ],
  },
  refund: {
    path: '/refund',
    seo: REFUND_SEO,
    title: 'Refund Policy',
    intro:
      'Our pricing is kickoff fee + success fee, and our refund rules are built around that split. The short version: you can get the kickoff fee back within 48 hours if nothing has started; once work begins it is earned; and the success fee is only ever charged when your application succeeds.',
    sections: [
      {
        heading: 'Kickoff fee',
        body: [
          'The kickoff fee (from $199, depending on category) pays for preparation and filing of your application. It is fully refundable if you ask within 48 hours of payment and no work has yet started on your file. "No work started" means we have not sent your document checklist, drafted any documents, or begun filing.',
          'After 48 hours, or as soon as any work has started, the kickoff fee is non-refundable — the time spent preparing your file has been incurred. We will still complete your application and manage it to a decision.',
        ],
      },
      {
        heading: 'Success fee',
        body: [
          'The success fee (from $100, depending on category) becomes due only after your application has been successfully processed. If your application is refused, you do not pay the success fee — in that case the only amount you ever paid was the kickoff fee. If you stop working with us after a refusal, before starting a new application, no success fee is owed.',
        ],
      },
      {
        heading: 'Government fees',
        body: [
          'Government visa fees are paid by you directly to the Indian government and are never handled by us. They are non-refundable in all cases — if your visa is refused, the government does not refund its fee, and we cannot claim it back on your behalf.',
        ],
      },
      {
        heading: 'How refunds are processed',
        body: [
          'To request a refund, email us or message us on WhatsApp with your full name and invoice number. Approved refunds are returned by bank transfer (Wise) to the account the original payment came from, within 5 business days of approval. Refunds are subject to the 48-hour / no-work-started rule above and to our right to verify the payment details.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          `Refund questions: ${COMPANY.email} · ${COMPANY.whatsapp} (WhatsApp). We answer within one business day.`,
        ],
      },
    ],
  },
  disclaimer: {
    path: '/disclaimer',
    seo: DISCLAIMER_SEO,
    title: 'Visa Disclaimer',
    intro:
      'Read this before you apply. It states plainly what Visa India Expert is, what it is not, and where responsibility for a visa decision sits — with the Government of India, always.',
    sections: [
      {
        heading: 'We are not a government agency',
        body: [
          'Visa India Expert is a private, independent visa assistance service. We are not affiliated with, endorsed by or connected to the Government of India, the Ministry of External Affairs, any Indian embassy or consulate, or any Indian mission. Any resemblance to an official service is coincidental. All visa decisions — approval, refusal, conditions, validity — are made solely by the Indian government, at its sole discretion.',
        ],
      },
      {
        heading: 'No guarantee of approval',
        body: [
          'Our service is preparation and management: we make sure your file is complete, consistent and built to the mission\'s standards, and we respond to queries. That significantly improves your chances, but no private service can guarantee a visa. If anyone promises a "guaranteed approval" for an Indian visa, do not trust it.',
        ],
      },
      {
        heading: 'Processing times are estimates',
        body: [
          'Processing-time figures shown on this site (for example "3–7 business days" for tourist visas) are typical historical ranges, not commitments. The mission sets the actual timeline, and it can be longer or shorter depending on volume, documentation and whether the case is queried.',
        ],
      },
      {
        heading: 'Not legal advice',
        body: [
          'Nothing on this site — visa pages, blog posts, chat messages — is legal advice. For advice on legal residency, corporate structuring in India, or complex immigration history, consult a qualified Indian lawyer. Our blog is general information; check the relevant visa page and the official e-Visa India portal for the rules that apply to your case.',
        ],
      },
      {
        heading: 'Your responsibility to verify',
        body: [
          'Always verify requirements against the official Indian government portal (indianvisaonline.gov.in) before travelling. Requirements change; if our site and the official portal ever disagree, the official portal wins, and we will update the site.',
        ],
      },
      {
        heading: 'Limitation of liability',
        body: [
          'To the maximum extent permitted by law, Visa India Expert is not liable for losses arising from visa refusal, delay, or reliance on information on this site. Our financial liability for a service is limited to the fees paid for that service, as set out in the Terms & Conditions.',
        ],
      },
    ],
  },
};

export const LegalPage: React.FC<{ kind: LegalKind }> = ({ kind }) => {
  const doc = LEGAL[kind];
  usePageMeta(doc.seo, doc.path);

  return (
    <>
      <Header />
      <main>
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: `${doc.title} | Visa India Expert`,
              url: SITE_URL + doc.path,
              description: doc.seo.description,
              isPartOf: { '@type': 'WebSite', name: 'Visa India Expert', url: SITE_URL },
              publisher: { '@type': 'Organization', name: 'Visa India Expert', email: COMPANY.email, telephone: COMPANY.phone },
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
                <span>{doc.title}</span>
              </nav>
              <h1 className="section-title text-white mb-4">{doc.title}</h1>
              <p className="text-warmgray-200 text-lg leading-relaxed">{doc.intro}</p>
              <p className="text-warmgray-300 text-sm mt-4">Last updated: 6 October 2026</p>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto space-y-10">
              {doc.sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="text-2xl md:text-3xl font-bold text-navy-500 mb-3">{s.heading}</h2>
                  {s.body.map((p, i) => (
                    <p key={i} className="text-warmgray-600 leading-relaxed mb-3 last:mb-0">
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-3 space-y-2">
                      {s.list.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-warmgray-600 leading-relaxed">
                          <span className="text-indiangreen-500 mt-0.5 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Cross-links */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-navy-500 mb-3">Related</h2>
                <div className="flex flex-wrap gap-3">
                  {(['privacy', 'terms', 'refund', 'disclaimer'] as LegalKind[])
                    .filter((k) => k !== kind)
                    .map((k) => (
                      <Link key={k} to={LEGAL[k].path} className="text-sm font-bold text-saffron-700 hover:text-saffron-600 border border-navy-100 rounded-lg px-4 py-2 hover:border-saffron-400 transition-colors">
                        {LEGAL[k].title} →
                      </Link>
                    ))}
                  <Link to="/about" className="text-sm font-bold text-saffron-700 hover:text-saffron-600 border border-navy-100 rounded-lg px-4 py-2 hover:border-saffron-400 transition-colors">
                    About Us →
                  </Link>
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
