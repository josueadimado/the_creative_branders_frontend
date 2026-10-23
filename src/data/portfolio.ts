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
    publicName: "Relief Chiropractic",
    anonymousName: "A chiropractic clinic in Michigan",
    nameApproved: true,
    family: "web-applications",
    sector: "Healthcare",
    summary: "A clinic booking system so patients can take a slot without a phone tag loop.",
    challenge:
      "The front desk was the system. Appointments lived in a book, a phone, and whoever was standing at reception. Patients dropped off. Staff spent the morning chasing confirmations instead of preparing rooms.",
    approach:
      "We treated booking as the product, not a form on a brochure site. The flow had to work on a phone, in a noisy waiting area, and for a first-time patient who does not know the difference between an adjustment and a follow-up.",
    built: [
      "A clinic booking system: service types, practitioner calendars, reminders, and a simple admin view of the day. Brand and site sit around that system so the clinic looks as organised as the diary now is.",
    ],
    images: ["/images/work-clinic.jpg"],
    featured: true,
    published: true,
  },
  {
    slug: "secure-counseling",
    publicName: "Secure Counseling & Psychological Centers",
    anonymousName: "A counseling clinic in the United States",
    nameApproved: true,
    family: "web-applications",
    sector: "Behavioral health",
    summary: "A session management platform that keeps notes, schedules, and follow-up in one place.",
    challenge:
      "Counselors were holding caseloads in their heads and in scattered files. Session notes, next appointments, and who needed a check-in did not live together. That is a risk for care, and a drain on the people doing the work.",
    approach:
      "We designed for privacy and calm first. The interface had to be quiet enough for a clinician between sessions, and strict enough that records stay where they belong. No extra chrome. No theatre.",
    built: [
      "A session management platform: calendars, client records, session notes, and follow-up prompts in one login. The public site explains the practice. The product runs the practice.",
    ],
    images: ["/images/work-counseling.jpg"],
    featured: true,
    published: true,
  },
  {
    slug: "up2date-connect",
    publicName: "Up2Date Connect",
    anonymousName: "A counseling platform in the United States",
    nameApproved: true,
    family: "web-applications",
    sector: "Behavioral health",
    summary: "Real-time case coordination so teams see the same case, at the same time.",
    challenge:
      "Cases moved between people faster than the paperwork. A coordinator, a clinician, and a partner organisation could each be working from a different version of the truth. Handoffs leaked. Clients felt it.",
    approach:
      "We mapped the actual path of a case, not an org chart. Then we built a shared board that updates as work happens, so coordination is the default instead of a meeting.",
    built: [
      "A real-time case coordination tool: shared case status, assignments, notes, and alerts when something changes. Built for teams who cannot wait until Friday to find out a client fell through.",
    ],
    images: ["/images/work-ops.jpg"],
    featured: true,
    published: true,
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
    featured: true,
    published: true,
  },
  {
    slug: "come-clarity",
    publicName: "COME|CLARITY",
    anonymousName: "A leadership learning platform in Ghana",
    nameApproved: true,
    family: "web-applications",
    sector: "EdTech",
    summary: "An executive learning platform for cohort pathways, live formation, and alumni, not a pile of videos.",
    challenge:
      "Leaders across Africa and the diaspora were being asked to grow from PDFs and generic courses. Conviction was already there. The missing piece was a structured place to practice, with a cohort, and leave with something they could use at work the next morning.",
    approach:
      "We designed around pathways and live cohorts, not a content dump. Application, placement, weekly sessions, and alumni had to feel like one product. The public site had to explain that without sounding like a campus brochure.",
    built: [
      "An executive learning platform: formation pathways, cohort application and seating, live-session structure, and a public site that states the offer in plain language. Curriculum copy on the marketing surface stays theirs to own.",
    ],
    images: ["/images/work-edtech.jpg"],
    published: true,
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
const FEATURED_ORDER = ["relief-chiropractic", "secure-counseling", "up2date-connect", "come"];

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
