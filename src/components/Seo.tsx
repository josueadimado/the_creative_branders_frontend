import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { site } from "../content/site";
import { breadcrumbSchema } from "../content/schema";
import { localizedPath, stripLocale, type Locale } from "../i18n/locale";

const SITE_NAME = site.name;
const DEFAULT_IMAGE = "/brand/png/og-default-1200.png";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  index?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function siteOrigin() {
  return (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
}

export default function Seo({ title, description, path, image = DEFAULT_IMAGE, index = true, jsonLd }: SeoProps) {
  const { i18n } = useTranslation();
  const locale: Locale = i18n.language?.startsWith("fr") ? "fr" : "en";
  const origin = siteOrigin();
  const barePath = stripLocale(path);
  const localized = localizedPath(barePath, locale);
  // English home keeps the shell tagline so prerender matches index.html.
  // French home uses the localized title so /fr is not stuck on the generic EN title.
  const fullTitle =
    barePath === "/"
      ? locale === "fr"
        ? `${SITE_NAME}${site.titleJoin}${title}`
        : `${SITE_NAME}${site.titleJoin}${site.tagline}`
      : `${title}${site.titleJoin}${SITE_NAME}`;

  const pageUrl = origin ? `${origin}${localized === "/" ? "/" : localized}` : undefined;
  const imageUrl = image.startsWith("http") ? image : origin ? `${origin}${image}` : image;
  const blocks = [...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [])];
  if (index && barePath !== "/" && origin) blocks.push(breadcrumbSchema(barePath, title));

  const enUrl = origin ? `${origin}${barePath === "/" ? "/" : barePath}` : undefined;
  const frUrl = origin ? `${origin}${localizedPath(barePath, "fr")}` : undefined;

  return (
    <Helmet
      onChangeClientState={(newState) => {
        window.prerenderReady = newState.title === fullTitle && window.contentDeskReady === true;
      }}
    >
      <html lang={locale === "fr" ? "fr" : "en"} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={index ? "index, follow" : "noindex, nofollow"} />
      {pageUrl ? <link rel="canonical" href={pageUrl} /> : null}
      {enUrl ? <link rel="alternate" hrefLang="en" href={enUrl} /> : null}
      {frUrl ? <link rel="alternate" hrefLang="fr" href={frUrl} /> : null}
      {enUrl ? <link rel="alternate" hrefLang="x-default" href={enUrl} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale === "fr" ? "fr_FR" : "en_US"} />
      {locale === "en" ? <meta property="og:locale:alternate" content="fr_FR" /> : <meta property="og:locale:alternate" content="en_US" />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {pageUrl ? <meta property="og:url" content={pageUrl} /> : null}
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {blocks.map((block, index) => (
        <script key={`${String(block["@type"])}-${String(block.name ?? index)}`} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
