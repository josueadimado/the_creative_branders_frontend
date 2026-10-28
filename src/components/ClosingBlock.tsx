import { useTranslation } from "react-i18next";
import AuditLink from "./AuditLink";
import { LocaleLink } from "./LocaleLink";
import { track } from "../lib/analytics";

type ClosingBlockProps = {
  primary?: string;
  showAudit?: boolean;
  projectTo?: string;
  location?: string;
};

export default function ClosingBlock({
  primary,
  showAudit = false,
  projectTo = "/contact",
  location = "cta",
}: ClosingBlockProps) {
  const { t } = useTranslation("cta");

  return (
    <section className="dot-grid border-t border-white/[0.08] bg-navy py-24 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-12 gap-y-8 px-6">
        <div className="min-w-[min(100%,28rem)] max-w-2xl flex-1">
          <h2 className="type-display text-white">{t("title")}</h2>
          <p className="type-lede mt-4 text-white/70">{t("body")}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          {showAudit ? <AuditLink className="btn btn-primary" location="home-close" /> : null}
          <LocaleLink
            to={projectTo}
            className={showAudit ? "btn btn-secondary" : "btn btn-primary"}
            onClick={() => track("start_project_click", { location })}
          >
            {primary ?? t("project")}
          </LocaleLink>
        </div>
      </div>
    </section>
  );
}
