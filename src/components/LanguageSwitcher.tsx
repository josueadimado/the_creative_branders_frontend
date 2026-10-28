import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  localeFromPath,
  rememberLocale,
  switchLocalePath,
  type Locale,
} from "../i18n/locale";
import { useDisplayLocation } from "./DisplayLocation";

export default function LanguageSwitcher({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const { t } = useTranslation("common");
  const live = useLocation();
  const shown = useDisplayLocation();
  const navigate = useNavigate();
  // Highlight follows the URL that is actually on screen during the fade.
  const active = localeFromPath(shown.pathname);

  function go(next: Locale) {
    if (next === active) return;
    rememberLocale(next);
    navigate(switchLocalePath(live.pathname, live.search, live.hash, next));
  }

  const idle = tone === "dark" ? "text-white/55 hover:text-white" : "text-slate hover:text-navy";
  const on = tone === "dark" ? "text-white" : "text-navy";
  const btn =
    "px-1.5 py-1 transition-colors duration-200 ease-out motion-reduce:transition-none";

  return (
    <div
      className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide"
      role="group"
      aria-label={t("language")}
    >
      <button
        type="button"
        className={`${btn} ${active === "en" ? on : idle}`}
        aria-pressed={active === "en"}
        onClick={() => go("en")}
      >
        {t("langEn")}
      </button>
      <span className={tone === "dark" ? "text-white/25" : "text-mist"} aria-hidden="true">
        |
      </span>
      <button
        type="button"
        className={`${btn} ${active === "fr" ? on : idle}`}
        aria-pressed={active === "fr"}
        onClick={() => go("fr")}
      >
        {t("langFr")}
      </button>
    </div>
  );
}
