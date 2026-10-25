import { insightPaths } from "./content/insights/slugs";
import { publicWorkPaths } from "./data/portfolio";

/**
 * Pages a search engine should list.
 * The notes stay off this list until the Insights menu opens a real page.
 */
export const indexableRoutes = [
  "/",
  "/work",
  ...publicWorkPaths(),
  "/about",
  "/smartcrm",
  "/academy",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/responsible-ai",
];

/**
 * Every public URL, including the notes.
 * The prerender step saves these. The sitemap uses indexableRoutes.
 */
export const publicRoutes = [
  "/",
  "/work",
  ...publicWorkPaths(),
  "/about",
  "/insights",
  ...insightPaths(),
  "/smartcrm",
  "/academy",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/responsible-ai",
];
