// ─── New blog posts (batch 2) ────────────────────────────────
// Fact-dense, dated, keyword-targeted. Type is defined inline to
// avoid coupling to ./blog; mirrors BlogPost plus a `cluster` field.

export interface NewBlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string;
  readTime: string;
  excerpt: string;
  primaryKeyword: string;
  cluster: string;
  relatedVisaId: string;
  relatedVisaLabel: string;
  sections: { heading?: string; paragraphs: string[] }[];
}

export const NEW_BLOG_POSTS: NewBlogPost[] = [
  {
    slug: 'india-e-visa-vs-embassy-visa',
    title: 'India E-Visa vs Embassy Visa: Which One Should You Use?',
    metaTitle: 'India E-Visa vs Embassy Visa: Which to Use',
    description:
      'Compare the India e-Visa vs embassy visa options, including validity choices, processing times, and eligibility, to pick the right route for your trip.',
    date: '2026-10-09',
    readTime: '5 min read',
    excerpt:
      'The e-Visa is faster and simpler; the embassy route covers long-stay, work-adjacent, and re-applicant cases. A practical decision framework for choosing between the two.',
    primaryKeyword: 'india e-visa vs embassy visa',
    cluster: 'tourist',
    relatedVisaId: 'tourist',
    relatedVisaLabel: 'Tourist Visa',
    sections: [
      {
        paragraphs: [
          'Choosing between an India e-Visa vs embassy visa application is the first practical decision most travellers make, and it shapes everything that follows: the documents you prepare, the timeline you plan around, and the validity you end up with. The short answer: for most tourists and short business visitors, the online e-Visa is the faster, simpler path. For long-stay, work-adjacent, or previously complicated cases, the in-person embassy or consulate route is usually the better fit.',
          'This guide compares the two routes the way we explain them to clients: what each one covers, how long each typically takes, and a simple decision framework you can work through before you start preparing documents.',
        ],
      },
      {
        heading: 'What the India e-Visa Actually Covers',
        paragraphs: [
          'The India e-Visa is applied for entirely online through the Government of India\'s e-Visa portal. You complete a digital application, enter your passport details, upload a compliant photo, pay the fee online, and receive the visa electronically. Per the portal\'s typical processing window, most complete applications are processed within 3 to 7 business days, which means you can apply a week or two before departure without pressure.',
          'For tourism, the e-Visa comes in three categories: 30 days, 1 year, and 5 years. The 30-day option suits a single short trip; the 1-year and 5-year options are multiple-entry visas suited to travellers who plan to visit more than once over that period, with each visit subject to the per-visit stay limit printed on the visa. If you are unsure which category fits, our breakdown of [India tourist visa requirements](/blog/india-tourist-visa-requirements) walks through the options in more detail, and the [tourist visa service page](/visa/tourist) lists what a managed application covers.',
          'Eligibility matters. The e-Visa is available to nationals of a defined list of countries, maintained on the e-Visa portal. If your nationality is not on that list, the online route is not available to you and the embassy route is your only option. Check the list before you plan anything else — it is the first branch in the decision tree.',
        ],
      },
      {
        heading: 'What the Embassy or Consulate Route Involves',
        paragraphs: [
          'An embassy or consulate visa is applied for in person, or through the visa application centre designated by the relevant Indian mission. You book an appointment, submit your passport with a physical or scanned document set, provide biometrics where required, and wait for a decision that is often longer than the e-Visa window. Timelines vary by mission and by season, so it is worth checking current [India visa processing times](/blog/india-visa-processing-times-2026) before you commit to a travel date.',
          'This route is the standard path for categories the e-Visa does not cover, and for cases where an officer\'s individual review is the safer option. That includes employment and entrepreneur categories such as the E-1 and B-1, long-stay visas, and business visas with multi-year validity — the Indian business visa typically runs from 1 to 5 years with multiple entry. It is also the route most re-applicants take after a rejection, because a complex file benefits from being presented to a human reviewer as a corrected, complete submission.',
        ],
      },
      {
        heading: 'Processing Time and Validity, Side by Side',
        paragraphs: [
          'On speed, the e-Visa is the clear winner in most cases. The 3 to 7 business day window is typical for complete files, and the digital process leaves less room for the paperwork errors that cause rejections. The embassy route commonly takes longer: in practice, allow weeks rather than days, and longer still during peak season or at a mission with heavy volume.',
          'On validity, the picture is more nuanced. The e-Visa offers fixed options — 30 days, 1 year, or 5 years for tourism — and that covers the needs of most visitors. The embassy route offers a wider menu, including multi-year business and employment categories. If your trip is a single short visit, the e-Visa\'s validity is more than enough. If you are building a recurring pattern of travel, or moving to India to work, the right category usually lives on the embassy route.',
        ],
      },
      {
        heading: 'A Simple Decision Framework',
        paragraphs: [
          'Work through these questions in order:',
          '1. Is your nationality on the e-Visa eligible list? If not, use the embassy route. 2. Is the purpose tourism, a short business visit, or medical care, and does your stay fit a 30-day, 1-year, or 5-year e-Visa? If yes, use the e-Visa. 3. Do you need an employment, entrepreneur, or other long-stay category? Those are not available as e-Visas — use the embassy route, and plan for FRRO registration after arrival. 4. Was a previous application rejected, or is there a prior overstay or other complication in your history? Use the embassy route with a corrected file, and consider a case review before applying.',
          'Most applicants stop at question 2. If you land on 3 or 4, the extra effort of the embassy route is not optional — it is the route your case actually requires.',
        ],
      },
      {
        heading: 'Who Should Use Each Route',
        paragraphs: [
          'Use the e-Visa if you are a first-time visitor, a repeat tourist, or a short-duration business visitor from an eligible country, and your file is clean. It is fast, the digital process is straightforward, and the fixed categories match the plans of most visitors.',
          'Use the embassy route if you are applying for an employment or entrepreneur visa, need multi-year validity the e-Visa does not offer, come from a country outside the eligible list, or are re-applying after a rejection. In the last case, do not simply resubmit the same file — the rejection reason has to be fixed first, which is exactly what a [free case review](/visa/other) is for: we look at your history, your intended category, and the route that gives your corrected application the best chance on the first attempt.',
        ],
      },
    ],
  },
  {
    slug: 'frro-registration-india-guide',
    title: 'FRRO Registration in India: The Complete Guide for Foreign Professionals',
    metaTitle: 'FRRO Registration in India: Complete Guide',
    description:
      'Learn how FRRO registration in India works: who must register, the documents you need, the online portal process, extension of stay, and common mistakes.',
    date: '2026-10-16',
    readTime: '5 min read',
    excerpt:
      'Who must register, when, what documents you need, and how the online FRRO portal process works — plus extensions of stay and the mistakes that cause delays.',
    primaryKeyword: 'frro registration india',
    cluster: 'employment',
    relatedVisaId: 'b-1',
    relatedVisaLabel: 'B-1 Employment Visa',
    sections: [
      {
        paragraphs: [
          'Every foreign professional who arrives in India on an employment or long-stay visa eventually hits the same step: FRRO registration in India. For categories such as the E-1 and B-1, the Foreigners Regional Registration Office does not merely record your stay — completing the registration is what keeps your presence in the country lawful beyond the initial visa window.',
          'This guide explains what the FRRO is, who must register and when, the documents you will typically need, how the online portal process works, how to extend your stay, and the mistakes that most often cause delays. It is written for the person arriving on an employment visa, and for the employer sponsoring them.',
        ],
      },
      {
        heading: 'What the FRRO Is',
        paragraphs: [
          'The Foreigners Regional Registration Office (FRRO) is the government body, under India\'s Ministry of Home Affairs, responsible for registering foreign nationals who stay in India beyond the short-visit period covered by their visa. Each FRRO covers a defined region, typically centred on a major city, and handles registrations, extensions of stay, and related applications for the foreign nationals in its area.',
          'For employment and long-stay categories, the FRRO is the authority you deal with after arrival — not the embassy that issued your visa. Per FRRO guidelines, registration is completed through the FRRO\'s online portal, with an in-person or biometric verification step where required by the specific office.',
        ],
      },
      {
        heading: 'Who Must Register — and When',
        paragraphs: [
          'The registration requirement applies to foreign nationals holding categories that contemplate a long or work-related stay. The E-1 and B-1 employment and entrepreneur categories are the typical examples, along with other long-stay categories that the FRRO\'s guidance lists. If you hold a short tourist e-Visa, you generally do not register — you simply stay within the terms of the visa.',
          'On timing: for the eligible long-stay categories, registration is typically required within 14 days of arrival, per the FRRO\'s published guidance. The exact window depends on your visa type, so confirm it against the terms on your visa and the FRRO portal before you plan anything else. Registering late is one of the most common compliance problems we see, and it is almost always avoidable.',
        ],
      },
      {
        heading: 'Documents You Will Typically Need',
        paragraphs: [
          'The document list is short but specific. In most cases you will need: your passport (valid for at least 6 months beyond your intended stay, with blank pages), a copy of the visa you arrived on, a letter from your employer or a description of your business activity for entrepreneur categories, recent passport-size photos meeting the standard specification (JPEG, under 1 MB, 350×350 to 1000×1000 pixels, white background), and proof of your residential address in India — typically a rental agreement, a society letter, or a residency certificate.',
          'Two details matter more than they look. The photo specification is enforced strictly; a photo that fails the size or background rule is the single most common rejection trigger in FRRO applications. And the address you give must match where you actually live — mismatches surface later, during verification or at extension time, and cost you the time to correct them.',
        ],
      },
      {
        heading: 'How the Online FRRO Portal Process Works',
        paragraphs: [
          'Registration is submitted through the FRRO\'s online portal. You create an application, enter your passport and visa details, upload the documents, and pay the applicable fee. The portal gives you a reference number to track the application, and the whole submission can be completed from your phone in India.',
          'After submission, the FRRO may call you in for verification — a signature or biometric check, or a review of your address and employment details. In most cases this is a short appointment, but it is real work, so keep your phone reachable and your documents on hand. Once approved, you receive a registration certificate or e-certificate; keep a digital copy and know where the original is stored, because you will need it for an extension, an exit permit, or any future immigration query.',
        ],
      },
      {
        heading: 'Extending Your Stay',
        paragraphs: [
          'If you plan to stay longer than the period your registration covers, you apply for an extension of stay through the same FRRO process — and you apply before the current period expires, not after. Extensions for employment categories typically require your employer\'s continued sponsorship in writing, along with the same core documents: passport, visa, registration certificate, address proof, and photos.',
          'The working rule is simple: never let the registration or the extension lapse. An overstay changes your entire situation — it complicates every future visa application, and it can trigger penalties or restrictions on exit. If there is any doubt about when your current period ends, the FRRO office for your region is the only authority whose answer counts.',
        ],
      },
      {
        heading: 'Common Mistakes That Delay Registration',
        paragraphs: [
          'The failures that slow FRRO registration down follow a short list: registering after the 14-day window has passed; a photo that fails the specification; an address that does not match your actual residence; a passport with less than 6 months of validity left; and an employer letter that is vague about the role, the company, or the duration of the assignment. Each of these is fixable — but the fix happens on a slower timeline than the original registration.',
          'If you are arriving on an E-1 or B-1 visa, the cleanest sequence is to have the registration packet ready before you land, submit it within the first week, and keep the certificate and reference number in one place. For the differences between the two categories themselves, see our [E-1 vs B-1 comparison](/blog/e-1-vs-b-1-visa-india); and if you are still in the pre-arrival stage, the [B-1 employment visa page](/visa/b-1) and [E-1 entrepreneur visa page](/visa/e-1) cover what the visa stage requires before FRRO registration even begins.',
        ],
      },
    ],
  },
  {
    slug: 'india-visa-rejection-reapplication',
    title: 'What to Do After an India Visa Rejection: Step-by-Step Guide to Reapply',
    metaTitle: 'India Visa Rejection: How to Reapply (Guide)',
    description:
      'After an India visa rejection reapply the right way: read the stated reason, fix the five most common file problems, and rebuild your file before resubmitting.',
    date: '2026-10-23',
    readTime: '5 min read',
    excerpt:
      'Most rejections are file problems, not eligibility problems. Read the reason, fix the cause, verify the whole file, then reapply — here is the sequence that works.',
    primaryKeyword: 'india visa rejection reapply',
    cluster: 'rejection',
    relatedVisaId: 'other',
    relatedVisaLabel: 'Case Review',
    sections: [
      {
        paragraphs: [
          'An India visa rejection stings, but in most cases it is not a verdict on your eligibility — it is a statement about a specific problem in the file you submitted. The difference between a rejection that ends your application and one you can fix and reapply from is almost always in how you respond.',
          'This guide walks through the process step by step: how to read the rejection reason, the five most common (and fixable) causes, the reapplication sequence that works, when to get a case review, and what realistic timelines look like. For the full catalogue of reasons behind Indian visa refusals, our [India visa rejection reasons guide](/blog/india-visa-rejection-reasons) covers the detailed side.',
        ],
      },
      {
        heading: 'Step 1: Read the Stated Rejection Reason',
        paragraphs: [
          'The rejection communication usually states a reason, even if it is brief and unhelpful-sounding. Read it before you do anything else, and match it against the actual file you submitted. "Insufficient documentation" means one of your documents was missing or unreadable. "Inconsistency in travel plan" means your dates, bookings, and stated purpose did not line up. "Prior overstay" means the officer flagged a past stay that exceeded its authorised period.',
          'Most rejections we see in case reviews are file problems, not eligibility problems: a photo that failed the specification, a passport with less than 6 months of validity, a financial document that did not clearly show funds. None of these mean "no" to you — they mean "no" to that file. That distinction is the whole reason reapplication can work.',
        ],
      },
      {
        heading: 'The Five Most Common (and Fixable) Causes',
        paragraphs: [
          '1. Photo specification. The photo must be a JPEG, under 1 MB, between 350×350 and 1000×1000 pixels, on a plain white background, with the face centred and correctly sized. This is enforced mechanically in most cases, and it is the cheapest fix on this list: take a new photo to spec and replace it.',
          '2. Passport validity. The passport must typically have at least 6 months of validity remaining and 2 blank pages for stamping. If your passport is close to expiry, renew it first and then reapply — a visa issued into a near-expiry passport is a predictable problem.',
          '3. Inconsistent travel dates. A stated purpose of a 10-day visit with 30 days of hotel bookings, or an itinerary that does not match the visa category requested, triggers exactly this rejection. Rebuild the itinerary so the dates, bookings, and stated purpose all tell the same story.',
          '4. Weak financial proof. Bank statements that do not show a stable balance, or that cover only a few weeks, are commonly flagged. Provide statements covering a longer period, show the funds clearly, and if the trip is sponsored, include a sponsorship letter with the sponsor\'s own proof.',
          '5. Prior overstay. This is the one cause you cannot simply "fix" in the file — a previous overstay is a fact. It can, in most cases, be addressed with a clear explanation and, where relevant, evidence that the overstay has been regularised or penalised. This is the category where a case review earns its keep.',
        ],
      },
      {
        heading: 'The Reapplication Sequence That Works',
        paragraphs: [
          'The sequence that consistently works is: fix the stated cause, then verify the entire file — not just the flagged item — then re-apply. The second step is where most people fail a second time. A rejection for a photo problem often hides a passport-validity problem; a rejection for weak finances often hides an inconsistent itinerary. When you re-apply, you submit a new file, and every item in it gets another look.',
          'Never resubmit the same file. An identical resubmission to the same mission is how a fixable rejection becomes a permanent one. If anything has changed since the rejection — a renewed passport, a new job, a corrected address — say so. A short, factual note of what was wrong and what you corrected is not an admission of anything; it is the review officer doing less guesswork.',
        ],
      },
      {
        heading: 'When to Get a Case Review First',
        paragraphs: [
          'Get a case review before re-applying if the rejection reason is vague or contradicts the file; if there is a prior overstay or a prior refusal in the record; if the case involves an employment or long-stay category rather than a simple tourist visit; or if you have already re-applied once. A review looks at your full history, the intended category, and the route that gives the corrected file the best chance — the [free case review](/visa/other) exists for exactly this.',
          'Once the review has identified the cause and the route, the corrected application goes through the standard process: [start the application](/apply) with the fixed file, and treat the first corrected submission as the real one. Rushing a second application without a review is the most expensive mistake on this list.',
        ],
      },
      {
        heading: 'Realistic Timelines for a Reapplication',
        paragraphs: [
          'A standard corrected reapplication typically runs in the same processing window as a fresh one — for the common routes, roughly 3 to 7 business days — though re-applicants can take longer because the file may receive additional scrutiny. Plan a buffer of a few weeks, not a few days. If your travel date is fixed and close, that is an argument for the case review earlier, not later: it is better to learn on day one that the cause is not fixable in time than to lose the window in a second rejection.',
          'The other timeline to respect is the one inside you. A rejected application is not an emergency, and a rushed correction is how a second rejection happens. Fix the cause properly, verify the whole file, and submit. The process rewards patience in a specific, practical way: the corrected file goes through, and the rejection stays where it belongs — in the past.',
        ],
      },
    ],
  },
  {
    slug: 'india-spouse-visa-work-rights',
    title: 'Can You Work in India on a Spouse Visa? Dependent Visa Work Rights Explained',
    metaTitle: 'India Spouse Visa Work Rights: Can You Work?',
    description:
      'India spouse visa work rights explained: what dependent visa holders can and cannot do, the compliant routes if you want to work, and the documents you need.',
    date: '2026-10-30',
    readTime: '5 min read',
    excerpt:
      'A dependent visa is for accompaniment, not employment — but the compliant routes for a spouse who wants to work are clearer than most people assume.',
    primaryKeyword: 'india spouse visa work rights',
    cluster: 'family',
    relatedVisaId: 'spouse',
    relatedVisaLabel: 'Spouse & Dependent Visa',
    sections: [
      {
        paragraphs: [
          'Questions about India spouse visa work rights come up almost as soon as the primary application is approved: the spouse is coming to join you, and the immediate question is whether they can work while they are here. The honest answer is that a dependent (spouse) visa is an accompaniment visa — it exists to let the family member live with the primary visa holder — and in most cases it does not, by itself, authorise employment in India.',
          'That does not mean the spouse has to choose between staying and working. There are compliant routes, and this guide explains what the spouse visa does and does not cover, the two standard routes if the spouse wants to work, how a category switch works, and what dependent holders can typically do in the meantime.',
        ],
      },
      {
        heading: 'What a Spouse (Dependent) Visa Actually Is',
        paragraphs: [
          'A spouse or dependent visa is issued to accompany the primary visa holder — a person on an employment, business, student, or other long-term category — for the period the primary\'s status lasts. The dependent application is typically processed in parallel with the primary application, and the dependent\'s stay is tied to the primary\'s: if the primary\'s status ends, the dependent\'s right to stay ends with it.',
          'The purpose on file is accompaniment, and that single fact drives the work question. The full document set is covered on our [spouse and dependent visa page](/visa/spouse); the short version is a marriage certificate (attested where required), the primary\'s visa and employment evidence, passport copies, and compliant photos.',
          'A practical timing note: because the dependent application runs in parallel with the primary one, the spouse should not travel before the dependent visa is actually granted — arriving on a tourist e-Visa and switching to dependent status afterwards is a different route, and one that should be discussed with the FRRO before it is attempted. Planning both applications together, with the marriage evidence ready, keeps the whole process on one timeline.',
        ],
      },
      {
        heading: 'Can You Work on a Spouse Visa? The Short Answer',
        paragraphs: [
          'Generally, no. A dependent visa holder in India generally cannot take up employment in India without a separate work authorisation. The visa permits the stay; it does not, in most cases, permit the work. By "work" we mean being engaged by an Indian employer, or working for an Indian client or entity as part of a paid engagement inside India.',
          'The careful version of the rule is the one to hold onto: the dependent category is designed for accompaniment, and taking up local employment typically requires a separate authorisation or a separate visa category. Because the details can vary by the primary\'s category and by current FRRO practice, the safe move is to confirm the specific position with the FRRO before the spouse accepts any local engagement.',
        ],
      },
      {
        heading: 'The Two Compliant Routes if Your Spouse Wants to Work',
        paragraphs: [
          'Route one is an employer-sponsored employment visa. If an Indian employer is willing to sponsor, the spouse applies for the B-1 employment visa in their own right — a fresh application in the spouse\'s name, with the employer\'s sponsorship, and with FRRO registration after arrival, like any other employment-category applicant. The [B-1 employment visa page](/visa/b-1) covers the category and its typical document set.',
          'Route two is the business or entrepreneur route. If the spouse is setting up or running a business in India, the E-1 category is the relevant one — again a fresh application in the spouse\'s name, again with FRRO registration after arrival. The [E-1 entrepreneur visa page](/visa/e-1) covers what the business case needs to show.',
          'A third possibility is a change of status from the dependent category while in India — for example, switching from a spouse visa to an employment category once a job offer materialises. That route is available in eligible cases and depends on the FRRO\'s assessment of the specific file; it is not automatic. Treat it as a possibility to verify with the FRRO, not a default to assume.',
        ],
      },
      {
        heading: 'What a Dependent Holder Can Typically Do',
        paragraphs: [
          'Two situations come up often enough to address directly. First, managing the spouse\'s own foreign company remotely: working for a foreign employer, with the employer, the clients, and the income all outside India, is generally a different question from taking up employment in India — but it is still the kind of thing worth confirming with the FRRO if it is substantial and ongoing. Keep the relationship, the clients, and the payment flows clearly outside India.',
          'Second, volunteering. Short, occasional, unpaid volunteering is commonly tolerated in practice, but regular or structured volunteering tied to an Indian entity sits in a grey area — the conservative reading is that it can blur into "work", so check with the FRRO if it is going to be a standing arrangement. In both cases the pattern is the same: the dependent visa is quiet about what is allowed, and the FRRO is the only authority that can confirm a specific situation.',
        ],
      },
      {
        heading: 'The Practical Sequence',
        paragraphs: [
          'If your spouse wants to work, the sequence that avoids the worst version of this problem is: do not start the local engagement on the dependent visa; decide between the B-1 route, the E-1 route, or a change of status; start the new application (the [spouse visa application process](/apply/spouse) page covers the family-side paperwork that stays relevant while the new category is in play); complete FRRO registration after arrival or after the status change; and keep the work relationship, the visa category, and the FRRO registration all pointing in the same direction.',
          'The underlying principle is that the dependent visa is a stay visa, not a work visa, and every compliant route starts from accepting that. Once you accept it, the options are clear — and the FRRO is the one office whose confirmation you should have before any real commitment.',
        ],
      },
    ],
  },
];
