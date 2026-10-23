/** The shape of one service family. The overview and the family page both read this. */

export type ServicePoint = {
  title: string;
  body: string;
};

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceFamily = {
  slug: string;
  /** Short name used in the footer and on the quote button. */
  name: string;
  /** The page heading, also the one line on the overview card. */
  promise: string;
  description: string;
  image: string;
  intro: string;
  services: ServicePoint[];
  /** Case-study slugs to show at the bottom of the page. */
  relatedSlugs: string[];
  /** Phone frame only when we are standing in for a mobile screenshot. */
  relatedDevice?: "browser" | "phone";
  faqs: ServiceFaq[];
};
