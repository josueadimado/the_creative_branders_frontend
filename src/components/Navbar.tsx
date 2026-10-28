import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { track } from "../lib/analytics";
import { useInsightsMenu } from "../content/contentDesk";
import { localeFromPath, localizedPath } from "../i18n/locale";
import { useDisplayLocation } from "./DisplayLocation";
import LanguageSwitcher from "./LanguageSwitcher";
import { LocaleLink, LocaleNavLink } from "./LocaleLink";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useDisplayLocation();
  const { t } = useTranslation(["nav", "cta", "common"]);
  const showInsights = useInsightsMenu();
  const locale = localeFromPath(pathname);
  const homePath = localizedPath("/", locale);

  const links = [
    { to: "/#services", label: t("nav:services") },
    { to: "/work", label: t("nav:work") },
    { to: "/about", label: t("nav:about") },
    ...(showInsights ? [{ to: "/insights", label: t("nav:insights") }] : []),
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (pathname === "/" || pathname === "/fr") return null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-navy/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <LocaleLink to="/" className="inline-flex shrink-0" onClick={() => setOpen(false)}>
          <Logo variant="dark" />
        </LocaleLink>

        <nav className="hidden items-center gap-10 lg:flex" aria-label={t("common:primaryNav")}>
          {links.map((link) =>
            link.to.includes("#") ? (
              <LocaleLink
                key={link.to}
                to={link.to}
                className="text-[15px] font-medium tracking-normal text-white/70 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </LocaleLink>
            ) : (
              <LocaleNavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-[15px] font-medium tracking-normal transition-colors duration-300 ${
                    isActive ? "text-signal" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {link.label}
              </LocaleNavLink>
            ),
          )}
          <LanguageSwitcher tone="dark" />
          <LocaleLink
            to="/contact"
            className="btn btn-primary !px-5 !py-2"
            onClick={() => track("start_project_click", { location: "navbar" })}
          >
            {t("cta:project")}
          </LocaleLink>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher tone="dark" />
          <button
            type="button"
            className="relative z-50 text-white"
            aria-expanded={open}
            aria-label={open ? t("common:closeMenu") : t("common:openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className={`block h-px w-6 bg-white transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`mt-2 block h-px w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
            <span className={`mt-2 block h-px w-6 bg-white transition ${open ? "-translate-y-[13px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          className="fixed inset-0 z-40 flex flex-col bg-navy px-6 pb-12 pt-24 lg:hidden"
          aria-label={t("common:mobileNav")}
        >
          <div className="flex flex-1 flex-col gap-8">
            {links.map((link) =>
              link.to.includes("#") ? (
                <LocaleLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="type-display text-white"
                >
                  {link.label}
                </LocaleLink>
              ) : (
                <LocaleNavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `type-display ${isActive ? "text-signal" : "text-white"}`}
                >
                  {link.label}
                </LocaleNavLink>
              ),
            )}
          </div>
          <LocaleLink
            to="/contact"
            onClick={() => {
              setOpen(false);
              track("start_project_click", { location: "navbar" });
            }}
            className="btn btn-primary"
          >
            {t("cta:project")}
          </LocaleLink>
          <LocaleLink to={homePath} className="sr-only">
            home
          </LocaleLink>
        </nav>
      ) : null}
    </header>
  );
}
