import automationAi from "./automationAi";
import brandDesign from "./brandDesign";
import dataGrowth from "./dataGrowth";
import mobileApps from "./mobileApps";
import type { ServiceFamily } from "./types";
import webApplications from "./webApplications";
import websites from "./websites";

/** Words for /services. The six cards below come from the family files. */
export const servicesPage = {
  seo: {
    title: "What we build",
    description:
      "Websites, web apps, mobile apps, brand, automation and data reporting for growing businesses.",
    path: "/services",
  },
  image: "/images/hero-studio.jpg",
  kicker: "Services",
  title: "What we build",
  lede: "Our work falls into six areas. Most projects start in one and pick up a second along the way. A booking site needs reminders. A marketplace needs reporting. We handle both, so you're not coordinating three suppliers.",
} as const;

export const serviceFamilies: ServiceFamily[] = [
  websites,
  webApplications,
  mobileApps,
  brandDesign,
  automationAi,
  dataGrowth,
];

export function getServiceFamily(slug: string | undefined): ServiceFamily | undefined {
  return serviceFamilies.find((family) => family.slug === slug);
}
