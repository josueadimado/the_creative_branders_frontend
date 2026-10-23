import { Link } from "react-router-dom";
import { cta } from "../content/cta";
import { whatsappHref } from "../data/socials";

/**
 * The same closing invitation on every page.
 * The WhatsApp button only appears once a number is set.
 */
export default function CtaBand() {
  return (
    <section className="dot-grid border-t border-white/[0.08] bg-navy py-24 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="type-display text-white">{cta.title}</h2>
          <p className="type-lede mt-4 text-white/70">{cta.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link to="/contact" className="btn btn-primary">
            {cta.primary}
          </Link>
          {whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn btn-secondary">
              {cta.whatsapp}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
