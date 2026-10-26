/**
 * The note files that ship with the site.
 * The sitemap reads this file on its own, so it never has to open the article text.
 */
export const insightSlugs = ["whatsapp-bookings", "website-signs", "weekly-numbers"] as const;

/** The menu, the sitemap, and search stay off until this many notes are published. */
export const insightsMenuMinimum = 3;

/**
 * Addresses for search and the saved pages.
 * Fewer than three published notes means an empty list, so Insights stays out.
 */
export function notePathsFor(slugs: string[]): string[] {
  const clean = slugs.map((slug) => slug.trim()).filter((slug) => slug.length > 0);
  if (clean.length < insightsMenuMinimum) return [];
  return ["/insights", ...clean.map((slug) => `/insights/${slug}`)];
}

/** Starter notes are drafts, so nothing is listed until the build is given published slugs. */
export function insightPaths(): string[] {
  return notePathsFor([]);
}
