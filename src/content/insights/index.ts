import weeklyNumbers from "./weekly-numbers.md?raw";
import websiteSigns from "./website-signs.md?raw";
import whatsappBookings from "./whatsapp-bookings.md?raw";
import { familyLabel, type FamilySlug } from "../../data/portfolio";
import { insightSlugs } from "./slugs";

export const insightsPage = {
  seo: {
    title: "Notes from the studio",
    description: "Notes on WhatsApp assistants, websites and the numbers a business should see each week.",
    path: "/insights",
  },
  kicker: "Insights",
  title: "Notes from the studio",
  lede: "Short notes from the work: assistants, websites and the numbers an owner should see.",
  empty: "Nothing in this set yet.",
  all: "All",
} as const;

export type InsightArticle = {
  slug: string;
  title: string;
  description: string;
  date: string;
  family: FamilySlug;
  familyLabel: string;
  cover: string;
  body: string;
  minutes: number;
};

const rawBySlug = {
  "whatsapp-bookings": whatsappBookings,
  "website-signs": websiteSigns,
  "weekly-numbers": weeklyNumbers,
} as const;

const sources = insightSlugs.map((slug) => ({ slug, raw: rawBySlug[slug] }));

function readFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw.trim() };
  const meta: Record<string, string> = {};
  match[1].split("\n").forEach((line) => {
    const splitAt = line.indexOf(":");
    if (splitAt === -1) return;
    meta[line.slice(0, splitAt).trim()] = line.slice(splitAt + 1).trim();
  });
  return { meta, body: match[2].trim() };
}

/** 200 words a minute, rounded up, and never shorter than 2 minutes. */
function readingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 200));
}

function toArticle(slug: string, raw: string): InsightArticle {
  const { meta, body } = readFrontmatter(raw);
  const family = (meta.family || "brand-websites") as FamilySlug;
  return {
    slug,
    title: meta.title || slug,
    description: meta.description || "",
    date: meta.date || "",
    family,
    familyLabel: familyLabel(family),
    cover: meta.cover || "/brand/png/og-default-1200.png",
    body,
    minutes: readingMinutes(body),
  };
}

/** Newest first. The homepage teaser uses the first three. */
export const articles: InsightArticle[] = sources
  .map((source) => toArticle(source.slug, source.raw))
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/** The menu and footer show Insights once this many notes are published. */
export const insightsMenuMinimum = 3;

/** True when there are enough published notes to open the Insights links. */
export function insightsMenuOpen(publishedCount: number): boolean {
  return publishedCount >= insightsMenuMinimum;
}

export function getArticle(slug: string | undefined): InsightArticle | undefined {
  return articles.find((article) => article.slug === slug);
}

export function formatInsightDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (!year || !month || !day) return iso;
  return `${day} ${names[month - 1]} ${year}`;
}
