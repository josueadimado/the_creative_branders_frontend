import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { serviceFamilies } from "../content/services";
import { site } from "../content/site";
import { track } from "../lib/analytics";
import { studioEmail, whatsappHref } from "../data/socials";
import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

const serviceLinks = serviceFamilies.map((family) => ({
  to: `/services/${family.slug}`,
  label: family.name,
}));

const studio = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Start a project" },
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
        className="transition-colors hover:text-white"
        onClick={() => {
          if (to === "/contact") track("start_project_click", { location: "footer" });
        }}
      >
        {label}
      </Link>
    </li>
  );
}

export default function Footer() {
  const { pathname } = useLocation();
  // The homepage hero already says this line. Don't repeat it under the logo.
  const showTagline = pathname !== "/";

  return (
    <footer className="dot-grid border-t border-white/[0.06] bg-navy">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:grid-cols-2 lg:grid-cols-[16rem_repeat(4,minmax(0,1fr))]">
        <div className="w-full sm:col-span-2 lg:col-span-1 lg:w-64">
          <Link to="/" className="inline-flex">
            <Logo variant="dark" />
          </Link>
          {showTagline ? <p className="type-caption mt-5 max-w-xs text-white/70">{site.footerTagline}</p> : null}
          <ul className="mt-8 space-y-3 type-caption text-white/70">
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

        <Column title="Services">
          {serviceLinks.map((item) => (
            <Item key={item.to} {...item} />
          ))}
        </Column>
        <Column title="Studio">
          {studio.map((item) => (
            <Item key={item.to} {...item} />
          ))}
        </Column>
        <Column title="Products">
          {products.map((item) => (
            <Item key={item.to} {...item} />
          ))}
        </Column>
        <Column title="Legal">
          {legal.map((item) => (
            <Item key={item.to} {...item} />
          ))}
        </Column>
      </div>
      <div className="border-t border-white/[0.06] px-6 py-6 text-center type-caption text-white/55">
        <p>© {new Date().getFullYear()} The Creative Branders.</p>
      </div>
    </footer>
  );
}
