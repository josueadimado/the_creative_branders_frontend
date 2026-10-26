import type { ReactNode } from "react";
import Seo from "../components/Seo";
import { OPEN_COOKIE_SETTINGS } from "../components/CookieNotice";
import { site } from "../content/site";

type Section = {
  title: string;
  paragraphs: readonly string[];
  items?: readonly { label: string; text: string }[];
};

type LegalPageProps = {
  seo: { title: string; description: string; path: string };
  kicker: string;
  title: string;
  updated: string;
  lede: string;
  sections: readonly Section[];
};

const dpcSite = "https://www.dataprotection.org.gh/";

/** Shared layout for the short legal pages. */
export default function LegalPage({ seo, kicker, title, updated, lede, sections }: LegalPageProps) {
  return (
    <>
      <Seo {...seo} />
      <section className="text-hero bg-navy">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{kicker}</p>
          <h1 className="type-h1 mt-5 text-white">{title}</h1>
          <p className="mt-4 text-sm text-white/70">Last updated {updated}</p>
          <p className="type-lede mt-8 max-w-xl text-white/70">{lede}</p>
        </div>
      </section>
      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-3xl space-y-12 px-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="type-title text-navy">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="type-body mt-4 text-slate">
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.items ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 type-body text-slate">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <span className="text-navy">{item.label}.</span> {item.text}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

/** Turns the email, the commission website, and Cookie settings into links. */
function RichText({ text }: { text: string }) {
  const pattern = new RegExp(`(${escapeRegExp(site.email)}|${escapeRegExp(dpcSite)}|Cookie settings)`, "g");
  const parts = text.split(pattern).filter((part) => part.length > 0);
  return (
    <>
      {parts.map((part, index) => (
        <RichPart key={`${part}-${index}`} part={part} />
      ))}
    </>
  );
}

function RichPart({ part }: { part: string }) {
  if (part === site.email) {
    return (
      <a href={`mailto:${site.email}`} className="text-deep hover:text-deep-hover">
        {site.email}
      </a>
    );
  }
  if (part === dpcSite) {
    return (
      <a href={dpcSite} className="text-deep hover:text-deep-hover" target="_blank" rel="noopener noreferrer">
        {dpcSite}
      </a>
    );
  }
  if (part === "Cookie settings") {
    return (
      <button
        type="button"
        className="text-deep underline hover:text-deep-hover"
        onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
      >
        Cookie settings
      </button>
    );
  }
  return part as ReactNode;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
