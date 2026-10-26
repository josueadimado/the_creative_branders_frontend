import { Link } from "react-router-dom";
import { cta } from "../content/cta";
import { whatsappHref } from "../data/socials";
import { track } from "../lib/analytics";

/**
 * The same closing invitation on every page.
 * WhatsApp uses the number from the company details.
 */
type ClosingBlockProps = {
  /** Family pages ask for a quote by name. Other pages use the shared button. */
  primary?: string;
};

export default function ClosingBlock({ primary }: ClosingBlockProps) {
  return (
    <section className="dot-grid border-t border-white/[0.08] bg-navy py-24 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="type-display text-white">{cta.title}</h2>
          <p className="type-lede mt-4 text-white/70">{cta.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="btn btn-primary"
            onClick={() => track("start_project_click", { location: "cta" })}
          >
            {primary ?? cta.primary}
          </Link>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary"
            onClick={() => track("whatsapp_click", { location: "cta" })}
          >
            {cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
