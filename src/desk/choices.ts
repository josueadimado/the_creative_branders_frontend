/** The same service names the public site uses. The first value is what we save. */
export const FAMILIES: [string, string][] = [
  ["brand-websites", "Brand and websites"],
  ["web-applications", "Web applications"],
  ["mobile-apps", "Mobile apps"],
  ["automation-reporting", "Automation and reporting"],
];

export const RELATIONSHIPS: [string, string][] = [
  ["client", "Client project"],
  ["venture", "Studio venture"],
];

export const DEVICES: [string, string][] = [
  ["browser", "Browser window"],
  ["phone", "Phone"],
];

/** Page addresses the website already knows. A new address would not show anywhere. */
export const PAGE_NAMES: Record<string, string> = {
  home: "Homepage",
  about: "About",
  work: "Work",
  contact: "Contact",
};

export function familyLabel(slug: string): string {
  return FAMILIES.find(([value]) => value === slug)?.[1] || slug;
}
