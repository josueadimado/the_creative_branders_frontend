import { useEffect, useState } from "react";
import { hasAnalyticsId, loadAnalytics, readConsent, saveConsent, track } from "../lib/analytics";

/**
 * Asks before any analytics cookie is set.
 * Essential-only is the default: closing the choice without "Allow" loads nothing.
 * If there is no measurement ID, the banner stays hidden and nothing is loaded.
 */
export default function CookieConsent() {
  const [choice, setChoice] = useState(readConsent);

  useEffect(() => {
    if (choice === "analytics") loadAnalytics();
  }, [choice]);

  if (!hasAnalyticsId() || choice) return null;

  function choose(next: "essential" | "analytics") {
    saveConsent(next);
    setChoice(next);
    if (next === "analytics") {
      loadAnalytics();
      track("page_view", { page_path: window.location.pathname });
    }
  }

  return (
    <div className="fixed inset-x-4 bottom-4 z-30 max-w-xl rounded-card border border-mist bg-white p-5 shadow-lg sm:inset-x-auto sm:right-6 sm:bottom-6">
      <p className="type-title text-navy">Cookies</p>
      <p className="type-caption mt-2 text-slate">
        Essential cookies keep the site working. Analytics stays off unless you allow it.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" className="btn btn-inverse !px-4 !py-2" onClick={() => choose("essential")}>
          Essential only
        </button>
        <button
          type="button"
          className="btn border border-mist !px-4 !py-2 text-navy hover:border-deep"
          onClick={() => choose("analytics")}
        >
          Allow analytics
        </button>
      </div>
    </div>
  );
}
