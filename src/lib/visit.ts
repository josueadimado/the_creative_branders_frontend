/** Where this visit started. Kept for the rest of the browser session. */
const KEY = "tcb-visit";
const ID_KEY = "tcb-visit-id";

export type VisitDetails = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  landing_page: string;
  referrer: string;
};

const emptyVisit: VisitDetails = {
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  landing_page: "",
  referrer: "",
};

/** One id for this browser tab session, so Desk can group related actions. */
export function readVisitId(): string {
  try {
    const existing = sessionStorage.getItem(ID_KEY);
    if (existing) return existing.slice(0, 64);
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    sessionStorage.setItem(ID_KEY, id);
    return id.slice(0, 64);
  } catch {
    return "";
  }
}

/** Rough device class for the studio log. The server may refine this from User-Agent. */
export function readDeviceKind(): "mobile" | "tablet" | "desktop" {
  if (typeof navigator === "undefined") return "desktop";
  const ua = navigator.userAgent || "";
  if (/iPad|Tablet|Android(?!.*Mobile)/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
}

/**
 * Remember the first page of this visit, including the campaign tags in the address.
 * A later page does not replace it.
 */
export function captureVisit() {
  try {
    readVisitId();
    if (sessionStorage.getItem(KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const visit: VisitDetails = {
      utm_source: (params.get("utm_source") || "").slice(0, 120),
      utm_medium: (params.get("utm_medium") || "").slice(0, 120),
      utm_campaign: (params.get("utm_campaign") || "").slice(0, 160),
      utm_content: (params.get("utm_content") || "").slice(0, 160),
      landing_page: `${window.location.pathname}${window.location.search}`.slice(0, 300),
      referrer: (document.referrer || "").slice(0, 300),
    };
    sessionStorage.setItem(KEY, JSON.stringify(visit));
  } catch {
    // Private browsing can block storage. The form still sends without these details.
  }
}

export function readVisit(): VisitDetails {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return emptyVisit;
    const parsed = JSON.parse(raw) as Partial<VisitDetails>;
    return {
      utm_source: String(parsed.utm_source || "").slice(0, 120),
      utm_medium: String(parsed.utm_medium || "").slice(0, 120),
      utm_campaign: String(parsed.utm_campaign || "").slice(0, 160),
      utm_content: String(parsed.utm_content || "").slice(0, 160),
      landing_page: String(parsed.landing_page || "").slice(0, 300),
      referrer: String(parsed.referrer || "").slice(0, 300),
    };
  } catch {
    return emptyVisit;
  }
}
