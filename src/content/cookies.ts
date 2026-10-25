/** Short cookies page. The owner reviews this before launch. */

export const cookies = {
  seo: {
    title: "Cookies",
    description: "How this website uses cookies.",
    path: "/cookies",
  },
  kicker: "Legal",
  title: "Cookies",
  lede: "Essential cookies keep the site working. Analytics stays off unless you allow it.",
  sections: [
    {
      title: "What we store",
      paragraphs: [
        "We store your cookie choice on this device so we don't ask on every page. The project form, the waitlist and the Academy form don't use a tracking cookie to save what you send.",
      ],
    },
    {
      title: "Analytics",
      paragraphs: [
        "If you choose Accept, and analytics is switched on for this site, we load it to see which pages are visited. Essential only leaves analytics off. Cookie settings in the footer opens the choice again.",
      ],
    },
    {
      title: "Questions",
      paragraphs: ["Email hello@thecreativebranders.com if you want to know what we store."],
    },
  ],
} as const;
