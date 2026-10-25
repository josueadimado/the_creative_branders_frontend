/**
 * The address of the API, always ending in /api.
 * Dokploy can set the host on its own, or the host plus /api.
 * Either way, form posts and the content desk land on the right path.
 */
export function apiRoot() {
  const raw = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "");
  return raw.endsWith("/api") ? raw : `${raw}/api`;
}
