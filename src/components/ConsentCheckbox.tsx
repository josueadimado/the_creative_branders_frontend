import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { site } from "../content/site";
import { LocaleLink } from "./LocaleLink";

export default function ConsentCheckbox({
  id,
  checked,
  onChange,
  children,
  className = "text-navy",
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  className?: string;
}) {
  const { t } = useTranslation("forms");

  return (
    <label htmlFor={id} className={`flex items-start gap-3 text-sm leading-6 ${className}`}>
      <input
        id={id}
        name={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-deep"
      />
      <span>
        {children ?? (
          <>
            {t("consentEnquiry", { name: site.name })}{" "}
            <LocaleLink to="/privacy" className="text-deep underline hover:text-deep-hover">
              {t("privacyPolicy")}
            </LocaleLink>
            .
          </>
        )}
      </span>
    </label>
  );
}
