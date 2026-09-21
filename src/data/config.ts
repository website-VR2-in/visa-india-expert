import { VisaOption, FAQItem, FormStep } from '../types';

// ─── Visa Options (Fully Configurable) ───────────────────────
// Pricing model (matches visaindiaexpert.com): each visa has a
// KICKOFF fee (paid upfront to start) and a SUCCESS FEE (paid only
// after the application is successfully processed).
//
// ⚠️ Keep kickoff/success in sync with VISA_PRICES in lib/server/prices.js.
export const VISA_OPTIONS: VisaOption[] = [
  {
    id: 'tourist',
    label: 'Tourist Visa',
    description: 'Short-term visit for tourism and leisure travel to India.',
    icon: '🏛️',
    category: 'Travel',
    kickoff: 199,
    successFee: 100,
    tagline: 'Explore India with a visa handled end to end.',
    whoFor: [
      'Holiday travelers and leisure visitors',
      'Family visitors (visiting friends & relatives)',
      'Short business sightseeing trips',
      'Transit travelers needing a proper visa',
    ],
    facts: [
      { label: 'Typical validity', value: '30–120 days' },
      { label: 'Processing time', value: '3–7 business days' },
      { label: 'Max stay', value: '90 days per entry' },
    ],
    pitfalls: [
      'Wrong visa category chosen for the trip purpose',
      'Passport validity under 6 months — instant rejection',
      'Inconsistent travel dates across forms',
      'Photos not meeting Indian embassy specs',
    ],
    documents: [
      'Passport (6+ months validity, 2 blank pages)',
      'Passport-sized photographs (white background)',
      'Confirmed flight itinerary or bookings',
      'Proof of accommodation in India',
      'Bank statements (last 3 months)',
      'Completed application form',
    ],
  },
  {
    id: 'business',
    label: 'Business Visa',
    description: 'For business meetings, conferences, and commercial activities.',
    icon: '💼',
    category: 'Business',
    kickoff: 349,
    successFee: 150,
    tagline: 'Do business in India — meetings, deals, and expansion.',
    whoFor: [
      'Company executives attending meetings',
      'Contract signers and investors',
      'Trade fair and conference attendees',
      'Business developers scouting the market',
    ],
    facts: [
      { label: 'Typical validity', value: '1–5 years (multiple)' },
      { label: 'Processing time', value: '1–3 weeks' },
      { label: 'Max stay', value: '180 days per visit' },
    ],
    pitfalls: [
      'Sponsor letter missing required company details',
      'No proof of commercial relationship with the Indian company',
      'Applying from the wrong jurisdiction',
      'Saying "employment" in the purpose field',
    ],
    documents: [
      'Passport (6+ months validity)',
      'Passport-sized photographs',
      'Invitation letter from the Indian company',
      'Letter from your employer (on letterhead)',
      'Proof of business relationship (contracts, invoices)',
      'Company registration documents',
    ],
  },
  {
    id: 'medical',
    label: 'Medical Visa',
    description: 'For medical treatment and healthcare in India.',
    icon: '🏥',
    category: 'Health',
    kickoff: 199,
    successFee: 100,
    tagline: 'World-class treatment in India — without visa stress.',
    whoFor: [
      'Patients seeking treatment at Indian hospitals',
      'Attendants of medical visa holders (up to 2)',
      'Patients referred by an Indian hospital',
    ],
    facts: [
      { label: 'Typical validity', value: 'Matched to treatment' },
      { label: 'Processing time', value: '3–10 business days' },
      { label: 'Attendants allowed', value: 'Up to 2 per patient' },
    ],
    pitfalls: [
      'No formal hospital letter/estimate from the Indian hospital',
      'Attendant applications submitted without the patient file',
      'Treatment timeline not reflected in travel dates',
      'Missing proof of funds for treatment costs',
    ],
    documents: [
      'Passport (6+ months validity)',
      'Passport-sized photographs',
      'Letter from the Indian hospital (treatment plan + cost estimate)',
      'Medical reports and diagnosis',
      'Proof of funds (bank statements)',
      'Attendant details (if applicable)',
    ],
  },
  {
    id: 'e-1',
    label: 'E-1 Business Visa',
    description: 'For entrepreneurs, directors & company owners establishing business in India.',
    icon: '🏢',
    category: 'Residency',
    kickoff: 499,
    successFee: 200,
    tagline: 'Our flagship case — we built this process the hard way.',
    whoFor: [
      'Foreigners who own or establish an Indian company',
      'Directors and key decision-makers',
      'Entrepreneurs moving their operations to India',
    ],
    facts: [
      { label: 'Typical validity', value: '1–5 years' },
      { label: 'Processing time', value: '2–6 months (varies greatly)' },
      { label: 'FRRO registration', value: 'Required on arrival' },
    ],
    pitfalls: [
      'Company documents not apostilled or in the wrong format',
      'Minimum capital requirements misunderstood',
      'Sponsor letter language rejected without explanation',
      'FRRO registration treated like a tourist entry',
      'Choosing E-1 when B-1 (or vice versa) fits better',
    ],
    documents: [
      'Passport (6+ months validity)',
      'Company incorporation documents (MCA certified)',
      'Apostilled company resolutions & board records',
      'Proof of capital / investment',
      'Sponsor letter (we draft it in approved language)',
      'Audited financial statements (if available)',
    ],
  },
  {
    id: 'b-1',
    label: 'B-1 Employment Visa',
    description: 'For foreign nationals employed by an Indian company.',
    icon: '👔',
    category: 'Residency',
    kickoff: 499,
    successFee: 200,
    tagline: 'Get hired in India with the right visa from day one.',
    whoFor: [
      'Foreign nationals with a formal Indian employment offer',
      'Contract workers with Indian employers',
      'Professionals transferring into an Indian role',
    ],
    facts: [
      { label: 'Typical validity', value: 'Up to 5 years / contract' },
      { label: 'Processing time', value: '4–12 weeks' },
      { label: 'FRRO registration', value: 'Required on arrival' },
    ],
    pitfalls: [
      'Salary thresholds not met — application quietly rejected',
      'Employment contract missing MoU requirements',
      'Agents confusing B-1 requirements with E-1 rules',
      'FRRO registration timeline missed after arrival',
    ],
    documents: [
      'Passport (6+ months validity)',
      'Formal employment contract (signed)',
      'Letter from the Indian employer (on letterhead)',
      'Company registration & license documents',
      'CV and professional qualifications',
      'Police clearance certificate',
    ],
  },
  {
    id: 'spouse',
    label: 'Spouse / Dependent Visa',
    description: 'For spouses and dependent children of visa holders.',
    icon: '👨‍👩‍👧',
    category: 'Family',
    kickoff: 349,
    successFee: 150,
    tagline: 'Bring your family — we run the parallel process for you.',
    whoFor: [
      'Spouses of E-1 / B-1 / other long-stay visa holders',
      'Dependent children of visa holders',
      'Families relocating to India together',
    ],
    facts: [
      { label: 'Typical validity', value: 'Matched to main visa' },
      { label: 'Processing time', value: '3–8 weeks (parallel track)' },
      { label: 'Max dependents', value: 'Spouse + children' },
    ],
    pitfalls: [
      'Marriage certificate not apostilled / not translated',
      'Applying before the main visa is confirmed',
      'Children\'s birth certificates missing parent details',
      'Address proof not matching the main applicant',
    ],
    documents: [
      'Passports of all dependents',
      'Apostilled marriage certificate (+ certified translation)',
      'Children\'s birth certificates',
      'Main applicant\'s visa copy',
      'Proof of relationship and shared address',
      'Photographs of each applicant',
    ],
  },
  {
    id: 'student',
    label: 'Student Visa',
    description: 'For enrollment in Indian educational institutions.',
    icon: '🎓',
    category: 'Education',
    kickoff: 349,
    successFee: 150,
    tagline: 'Study in India with a clean, complete file.',
    whoFor: [
      'Undergraduate and postgraduate applicants',
      'Research and exchange students',
      'Students admitted to recognized Indian institutions',
    ],
    facts: [
      { label: 'Typical validity', value: 'Course duration' },
      { label: 'Processing time', value: '2–6 weeks' },
      { label: 'Key requirement', value: 'University admission letter' },
    ],
    pitfalls: [
      'Admission letter from an unrecognized institution',
      'Proof of funds below the required threshold',
      'No intent-to-return documentation',
      'Gaps between admission and visa issue dates unexplained',
    ],
    documents: [
      'Passport (6+ months validity)',
      'University admission / enrollment letter',
      'Proof of funds (bank statements + sponsor letter)',
      'Academic transcripts and certificates',
      'Statement of purpose (we help draft it)',
      'Photographs',
    ],
  },
  {
    id: 'other',
    label: 'Other Visa Type',
    description: 'Not sure which visa you need? We will help determine the right category.',
    icon: '📋',
    category: 'Other',
    kickoff: 199,
    successFee: 100,
    tagline: 'Tell us your situation — we\'ll find the right category.',
    whoFor: [
      'Applicants unsure of the correct visa category',
      'Special cases (journalism, research, conferences)',
      'Re-applicants after a rejection',
      'Anyone with a complicated history',
    ],
    facts: [
      { label: 'First step', value: 'Free 15-minute case review' },
      { label: 'Processing time', value: 'Case by case' },
      { label: 'Outcome', value: 'A clear category + plan' },
    ],
    pitfalls: [
      'Applying for a category that doesn\'t fit your situation',
      'Not disclosing previous refusals or overstays',
      'Following generic internet advice for a specific case',
      'Switching categories mid-process without guidance',
    ],
    documents: [
      'Passport (6+ months validity)',
      'A short summary of your situation (WhatsApp is fine)',
      'Any previous visa applications or refusals',
      'Supporting documents for your specific case',
    ],
  },
];

