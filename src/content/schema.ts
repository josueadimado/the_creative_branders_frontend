/**
 * Facts search engines read. The words come from site.ts so they are not typed twice.
 */
import { serviceFamilies } from "./services";
import { site } from "./site";

const origin = site.url.replace(/\/$/, "");

/** Profile pages. X stays in this list even though the footer does not show the icon. */
export const sameAs = [site.social.linkedin, site.social.instagram, site.social.facebook, site.social.x];

/** The company, on every page. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: origin,
    logo: `${origin}/brand/png/tcb-monogram-dark-512.png`,
    email: site.email,
    telephone: site.phoneE164,
    sameAs,
  };
}

/** The studio as a local service, without the street address. */
export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.legalName,
    url: origin,
    email: site.email,
    telephone: site.phoneE164,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    areaServed: ["Ghana", "Nigeria", "West Africa"],
  };
}

/** The four services live on the homepage, so their facts live there too. */
const serviceKeywords: Record<string, string> = {
  "brand-websites": "website design Ghana",
  "web-applications": "web app development",
  "mobile-apps": "mobile app developers Ghana",
};

export function serviceSchemas() {
  return serviceFamilies.map((family) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: family.name,
    serviceType: serviceKeywords[family.slug] ?? family.name,
    description: family.description,
    url: `${origin}/#services`,
    provider: { "@type": "Organization", name: site.name, url: origin },
    areaServed: "Ghana",
  }));
}

/** Home, then this page. A case study also lists the work page in between. */
export function breadcrumbSchema(path: string, title: string) {
  const crumbs = [{ name: "Home", path: "/" }];
  if (path.startsWith("/work/") && path !== "/work") {
    crumbs.push({ name: "Work", path: "/work" });
  }
  crumbs.push({ name: title, path });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${origin}${crumb.path === "/" ? "/" : crumb.path}`,
    })),
  };
}

export function faqSchema(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
