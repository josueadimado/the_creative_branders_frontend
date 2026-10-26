import { Link } from "react-router-dom";
import AuditLink from "./AuditLink";
import { cta } from "../content/cta";
import { track } from "../lib/analytics";

/**
 * The closing invitation at the bottom of a page.
 * Most pages have one button, Start a project.
 * The homepage also puts the audit button first.
 */
type ClosingBlockProps = {
  /** A page can rename the form button. */
  primary?: string;
  /** Homepage only. The audit button leads, and Start a project sits beside it. */
  showAudit?: boolean;
  /** Where Start a project goes. Other pages use the contact form. */
  projectTo?: string;
  /** Lets the homepage count be told apart from the other pages. */
  location?: string;
};

export default function ClosingBlock({ primary, showAudit = false, projectTo = "/contact", location = "cta" }: ClosingBlockProps) {
  return (
    <section className="dot-grid border-t border-white/[0.08] bg-navy py-24 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="type-display text-white">{cta.title}</h2>
          <p className="type-lede mt-4 text-white/70">{cta.body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {showAudit ? <AuditLink className="btn btn-primary" location="home-close" /> : null}
          <Link
            to={projectTo}
            className={showAudit ? "btn btn-secondary" : "btn btn-primary"}
            onClick={() => track("start_project_click", { location })}
          >
            {primary ?? cta.project}
          </Link>
        </div>
      </div>
    </section>
  );
}
