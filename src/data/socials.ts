/** Shared contact details for the footer, contact page, and WhatsApp buttons. */

export const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/thecreativebranders/" },
  { label: "Instagram", href: "https://www.instagram.com/thecreativebranders/" },
  { label: "Facebook", href: "https://www.facebook.com/thecreativebranders" },
  { label: "X", href: "https://x.com/theCBranders" },
] as const;

export const studioEmail = "hello@thecreativebranders.com";

// Digits only, including the country code. Empty means "hide every WhatsApp link".
const rawWhatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");

export const whatsappNumber = rawWhatsapp;

export const whatsappHref = rawWhatsapp ? `https://wa.me/${rawWhatsapp}` : "";
