import { site } from "./site";

/** Short terms. The owner reviews this before launch. */

export const terms = {
  seo: {
    title: "Terms",
    description: `The terms for using the ${site.name} website and for project work.`,
    path: "/terms",
  },
  kicker: "Legal",
  title: "Terms",
  lede: "These terms cover use of this website. A project is covered by the proposal you agree to.",
  sections: [
    {
      title: "Using the site",
      paragraphs: [
        "You can browse this site and send us a brief. Don't misuse the forms, try to break the site, or send us someone else's information without their permission.",
      ],
    },
    {
      title: "Project work",
      paragraphs: [
        "Nothing starts until you've agreed a written proposal. The proposal sets the scope, the timeline and the price. When the project is paid, the design files, code and domain we built for you are yours, as the proposal describes.",
      ],
    },
    {
      title: "The site content",
      paragraphs: [
        `The writing, design and code of this website belong to ${site.name}. Case studies are shared with the client's permission. Please don't copy the site and present it as your own.`,
      ],
    },
    {
      title: "Questions",
      paragraphs: [`Email ${site.email} and we'll reply within one business day.`],
    },
  ],
} as const;
