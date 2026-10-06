// ─── Blog posts ──────────────────────────────────────────────
// Fact-dense, dated, keyword-targeted. Each post targets one
// primary keyword and links to the relevant visa page (internal
// linking, Step 9).

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  /** Short meta/OG title (<60 chars) for <title> and social cards. */
  metaTitle: string;
  description: string;
  /** ISO date. */
  date: string;
  readTime: string;
  excerpt: string;
  /** Primary keyword (for the tracking sheet). */
  primaryKeyword: string;
  sections: BlogSection[];
  /** Visa page to link to in the CTA. */
  relatedVisaId: string;
  relatedVisaLabel: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'india-tourist-visa-requirements',
    title: 'India Tourist Visa Requirements 2026: The Complete Checklist',
    metaTitle: 'India Tourist Visa Requirements 2026: Checklist',
    description:
      'Every document, photo spec and form field for the India tourist visa in 2026. Plus the four mistakes that cause the most rejections.',
    date: '2026-10-05',
    readTime: '6 min read',
    excerpt:
      'The India tourist visa (30–120 days, up to 90 days per entry) is the most applied-for Indian visa — and the most common first-time rejection. Here is the complete 2026 checklist.',
    primaryKeyword: 'india tourist visa requirements',
    relatedVisaId: 'tourist',
    relatedVisaLabel: 'Tourist Visa',
    sections: [
      {
        paragraphs: [
          'The Indian tourist visa allows short-term visits for tourism, leisure, sightseeing, and visiting friends or relatives. In 2026 the standard categories are a 30-day single-entry visa, a 30-day or 1-year multiple-entry visa, and a 5-year multiple-entry visa for eligible nationalities. Processing through the official online portal (Indian e-Visa or embassy application) typically takes 3–7 business days once a complete, correct file is submitted.',
          'Most tourist visa rejections are not caused by the applicant — they are caused by the file. This guide lists exactly what the mission checks, in the order it checks them.',
        ],
      },
      {
        heading: 'Passport: the rule that ends most files',
        paragraphs: [
          'Your passport must be valid for at least 6 months beyond your intended date of departure from India, and it must have at least 2 blank visa pages. A passport expiring in 5 months will be refused even if your travel dates fit comfortably inside the validity period. If your passport expires soon, renew it before applying — re-applying after a passport change means a new application and new fees.',
          'Also check the passport photo page: faded pages, water damage, or a torn page can trigger a refusal. If any page is damaged, renew the passport first.',
        ],
      },
      {
        heading: 'Photograph specifications',
        paragraphs: [
          'Indian missions require a recent passport-sized photograph: white background, frontal face, no glasses, neutral expression, head covering only for religious reasons (face fully visible). The digital upload must be a JPEG under 1 MB at 350×350 to 1000×1000 pixels. Photos with filters, selfies, or group photos are one of the top three rejection reasons we see.',
        ],
      },
      {
        heading: 'Travel dates and itinerary',
        paragraphs: [
          'Your visa validity must cover your full intended stay. If you book flights that exit India on day 95 but apply for a 30-day single-entry visa, the file is internally inconsistent — a fast track to refusal or a visa granted for the wrong period. Align: passport validity > visa validity > flight dates, in that order.',
          'A confirmed itinerary is strongly recommended. You do not need paid, non-refundable tickets — flight reservation confirmations are enough. Proof of accommodation (hotel bookings or a host letter for friend/relative visits) should match your travel dates exactly.',
        ],
      },
      {
        heading: 'Bank statements and financial proof',
        paragraphs: [
          'Most missions ask for bank statements for the last 3 months. The statement should show a stable, positive balance and regular income flow. Sudden large transfers with no source explanation can raise questions. If you are visiting family, a sponsor letter from your host in India stating they will support your stay is a strong addition.',
        ],
      },
      {
        heading: 'The four mistakes that cause most rejections',
        paragraphs: [
          '1. Wrong visa category — applying for a tourist visa when the real purpose is business, medical treatment, or work. Indian missions cross-check the stated purpose against your itinerary; inconsistencies are flagged.',
          '2. Passport validity under 6 months — instant rejection, no discretion.',
          '3. Inconsistent travel dates across forms — the application form, flight itinerary, and accommodation proof must all tell the same story.',
          '4. Photos not meeting embassy specs — the most common "fixable" rejection cause.',
          'Every one of these is checkable before you pay the government fee. A 30-minute pre-submission review of your file eliminates the vast majority of tourist visa rejections — which is exactly what our $199 kickoff service covers for the tourist visa.',
        ],
      },
    ],
  },
  {
    slug: 'india-visa-processing-times-2026',
    title: 'How Long Does an India Visa Take in 2026? Processing Times by Category',
    metaTitle: 'India Visa Processing Times 2026: How Long It Takes',
    description:
      'Realistic 2026 processing times for every India visa category — tourist, business, medical, E-1, B-1, spouse, student — and what slows each one down.',
    date: '2026-10-05',
    readTime: '7 min read',
    excerpt:
      'Every category has a different processing timeline, and the bottleneck is rarely the same. Here are realistic 2026 ranges and what you can control.',
    primaryKeyword: 'india visa processing time',
    relatedVisaId: 'tourist',
    relatedVisaLabel: 'Tourist Visa',
    sections: [
      {
        paragraphs: [
          '"How long does an India visa take?" is the most common question we receive — and the honest answer depends entirely on the visa category. A tourist visa and an E-1 treaty business visa go through completely different review paths, and their timelines differ by months, not days.',
          'Below are the realistic 2026 processing ranges based on current mission workloads and the document chains each category requires. "Processing time" here means from a complete, correct submission to visa issuance.',
        ],
      },
      {
        heading: 'Tourist visa: 3–7 business days',
        paragraphs: [
          'The fastest category. Electronic and standard tourist visas are processed in a few business days when the file is clean: valid passport, correct photos, consistent travel dates. Peak season (October–December, and around major religious festivals) can add a few days.',
        ],
      },
      {
        heading: 'Business visa: 1–3 weeks',
        paragraphs: [
          'Business visas (1–5 year multiple entry, up to 180 days per visit) take longer because the mission verifies the commercial relationship: the invitation letter from the Indian company, your employer letter, and proof of the relationship (contracts, invoices). Incomplete sponsor letters are the #1 cause of delays — the mission requests clarification and the clock resets.',
        ],
      },
      {
        heading: 'Medical visa: 3–10 business days',
        paragraphs: [
          'Medical visas are matched to the treatment period and allow up to 2 attendants per patient. The file needs a hospital letter or referral from an Indian hospital, plus proof of funds. Files with a clear hospital referral process quickly; files without a named hospital get additional scrutiny.',
        ],
      },
      {
        heading: 'E-1 (treaty/investor) visa: 4–12 weeks',
        paragraphs: [
          'The E-1 is not processed like a tourist visa. Before the visa application, the business side must be ready: the Indian entity or treaty-eligible structure, MCA (Ministry of Corporate Affairs) registrations, and often apostilled board resolutions and sponsor letters. Once the business documentation is complete, the visa itself typically processes within a few weeks. The 8-month delay our founder experienced was not the visa — it was the missing business documents.',
        ],
      },
      {
        heading: 'B-1 (employment) visa: 6–12 weeks',
        paragraphs: [
          'Employment visas require a signed contract, an employer letter, and salary documentation that meets the threshold for your nationality and role. After the visa is issued, FRRO registration in India (usually within 14 days of arrival) is a separate step with its own document list — missing it is a common post-arrival problem. B-1 timelines are dominated by employer-side document preparation, not mission speed.',
        ],
      },
      {
        heading: 'Spouse/dependent and student visas: 4–8 weeks',
        paragraphs: [
          'Dependent visas run as a parallel process to the primary visa — the marriage certificate (apostilled, and translated if needed) is the critical document. Student visas require the university admission letter, proof of funds, and a statement of purpose; university-side confirmations can add a couple of weeks.',
        ],
      },
      {
        heading: 'What you can control',
        paragraphs: [
          'In every category, the biggest delay factor is an incomplete first submission. Each clarification round adds days to weeks. A complete, consistent, correctly-categorised file submitted once is consistently faster than a good file submitted three times. If you are unsure which category you need — or your situation is a re-application after a rejection — the free case review is where to start.',
        ],
      },
    ],
  },
  {
    slug: 'e-1-vs-b-1-visa-india',
    title: 'E-1 vs B-1 Visa in India: Which One Do You Actually Need?',
    metaTitle: 'E-1 vs B-1 Visa in India: Which Do You Need?',
    description:
      'The E-1 and B-1 are the two big business visas for India — and picking the wrong one can cost you months. Here is how to tell them apart.',
    date: '2026-10-05',
    readTime: '8 min read',
    excerpt:
      'Both let a foreigner do business in India. Only one matches your legal structure. Choosing wrong means a restart — and sometimes a forced exit.',
    primaryKeyword: 'e-1 vs b-1 visa india',
    relatedVisaId: 'e-1',
    relatedVisaLabel: 'E-1 Visa',
    sections: [
      {
        paragraphs: [
          'If you are a foreigner planning to work with, invest in, or run a business in India, you will eventually face the E-1/B-1 question. They look similar from the outside — both are business-related, both are long-term, both require professional preparation. But they are fundamentally different categories with different legal bases, and applying on the wrong one is one of the most expensive mistakes in Indian immigration.',
          'Here is the difference, in plain terms.',
        ],
      },
      {
        heading: 'What the E-1 is for',
        paragraphs: [
          'The E-1 visa is for people who will establish or manage a business interest in India as principals — investors, founders, and directors of their own Indian entity (or treaty-eligible structure). The legal anchor is your ownership or management role: board seats, shareholding, MCA (Ministry of Corporate Affairs) registrations, sponsor letters from the Indian entity. If the business is yours, the E-1 is usually the right category.',
          'The E-1 file is documentation-heavy: apostilled board resolutions, MCA filings, and a sponsor letter that matches your actual role. Getting the business side right before the visa application is what separates a 4-week process from an 8-month one.',
        ],
      },
      {
        heading: 'What the B-1 is for',
        paragraphs: [
          'The B-1 employment visa is for people working in India under a contract with an Indian employer — the visa follows the employment relationship. The anchor documents are a signed employment contract, an employer letter, and salary documentation that meets the threshold for your nationality and role. If you are being hired (or transferred) by an Indian company, the B-1 is the category.',
          'A critical B-1 detail: after the visa, FRRO registration in India is required within 14 days of arrival, with its own document list. Employers who skip this step create post-arrival problems that are expensive to fix.',
        ],
      },
      {
        heading: 'The failure mode: applying in the wrong category',
        paragraphs: [
          'The classic scenario: a founder applies on a B-1 (or a business visa) because it looked simpler — then the FRRO determines the category was wrong for an owner/director, and the founder is told to exit India and restart with the correct category. That is exactly what happened to our founder: 8 months of wait, an FRRO exit order, and a forced restart with the correct category.',
          'The reverse failure is also real: an employee applying on an E-1 without a genuine ownership/management role. The mission checks the substance of the role, not the label.',
        ],
      },
      {
        heading: 'How to decide in 5 minutes',
        paragraphs: [
          'Ask three questions: (1) Who owns the Indian entity? If you do — or you will — E-1. (2) Who is your counterparty — your own company or a third-party employer? Your own company points to E-1; a third-party employer points to B-1. (3) What is your job title inside the entity? Director/founder/investor → E-1; employee → B-1.',
          'If the answers are mixed — for example, you are both an investor and a salaried director — the structure needs to be built so the visa matches reality, and that design decision should come first. This is the single most valuable conversation to have before spending any money on documents, and it is exactly what the free case review covers. Our E-1 and B-1 services both start at $499 kickoff, with the success fee due only after your application is successfully processed.',
        ],
      },
    ],
  },
  {
    slug: 'india-visa-rejection-reasons',
    title: '7 Reasons India Visas Get Rejected (and How to Fix Each One)',
    metaTitle: '7 Reasons India Visas Get Rejected (and Fixes)',
    description:
      'The seven rejection reasons behind most refused India visas — and the specific fix for each one, before you pay the fee again.',
    date: '2026-10-05',
    readTime: '7 min read',
    excerpt:
      'A rejection is not the end of the road — it is a diagnostic. Most refusals point at one specific, fixable problem in the file.',
    primaryKeyword: 'india visa rejection reasons',
    relatedVisaId: 'other',
    relatedVisaLabel: 'Free Case Review',
    sections: [
      {
        paragraphs: [
          'Indian visa rejections are specific — almost always traceable to one document, one inconsistency, or one wrong category. The good news: a rejection letter is a diagnostic, and in most cases the fix is clear once you know what you are looking at. Here are the seven rejection reasons we see most often, and the exact fix for each.',
        ],
      },
      {
        heading: '1. Wrong visa category',
        paragraphs: [
          'The stated purpose does not match the actual purpose of the trip — a business trip on a tourist visa, work on a business visa, investment on an employment visa. Missions cross-check the purpose field against the itinerary, employer letters, and (for business categories) the Indian counterparty. Fix: re-state the true purpose and apply in the matching category. For mixed situations (investor + employee), design the structure to match reality before applying.',
        ],
      },
      {
        heading: '2. Passport validity under 6 months',
        paragraphs: [
          'The most mechanical rejection: passport expires within 6 months of the intended departure. No discretion, no exceptions. Fix: renew the passport, then re-apply with the new passport. Any pages already stamped with the old application should not be a problem — the new passport is what matters.',
        ],
      },
      {
        heading: '3. Inconsistent dates or details across forms',
        paragraphs: [
          'The application form, flight itinerary, accommodation proof, and supporting letters must tell the same story. A one-day mismatch between the form and the hotel booking is enough to flag the file. Fix: build a single "master dates" sheet and verify every document against it before submission.',
        ],
      },
      {
        heading: '4. Photo specifications not met',
        paragraphs: [
          'Wrong background, glasses, filters, or an out-of-spec digital upload. Fix: new photo on white background, frontal, no glasses, uploaded at the required resolution. Cheap fix, high impact.',
        ],
      },
      {
        heading: '5. Missing or weak sponsor/invitation documents',
        paragraphs: [
          'Business and medical visas depend on a sponsor letter with the right details: company letterhead, company registration number, the inviter\'s role, your role, dates, and purpose. A letter missing the company registration number or the inviter\'s designation is the most common business-visa clarification trigger. Fix: rebuild the letter with the full detail set, and attach proof of the relationship (contracts, invoices, or the hospital referral).',
        ],
      },
      {
        heading: '6. Unexplained gaps in employment or funds',
        paragraphs: [
          'Bank statements with sudden large deposits, employment gaps without explanation, or salary documentation below the threshold for the category. Fix: source letters for large deposits, a gap explanation where relevant, and salary documentation that meets the category threshold for your nationality and role.',
        ],
      },
      {
        heading: '7. Previous overstays or violations in India',
        paragraphs: [
          'A prior overstay or FRRO violation is checked and can trigger refusal or additional scrutiny. This is the one reason that is not a simple document fix — it needs a case-specific strategy: a clear explanation, evidence of the correction, and sometimes a different entry point. This is the situation our "not sure which visa" case review is built for — re-applicants with complex histories get a free 15-minute review before any money is spent.',
        ],
      },
      {
        heading: 'After a rejection',
        paragraphs: [
          'Do not simply re-submit the same file. Re-applying with the same documents produces the same result. The sequence that works: read the rejection reason, fix the specific cause, verify the whole file against a category checklist, then re-apply. If the reason is unclear, a case review with someone who has read hundreds of these files is the fastest path back to a successful application.',
        ],
      },
    ],
  },
];
