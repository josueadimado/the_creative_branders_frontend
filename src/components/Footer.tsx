import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { site } from "../content/site";
import { OPEN_COOKIE_SETTINGS } from "./CookieNotice";
import { hasAnalyticsId, track } from "../lib/analytics";
import { studioEmail, whatsappHref } from "../data/socials";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

const studioLinks = [
  { to: "/#services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  // No articles yet, so this stays a placeholder and does not open a page.
  { to: "#", label: "Insights" },
];

const products = ["SmartCRM", "Academy"];

const legal = [
  { to: "/privacy", label: "Privacy policy" },
  { to: "/terms", label: "Terms and conditions" },
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
  if (to === "#") {
    return (
      <li>
        <a href="#" className="transition-colors hover:text-white" onClick={(event) => event.preventDefault()}>
          {label}
        </a>
      </li>
    );
  }
  return (
    <li>
      <Link
        to={to}
        className="transition-colors hover:text-white"
      >
        {label}
      </Link>
    </li>
  );
}

function ProductItem({ label }: { label: string }) {
  return (
    <li>
      {/* # keeps the name in the footer without opening a page. */}
      <a href="#" className="transition-colors hover:text-white" onClick={(event) => event.preventDefault()}>
        {label}
      </a>
    </li>
  );
}

export default function Footer() {
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
          {studioLinks.map((item) => (
            <Item key={item.label} {...item} />
          ))}
        </Column>
        <Column title="Products">
          {products.map((label) => (
            <ProductItem key={label} label={label} />
          ))}
        </Column>
        <div>
          <ul className="space-y-3 type-caption text-white/70">
            <li>
              <a href={`mailto:${studioEmail}`} className="break-words transition-colors hover:text-white">
                {studioEmail.slice(0, studioEmail.indexOf("@") + 1)}
                <wbr />
                {studioEmail.slice(studioEmail.indexOf("@") + 1)}
              </a>
            </li>
            {whatsappHref ? (
              <li>
                <a
                  href={whatsappHref}
                  className="transition-colors hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { location: "footer" })}
                >
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
          <SocialLinks flush />
        </div>
      </div>
      <div className="border-t border-white/[0.06] px-6 py-6">
        {/* On a phone the copyright and the legal links sit in the middle. On a wider screen they sit at each end. */}
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-center text-sm text-white/55 sm:flex-row sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} The Creative Branders.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {legal.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            {hasAnalyticsId() ? (
              <li>
                <button
                  type="button"
                  className="transition-colors hover:text-white"
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
