import { insightPaths } from "./content/insights/slugs";
import { publicWorkPaths } from "./data/portfolio";

/** Pages around the case studies. The study addresses are filled in separately. */
const afterWork = ["/about", "/smartcrm", "/academy", "/contact", "/privacy", "/terms", "/cookies", "/responsible-ai"];

/** A case-study address for each published slug, in the order the API sent them. */
export function workPathsFor(slugs: string[]): string[] {
  return slugs.filter((slug) => slug.trim().length > 0).map((slug) => `/work/${slug}`);
}

/** Pages a search engine should list. */
export function indexableRoutesFor(workPaths: string[]): string[] {
  return ["/", "/work", ...workPaths, ...afterWork];
}

/**
 * Every public URL the prerender step saves.
 * The notes stay on this list. The sitemap uses indexableRoutesFor.
 */
export function publicRoutesFor(workPaths: string[]): string[] {
  return ["/", "/work", ...workPaths, "/about", "/insights", ...insightPaths(), ...afterWork.slice(1)];
}

/** Starter list, used only when the project API cannot be reached at build time. */
export const indexableRoutes = indexableRoutesFor(publicWorkPaths());

/** Starter list, used only when the project API cannot be reached at build time. */
export const publicRoutes = publicRoutesFor(publicWorkPaths());
