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
      {/* On a narrow screen the buttons sit under the sentence. On a wide screen they sit beside it, still on one line. */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-12 gap-y-8 px-6">
        <div className="min-w-[min(100%,28rem)] max-w-2xl flex-1">
          <h2 className="type-display text-white">{cta.title}</h2>
          <p className="type-lede mt-4 text-white/70">{cta.body}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
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
