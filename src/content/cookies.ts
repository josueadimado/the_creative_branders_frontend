// Content to be reviewed by a qualified Ghanaian lawyer before wide promotion.
// When marketing cookies are added, list Meta Pixel and the LinkedIn Insight Tag
// in the Marketing section below, with the provider and how long each cookie lasts.
import { site } from "./site";

/** Shown under the title. Change this when the cookie text changes. */
const updated = "26 October 2026";

export const cookies = {
  seo: {
    title: "Cookies",
    description: "How this site uses necessary and analytics cookies, and how to change your choice.",
    path: "/cookies",
  },
  kicker: "Legal",
  title: "Cookies",
  updated,
  lede: "A cookie is a small file saved on your device. We ask before using any that are not needed for the site to work.",
  sections: [
    {
      title: "Necessary",
      paragraphs: [
        "These remember the cookie choice you make, so we do not ask again on every page. We set them. They last about six months.",
      ],
    },
    {
      title: "Analytics",
      paragraphs: [
        "These tell us which pages are visited. Google Analytics sets them, and only after you choose Accept. If you choose Decline, that script stays off and we remove the analytics cookies stored for this site. Google decides how long its own cookies last.",
      ],
    },
    {
      title: "Marketing",
      paragraphs: [
        "We do not set marketing cookies yet. If we add them later, they will load only after you allow marketing cookies, and this page will name the provider and how long they last.",
      ],
    },
    {
      title: "How to change your choice",
      paragraphs: [
        "Use Cookie settings to choose again. The same control is in the footer when analytics is switched on.",
        `Questions: email ${site.email}.`,
      ],
    },
  ],
};
