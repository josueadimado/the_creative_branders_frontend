import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { serviceFamilies } from "../content/placeholder";
import { track } from "../lib/analytics";
import { socials, studioEmail, whatsappHref } from "../data/socials";
import Logo from "./Logo";

const serviceLinks = Object.entries(serviceFamilies).map(([slug, label]) => ({
  to: `/services/${slug}`,
  label,
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
  return (
    <footer className="dot-grid border-t border-white/[0.06] bg-navy">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="inline-flex">
            <Logo variant="dark" />
          </Link>
          <p className="type-caption mt-5 max-w-xs text-white/70">Designed for intelligent growth.</p>
          <ul className="mt-8 space-y-3 type-caption text-white/70">
            <li>
              <a href={`mailto:${studioEmail}`} className="transition-colors hover:text-white">
                {studioEmail}
              </a>
            </li>
            {whatsappHref ? (
              <li>
                <a
                  href={whatsappHref}
                  className="transition-colors hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("whatsapp_click", { location: "footer" })}
                >
                  WhatsApp
                </a>
              </li>
            ) : null}
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
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
