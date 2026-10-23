import { insightPaths } from "./content/insights/slugs";
import { publicWorkPaths } from "./data/portfolio";

/**
 * Every public URL.
 * The sitemap and the prerender step both read this list.
 * Unpublished case studies are left out.
 */
export const publicRoutes = [
  "/",
  "/services",
  "/services/websites",
  "/services/web-applications",
  "/services/mobile-apps",
  "/services/brand-design",
  "/services/automation-ai",
  "/services/data-growth",
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