// ─── FAQ ─────────────────────────────────────────────────────
export const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    question: 'How long does the visa process take?',
    answer: 'Processing times vary by visa type and your nationality. Tourist visas typically take 3–7 business days. Business and employment visas can take 2–6 weeks. Our team will give you a specific timeline once we review your situation.',
  },
  {
    id: '2',
    question: 'What documents do I need?',
    answer: 'Required documents depend on your visa type. Generally, you will need a valid passport (6+ months validity), passport-sized photographs, proof of travel itinerary, and financial documentation. Each visa page on this site lists the exact checklist for that category — and we send you a customized one after your kickoff payment.',
  },
  {
    id: '3',
    question: 'How much does your service cost?',
    answer: 'Every visa has a fixed, all-inclusive price shown on its own page: a kickoff fee you pay upfront to start, plus a success fee that is due only after your application is successfully processed. For example, a Tourist Visa is $199 kickoff + $100 success fee ($299 total). Government visa fees are separate and paid directly to the Indian government.',
  },
  {
    id: '4',
    question: 'Can I apply from my home country?',
    answer: 'Yes, in most cases you can apply from your country of residence. We will advise on the correct application procedure based on your nationality and current location.',
  },
  {
    id: '5',
    question: 'Can you help me if I made a mistake on a previous application?',
    answer: 'Absolutely. Our founder personally experienced visa complications and had to restart his application. We specialize in helping applicants navigate corrections, re-applications, and category changes.',
  },
  {
    id: '6',
    question: 'How do I pay?',
    answer: 'You pay the kickoff fee (shown on your invoice) to start your application, and the success fee is due only after your application is successfully processed. Payment is made by secure bank transfer to our Wise account — your invoice page shows the exact amount, the invoice reference, and the full bank details (IBAN and SWIFT/BIC) with one-tap copy buttons. After submitting your transfer, simply confirm it on the payment page.',
  },
  {
    id: '11',
    question: 'Why do you ask for a kickoff payment?',
    answer: 'The kickoff fee reserves your case with our team and covers the initial work: reviewing your eligibility, preparing the application, and filing it with the authorities. The success fee is only due after your application is successfully processed. This keeps the process transparent and protects both sides — you can track every stage before the final payment.',
  },
  {
    id: '7',
    question: 'Can I contact you on WhatsApp?',
    answer: 'Yes, WhatsApp is our primary communication channel. You can message us directly at +63 949 649 1061 for quick questions, document reviews, and application updates. We typically respond within a few hours.',
  },
  {
    id: '8',
    question: 'What happens after I submit my application?',
    answer: 'After submission, you will receive a confirmation email with your application number. We will review your details, send you a customized document checklist, and guide you through each step. You can track progress and communicate with us via WhatsApp.',
  },
  {
    id: '9',
    question: 'Do you guarantee visa approval?',
    answer: 'No visa service can guarantee approval — that decision rests solely with the Indian government. What we guarantee is professional, thorough preparation of your application to give you the best possible chance of success.',
  },
  {
    id: '10',
    question: 'Is my personal information secure?',
    answer: 'Yes. We use encrypted storage for all documents and personal information. Your data is only accessible to our authorized team members and is never shared with third parties without your consent.',
  },
];

