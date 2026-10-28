export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_STORAGE_KEY = "tcb-lang";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "en" || value === "fr";
}

/** Remove a leading /fr prefix so paths can be compared or re-prefixed. */
export function stripLocale(pathname: string): string {
  if (pathname === "/fr") return "/";
  if (pathname.startsWith("/fr/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localeFromPath(pathname: string): Locale {
  return pathname === "/fr" || pathname.startsWith("/fr/") ? "fr" : "en";
}

/** Prefix a site path for the active language. English keeps bare URLs. */
export function localizedPath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const qIndex = withoutHash.indexOf("?");
  const search = qIndex >= 0 ? withoutHash.slice(qIndex) : "";
  let pathname = qIndex >= 0 ? withoutHash.slice(0, qIndex) : withoutHash;
  if (!pathname) pathname = "/";
  pathname = stripLocale(pathname);
  if (locale === "fr") {
    pathname = pathname === "/" ? "/fr" : `/fr${pathname}`;
  }
  return `${pathname}${search}${hash}`;
}

export function switchLocalePath(
  pathname: string,
  search: string,
  hash: string,
  next: Locale,
): string {
  return localizedPath(`${stripLocale(pathname)}${search}${hash}`, next);
}

export function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
}

export function rememberedLocale(): Locale | null {
  try {
    const value = localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

/** True when the browser lists French ahead of English (or French only). */
export function browserPreferredLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const tags = [...(navigator.languages?.length ? navigator.languages : []), navigator.language].filter(
    Boolean,
  ) as string[];

  for (const tag of tags) {
    const lower = tag.toLowerCase();
    if (lower === "fr" || lower.startsWith("fr-")) return "fr";
    if (lower === "en" || lower.startsWith("en-")) return "en";
  }

  // Soft location hint when the browser does not list a language we know.
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (
      /Paris|Brussels|Montreal|Abidjan|Dakar|Bamako|Ouagadougou|Lome|Porto-Novo|Kinshasa|Brazzaville|Douala|Libreville|Yaounde|Algiers|Tunis|Casablanca|Geneva|Luxembourg|Niamey|Conakry|Nouakchott/i.test(
        tz,
      )
    ) {
      return "fr";
    }
  } catch {
    /* ignore */
  }

  return DEFAULT_LOCALE;
}

/**
 * Locale to open for this visit on an English URL.
 * Saved choice wins; otherwise browser language / timezone hint.
 * French URLs are never auto-switched away (shared links stay put).
 */
export function preferredLocaleForVisit(): Locale {
  return rememberedLocale() ?? browserPreferredLocale();
}
