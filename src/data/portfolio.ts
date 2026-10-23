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
  /** Legal company name, shown only in the case-study detail block. */
  company?: string;
  anonymousName: string;
  nameApproved?: boolean;
  /** Shown only when nameApproved is true. */
  logo?: string;
  liveUrl?: string;
  linkApproved?: boolean;
  /** A client hired us. A venture is our own product. Defaults to client. */
  relationship?: "client" | "venture";
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
  /** Legal company name, shown only in the case-study detail block. */
  company?: string;
  anonymousName: string;
  nameApproved: boolean;
  logo?: string;
  liveUrl?: string;
  linkApproved: boolean;
  relationship: "client" | "venture";
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
    relationship: item.relationship ?? "client",
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
    nameApproved: true,
    liveUrl: "https://www.reliefchiropractic.net",
    linkApproved: true,
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
      "We mapped the clinic's day from the first booking to the paid invoice and built one system around it. Patients use their phones. Doctors see their day on one screen. Reminders and phone bookings run without the front desk.",
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
    images: [],
  },
  {
    slug: "push-it",
    publicName: "Push-it",
    company: "Push It Global Technologies",
    anonymousName: "A creator marketplace in Nigeria",
    nameApproved: true,
    liveUrl: "https://pushit.now",
    linkApproved: true,
    relationship: "venture",
    family: "web-applications",
    sector: "Marketing and advertising",
    country: "Nigeria",
    featured: true,
    published: true,
    summary:
      "A marketplace where brands pay for promotional videos and verified creators get paid in their own currency, including mobile money.",
    challenge:
      "Brands across African markets wanted many creators to promote a product at once, but had no reliable way to pay dozens of people across countries, or to be sure each video was actually posted. Creators needed to know they would be paid.",
    approach:
      "Brand funds go into a wallet. Each video is checked before the creator is paid, and creators withdraw to a bank account or mobile money. Every movement of money is recorded, so balances can always be checked.",
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
    images: [],
  },
  {
    slug: "come-clarity",
    publicName: "COME|CLARITY",
    anonymousName: "A leadership learning platform in Ghana",
    nameApproved: true,
    liveUrl: "https://comeclarity.org",
    linkApproved: true,
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
      "We built the whole path in one product: programme page, application, payment, cohort and certificate. Facilitators run their classes from the same system.",
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
    images: [],
  },
  {
    slug: "up2date-connect",
    publicName: "Up2Date Connect",
    anonymousName: "A counseling platform in the United States",
    nameApproved: true,
    liveUrl: "https://up2dateconnect.com",
    linkApproved: true,
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
      "It began as the system we built for a single counseling clinic. We turned it into a platform any counseling organisation can sign up for, each with its own branded portal and web address.",
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
    images: [],
  },
  {
    slug: "set-free-in-christ",
    publicName: "Set Free in Christ Mission",
    anonymousName: "A multilingual ministry in the United States",
    nameApproved: true,
    liveUrl: "https://www.setfreeinchrist.org",
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
      "We gave the staff a private desk where they can change every page, notice and story themselves. Help requests and gifts arrive there too, away from the public site.",
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
    images: [],
  },
  {
    slug: "come",
    publicName: "COME",
    anonymousName: "A leadership organisation",
    nameApproved: true,
    family: "websites",
    sector: "Nonprofit",
    summary: "A leadership website and content platform for programmes, stories and a clear way to take part.",
    challenge:
      "Programmes, stories and calls to action sat in documents and social posts. Visitors could not see a clear path from interest to a next step.",
    approach:
      "We built a content system the team can update as cohorts, events and teaching material change. Programme pages, stories and a way to take part live in one place. The voice stayed the organisation's own.",
    built: [
      "A leadership website and content platform with programme pages, a publishing structure for teaching and stories, and a clear way to take part. It sits alongside the Academy work we still hold with COME.",
    ],
    images: [],
    published: true,
  },
  {
    // Kept unpublished. Up2Date Connect grew out of this clinic system, and that study is the public one.
    slug: "secure-counseling",
    publicName: "Secure Counseling & Psychological Centers",
    anonymousName: "A counseling clinic in the United States",
    nameApproved: true,
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
    images: [],
  },
  {
    slug: "elevate-tribe-learning",
    publicName: "Elevate Tribe Learning",
    anonymousName: "A mentorship programme",
    nameApproved: true,
    family: "web-applications",
    sector: "EdTech",
    summary: "A mentorship platform where matching, sessions and progress sit in one product.",
    challenge:
      "Mentorship was happening in chats and calendars that did not talk to each other. Mentors could not see who they were working with, and learners could not see the path ahead.",
    approach:
      "Profiles, matching, a session rhythm and a simple progress view sit in one product. The brand and the screens match the rest of the programme.",
    built: [
      "A mentorship platform with mentor and learner profiles, matching, session booking and a shared view of the work. The site and the product share one identity.",
    ],
    images: [],
    published: true,
  },
  {
    slug: "elevate-tribe-analytics",
    publicName: "Elevate Tribe Analytics",
    anonymousName: "A data and training studio",
    nameApproved: true,
    family: "websites",
    sector: "Data / training",
    summary: "A data and training services site that explains the offer in plain language.",
    challenge:
      "Prospects had to guess what the team could do from a thin page. Training offers and analytics services were hard to tell apart.",
    approach:
      "The site says what you hire them for, how an engagement runs and what a training track looks like. The visuals stay spare, and the numbers on the site are ones they are ready to stand behind.",
    built: [
      "A data and training services site with clear service lines, a path into an engagement, and a visual system for the analytics and training work.",
    ],
    images: [],
    published: true,
  },
  {
    slug: "uplift-your-morning",
    publicName: "Uplift Your Morning",
    anonymousName: "A daily devotion community",
    nameApproved: true,
    family: "web-applications",
    sector: "Faith / community",
    summary: "A devotion and community platform built around a daily rhythm.",
    challenge:
      "Devotionals, discussion and belonging lived across several apps. A daily practice needed a quieter place than a busy feed.",
    approach:
      "The product is a short ritual: something to read, a way to sit with it, and a way to stay in community. The tone stays warm, and the product stays small.",
    built: [
      "A devotion and community platform with daily content, a simple community layer and a public presence that matches the practice. It is meant to be opened in the morning.",
    ],
    images: [],
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
      "People in Ghana and in the diaspora wanted structured Twi and Fante. Courses existed, but packages, age groups and in-person or virtual options were explained in too many places.",
    approach:
      "We organised the catalogue the way a new student thinks: language, level, format, then enroll. Tutors and testimonials support the decision. The site works for a traveller on a phone and a parent booking a child.",
    built: [
      "A course and enrollment site for Twi and Fante, with group and one-to-one options, in person and online, and a clear checkout into the next class.",
    ],
    images: [],
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

/** A staff desk or admin login must never be offered as the public site. */
function isStaffOrAdminUrl(url: string): boolean {
  try {
    const path = new URL(url).pathname.toLowerCase();
    return path.includes("/admin") || path.includes("/login") || path.includes("/staff");
  } catch {
    return true;
  }
}

/** The public site link. Hidden unless the owner has approved it. */
export function displayLiveUrl(item: PortfolioItem): string | undefined {
  if (!item.linkApproved) return undefined;
  const url = visibleText(item.liveUrl);
  if (!url || !/^https?:\/\//i.test(url) || isStaffOrAdminUrl(url)) return undefined;
  return url;
}

export function displayCountry(item: PortfolioItem): string | undefined {
  return visibleText(item.country);
}

/** Family, sector, and country. Empty country is left out. A venture also gets "Studio venture". */
export function studyTags(item: PortfolioItem): string[] {
  const tags = studyFamilies(item).map((slug) => familyLabel(slug));
  const sector = visibleText(item.sector);
  if (sector) tags.push(sector);
  const country = displayCountry(item);
  if (country) tags.push(country);
  if (item.relationship === "venture") tags.push("Studio venture");
  return tags;
}

/**
 * Real product screenshots live in public/images/work/[slug]/.
 * Anything else in the images list is ignored, so a stock photo cannot slip onto a card.
 */
export function studyScreenshots(item: PortfolioItem): string[] {
  const prefix = `/images/work/${item.slug}/`;
  return item.images.flatMap((src) => {
    const text = visibleText(src);
    return text && text.startsWith(prefix) ? [text] : [];
  });
}

export function coverImage(item: PortfolioItem): string | undefined {
  return studyScreenshots(item)[0];
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
