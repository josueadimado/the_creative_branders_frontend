import { forwardRef, type ComponentProps } from "react";
import { Link, NavLink, type NavLinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizedPath, type Locale } from "../i18n/locale";

function useActiveLocale(): Locale {
  const { i18n } = useTranslation();
  return i18n.language?.startsWith("fr") ? "fr" : "en";
}

/** React Router Link that keeps the current language prefix. */
export const LocaleLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link>>(function LocaleLink(
  { to, ...rest },
  ref,
) {
  const locale = useActiveLocale();
  const href = typeof to === "string" ? localizedPath(to, locale) : to;
  return <Link ref={ref} to={href} {...rest} />;
});

export function LocaleNavLink({ to, ...rest }: NavLinkProps) {
  const locale = useActiveLocale();
  const href = typeof to === "string" ? localizedPath(to, locale) : to;
  return <NavLink to={href} {...rest} />;
}
