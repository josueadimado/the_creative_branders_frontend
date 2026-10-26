import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { hasAnalyticsId, loadAnalytics, readConsent, saveConsent, stopAnalytics } from "../lib/analytics";

/** The footer uses this so "Cookie settings" can open the box again. */
export const OPEN_COOKIE_SETTINGS = "tcb-open-cookie-settings";

/**
 * A small question in the corner. It stays hidden until there is a
 * Google Analytics id, and it stays hidden for six months after a choice.
 */
export default function CookieNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasAnalyticsId()) return;
    // A previous Accept should keep counting, without asking again.
    if (readConsent() === "analytics") loadAnalytics();
    if (!readConsent()) setOpen(true);

    function reopen() {
      setOpen(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  if (!hasAnalyticsId() || !open) return null;

  function accept() {
    saveConsent("analytics");
    loadAnalytics();
    setOpen(false);
  }

  function decline() {
    saveConsent("essential");
    stopAnalytics();
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie settings"
      className="fixed bottom-0 left-0 right-0 z-40 rounded-t-2xl border border-mist bg-white p-4 text-navy shadow-[0_8px_30px_rgba(14,30,43,0.08)] sm:bottom-4 sm:left-4 sm:right-auto sm:w-full sm:max-w-[360px] sm:rounded-2xl"
    >
      <p className="text-sm leading-6">
        We'd like to use analytics cookies to see how people use the site.{" "}
        <Link to="/cookies" className="font-medium text-deep underline">
          Cookie details
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" className="btn w-full border border-mist bg-white text-navy" onClick={decline}>
          Decline
        </button>
        <button type="button" className="btn btn-inverse w-full border border-deep" onClick={accept}>
          Accept
        </button>
      </div>
    </div>
  );
}
