import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localeFromPath, rememberLocale, type Locale } from "../i18n/locale";

/** Syncs i18n + <html lang> from the URL. English has no prefix; French uses /fr. */
export default function LocaleLayout({ forceLocale }: { forceLocale?: Locale }) {
  const location = useLocation();
  const { i18n } = useTranslation();
  const locale = forceLocale ?? localeFromPath(location.pathname);

  useEffect(() => {
    if (i18n.language !== locale) {
      void i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale === "fr" ? "fr" : "en";
    rememberLocale(locale);
  }, [i18n, locale]);

  return <Outlet />;
}
