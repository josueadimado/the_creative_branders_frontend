/** Short cookies page. The owner reviews this before launch. */

export const cookies = {
  seo: {
    title: "Cookies",
    description: "This site does not ask you to accept cookies, and it does not load analytics.",
    path: "/cookies",
  },
  kicker: "Legal",
  title: "Cookies",
  lede: "This site does not ask you to accept cookies, and it does not load analytics.",
  sections: [
    {
      title: "What we store",
      paragraphs: [
        "The project form, the waitlist and the Academy form don't use a tracking cookie to save what you send.",
      ],
    },
    {
      title: "Analytics",
      paragraphs: ["We do not load Google Analytics, so page visits are not counted with a cookie."],
    },
    {
      title: "Questions",
      paragraphs: ["Email hello@thecreativebranders.com if you want to know what we store."],
    },
  ],
} as const;
