import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { site } from "../content/site";
import { useInsightsMenu } from "../content/contentDesk";
import { OPEN_COOKIE_SETTINGS } from "./CookieNotice";
import { bannerCanAppear, track } from "../lib/analytics";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

const studioLinks = [
  { to: "/#services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
];

const products = [
  { to: "/smartcrm", label: "SmartCRM" },
  { to: "/academy", label: "Academy" },
];

const legal = [
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
  { to: "/cookies", label: "Cookies" },
  { to: "/responsible-ai", label: "Responsible AI" },
];

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
      <Link
        to={to}
        className="inline-flex min-h-11 items-center transition-colors hover:text-white"
      >
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const showInsights = useInsightsMenu();
  const links = showInsights ? [...studioLinks, { to: "/insights", label: "Insights" }] : studioLinks;
  return (
    <footer className="dot-grid border-t border-white/[0.06] bg-navy">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:grid-cols-2 lg:grid-cols-[16rem_repeat(3,minmax(0,1fr))]">
        <div className="w-full sm:col-span-2 lg:col-span-1 lg:w-64">
          <div className="flex w-max max-w-full flex-col items-center">
            <Link to="/" className="inline-flex">
              <Logo variant="dark" size="large" />
            </Link>
            <p className="mt-3 text-center text-xs leading-snug text-white/60">{site.footerTagline}</p>
          </div>
        </div>

        <Column title="Our studio">
          {links.map((item) => (
            <Item key={item.label} {...item} />
          ))}
        </Column>
        <Column title="Products">
          {products.map((item) => (
            <Item key={item.label} {...item} />
          ))}
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
                className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                onClick={() => track("phone_click", { location: "footer" })}
              >
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
          <SocialLinks flush />
        </div>
      </div>
      <div className="border-t border-white/[0.06] px-6 py-6">
        {/* On a phone the copyright and the legal links sit in the middle. On a wider screen they sit at each end. */}
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center text-sm text-white/80 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Registered in {site.jurisdiction}.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {legal.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            {bannerCanAppear() ? (
              <li>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-white"
                  onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
                >
                  Cookie settings
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </footer>
  );
}