// ─── Form Steps ──────────────────────────────────────────────
export const FORM_STEPS: FormStep[] = [
  { id: 1, label: 'Visa Type', title: 'What visa do you need?', description: 'Select the visa category that best matches your situation.' },
  { id: 2, label: 'Travel Details', title: 'When are you traveling?', description: 'Tell us about your trip so we can prepare your application.' },
  { id: 3, label: 'Personal Details', title: 'Tell us about yourself', description: 'We need your basic information for the application.' },
  { id: 4, label: 'Contact', title: 'How can we reach you?', description: 'We need your email and phone to keep you updated.' },
  { id: 5, label: 'Additional Info', title: 'Anything else?', description: 'Share any additional details that might help your application.' },
  { id: 6, label: 'Review', title: 'Review your application', description: 'Double-check everything before submitting.' },
];

// ─── Countries (common subset — extendable) ──────────────────
export const NATIONALITIES: string[] = [
  'Afghan', 'Albanian', 'Algerian', 'American', 'Armenian', 'Australian',
  'Austrian', 'Bangladeshi', 'Belgian', 'Brazilian', 'British', 'Bulgarian',
  'Canadian', 'Chinese', 'Colombian', 'Danish', 'Dutch', 'Egyptian',
  'Estonian', 'Ethiopian', 'Finnish', 'French', 'German', 'Ghanaian',
  'Greek', 'Indian', 'Indonesian', 'Iranian', 'Irish', 'Italian',
  'Japanese', 'Kenyan', 'Korean', 'Malaysian', 'Moroccan', 'Nigerian',
  'Norwegian', 'Pakistani', 'Philippine', 'Polish', 'Portuguese',
  'Romanian', 'Russian', 'Saudi Arabian', 'Singaporean', 'South African',
  'Spanish', 'Swedish', 'Swiss', 'Thai', 'Turkish', 'Ukrainian',
  'Vietnamese', 'Other',
];

