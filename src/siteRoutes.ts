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
  "/smartcrm",
  "/academy",
  "/contact",
  "/privacy",
  "/terms",
  "/cookies",
  "/responsible-ai",
];
