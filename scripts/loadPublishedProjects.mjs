/**
 * The published projects, read at build time from the live API.
 * If that request fails, the caller uses the starter list in portfolio.ts.
 */
export const PROJECTS_API = "https://api.thecreativebranders.com/api/content/projects/";

export async function fetchPublishedProjects() {
  const response = await fetch(PROJECTS_API, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`The project API replied HTTP ${response.status}.`);
  const data = await response.json();
  const items = Array.isArray(data) ? data : data?.results;
  if (!Array.isArray(items)) throw new Error("The project API did not return a list.");
  return items.filter((item) => item && typeof item.slug === "string" && item.slug.trim());
}
