import { Link } from "react-router-dom";
import AuditLink from "./AuditLink";
import { cta } from "../content/cta";
import { track } from "../lib/analytics";

/**
 * The same closing invitation on every page.
 * The bright button books the audit. The second button opens the project form.
 */
type ClosingBlockProps = {
  /** A page can rename the form button. The audit button stays the same. */
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
          <AuditLink className="btn btn-primary" location="cta" />
          <Link
            to="/contact"
            className="btn btn-secondary"
            onClick={() => track("start_project_click", { location: "cta" })}
          >
            {primary ?? cta.project}
          </Link>
        </div>
      </div>
    </section>
  );
}
