// ─── Blog posts ──────────────────────────────────────────────
// Fact-dense, dated, keyword-targeted. Each post targets one
// primary keyword and links to the relevant visa page (internal
// linking, Step 9).

import { NEW_BLOG_POSTS } from './blog-new';

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
  /** Hub-and-spoke cluster (related-posts grouping on the blog). */
  cluster: string;
}

const LEGACY_BLOG_POSTS: BlogPost[] = [
  {
    slug: 'india-tourist-visa-requirements',
    title: 'India Tourist Visa Requirements 2026: The Complete Checklist',
    metaTitle: 'India Tourist Visa Requirements 2026: Checklist',
    description:
      'Every document, photo spec and form field for the India tourist visa in 2026 — the complete checklist, plus the four mistakes that cause the most rejections.',
    date: '2026-10-05',
    readTime: '6 min read',
    excerpt:
      'The India tourist visa (30–120 days, up to 90 days per entry) is the most applied-for Indian visa — and the most common first-time rejection. Here is the complete 2026 checklist.',
    primaryKeyword: 'india tourist visa requirements',
    relatedVisaId: 'tourist',
    relatedVisaLabel: 'Tourist Visa',
    cluster: 'tourist',
    sections: [
      {
        paragraphs: [
          'The [Indian tourist visa](/visa/tourist) allows short-term visits for tourism, leisure, sightseeing, and visiting friends or relatives. In 2026 the standard categories are a 30-day single-entry visa, a 30-day or 1-year multiple-entry visa, and a 5-year multiple-entry visa for eligible nationalities. Processing through the official online portal (Indian e-Visa or embassy application) typically takes 3–7 business days once a complete, correct file is submitted.',
          'Most tourist visa rejections are not caused by the applicant — they are caused by the file. This guide lists exactly what the mission checks, in the order it checks them.',
        ],
      },
      {
        heading: 'Choosing the right tourist visa: 30-day, 1-year or 5-year',
        paragraphs: [
          'In 2026 the tourist e-Visa comes in three main options, per the Government of India\'s e-Visa portal: a 30-day single-entry visa, a 1-year multiple-entry visa, and a 5-year multiple-entry visa for eligible nationalities. The 1-year and 5-year options both allow multiple entries, so a single visa can cover several shorter trips over its validity period. A common first-time mistake is applying for the shortest option, then discovering that the itinerary — or a change of plans — needs more.',
          'Choose the category before you start the form, not after. If your plan includes more than one trip within a year, the 1-year multiple-entry option is usually the better fit; frequent travelers with an ongoing connection to India are the typical 5-year cases. Whichever option you choose, a complete and correct file typically processes in 3–7 business days — the category itself does not slow the review.',
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
        heading: 'Submitting online: what the portal checks first',
        paragraphs: [
          'Most tourist applications are filed online through the official portal (indianvisaonline.gov.in). The form captures your personal details, travel dates, and the address of your stay in India, and it asks for a digital photograph at the point of upload, not at final submission. That is why the photo specification is a hard gate: the upload must be a JPEG under 1 MB at 350×350 to 1000×1000 pixels on a white background, and an out-of-spec photo is rejected before a reviewer ever reads the rest of the file.',
          'After you pay the government fee, the file moves into review and you can track the application status on the portal. You will usually receive the decision — and, if approved, the visa itself — by email within the 3–7 business day window for a complete file. If the mission requests anything, the email states what is missing, and at that point the review clock effectively restarts. That is why the pre-submission checklist matters more than the submission itself: the goal is for the clock to start only once.',
        ],
      },
      {
        heading: 'The four mistakes that cause most rejections',
        paragraphs: [
          '1. Wrong visa category — applying for a tourist visa when the real purpose is business, medical treatment, or work. Indian missions cross-check the stated purpose against your itinerary; inconsistencies are flagged.',
          '2. Passport validity under 6 months — instant rejection, no discretion.',
          '3. Inconsistent travel dates across forms — the application form, flight itinerary, and accommodation proof must all tell the same story.',
          '4. Photos not meeting embassy specs — the most common "fixable" rejection cause.',
          'Every one of these is checkable before you pay the government fee. A 30-minute pre-submission review of your file eliminates the vast majority of tourist visa rejections — which is exactly what our [$199 kickoff service](/apply/tourist) covers for the tourist visa.',
        ],
      },
      {
        heading: 'How we help with the tourist visa',
        paragraphs: [
          'Every tourist case is handled by one dedicated consultant from kickoff to approval — no handoffs, no re-explaining. The service runs on a fixed, transparent price: a $199 kickoff fee plus a $100 success fee that is due only after your application is successfully processed, with government visa fees separate and paid directly to the Indian government. While you prepare your documents, WhatsApp support at +63 949 649 1061 is available for quick checks on your file before you pay the government fee.',
          'Before you apply, two related guides are worth reading: [how long each India visa category takes in 2026](/blog/india-visa-processing-times-2026) so you can plan your travel dates against a realistic timeline, and [the seven most common India visa rejection reasons](/blog/india-visa-rejection-reasons) so you can rule out the usual causes on your first pass.',
        ],
      },
    ],
  },
  {
    slug: 'india-visa-processing-times-2026',
    title: 'How Long Does an India Visa Take in 2026? Processing Times by Category',
    metaTitle: 'India Visa Processing Times 2026: How Long It Takes',
    description:
      'Realistic 2026 processing times for every India visa category — tourist, business, medical, E-1, B-1, spouse, student — and exactly what slows each one down.',
    date: '2026-10-05',
    readTime: '7 min read',
    excerpt:
      'Every category has a different processing timeline, and the bottleneck is rarely the same. Here are realistic 2026 ranges and what you can control.',
    primaryKeyword: 'india visa processing time',
    relatedVisaId: 'tourist',
    relatedVisaLabel: 'Tourist Visa',
    cluster: 'general',
    sections: [
      {
        paragraphs: [
          '"How long does an India visa take?" is the most common question we receive — and the honest answer depends entirely on the visa category. A [tourist visa](/visa/tourist) and an [E-1 treaty business visa](/visa/e-1) go through completely different review paths, and their timelines differ by months, not days.',
          'Below are the realistic 2026 processing ranges based on current mission workloads and the document chains each category requires. "Processing time" here means from a complete, correct submission to visa issuance.',
        ],
      },
      {
        heading: 'What "processing time" does and does not include',
        paragraphs: [
          'The ranges in this guide start at one moment only: the day a complete, correct file sits with the mission. They do not include the time you spend gathering documents, waiting for an apostille or a certified translation, or drafting a sponsor letter with the right details. A B-1 applicant who underestimates employer-side document preparation will look, from the outside, as if the visa took three months — when the mission itself may have moved within four weeks. Always separate your preparation timeline from the mission\'s processing timeline before you set expectations.',
          'The published ranges also exclude what happens after the visa is issued. For the long-stay categories — the E-1 and the B-1 — FRRO registration in India is a separate step that happens after arrival, typically completed within 14 days of arrival for long-stay categories per FRRO guidelines. Plan for it as its own task with its own document list, and treat it as part of your overall India timeline rather than as part of the visa timeline.',
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
        heading: 'What slows the clock down',
        paragraphs: [
          'Across every category, three factors add days or weeks to the baseline range. First, clarification rounds: each document the mission requests restarts the review, so a file that needs two rounds can take roughly twice as long as a clean one — this is why the [free case review](/apply) and the category checklists exist. Second, seasonality: October through December and the major religious festival periods carry higher mission workloads, and the extra days show up wherever the queue is busy, not just in the [tourist visa](/visa/tourist). Third, the route you file on: some applicants use the e-Visa portal, others apply through the embassy, and the right route depends on your nationality and category — [the e-Visa vs embassy guide](/blog/india-e-visa-vs-embassy-visa) walks through that choice.',
          'Dependent files behave differently in one useful way: a spouse or dependent visa is processed in parallel with the primary applicant\'s visa, not queued behind it. If your family is applying together, the parallel track is what keeps the whole family\'s timeline from stretching — the dependent file moves on its own schedule while the primary file is under review, so the family\'s combined timeline is usually close to the primary applicant\'s rather than the sum of both.',
        ],
      },
      {
        heading: 'What you can control',
        paragraphs: [
          'In every category, the biggest delay factor is an incomplete first submission. Each clarification round adds days to weeks. A complete, consistent, correctly-categorised file submitted once is consistently faster than a good file submitted three times. If you are unsure which category you need — or your situation is a re-application after a rejection — the [free case review](/apply) is where to start.',
        ],
      },
      {
        heading: 'Planning your timeline with a consultant',
        paragraphs: [
          'If your dates are fixed — a wedding, a treatment start, an employment start date — work backwards from that date using the category range above, and build in a full buffer week for a possible clarification round. Every case is handled by one dedicated consultant from kickoff to approval, and you can reach your consultant directly on WhatsApp at +63 949 649 1061 for a realistic timeline based on your nationality, your category, and the current state of your documents.',
          'Two related guides are worth reading before you start: [the complete India tourist visa requirements checklist](/blog/india-tourist-visa-requirements) if you are in the fastest category, and [the E-1 vs B-1 breakdown](/blog/e-1-vs-b-1-visa-india) if you are choosing between the two long-stay business categories — that choice is the biggest timeline variable in Indian business immigration.',
        ],
      },
    ],
  },
  {
    slug: 'e-1-vs-b-1-visa-india',
    title: 'E-1 vs B-1 Visa in India: Which One Do You Actually Need?',
    metaTitle: 'E-1 vs B-1 Visa in India: Which Do You Need?',
    description:
      'The E-1 and B-1 are the two big business visas for India — picking the wrong one can cost you months. Here is exactly how to tell them apart and choose right.',
    date: '2026-10-05',
    readTime: '8 min read',
    excerpt:
      'Both let a foreigner do business in India. Only one matches your legal structure. Choosing wrong means a restart — and sometimes a forced exit.',
    primaryKeyword: 'e-1 vs b-1 visa india',
    relatedVisaId: 'e-1',
    relatedVisaLabel: 'E-1 Visa',
    cluster: 'business',
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
          'The [E-1 visa](/visa/e-1) is for people who will establish or manage a business interest in India as principals — investors, founders, and directors of their own Indian entity (or treaty-eligible structure). The legal anchor is your ownership or management role: board seats, shareholding, MCA (Ministry of Corporate Affairs) registrations, sponsor letters from the Indian entity. If the business is yours, the E-1 is usually the right category.',
          'The E-1 file is documentation-heavy: apostilled board resolutions, MCA filings, and a sponsor letter that matches your actual role. Getting the business side right before the visa application is what separates a 4-week process from an 8-month one.',
        ],
      },
      {
        heading: 'What the B-1 is for',
        paragraphs: [
          'The [B-1 employment visa](/visa/b-1) is for people working in India under a contract with an Indian employer — the visa follows the employment relationship. The anchor documents are a signed employment contract, an employer letter, and salary documentation that meets the threshold for your nationality and role. If you are being hired (or transferred) by an Indian company, the B-1 is the category.',
          'A critical B-1 detail: after the visa, FRRO registration in India is required within 14 days of arrival, with its own document list. Employers who skip this step create post-arrival problems that are expensive to fix.',
        ],
      },
      {
        heading: 'FRRO registration: the step both categories share',
        paragraphs: [
          'Whatever the category, one step is shared and non-negotiable: registration with the FRRO (Foreigners Regional Registration Office) in India after arrival. Both E-1 and B-1 holders must complete FRRO registration once in India, and per FRRO guidelines the registration is typically completed within 14 days of arrival for long-stay categories. It has its own document list — the visa itself, the passport, photographs, and category-specific supporting documents — and a missed or botched registration creates exactly the post-arrival problems that are far more expensive to fix than doing the step properly in the first two weeks.',
          'Treating FRRO registration like a tourist entry is the classic long-stay mistake: the registration form asks about the purpose and duration of your stay, and those answers must match the category you entered on. A mismatch at the FRRO is how a founder ends up in the exit-and-restart scenario described below — which is why the registration step should be planned before you book the flight, not after you land.',
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
        heading: 'Side by side: E-1 and B-1 at a glance',
        paragraphs: [
          'The E-1 is anchored to ownership and management: your shareholding, your board seat, the MCA registrations, and a sponsor letter from your own Indian entity. The B-1 is anchored to employment: a signed contract, an employer letter, and salary documentation that meets the threshold for your nationality and role. Both are long-term categories — typically 1–5 years for the E-1, and up to five years or the length of the contract for the B-1 — and both require FRRO registration on arrival. The difference in validity matters less than the difference in anchor: the mission tests whether your documents prove the relationship the category claims, not whether the label sounds right.',
          'On cost, the two services are priced the same at our end: a $499 kickoff with a $200 success fee due only after the application is successfully processed, government fees separate. Where the real cost difference shows up is in preparation — an E-1 file is built around the Indian entity\'s corporate documents, while a B-1 file is built around the employer\'s hiring paperwork. The category that matches your actual structure is the one whose preparation is straightforward, and the mismatched category is the one that restarts.',
        ],
      },
      {
        heading: 'How to decide in 5 minutes',
        paragraphs: [
          'Ask three questions: (1) Who owns the Indian entity? If you do — or you will — E-1. (2) Who is your counterparty — your own company or a third-party employer? Your own company points to E-1; a third-party employer points to B-1. (3) What is your job title inside the entity? Director/founder/investor → E-1; employee → B-1.',
          'If the answers are mixed — for example, you are both an investor and a salaried director — the structure needs to be built so the visa matches reality, and that design decision should come first. This is the single most valuable conversation to have before spending any money on documents, and it is exactly what the free case review covers. Our E-1 and B-1 services both start at $499 kickoff, with the success fee due only after your application is successfully processed.',
        ],
      },
      {
        heading: 'Choosing a consultant for this decision',
        paragraphs: [
          'The category decision should come from a review of your actual documents, not from a comparison table. On our E-1 and B-1 cases you work with one dedicated consultant from kickoff to approval, reachable directly on WhatsApp at +63 949 649 1061 — the same consultant who builds your sponsor letter is the one guiding your FRRO registration after arrival, with no handoffs in between.',
          'If you want the full picture before you decide, start with the [E-1 visa page](/visa/e-1) and the [B-1 visa page](/visa/b-1) for the document checklists, then read the [FRRO registration guide for India](/blog/frro-registration-india-guide) so you know what the first two weeks in India will require either way.',
        ],
      },
    ],
  },
  {
    slug: 'india-visa-rejection-reasons',
    title: 'India Visa Rejection Reasons: 7 Causes (and How to Fix Each One)',
    metaTitle: 'India Visa Rejection Reasons: 7 Causes & Fixes',
    description:
      'The seven rejection reasons behind most refused India visas in 2026 — and the specific, practical fix for each one, so you do not have to pay the fee again.',
    date: '2026-10-05',
    readTime: '7 min read',
    excerpt:
      'A rejection is not the end of the road — it is a diagnostic. Most refusals point at one specific, fixable problem in the file.',
    primaryKeyword: 'india visa rejection reasons',
    relatedVisaId: 'other',
    relatedVisaLabel: 'Free Case Review',
    cluster: 'rejection',
    sections: [
      {
        paragraphs: [
          'Indian visa rejections are specific — almost always traceable to one document, one inconsistency, or one wrong category. The good news: a rejection letter is a diagnostic, and in most cases the fix is clear once you know what you are looking at. Here are the seven rejection reasons we see most often, and the exact fix for each.',
        ],
      },
      {
        heading: 'The pattern behind the list: file problems, not eligibility',
        paragraphs: [
          'Step back from the seven items and a pattern appears: most India visa rejections are file problems, not eligibility problems. The applicant is usually fine — the documents are not. Incomplete files, unsigned forms, out-of-spec photographs, and dates that do not line up across forms account for the large majority of refusals, and every one of them is checkable before the government fee is paid. A true eligibility rejection — for example, a previous overstay — is the exception, and it reads very differently in the refusal letter.',
          'That distinction matters because it changes what a rejection costs you. A file rejection means one specific fix and a re-application; an eligibility rejection means a strategy conversation before any further filing. When you receive a refusal, the first job is to work out which of the two you are looking at — the letter usually tells you, even when it is brief.',
        ],
      },
      {
        heading: '1. Wrong visa category',
        paragraphs: [
          'The stated purpose does not match the actual purpose of the trip — a business trip on a [tourist visa](/visa/tourist), work on a [business visa](/visa/business), investment on an employment visa. Missions cross-check the purpose field against the itinerary, employer letters, and (for business categories) the Indian counterparty. Fix: re-state the true purpose and apply in the matching category. For mixed situations (investor + employee), design the structure to match reality before applying.',
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
          'A prior overstay or FRRO violation is checked and can trigger refusal or additional scrutiny. This is the one reason that is not a simple document fix — it needs a case-specific strategy: a clear explanation, evidence of the correction, and sometimes a different entry point. This is the situation our "not sure which visa" case review is built for — re-applicants with complex histories get a [free 15-minute review](/apply) before any money is spent.',
        ],
      },
      {
        heading: 'The spec sheet: what "correct" means mechanically',
        paragraphs: [
          'Three mechanical specifications cause more rejections than anything else. The photograph: a JPEG under 1 MB at 350×350 to 1000×1000 pixels, white background, frontal, no glasses, neutral expression. The passport: at least 6 months of validity beyond your intended departure from India, plus at least 2 blank visa pages. And signatures: the application form, sponsor letters, and employer letters must all be signed — and dated where the form requires it — because an incomplete or unsigned document is one of the most common causes of a file being sent back or refused; an unsigned letter is effectively treated as not submitted at all.',
          'None of these requires a judgment call. You can verify all three against a checklist in thirty minutes, which is why they belong on every pre-submission review — and why, when a rejection letter points at any of them, the fix is a mechanical one you can complete yourself before re-applying.',
        ],
      },
      {
        heading: 'After a rejection',
        paragraphs: [
          'Do not simply re-submit the same file. Re-applying with the same documents produces the same result. The sequence that works: read the rejection reason, fix the specific cause, verify the whole file against a category checklist, then re-apply. If the reason is unclear, a case review with someone who has read hundreds of these files is the fastest path back to a successful application.',
        ],
      },
      {
        heading: 'Re-applying with support',
        paragraphs: [
          'A re-application is not a second chance to submit the same file — it is a new application that the mission reads with the previous refusal in mind. If you are re-applying, rebuild the file against a category checklist, keep evidence of what changed, and if the previous refusal touched an eligibility issue rather than a document issue, talk the strategy through before you file. Our re-applicants work with one dedicated consultant for the case, with WhatsApp support at +63 949 649 1061, and the free case review is where complex histories are triaged before any money is spent.',
          'If a dependent — a spouse or a child — is part of your file, note that dependent visas are processed in parallel with the primary applicant\'s visa. A re-application by the primary applicant therefore means the dependent file is re-prepared on the parallel track at the same time, not queued behind the new primary file. For the step-by-step mechanics of a second attempt, see our [India visa rejection re-application guide](/blog/india-visa-rejection-reapplication), and for realistic timelines on the re-application, [our 2026 processing times guide](/blog/india-visa-processing-times-2026).',
        ],
      },
    ],
  },
];

/** All posts — legacy 4 + batch 2 (4). Chronological (legacy first). */
export const BLOG_POSTS: BlogPost[] = [...LEGACY_BLOG_POSTS, ...NEW_BLOG_POSTS];
