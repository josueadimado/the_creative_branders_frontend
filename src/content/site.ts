/**
 * Company details used across the site.
 * Pages should read from here instead of typing the email, phone, or legal name themselves.
 * Text in [square brackets] is still waiting for the owner. Do not invent those values.
 * The server keeps a copy of these details in backend/apps/core/site_settings.py.
 */

/** The name visitors see. `site.name` below is this same name, for older files. */
const brandName = "The Creative Branders" as const;

export const site = {
  brandName,
  name: brandName,
  /** Registered company name. Use this on the footer and the legal pages. */
  legalName: "The Creative Branders LTD",
  jurisdiction: "Ghana",
  registrationAuthority: "Office of the Registrar of Companies (ORC), Ghana",
  /** Leave blank and the legal pages skip this line. */
  registrationNumber: "",
  /** Street or GhanaPost address. Leave blank and the legal pages show only Accra, Ghana. */
  streetAddress: "",
  address: {
    city: "Accra",
    region: "Greater Accra",
    country: "Ghana",
    countryCode: "GH",
  },
  email: "hello@thecreativebranders.com",
  /** Digits with a leading plus, for a tel: link. */
  phoneE164: "+233206783693",
  /** The same number, with spaces, for people to read. */
  phoneDisplay: "+233 20 678 3693",
  whatsapp: {
    /** Country code plus the number, digits only. */
    number: "233206783693",
    defaultMessage: "Hello The Creative Branders, I'd like to talk about a project.",
  },
  url: "https://thecreativebranders.com",
  social: {
    linkedin: "https://www.linkedin.com/company/thecreativebranders",
    instagram: "https://www.instagram.com/thecreativebranders",
    facebook: "https://www.facebook.com/thecreativebranders",
  },
  /** Browser tabs read as "Page | The Creative Branders". */
  titleJoin: " | ",
  description:
    "We're the strategy and technology partner behind growing businesses. We take the pressure off your day, so you can focus on your customers and your next move.",
  footerTagline: "Designed for intelligent growth.",
} as const;

/**
 * The extra lines under "Who we are" on the legal pages.
 * A blank registration number or street is left out.
 */
export function legalPlaceLines(): string[] {
  const lines: string[] = [];
  if (site.registrationNumber.trim()) {
    lines.push(`Registration number: ${site.registrationNumber}.`);
  }
  if (site.streetAddress.trim()) {
    lines.push(site.streetAddress.trim());
  }
  lines.push(`${site.address.city}, ${site.address.country}`);
  lines.push(`Email: ${site.email}.`);
  return lines;
}
