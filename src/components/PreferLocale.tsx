import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  localeFromPath,
  preferredLocaleForVisit,
  rememberLocale,
  rememberedLocale,
  switchLocalePath,
} from "../i18n/locale";

/**
 * On English URLs, send first-time (or returning) French-preferring visitors to /fr…
 * Shared /fr links are left alone. An explicit EN|FR click is stored and wins next time.
 */
export default function PreferLocale() {
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const pathLocale = localeFromPath(location.pathname);
    // Never rewrite a French URL — that would break shared /fr links.
    if (pathLocale === "fr") return;

    const preferred = preferredLocaleForVisit();
    if (preferred !== "fr") return;

    const next = switchLocalePath(location.pathname, location.search, location.hash, "fr");
    if (next === `${location.pathname}${location.search}${location.hash}`) return;

    // First auto-detect: remember so the next English visit stays consistent.
    if (!rememberedLocale()) rememberLocale("fr");
    navigate(next, { replace: true });
  }, [location.pathname, location.search, location.hash, navigate]);

  return null;
}
