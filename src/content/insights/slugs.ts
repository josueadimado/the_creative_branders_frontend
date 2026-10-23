/**
 * Published note addresses.
 * The sitemap reads this file on its own, so it never has to open the article text.
 */
export const insightSlugs = ["whatsapp-bookings", "website-signs", "weekly-numbers"] as const;

export function insightPaths(): string[] {
  return insightSlugs.map((slug) => `/insights/${slug}`);
}
