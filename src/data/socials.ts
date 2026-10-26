/**
 * Social links, the public email, and WhatsApp.
 * The words and numbers come from content/site.ts so they are not typed twice.
 * A build can set VITE_WHATSAPP_NUMBER to use a different WhatsApp number.
 * If that variable is missing or blank, the Ghana number in site.ts is used.
 */
import { site } from "../content/site";

export const socials = [
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "Instagram", href: site.social.instagram },
  { label: "Facebook", href: site.social.facebook },
] as const;

/** The inbox visitors write to. Same address as site.email. */
export const studioEmail = site.email;

// Digits only. A blank environment variable falls back to the number in site.ts.
const fromEnv = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, "");

export const whatsappNumber = fromEnv || site.whatsapp.number;

/** A WhatsApp chat link. Pass a message to pre-fill the first text. */
export function whatsappLink(message: string = site.whatsapp.defaultMessage): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Opens WhatsApp with the studio's usual greeting. */
export const whatsappHref = whatsappLink();
