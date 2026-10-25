import automationReporting from "./automationReporting";
import brandWebsites from "./brandWebsites";
import mobileApps from "./mobileApps";
import type { ServiceFamily } from "./types";
import webApplications from "./webApplications";

/** Words for /services. The four cards below come from the family files. */
export const servicesPage = {
  seo: {
    title: "What we build",
    description:
      "Brand and websites, web applications, mobile apps, and automation and reporting for growing businesses.",
    path: "/services",
  },
  image: "/images/hero-studio.jpg",
  kicker: "Services",
  title: "What we build",
  lede: "The brand and the website, the software your team runs, apps for iPhone and Android, and the reminders and reports that update on their own.",
} as const;

export const serviceFamilies: ServiceFamily[] = [
  brandWebsites,
  webApplications,
  mobileApps,
  automationReporting,
];

/** Old addresses that now live on a merged page. */
export const serviceRedirects: Record<string, string> = {
  websites: "brand-websites",
  "brand-design": "brand-websites",
  "automation-ai": "automation-reporting",
  "data-growth": "automation-reporting",
};

export function getServiceFamily(slug: string | undefined): ServiceFamily | undefined {
  return serviceFamilies.find((family) => family.slug === slug);
}
