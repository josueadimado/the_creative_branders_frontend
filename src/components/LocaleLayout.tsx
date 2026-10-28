import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localeFromPath, type Locale } from "../i18n/locale";

/** Syncs i18n + <html lang> from the URL. English has no prefix; French uses /fr. */
export default function LocaleLayout({ forceLocale }: { forceLocale?: Locale }) {
  const location = useLocation();
  const { i18n } = useTranslation();
  const locale = forceLocale ?? localeFromPath(location.pathname);

  // useLayoutEffect so language is set before paint/prerender checks the title.
  // Preference is only stored when the visitor clicks EN|FR (or first auto-detect).
  useLayoutEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale === "fr" ? "fr" : "en";
  }, [i18n, locale]);

  return <Outlet />;
}
