import { site } from "./site";

/** Short cookies page. The owner reviews this before launch. */

export const cookies = {
  seo: {
    title: "Cookies",
    description: "How this site asks before using an analytics cookie.",
    path: "/cookies",
  },
  kicker: "Legal",
  title: "Cookies",
  lede: "We ask before using an analytics cookie. That choice is remembered for six months.",
  sections: [
    {
      title: "What we store",
      paragraphs: [
        "The project form, the waitlist and the Academy form don't use a tracking cookie to save what you send.",
      ],
    },
    {
      title: "Analytics",
      paragraphs: [
        "If you choose Accept, we load Google Analytics to see which pages are visited. If you choose Decline, that script stays off and any analytics cookies are removed. You can change this from Cookie settings in the footer.",
      ],
    },
    {
      title: "Questions",
      paragraphs: [`Email ${site.email} if you want to know what we store.`],
    },
  ],
} as const;
