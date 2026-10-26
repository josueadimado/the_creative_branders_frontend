import { cta } from "../content/cta";
import { auditHref } from "../data/socials";
import { track } from "../lib/analytics";

/**
 * The homepage audit button.
 * It opens WhatsApp with a message asking for the free 20-minute systems audit.
 */
export default function AuditLink({
  className,
  location,
}: {
  className?: string;
  /** Where on the site the click happened, so the count can be split later. */
  location: string;
}) {
  return (
    <a
      href={auditHref()}
      className={className}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("audit_cta_click", { location })}
    >
      {cta.audit}
    </a>
  );
}
