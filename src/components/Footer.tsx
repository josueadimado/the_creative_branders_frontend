import { useState, type ReactNode } from "react";
import { Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { site } from "../content/site";
import { useInsightsMenu } from "../content/contentDesk";
import { hasNewsletterSubscribed } from "../lib/newsletter";
import { OPEN_COOKIE_SETTINGS } from "./CookieNotice";
import { bannerCanAppear, track } from "../lib/analytics";
import LanguageSwitcher from "./LanguageSwitcher";
import { LocaleLink } from "./LocaleLink";
import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";
import SocialLinks from "./SocialLinks";

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <p className="type-caption font-semibold text-signal">{title}</p>
      <ul className="mt-5 space-y-3 type-caption text-white/70">{children}</ul>
    </div>
  );
}

function Item({ to, label }: { to: string; label: string }) {
  return (
    <li>
      <LocaleLink to={to} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
        {label}
      </LocaleLink>
    </li>
  );
}

function UpcomingProduct({ label, badge }: { label: string; badge: string }) {
  return (
    <li>
      <span className="inline-flex min-h-11 cursor-default items-center gap-2 text-white/45">
        {label}
        <span className="rounded-full bg-signal/15 px-2 py-0.5 text-[11px] font-medium text-signal">{badge}</span>
      </span>
    </li>
  );
}

export default function Footer() {
  const { t } = useTranslation(["nav", "common", "contact"]);
  const showInsights = useInsightsMenu();
  const [showNewsletter, setShowNewsletter] = useState(() => !hasNewsletterSubscribed());

  const studioLinks = [
    { to: "/#services", label: t("nav:services") },
    { to: "/about", label: t("nav:about") },
    { to: "/work", label: t("nav:work") },
    ...(showInsights ? [{ to: "/insights", label: t("nav:insights") }] : []),
  ];

  const products = [
    { to: "/smartcrm", label: "SmartCRM", launched: site.smartcrm.launched },
    { to: "/academy", label: "Academy", launched: site.academy.launched },
  ];

  const legal = [
    { to: "/privacy", label: t("nav:privacy") },
    { to: "/terms", label: t("nav:terms") },
    { to: "/cookies", label: t("nav:cookies") },
    { to: "/responsible-ai", label: t("nav:responsibleAi") },
  ];

  return (
    <footer className="border-t border-white/[0.06]">
      {showNewsletter ? (
        <div className="border-b border-mist bg-paper">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-md">
              <h2 className="font-display text-2xl font-semibold tracking-tight text-navy sm:text-[1.75rem]">
                {t("nav:newsletterTitle")}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate">{t("nav:newsletterLede")}</p>
            </div>
            <div className="w-full max-w-xl">
              <NewsletterForm onSubscribed={() => setShowNewsletter(false)} />
            </div>
          </div>
        </div>
      ) : null}

      <div className="dot-grid bg-navy">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:grid-cols-2 lg:grid-cols-[16rem_repeat(3,minmax(0,1fr))]">
          <div className="w-full sm:col-span-2 lg:col-span-1 lg:w-64">
            <div className="flex w-max max-w-full flex-col items-center">
              <LocaleLink to="/" className="inline-flex">
                <Logo variant="dark" size="large" />
              </LocaleLink>
              <p className="mt-3 text-center text-xs leading-snug text-white/60">{site.tagline}</p>
              <div className="mt-4">
                <LanguageSwitcher tone="dark" />
              </div>
            </div>
          </div>

          <Column title={t("nav:studio")}>
            {studioLinks.map((item) => (
              <Item key={item.label} {...item} />
            ))}
          </Column>
          <Column title={t("nav:products")}>
            {products.map((item) =>
              item.launched ? (
                <Item key={item.label} to={item.to} label={item.label} />
              ) : (
                <UpcomingProduct key={item.label} label={item.label} badge={t("common:comingSoon")} />
              ),
            )}
          </Column>
          <div>
            <ul className="space-y-3 type-caption text-white/70">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex min-h-11 items-center break-words transition-colors hover:text-white"
                  onClick={() => track("email_click", { location: "footer" })}
                >
                  {site.email.slice(0, site.email.indexOf("@") + 1)}
                  <wbr />
                  {site.email.slice(site.email.indexOf("@") + 1)}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="inline-flex min-h-11 items-center gap-2 transition-colors hover:text-white"
                  aria-label={`${t("contact:call")} ${site.phoneDisplay}`}
                  onClick={() => track("phone_click", { location: "footer" })}
                >
                  <Phone size={16} aria-hidden="true" />
                  {site.phoneDisplay}
                </a>
              </li>
            </ul>
            <SocialLinks flush />
          </div>
        </div>
        <div className="border-t border-white/[0.06] px-6 py-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center text-sm text-white/80 sm:flex-row sm:justify-between sm:text-left">
            <p>
              © {new Date().getFullYear()} {site.legalName}.
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {legal.map((item) => (
                <li key={item.to}>
                  <LocaleLink to={item.to} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                    {item.label}
                  </LocaleLink>
                </li>
              ))}
              {bannerCanAppear() ? (
                <li>
                  <button
                    type="button"
                    className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                    onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
                  >
                    {t("common:cookieSettings")}
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
