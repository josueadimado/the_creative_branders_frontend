// Content to be reviewed by a qualified Ghanaian lawyer before wide promotion.
import { legalPlaceLines, site } from "./site";

/** Shown under the title. Change this when the terms text changes. */
const updated = "26 October 2026";

export const terms = {
  seo: {
    title: "Terms",
    description: `The terms for using the ${site.legalName} website.`,
    path: "/terms",
  },
  kicker: "Legal",
  title: "Terms",
  updated,
  lede: "These terms cover use of this website. Project work is covered by the proposal you agree to.",
  sections: [
    {
      title: "Who we are",
      paragraphs: [
        `This website is run by ${site.legalName}, registered in ${site.jurisdiction} with the ${site.registrationAuthority}.`,
        ...legalPlaceLines(),
      ],
    },
    {
      title: "Using the website",
      paragraphs: [
        "You may browse this site and send us a message. Do not misuse the forms, try to break the site, or send us someone else's information without their permission.",
      ],
    },
    {
      title: "Quotes and proposals",
      paragraphs: [
        "A quote or a proposal is an offer, not a contract. Work starts only after you agree to a written proposal. That proposal sets the scope and the timeline.",
      ],
    },
    {
      title: "Intellectual property",
      paragraphs: [
        `The writing, design and code of this website belong to ${site.legalName}. Work we create for a client is covered by the agreement for that project.`,
      ],
    },
    {
      title: "Limitation of liability",
      paragraphs: [
        "We are not liable for loss that comes from using this website or from relying on general information on it. Liability for a project is set out in that project's agreement. Nothing here limits liability that Ghanaian law does not allow us to limit.",
      ],
    },
    {
      title: "Links to other sites",
      paragraphs: [
        "This site links to other websites, including social networks and WhatsApp. Those sites have their own terms. We are not responsible for them.",
      ],
    },
    {
      title: "Changes",
      paragraphs: [
        "We may update these terms. The date at the top of this page shows the latest version.",
      ],
    },
    {
      title: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of the Republic of Ghana. Disputes go to the courts of Accra.",
      ],
    },
  ],
};
