import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  bannerCanAppear,
  hasMarketingTracker,
  loadAnalytics,
  readConsent,
  saveConsent,
  stopAnalytics,
  type ConsentChoice,
} from "../lib/analytics";
import { LocaleLink } from "./LocaleLink";

export const OPEN_COOKIE_SETTINGS = "tcb-open-cookie-settings";

const declined: ConsentChoice = { necessary: true, analytics: false, marketing: false };

export default function CookieNotice() {
  const { t } = useTranslation("cookies");
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"ask" | "settings">("ask");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const showAnalytics = true;
  const showMarketing = hasMarketingTracker();

  useEffect(() => {
    if (!bannerCanAppear()) return;
    const saved = readConsent();
    if (saved?.analytics) loadAnalytics();
    if (!saved) setOpen(true);

    function reopen() {
      const current = readConsent();
      setAnalytics(current?.analytics === true);
      setMarketing(current?.marketing === true);
      setView("settings");
      setOpen(true);
    }
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen);
  }, []);

  useEffect(() => {
    document.body.dataset.cookieBanner = open ? "open" : "";
    return () => {
      delete document.body.dataset.cookieBanner;
    };
  }, [open]);

  if (!bannerCanAppear() || !open) return null;

  function apply(choice: ConsentChoice) {
    saveConsent(choice);
    if (choice.analytics) loadAnalytics();
    else stopAnalytics();
    setOpen(false);
  }

  function accept() {
    apply({ necessary: true, analytics: showAnalytics, marketing: showMarketing });
  }

  function saveSettings() {
    apply({
      necessary: true,
      analytics: showAnalytics && analytics,
      marketing: showMarketing && marketing,
    });
  }

  return (
    <div
      role="dialog"
      aria-label={t("aria")}
      className="fixed bottom-0 left-0 right-0 z-40 rounded-t-2xl border border-mist bg-white p-4 text-navy shadow-[0_8px_30px_rgba(14,30,43,0.08)] sm:bottom-4 sm:left-4 sm:right-auto sm:w-full sm:max-w-[360px] sm:rounded-2xl"
    >
      {view === "ask" ? (
        <>
          <p className="text-sm leading-6">
            {t("ask")}{" "}
            <LocaleLink to="/cookies" className="font-medium text-deep underline">
              {t("details")}
            </LocaleLink>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" className="btn w-full border border-mist bg-white text-navy" onClick={() => apply(declined)}>
              {t("decline")}
            </button>
            <button type="button" className="btn w-full border border-mist bg-white text-navy" onClick={accept}>
              {t("accept")}
            </button>
          </div>
          <button type="button" className="mt-3 text-sm font-medium text-deep underline" onClick={() => setView("settings")}>
            {t("settings")}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm font-medium">{t("title")}</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start justify-between gap-4">
              <span>
                <span className="block font-medium">{t("necessary")}</span>
                <span className="text-slate">{t("necessaryHelp")}</span>
              </span>
              <input type="checkbox" checked disabled aria-label={t("necessaryAria")} className="mt-1" />
            </li>
            {showAnalytics ? (
              <li className="flex items-start justify-between gap-4">
                <span>
                  <span className="block font-medium">{t("analytics")}</span>
                  <span className="text-slate">{t("analyticsHelp")}</span>
                </span>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                  aria-label={t("analyticsAria")}
                  className="mt-1"
                />
              </li>
            ) : null}
            {showMarketing ? (
              <li className="flex items-start justify-between gap-4">
                <span>
                  <span className="block font-medium">{t("marketing")}</span>
                  <span className="text-slate">{t("marketingHelp")}</span>
                </span>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                  aria-label={t("marketingAria")}
                  className="mt-1"
                />
              </li>
            ) : null}
          </ul>
          <button type="button" className="btn btn-inverse mt-4 w-full border border-deep" onClick={saveSettings}>
            {t("save")}
          </button>
        </>
      )}
    </div>
  );
}
