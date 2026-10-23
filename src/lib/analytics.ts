/**
 * Google Analytics, loaded only after someone allows it.
 * If VITE_GA_ID is empty, none of this runs and no script is added.
 */

const GA_ID = import.meta.env.VITE_GA_ID || "";
const CONSENT_KEY = "tcb-consent";

type Consent = "essential" | "analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function hasAnalyticsId() {
  return GA_ID.length > 0;
}

export function readConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "essential" || value === "analytics" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Private browsing can block storage. The choice still applies for this visit.
  }
}

/** Adds the Google script once. Safe to call more than once. */
export function loadAnalytics() {
  if (!GA_ID || window.gtag) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  // We send page views ourselves, because this is a single-page app.
  window.gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false });
}

export function track(event: string, params?: Record<string, string>) {
  if (!GA_ID || readConsent() !== "analytics" || !window.gtag) return;
  window.gtag("event", event, params);
}

/** A work-page filter chip. `filter` is the chosen family, sector, or "all". */
export function trackWorkFilter(filter: string) {
  track("work_filter", { filter });
}
