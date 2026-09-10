import React from 'react';
import { Hero } from '../sections/Hero';
import { Benefits } from '../sections/Benefits';
import { VisaSelection } from '../sections/VisaSelection';
import { HowItWorks } from '../sections/HowItWorks';
import { Pricing } from '../sections/Pricing';
import { FounderStory } from '../sections/FounderStory';
import { ApplicationForm } from '../sections/ApplicationForm';
import { FAQ } from '../sections/FAQ';
import { FinalCTA } from '../sections/FinalCTA';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Benefits />
      <VisaSelection />
      <HowItWorks />
      <Pricing />
      <FounderStory />
      <ApplicationForm />
      <FAQ />
      <FinalCTA />
    </>
  );
};
