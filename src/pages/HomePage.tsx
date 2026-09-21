import React from 'react';
import { Hero } from '../sections/Hero';
import { Benefits } from '../sections/Benefits';
import { VisaGrid } from '../sections/VisaGrid';
import { HowItWorks } from '../sections/HowItWorks';
import { PaymentModel } from '../sections/PaymentModel';
import { FounderStory } from '../sections/FounderStory';
import { FAQ } from '../sections/FAQ';
import { FinalCTA } from '../sections/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <>
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