// ─── Trust Signals ──────────────────────────────────────────
export const TRUST_SIGNALS = [
  { icon: '🛡️', label: 'Secure Process', description: 'Your data is encrypted and protected' },
  { icon: '⚡', label: 'Fast Response', description: 'We respond within hours, not days' },
  { icon: '👤', label: 'Personal Support', description: 'One dedicated consultant for your case' },
  { icon: '📞', label: 'WhatsApp Access', description: 'Direct communication whenever you need us' },
];

// ─── Why Us Benefits ────────────────────────────────────────
export const BENEFITS = [
  {
    icon: '🇮🇳',
    title: 'India Visa Specialists',
    description: 'We focus exclusively on India visas — every type, every category, every complication.',
  },
  {
    icon: '🤝',
    title: 'Personal Application Assistance',
    description: 'You work with one dedicated consultant from start to finish. No handoffs, no re-explaining.',
  },
  {
    icon: '🔒',
    title: 'Secure & Simple Process',
    description: 'Your documents and personal information are protected with enterprise-grade security.',
  },
  {
    icon: '💬',
    title: 'Human Support on WhatsApp',
    description: 'Real-time answers on WhatsApp. Send a document photo, get a review before you sleep.',
  },
  {
    icon: '💰',
    title: 'Kickoff + Success Pricing',
    description: 'You pay a kickoff fee to start and a success fee only after your application succeeds. No hidden costs.',
  },
];

// ─── Payment Structure (kickoff + success fee) ──────────────
// The kickoff fee is paid upfront to start the application.
// The success fee is due only after the application is successfully processed.
// Per-visa amounts live in VISA_OPTIONS above (and lib/server/prices.js).
export const MIN_KICKOFF = Math.min(...VISA_OPTIONS.map((v) => v.kickoff));
export const MIN_SUCCESS_FEE = Math.min(...VISA_OPTIONS.map((v) => v.successFee));

// ─── Wise Account (Bank Transfer) ────────────────────────────
// Payments are received as a bank transfer into the Wise account below.
// If you also create a real Wise payment link in the Wise dashboard,
// paste it in WISE_PAYMENT_LINK — the payment page will show a direct
// "Pay with Wise" button. Leave empty to show bank-transfer details only.
export const WISE_ACCOUNT = {
  accountName: 'ENERGY STOCK ALLIANCE Limited -THE-',
  iban: 'BE73905633425060',
  swift: 'TRWIBEB1XXX',
  bankName: 'Wise',
  bankAddress: 'Rue du Trône 100, 3rd floor, Brussels, 1050, Belgium',
  currencyNote: 'Transfers in USD (or EUR/GBP — Wise converts at the mid-market rate).',
};

export const WISE_PAYMENT_LINK = ''; // e.g. 'https://wise.com/pay/xxxx' — optional

// ─── Company Info ────────────────────────────────────────────
export const COMPANY = {
  name: 'Visa India Expert',
  email: 'info@visaindiaexpert.com',
  phone: '+63 949 649 1061',
  whatsapp: '+639496491061', // without spaces for URL
  whatsappLink: 'https://wa.me/639496491061',
  currency: '$',
  currencyCode: 'USD',
};
