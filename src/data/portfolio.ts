/**
 * Case studies.
 *
 * A client's real name and logo stay hidden until nameApproved is true.
 * A "Visit site" link stays hidden until linkApproved is true.
 * Both flags default to false. Text that still contains an [ASK OWNER] note
 * is kept in this file for the studio and is never shown on the site.
 */

export const FAMILIES = [
  { slug: "websites", label: "Websites" },
  { slug: "web-applications", label: "Web Applications" },
  { slug: "mobile-apps", label: "Mobile Apps" },
  { slug: "brand-design", label: "Brand & Design" },
  { slug: "automation-ai", label: "Automation & AI" },
  { slug: "data-growth", label: "Data & Growth" },
] as const;

export type FamilySlug = (typeof FAMILIES)[number]["slug"];

export type WorkResult = {
  value: string;
  label: string;
};

export type WorkQuote = {
  text: string;
  name?: string;
  title?: string;
  company?: string;
};

type StudyInput = {
  slug: string;
  publicName: string;
  anonymousName: string;
  nameApproved?: boolean;
  /** Shown only when nameApproved is true. */
  logo?: string;
  liveUrl?: string;
  linkApproved?: boolean;
  family: FamilySlug;
  /** Other families this study also belongs to. The first family above is the main one. */
  secondaryFamilies?: FamilySlug[];
  sector: string;
  /** Leave empty when we do not know the country. The tag is hidden. */
  country?: string;
  featured?: boolean;
  published?: boolean;
  summary: string;
  challenge: string;
  approach: string;
  built: string[];
  stack?: string[];
  results?: WorkResult[];
  quote?: WorkQuote;
  images: string[];
  /** Wide shots use the browser frame. Portrait app shots use the phone frame. */
  device?: "browser" | "phone";
};

export type PortfolioItem = {
  slug: string;
  publicName: string;
  anonymousName: string;
  nameApproved: boolean;
  logo?: string;
  liveUrl?: string;
  linkApproved: boolean;
  family: FamilySlug;
  secondaryFamilies: FamilySlug[];
  sector: string;
  country?: string;
  featured: boolean;
  published: boolean;
  summary: string;
  challenge: string;
  approach: string;
  built: string[];
  stack: string[];
  results: WorkResult[];
  quote?: WorkQuote;
  images: string[];
  device: "browser" | "phone";
};

/** Notes for the studio, written as [ASK OWNER] or [ASK OWNER: a question]. */
const OWNER_NOTE = /\[ASK OWNER\b[^\]]*\]/i;

