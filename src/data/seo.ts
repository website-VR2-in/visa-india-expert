// ─── Per-page SEO metadata (keyword research, applied) ───────
// Formula: title = "Primary Keyword — Brand" (< 60 chars, keyword first),
// description 150–160 chars with primary keyword + benefit + soft CTA.
// Primary keyword per page also drives the H1 (seo.h1).

export interface PageSeo {
  title: string;
  description: string;
  /** Keyword-rich H1 override for the page hero. */
  h1?: string;
  /** Primary + secondary keywords (for the tracking sheet). */
  keywords?: string[];
}

export const SITE_URL = 'https://visaindiaexpert.com';
export const SITE_NAME = 'Visa India Expert';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const HOME_SEO: PageSeo = {
  title: 'India Visa Assistance & Services | Visa India Expert',
  description:
    'Expert India visa assistance from application to approval. Tourist, business, E-1, B-1, spouse & student visas with transparent kickoff + success fees. Start today.',
  keywords: [
    'india visa assistance',
    'india visa consultant',
    'apply for india visa',
    'india visa services',
  ],
};

export const VISAS_SEO: Record<string, PageSeo> = {
  tourist: {
    title: 'India Tourist Visa — Expert Help | Visa India Expert',
    description:
      'Apply for an India tourist visa with expert end-to-end assistance. $199 kickoff + $100 success fee, 3–7 business day processing, and a dedicated consultant.',
    h1: 'India Tourist Visa',
    keywords: ['india tourist visa', 'india e-tourist visa', 'india visa for tourism', 'tourist visa to india requirements'],
  },
  business: {
    title: 'India Business Visa — Expert Help | Visa India Expert',
    description:
      'Get an India business visa with expert help. Meetings, conferences and investment trips covered. $349 kickoff + $150 success fee, 1–5 year multiple-entry options.',
    h1: 'India Business Visa',
    keywords: ['india business visa', 'india business visa requirements', 'business visa to india', 'india conference visa'],
  },
  medical: {
    title: 'India Medical Visa — Treatment Help | Visa India Expert',
    description:
      'Travel to India for medical treatment with a properly prepared medical visa. Hospital letters, proof of funds and attendant visas handled end to end.',
    h1: 'India Medical Visa',
    keywords: ['india medical visa', 'medical visa to india', 'india medical treatment visa', 'india visa for medical treatment'],
  },
  'e-1': {
    title: 'E-1 Visa India — Entrepreneur Visa | Visa India Expert',
    description:
      'Set up or run a business in India on the E-1 visa. MCA documents, apostilled resolutions, sponsor letters and FRRO registration handled by specialists.',
    h1: 'E-1 Visa for India',
    keywords: ['e-1 visa india', 'india e-1 visa', 'india entrepreneur visa', 'e-1 treaty investor visa india'],
  },
  'b-1': {
    title: 'B-1 Visa India — Employment Visa | Visa India Expert',
    description:
      'Work in India on a B-1 employment visa. Signed contracts, employer letters, salary thresholds and FRRO registration prepared by specialists. $499 kickoff.',
    h1: 'B-1 Employment Visa for India',
    keywords: ['b-1 visa india', 'india employment visa', 'india b-1 work visa', 'foreign worker visa india'],
  },
  spouse: {
    title: 'India Spouse Visa — Family Help | Visa India Expert',
    description:
      'Bring your spouse or dependent children to India. Apostilled marriage certificates, parallel processing and full document preparation by visa specialists.',
    h1: 'India Spouse & Dependent Visa',
    keywords: ['india spouse visa', 'india dependent visa', 'india fiancé visa', 'spouse visa for india'],
  },
  student: {
    title: 'India Student Visa — Study Help | Visa India Expert',
    description:
      'Apply for an India student visa with a clean, complete file. Admission letters, proof of funds and statement of purpose prepared by expert consultants.',
    h1: 'India Student Visa',
    keywords: ['india student visa', 'study in india visa', 'india university visa', 'student visa requirements india'],
  },
  other: {
    title: 'Right India Visa? Free Case Review | Visa India Expert',
    description:
      'Unsure which India visa category fits your situation? Get a free 15-minute case review. Re-applicants, journalism, research and complex histories welcome.',
    h1: 'India Visa — Not Sure Which Category?',
    keywords: ['which india visa do i need', 'india visa category', 'india visa consultation', 'india visa after rejection'],
  },
};

export const ABOUT_SEO: PageSeo = {
  title: 'About Visa India Expert — Who We Are',
  description:
    'Visa India Expert is a specialist India visa assistance service. One dedicated consultant, transparent kickoff + success pricing, and real-world experience with E-1 and B-1 cases.',
  keywords: ['about visa india expert', 'india visa service company'],
};

export const PRESS_SEO: PageSeo = {
  title: 'Visa India Expert — Press & Media Kit',
  description:
    'Facts, brand assets and contact details for journalists and partners. Visa India Expert: specialist India visa assistance with transparent kickoff + success pricing.',
  keywords: ['visa india expert press', 'visa india expert media kit'],
};

export const APPLY_SEO: PageSeo = {
  title: 'Apply for an India Visa — Start Your Application',
  description:
    'Start your India visa application in minutes. Tell us about your trip or project, review the fixed kickoff + success fee, and get a dedicated consultant assigned.',
  keywords: ['apply for india visa online', 'start india visa application', 'india visa application form'],
};

export const PRIVACY_SEO: PageSeo = {
  title: 'Privacy Policy | Visa India Expert',
  description:
    'How Visa India Expert collects, stores and uses your application data. No cookies, no data sales — your documents are used only to prepare your India visa file.',
  keywords: ['visa india expert privacy policy', 'visa application data privacy'],
};

export const TERMS_SEO: PageSeo = {
  title: 'Terms & Conditions | Visa India Expert',
  description:
    'The terms that govern India visa assistance services by Visa India Expert: scope of service, fees, payment, client responsibilities and liability limits.',
  keywords: ['visa india expert terms', 'visa service terms and conditions'],
};

export const REFUND_SEO: PageSeo = {
  title: 'Refund Policy | Visa India Expert',
  description:
    'Clear refund rules for Visa India Expert services: 48-hour kickoff refund before work starts, success fee due only on success, government fees non-refundable.',
  keywords: ['visa india expert refund policy', 'visa service refund'],
};

export const DISCLAIMER_SEO: PageSeo = {
  title: 'Visa Disclaimer | Visa India Expert',
  description:
    'Visa India Expert is a private assistance service, not a government agency. Visa approval is solely at the discretion of the Government of India. Read the full disclaimer.',
  keywords: ['india visa service disclaimer', 'visa assistance disclaimer'],
};
