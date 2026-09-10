import { VisaOption, FAQItem, FormStep } from '../types';

// ─── Visa Options (Fully Configurable) ───────────────────────
export const VISA_OPTIONS: VisaOption[] = [
  {
    id: 'tourist',
    label: 'Tourist Visa',
    description: 'Short-term visit for tourism and leisure travel to India.',
    icon: '🏛️',
    defaultPrice: 199,
    category: 'Travel',
  },
  {
    id: 'business',
    label: 'Business Visa',
    description: 'For business meetings, conferences, and commercial activities.',
    icon: '💼',
    defaultPrice: 249,
    category: 'Business',
  },
  {
    id: 'medical',
    label: 'Medical Visa',
    description: 'For medical treatment and healthcare in India.',
    icon: '🏥',
    defaultPrice: 229,
    category: 'Health',
  },
  {
    id: 'e-1',
    label: 'E-1 Business Visa',
    description: 'For entrepreneurs, directors & company owners establishing business in India.',
    icon: '🏢',
    defaultPrice: 399,
    category: 'Residency',
  },
  {
    id: 'b-1',
    label: 'B-1 Employment Visa',
    description: 'For foreign nationals employed by an Indian company.',
    icon: '👔',
    defaultPrice: 399,
    category: 'Residency',
  },
  {
    id: 'spouse',
    label: 'Spouse / Dependent Visa',
    description: 'For spouses and dependent children of visa holders.',
    icon: '👨‍👩‍👧',
    defaultPrice: 349,
    category: 'Family',
  },
  {
    id: 'student',
    label: 'Student Visa',
    description: 'For enrollment in Indian educational institutions.',
    icon: '🎓',
    defaultPrice: 229,
    category: 'Education',
  },
  {
    id: 'other',
    label: 'Other Visa Type',
    description: 'Not sure which visa you need? We will help determine the right category.',
    icon: '📋',
    defaultPrice: 199,
    category: 'Other',
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
    answer: 'Required documents depend on your visa type. Generally, you will need a valid passport (6+ months validity), passport-sized photographs, proof of travel itinerary, and financial documentation. We provide a customized checklist tailored to your specific visa category.',
  },
  {
    id: '3',
    question: 'How much does your service cost?',
    answer: 'Our service fees range from €199 to €499 depending on visa type and complexity. This is an all-inclusive fee covering application preparation, submission assistance, and ongoing support. Government visa fees are separate.',
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
    answer: 'We accept payments via Wise for secure international transfers. After submitting your application, you will receive an invoice with a direct payment link. Payment is required before we begin processing your visa application.',
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
    title: 'Clear Pricing',
    description: 'No hidden fees. No surprise charges. You know the cost before you start.',
  },
];

// ─── Company Info ────────────────────────────────────────────
export const COMPANY = {
  name: 'Visa India Expert',
  email: 'info@visaindiaexpert.com',
  phone: '+63 949 649 1061',
  whatsapp: '+639496491061', // without spaces for URL
  whatsappLink: 'https://wa.me/639496491061',
  currency: '€',
  currencyCode: 'EUR',
};