/** Returns the text, or nothing if it is blank or still waiting on the owner. */
export function visibleText(value: string | undefined | null): string | undefined {
  if (value == null) return undefined;
  if (OWNER_NOTE.test(value)) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function visibleList(items: string[]): string[] {
  return items.flatMap((item) => {
    const text = visibleText(item);
    return text ? [text] : [];
  });
}

function settle(item: StudyInput): PortfolioItem {
  return {
    ...item,
    nameApproved: item.nameApproved ?? false,
    linkApproved: item.linkApproved ?? false,
    secondaryFamilies: item.secondaryFamilies ?? [],
    featured: item.featured ?? false,
    published: item.published ?? false,
    stack: item.stack ?? [],
    results: item.results ?? [],
    device: item.device ?? "browser",
  };
}

const studies: StudyInput[] = [
  {
    slug: "relief-chiropractic",
    publicName: "Relief Chiropractic & Wellness Center",
    anonymousName: "A chiropractic clinic in Michigan",
    nameApproved: false,
    liveUrl: "https://book.reliefchiropractic.net",
    linkApproved: false,
    family: "web-applications",
    secondaryFamilies: ["automation-ai"],
    sector: "Healthcare",
    country: "United States",
    featured: true,
    published: true,
    summary:
      "One system for booking, check-in, charts and payments, with a phone assistant that books appointments on its own.",
    challenge:
      "Booking, front-desk check-in, doctor charts and billing lived in separate places: a website, paper forms, a card reader and a billing tool. Every appointment meant re-entering the same patient several times, and every reminder was a phone call someone had to make.",
    approach:
      "We treated the clinic's day as one flow, from the first booking to the paid invoice. Patients get a simple path on their phone. Doctors get the day on one screen. The front desk gets fewer calls, because reminders and phone bookings run without them.",
    built: [
      "Online booking, rescheduling and cancellation, with intake forms completed before the visit",
      "A lobby check-in screen that tells the front desk a patient has arrived",
      "Doctor day view with charts, visit history and billing in one place",
      "Admin tools for schedule, services, providers, invoices, patient credit and US insurance claims (CMS-1500)",
      "Card payments online, by link, on a card reader or with a saved card",
      "Automatic text and email confirmations and reminders",
      "An AI phone assistant that books callers into real open slots",
      "Two-way sync with each doctor's Google Calendar",
    ],
    stack: ["Next.js", "Django", "PostgreSQL", "Celery", "Square", "Twilio (SMS and voice)", "OpenAI", "Google Calendar"],
    results: [],
    images: ["/images/work-clinic.jpg"],
  },
  {
    slug: "push-it",
    publicName: "Push It Global Technologies",
    anonymousName: "A creator marketplace in Nigeria",
    nameApproved: false,
    liveUrl: "https://pushit.now",
    linkApproved: false,
    family: "web-applications",
    sector: "Marketing and advertising",
    country: "Nigeria",
    featured: true,
    published: true,
    summary:
      "A marketplace where brands pay for promotional videos and verified creators get paid in their own currency, including mobile money.",
    challenge:
      "Brands wanted many creators to promote a product at once, but had no reliable way to pay dozens of people across countries, or to be sure each video was actually posted. Creators needed to know they would be paid.",
    approach:
      "We built the trust into the money. Brand funds sit in a wallet, each video is checked before payment is released, and creators withdraw locally. Every wallet movement is recorded in a ledger, so balances can always be proved.",
    built: [
      "Brand onboarding with business verification and wallet top-ups by card or bank",
      "Campaign builder with live pricing before launch",
      "Campaign tracking with every creator's submission and status",
      "Creator onboarding with verified TikTok, Instagram, YouTube and Facebook accounts",
      "A job feed, video submission and in-app earnings",
      "Payouts to bank accounts or MTN, Vodafone and AirtelTigo mobile money",
      "Multi-currency support (NGN, GHS, KES, ZAR, USD) with live exchange rates",
      "An operations dashboard for verifications, video approval, payouts and reports",
      "Team roles for brands, two-factor login for everyone",
    ],
    stack: ["React", "TypeScript", "Django", "PostgreSQL", "Celery", "Paystack"],
    results: [],
    images: ["/images/work-ops.jpg"],
  },
  {
    slug: "come-clarity",
    publicName: "COME|CLARITY",
    anonymousName: "A leadership learning platform in Ghana",
    nameApproved: false,
    liveUrl: "https://comeclarity.org",
    linkApproved: false,
    family: "web-applications",
    secondaryFamilies: ["websites"],
    sector: "Education",
    country: "Ghana",
    featured: true,
    published: true,
    summary: "An executive learning platform: apply, pay, join a live cohort and finish with a certificate, all in one place.",
    challenge:
      "Leaders had conviction but no structured place to practise it. Applications, payments, class schedules and materials were spread across forms, chats and documents, which made cohorts hard to run and harder to finish.",
    approach:
      "We designed around the pathway, not a library of videos. A person moves from programme page to application, payment, cohort and certificate in one product, and facilitators run their class from the same system.",
    built: [
      "Public site with programme pages and an online application",
      "Checkout through Paystack, priced in cedis for Ghana and US dollars elsewhere, plus payment plans reviewed by staff",
      "Week-by-week learner pathway: live classes, recordings, assignments, quizzes and reading",
      "Leadership self-assessment with a personal profile",
      "Facilitator tools for attendance, grading, announcements and unlocking weeks",
      "Admin area for applications, cohorts, programmes and offline payments",
      "PDF certificates and an alumni area",
    ],
    stack: ["Next.js", "Django", "PostgreSQL", "Celery", "Paystack", "Cloudflare R2"],
    results: [],
    images: ["/images/work-edtech.jpg"],
  },
  {
    slug: "up2date-connect",
    publicName: "Up2Date Connect",
    anonymousName: "A counseling platform in the United States",
    nameApproved: false,
    liveUrl: "https://up2dateconnect.com",
    linkApproved: false,
    family: "web-applications",
    secondaryFamilies: ["websites"],
    sector: "Behavioral health",
    country: "United States",
    featured: true,
    published: true,
    summary:
      "A software platform that lets any counseling organisation run its programmes, clients, referral partners and payments under its own brand.",
    challenge:
      "Counseling teams, the people in their programmes and the agencies that refer them were each keeping their own record, in spreadsheets, on paper and over the phone. Nobody shared one current picture of a case, and every status update meant another call.",
    approach:
      "We took a system proven inside one clinic and turned it into a product many organisations can use. Each organisation gets its own branded portal and web address, while every record stays tied to the organisation it belongs to.",
    built: [
      "Self-serve signup for counseling organisations, each with its own branding, letterhead and web address",
      "Staff workspace: a \"Today\" dashboard, client directory, sessions, groups, attendance and calendar",
      "Client portal for intake, sessions, documents and payments",
      "Referral partner portal to submit referrals and receive progress updates",
      "Payments by card (Square), plus optional Cash App and Venmo, with reminders",
      "Monthly progress reports and completion certificates as PDFs",
      "Email and text reminders, Zoom sessions and Google Calendar sync",
      "Operator tools for organisations, plans and billing, plus a content editor for the public site",
      "English, Spanish and French interface; authenticator-app sign-in; encrypted secrets; nightly encrypted backups",
    ],
    stack: ["React", "TypeScript", "Django", "PostgreSQL", "Celery", "Square", "Twilio", "Zoom"],
    results: [],
    images: ["/images/work-counseling.jpg"],
  },
  {
    slug: "set-free-in-christ",
    publicName: "Set Free in Christ Mission",
    anonymousName: "A multilingual ministry in the United States",
    nameApproved: false,
    liveUrl: "https://setfreeinchrist.org",
    linkApproved: true,
    family: "websites",
    secondaryFamilies: ["web-applications"],
    sector: "Nonprofit / faith",
    country: "United States",
    featured: false,
    published: true,
    summary:
      "A ministry website in four languages, with online giving and a staff desk that lets the team run the site without a developer.",
    challenge:
      "Teaching, help requests, trainings and giving were spread across channels, and every content change needed technical help. The ministry also serves readers who don't read English first.",
    approach:
      "We built a website the staff can own. Every page, notice, story and training is editable from a private desk. Requests for help and gifts arrive in the same place, kept away from the public site.",
    built: [
      "Public site in English, French, Spanish and Portuguese",
      "Find Help requests for prayer and pastoral support",
      "Teaching library, videos, trainings and trip sign-ups",
      "One-time and monthly giving by card, with a way to finish an incomplete gift",
      "Newsletter sign-up and sending",
      "\"Mission Desk\", a staff workspace for content, messages, help requests, gifts and the newsletter",
      "Search, share previews and sitemap for discoverability",
    ],
    stack: ["React", "TypeScript", "Django", "Stripe"],
    results: [],
    images: ["/images/work-nonprofit.jpg"],
  },
  {
    slug: "come",
    publicName: "COME",
    anonymousName: "A leadership organisation",
    nameApproved: true,
    family: "websites",
    sector: "Nonprofit",
    summary: "A leadership website and content platform that can hold programmes, not just a homepage.",
    challenge:
      "The work was serious. The site was not. Programmes, stories, and calls to action sat in documents and social posts. Visitors could not see a clear path from conviction to a next step.",
    approach:
      "We built a content system, not a one-off brochure. Pages had to be easy to update as cohorts, events, and teaching material change. The voice stayed institutional. We, not a founder headline.",
    built: [
      "A leadership website and content platform: programme pages, a publishing structure for teaching and stories, and a clear way to take part. Partner to the Academy work we still hold with COME.",
    ],
    images: ["/images/work-nonprofit.jpg"],
    published: true,
  },
  {
    // Kept unpublished. Up2Date Connect grew out of this clinic system, and that study is the public one.
    slug: "secure-counseling",
    publicName: "Secure Counseling & Psychological Centers",
    anonymousName: "A counseling clinic in the United States",
    nameApproved: false,
    linkApproved: false,
    family: "web-applications",
    sector: "Behavioral health",
    country: "United States",
    featured: false,
    published: false,
    summary:
      "A private platform where a counseling clinic, its clients and referral partners manage programmes, sessions, payments and progress reports.",
    challenge:
      "The clinic runs court-referred and voluntary programmes. Each case needs enrollment, attendance, payments and written progress, and referral partners such as probation officers and attorneys need accurate updates. That work was being assembled by hand from a calendar, a payment tool, paper intake and report documents.",
    approach:
      "We designed for privacy and calm. Three separate signed-in areas (staff, clients, partners) each see only what they should. The interface stays quiet enough for a clinician between sessions.",
    built: [
      "Staff dashboard for clients, referrals, groups, programmes, assessments and calendar",
      "Attendance tracking with follow-up for people who stop attending",
      "Client portal for intake paperwork with signature, sessions, assessment booking and online payment",
      "Referral partner portal to refer clients, follow cases and download reports",
      "PDF progress reports and programme completion certificates",
      "Email and text reminders for sessions, payments and case updates",
      "In-person, phone and video sessions",
      "English, Spanish and French interface",
      "Privacy controls: role-based access, an audit log and texting held back until a privacy agreement is in place",
    ],
    stack: ["Next.js", "Django", "PostgreSQL", "Celery", "Square", "Twilio"],
    results: [],
    images: ["/images/work-counseling.jpg"],
  },
  {
    slug: "elevate-tribe-learning",
    publicName: "Elevate Tribe Learning",
    anonymousName: "A mentorship programme",
    nameApproved: true,
    family: "web-applications",
    sector: "EdTech",
    summary: "A mentorship platform where matching, sessions, and progress sit in one product.",
    challenge:
      "Mentorship was happening in chats and calendars that did not talk to each other. Mentors could not see a clean picture of who they were holding. Learners could not see the path. The programme was stronger than the tooling.",
    approach:
      "We made the relationship the unit of the product. Profiles, matching, session cadence, and a simple progress view. Brand and UI had to feel like a studio, not a school portal from 2012.",
    built: [
      "A mentorship platform: mentor and learner profiles, matching, session booking, and a shared view of the work. Site and product share one identity so the programme looks as considered as the conversations it holds.",
    ],
    images: ["/images/work-mentorship.jpg"],
    published: true,
  },
  {
    slug: "elevate-tribe-analytics",
    publicName: "Elevate Tribe Analytics",
    anonymousName: "A data and training studio",
    nameApproved: true,
    family: "websites",
    sector: "Data / training",
    summary: "A data and training services site that explains the offer without drowning people in charts.",
    challenge:
      "The team could do the work. The website could not say so. Prospects had to infer capability from a thin page. Training offers and analytics services blurred into each other.",
    approach:
      "We split the story: what you hire them for, how an engagement runs, and what a training track looks like. Visuals stay spare. Numbers on the site are only the ones they are ready to stand behind.",
    built: [
      "A data and training services site: clear service lines, a path into an engagement, and a visual system that reads as intelligence work, not generic consulting.",
    ],
    images: ["/images/work-analytics.jpg"],
    published: true,
  },
  {
    slug: "uplift-your-morning",
    publicName: "Uplift Your Morning",
    anonymousName: "A daily devotion community",
    nameApproved: true,
    family: "web-applications",
    sector: "Faith / community",
    summary: "A devotion and community platform for a daily rhythm, not a dump of posts.",
    challenge:
      "The practice was daily. The tools were not. Devotionals, discussion, and belonging lived across apps. People who needed a quiet morning kept getting a noisy feed.",
    approach:
      "We designed for a short, repeatable ritual: something to read, a way to sit with it, a way to stay in community without scrolling for an hour. Tone stayed warm. The product stayed small.",
    built: [
      "A devotion and community platform: daily content, a simple community layer, and a public presence that matches the practice. Built to be opened in the morning, then put down.",
    ],
    images: ["/images/work-faith.jpg"],
    published: true,
  },
  {
    slug: "twi-learning-center",
    publicName: "Twi Learning Center Ghana",
    anonymousName: "A language school in Ghana",
    nameApproved: true,
    family: "websites",
    sector: "Education",
    country: "Ghana",
    summary: "A course and enrollment site for Twi and Fante, in person and online, with a path that is easy to start.",
    challenge:
      "People in Ghana and in the diaspora wanted structured Twi and Fante, not a random tutor chat. Courses existed. Getting from “I want to learn” to a paid seat was still friction: packages, kids vs adults, in-person vs virtual, all explained in too many places.",
    approach:
      "We organised the catalogue the way a new student thinks: language, level, format, then enroll. Tutors and testimonials support the decision. The site had to work for a traveller on a phone and a parent booking a child.",
    built: [
      "A course and enrollment site: Twi and Fante tracks, group and one-to-one options, in-person and virtual, and a clear checkout into the next class. Copy stays theirs. The structure is ours.",
    ],
    images: ["/images/work-twi.jpg"],
    published: true,
  },
];

export const portfolio: PortfolioItem[] = studies.map(settle);

/** Homepage order. Studies not in this list still appear on /work, after the featured ones. */
const FEATURED_ORDER = ["relief-chiropractic", "push-it", "come-clarity", "up2date-connect"];

export function familyLabel(slug: FamilySlug): string {
  return FAMILIES.find((family) => family.slug === slug)?.label ?? slug;
}

export function studyFamilies(item: PortfolioItem): FamilySlug[] {
  return [item.family, ...item.secondaryFamilies];
}

/** The name the public site is allowed to show. */
export function displayName(item: PortfolioItem): string {
  if (item.nameApproved) {
    const approved = visibleText(item.publicName);
    if (approved) return approved;
  }
  return visibleText(item.anonymousName) ?? "A client project";
}

/** A logo is never shown for a client who has not approved their name. */
export function displayLogo(item: PortfolioItem): string | undefined {
  if (!item.nameApproved) return undefined;
  return visibleText(item.logo);
}

/** The public site link. Hidden unless the owner has approved it. */
export function displayLiveUrl(item: PortfolioItem): string | undefined {
  if (!item.linkApproved) return undefined;
  const url = visibleText(item.liveUrl);
  if (!url || !/^https?:\/\//i.test(url)) return undefined;
  return url;
}

export function displayCountry(item: PortfolioItem): string | undefined {
  return visibleText(item.country);
}

/** Family, sector, and country. Empty country is left out. No middle dots. */
export function studyTags(item: PortfolioItem): string[] {
  const tags = studyFamilies(item).map((slug) => familyLabel(slug));
  const sector = visibleText(item.sector);
  if (sector) tags.push(sector);
  const country = displayCountry(item);
  if (country) tags.push(country);
  return tags;
}

export function coverImage(item: PortfolioItem): string | undefined {
  return item.images.map((src) => visibleText(src)).find((src): src is string => Boolean(src));
}

export function visibleBuilt(item: PortfolioItem): string[] {
  return visibleList(item.built);
}

export function visibleStack(item: PortfolioItem): string[] {
  return visibleList(item.stack);
}

export function visibleResults(item: PortfolioItem): WorkResult[] {
  return item.results.filter((result) => visibleText(result.value) && visibleText(result.label));
}

export function visibleQuote(item: PortfolioItem): WorkQuote | undefined {
  if (!item.quote || !visibleText(item.quote.text)) return undefined;
  return item.quote;
}

export function publishedWork(): PortfolioItem[] {
  const published = portfolio.filter((item) => item.published);
  return [...published].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    const ai = FEATURED_ORDER.indexOf(a.slug);
    const bi = FEATURED_ORDER.indexOf(b.slug);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export function featuredStudies(): PortfolioItem[] {
  return FEATURED_ORDER.flatMap((slug) => {
    const item = portfolio.find((study) => study.slug === slug && study.published && study.featured);
    return item ? [item] : [];
  });
}

export function getPublishedStudy(slug: string | undefined): PortfolioItem | undefined {
  if (!slug) return undefined;
  return portfolio.find((item) => item.slug === slug && item.published);
}

export function publicWorkPaths(): string[] {
  return portfolio.filter((item) => item.published).map((item) => `/work/${item.slug}`);
}

export function familiesInUse(): { slug: FamilySlug; label: string }[] {
  const used = new Set<FamilySlug>();
  publishedWork().forEach((item) => {
    studyFamilies(item).forEach((slug) => used.add(slug));
  });
  return FAMILIES.filter((family) => used.has(family.slug));
}

export function sectorsInUse(): string[] {
  const seen: string[] = [];
  publishedWork().forEach((item) => {
    const sector = visibleText(item.sector);
    if (sector && !seen.includes(sector)) seen.push(sector);
  });
  return seen;
}

export function studyMatchesFamily(item: PortfolioItem, family: string | null): boolean {
  if (!family) return true;
  return studyFamilies(item).some((slug) => slug === family);
}
