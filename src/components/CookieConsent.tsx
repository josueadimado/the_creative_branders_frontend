import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { hasAnalyticsId, loadAnalytics, readConsent, saveConsent, track, type Consent } from "../lib/analytics";

/** Other parts of the site dispatch this to open the banner again. */
export const OPEN_COOKIE_SETTINGS = "tcb-open-cookie-settings";

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS));
}

/**
 * Bottom bar for the cookie choice.
 * It shows on a first visit, and again when someone uses Cookie settings.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(() => readConsent() === null);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, show);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, show);
  }, []);

  if (!open) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    setOpen(false);
    if (value === "analytics" && hasAnalyticsId()) {
      loadAnalytics();
      track("page_view", { page_path: window.location.pathname });
    }
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie settings"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-mist bg-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl font-sans text-sm leading-6 text-slate">
          We use a cookie to remember this choice. Analytics stays off unless you accept.{" "}
          <Link to="/cookies" className="text-deep underline">
            Read about cookies
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button type="button" className="btn btn-secondary" onClick={() => choose("essential")}>
            Essential only
          </button>
          <button type="button" className="btn btn-inverse" onClick={() => choose("analytics")}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
