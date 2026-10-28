/**
 * Google Analytics and the studio event log, only after someone allows analytics.
 * GA script loads when VITE_GA_ID is set. Studio events still save to our API without it.
 */

import { apiRoot } from "./apiBase";

const GA_ID = import.meta.env.VITE_GA_ID || "";
const CONSENT_KEY = "tcb-consent";
/** About six months. After that the question is asked again. */
const SIX_MONTHS = 60 * 60 * 24 * 182;
/** True only after Accept has allowed analytics on this page view. */
let analyticsGranted = false;

/** Business actions we keep in our own database. Page views stay in GA4 only. */
const STUDIO_EVENTS = new Set([
  "start_project_click",
  "audit_cta_click",
  "case_study_view",
  "work_filter",
  "whatsapp_click",
  "email_click",
  "phone_click",
  "brief_submit",
  "waitlist_signup",
]);

export type ConsentChoice = {
  /** Always on. These cookies keep the site working. */
  necessary: true;
  analytics: boolean;
  /** Saved for later. No marketing tracker is loaded yet. */
  marketing: boolean;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    /** Set once the denied-by-default consent command has been queued. */
    __tcbConsentDefault?: boolean;
  }
}

export function hasAnalyticsId() {
  return GA_ID.length > 0;
}

/** True only when a marketing id has been set. No marketing script is added here. */
export function hasMarketingTracker() {
  const meta = (import.meta.env.VITE_META_PIXEL_ID || "").trim();
  const linkedin = (import.meta.env.VITE_LINKEDIN_PARTNER_ID || "").trim();
  return meta.length > 0 || linkedin.length > 0;
}

/** The banner always appears — studio analytics needs a clear Accept even without GA. */
export function bannerCanAppear() {
  return true;
}

function parseChoice(value: string | null | undefined): ConsentChoice | null {
  if (value === "analytics") return { necessary: true, analytics: true, marketing: false };
  if (value === "essential") return { necessary: true, analytics: false, marketing: false };
  const match = value?.match(/^a([01])m([01])$/);
  if (!match) return null;
  return { necessary: true, analytics: match[1] === "1", marketing: match[2] === "1" };
}

function choiceCode(choice: ConsentChoice) {
  return `a${choice.analytics ? 1 : 0}m${choice.marketing ? 1 : 0}`;
}

function readCookie(): ConsentChoice | null {
  if (typeof document === "undefined") return null;
  const row = document.cookie.split("; ").find((item) => item.startsWith(`${CONSENT_KEY}=`));
  return parseChoice(row?.slice(CONSENT_KEY.length + 1));
}

/** A backup of the choice, with the same six-month end date as the cookie. */
function readStored(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value?: unknown; until?: unknown };
    if (typeof parsed.until !== "number" || parsed.until < Date.now()) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }
    return parseChoice(typeof parsed.value === "string" ? parsed.value : null);
  } catch {
    return null;
  }
}

export function readConsent(): ConsentChoice | null {
  const saved = readCookie();
  if (saved) return saved;
  return readStored();
}

export function saveConsent(value: ConsentChoice) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const code = choiceCode(value);
  document.cookie = `${CONSENT_KEY}=${code}; Max-Age=${SIX_MONTHS}; Path=/; SameSite=Lax${secure}`;
  try {
    localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ value: code, until: Date.now() + SIX_MONTHS * 1000 }),
    );
  } catch {
    // Private browsing can block storage. The cookie above still remembers the choice.
  }
}

/** Remove the Google Analytics cookies set on this site. */
function deleteGaCookies() {
  const names = document.cookie
    .split("; ")
    .map((row) => row.split("=")[0] || "")
    .filter((name) => name === "_ga" || name === "_gid" || name.startsWith("_ga_") || name.startsWith("_gat"));
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = new Set<string>(["", host, `.${host}`]);
  if (parts.length >= 2) domains.add(`.${parts.slice(-2).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      const domainAttr = domain ? `; Domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; Path=/${domainAttr}`;
    }
  }
}

/**
 * Decline, including a later change of mind.
 * Stops counting and removes the analytics cookies.
 */
export function stopAnalytics() {
  analyticsGranted = false;
  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
  deleteGaCookies();
}

/** Queue a gtag command. The real gtag.js file is added only after Accept. */
function gtagStub(...args: unknown[]) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
  if (!window.gtag) window.gtag = gtagStub;
}

/**
 * Denied is the starting choice. The head script already sends this
 * before the page loads. This repeats it only if that script did not run.
 */
function denyStorageByDefault() {
  if (window.__tcbConsentDefault) return;
  gtagStub("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.__tcbConsentDefault = true;
}

/**
 * Allows analytics after the visitor clicks Accept.
 * Studio events can save without a GA id. The Google script loads only when one is set.
 */
export function loadAnalytics() {
  denyStorageByDefault();
  // Only analytics storage is allowed. Ads stay denied.
  gtagStub("consent", "update", { analytics_storage: "granted" });
  analyticsGranted = true;

  if (!GA_ID) return;
  if (document.querySelector("script[data-tcb-gtag]")) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.setAttribute("data-tcb-gtag", "");
  document.head.appendChild(script);

  gtagStub("js", new Date());
  // We send page views ourselves, because this is a single-page app.
  gtagStub("config", GA_ID, { anonymize_ip: true, send_page_view: false });
}

/** Fire-and-forget POST to our studio event log. Failures never block the page. */
function sendStudioEvent(event: string, params?: Record<string, string>) {
  if (!STUDIO_EVENTS.has(event)) return;
  const page_path = params?.page_path || window.location.pathname || "/";
  const props: Record<string, string> = {};
  for (const [key, value] of Object.entries(params || {})) {
    if (key === "page_path" || value == null || value === "") continue;
    props[key] = String(value).slice(0, 200);
  }
  const body = JSON.stringify({ name: event, page_path: page_path.slice(0, 300), props });
  const url = `${apiRoot()}/analytics/events/`;
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(url, blob)) return;
    }
  } catch {
    // Fall through to fetch.
  }
  void fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export function track(event: string, params?: Record<string, string>) {
  if (!analyticsGranted || readConsent()?.analytics !== true) return;
  if (GA_ID && window.gtag) {
    window.gtag("event", event, params);
  }
  sendStudioEvent(event, params);
}

/** Which WhatsApp link was used: floating, case-study, contact, or brief-success. */
export function trackWhatsApp(button: string) {
  track("whatsapp_click", { page_path: window.location.pathname, button });
}

/** SmartCRM, Academy, or the newsletter. Sent only after analytics consent. */
export function trackWaitlistSignup(which: "smartcrm" | "academy" | "newsletter") {
  track("waitlist_signup", { which });
}

/** A work-page filter chip. `filter` is the chosen family, sector, or "all". */
export function trackWorkFilter(filter: string) {
  track("work_filter", { filter });
}
