import { useTranslation } from "react-i18next";
import { auditHref } from "../data/socials";
import { track } from "../lib/analytics";

export default function AuditLink({
  className,
  location,
}: {
  className?: string;
  location: string;
}) {
  const { t } = useTranslation("cta");
  return (
    <a
      href={auditHref()}
      className={className}
      target="_blank"
      rel="noreferrer"
      onClick={() => track("audit_cta_click", { location })}
    >
      {t("audit")}
    </a>
  );
}
