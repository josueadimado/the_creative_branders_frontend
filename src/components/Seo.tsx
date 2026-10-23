import { Helmet } from "react-helmet-async";

const SITE_NAME = "The Creative Branders";
const DEFAULT_IMAGE = "/brand/png/og-default-1200.png";

type SeoProps = {
  /** Short page name. The studio name is added for the browser tab. */
  title: string;
  description: string;
  /** Path starting with /, for example /services. */
  path: string;
  image?: string;
};

function siteOrigin() {
  return (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
}

/**
 * Sets the browser tab title and the tags WhatsApp and LinkedIn read
 * when someone shares the page.
 */
export default function Seo({ title, description, path, image = DEFAULT_IMAGE }: SeoProps) {
  const origin = siteOrigin();
  const fullTitle = `${title} — ${SITE_NAME}`;
  const pageUrl = origin ? `${origin}${path}` : undefined;
  const imageUrl = image.startsWith("http") ? image : origin ? `${origin}${image}` : image;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {pageUrl ? <link rel="canonical" href={pageUrl} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {pageUrl ? <meta property="og:url" content={pageUrl} /> : null}
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}
