import React from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { HOME_SEO } from '../data/seo';
import { FAQ_DATA } from '../data/config';
import { Hero } from '../sections/Hero';
import { Benefits } from '../sections/Benefits';
import { VisaGrid } from '../sections/VisaGrid';
import { HowItWorks } from '../sections/HowItWorks';
import { PaymentModel } from '../sections/PaymentModel';
import { FounderStory } from '../sections/FounderStory';
import { FAQ } from '../sections/FAQ';
import { FinalCTA } from '../sections/FinalCTA';

export const HomePage: React.FC = () => {
  usePageMeta(HOME_SEO, '/');

  return (
    <>
      {/* JSON-LD: FAQPage (Step 9 structured data — matches the FAQ section below). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_DATA.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }),
        }}
      />
      <Hero />
      <Benefits />
      <VisaGrid />
      <HowItWorks />
      <PaymentModel />
      <FounderStory />
      <FAQ />
      <FinalCTA />
    </>
  );
};
