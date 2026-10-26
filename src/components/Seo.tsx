import { Helmet } from "react-helmet-async";
import { site } from "../content/site";
import { breadcrumbSchema } from "../content/schema";

const SITE_NAME = site.name;
const DEFAULT_IMAGE = "/brand/png/og-default-1200.png";

type SeoProps = {
  /** Short page name. The studio name is added for the browser tab. */
  title: string;
  description: string;
  /** Path starting with /, for example /work. */
  path: string;
  image?: string;
  /**
   * Search engines list the page when this is true.
   * A missing page, and the notes we have not opened in the menu yet, stay off the list.
   */
  index?: boolean;
  /** Extra facts for Google, such as the studio or one project. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

function siteOrigin() {
  return (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
}

/**
 * Sets the browser tab title and the tags WhatsApp and LinkedIn read
 * when someone shares the page.
 */
export default function Seo({ title, description, path, image = DEFAULT_IMAGE, index = true, jsonLd }: SeoProps) {
  const origin = siteOrigin();
  const fullTitle = `${title}${site.titleJoin}${SITE_NAME}`;
  const pageUrl = origin ? `${origin}${path}` : undefined;
  const imageUrl = image.startsWith("http") ? image : origin ? `${origin}${image}` : image;
  const blocks = [...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [])];
  if (index && path !== "/" && origin) blocks.push(breadcrumbSchema(path, title));

  return (
    <Helmet
      onChangeClientState={(newState) => {
        // Set only after the title is in the document and the project API has answered.
        window.prerenderReady = newState.title === fullTitle && window.contentDeskReady === true;
      }}
    >
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={index ? "index, follow" : "noindex, nofollow"} />
      {pageUrl ? <link rel="canonical" href={pageUrl} /> : null}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
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
