/**
 * Google Analytics, loaded only after someone allows it.
 * If VITE_GA_ID is empty, none of this runs and no script is added.
 */

const GA_ID = import.meta.env.VITE_GA_ID || "";
const CONSENT_KEY = "tcb-consent";
const ONE_YEAR = 60 * 60 * 24 * 365;

export type Consent = "essential" | "analytics";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function hasAnalyticsId() {
  return GA_ID.length > 0;
}

function asConsent(value: string | null | undefined): Consent | null {
  return value === "essential" || value === "analytics" ? value : null;
}

function readCookie(): Consent | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie.split("; ").find((item) => item.startsWith(`${CONSENT_KEY}=`));
  return asConsent(row?.slice(CONSENT_KEY.length + 1));
}

export function readConsent(): Consent | null {
  const saved = readCookie();
  if (saved) return saved;
  try {
    return asConsent(localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_KEY}=${value}; Max-Age=${ONE_YEAR}; Path=/; SameSite=Lax${secure}`;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Private browsing can block storage. The cookie above still remembers the choice.
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
