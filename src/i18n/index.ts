import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LOCALE } from "./locale";

import enCommon from "./locales/en/common.json";
import enNav from "./locales/en/nav.json";
import enCta from "./locales/en/cta.json";
import enForms from "./locales/en/forms.json";
import enCookies from "./locales/en/cookies.json";
import enHome from "./locales/en/home.json";
import enAbout from "./locales/en/about.json";
import enContact from "./locales/en/contact.json";
import enWork from "./locales/en/work.json";
import enLegal from "./locales/en/legal.json";

import frCommon from "./locales/fr/common.json";
import frNav from "./locales/fr/nav.json";
import frCta from "./locales/fr/cta.json";
import frForms from "./locales/fr/forms.json";
import frCookies from "./locales/fr/cookies.json";
import frHome from "./locales/fr/home.json";
import frAbout from "./locales/fr/about.json";
import frContact from "./locales/fr/contact.json";
import frWork from "./locales/fr/work.json";
import frLegal from "./locales/fr/legal.json";

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      nav: enNav,
      cta: enCta,
      forms: enForms,
      cookies: enCookies,
      home: enHome,
      about: enAbout,
      contact: enContact,
      work: enWork,
      legal: enLegal,
    },
    fr: {
      common: frCommon,
      nav: frNav,
      cta: frCta,
      forms: frForms,
      cookies: frCookies,
      home: frHome,
      about: frAbout,
      contact: frContact,
      work: frWork,
      legal: frLegal,
    },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  defaultNS: "common",
  ns: ["common", "nav", "cta", "forms", "cookies", "home", "about", "contact", "work", "legal"],
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
