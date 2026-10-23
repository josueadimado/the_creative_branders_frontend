/** Short cookies page, matching the consent banner. The owner reviews this before launch. */

export const cookies = {
  seo: {
    title: "Cookies",
    description: "How this website uses essential cookies and optional analytics.",
    path: "/cookies",
  },
  kicker: "Legal",
  title: "Cookies",
  lede: "Essential cookies keep the site working. Analytics stays off unless you allow it.",
  sections: [
    {
      title: "Essential",
      paragraphs: [
        "We store your cookie choice on this device so we don't ask again on every page. That cookie is needed for the site to remember what you picked. The project form, the waitlist and the Academy form don't use a tracking cookie to save what you send.",
      ],
    },
    {
      title: "Analytics",
      paragraphs: [
        "If you choose Allow analytics, we load Google Analytics to see which pages are visited. If you choose Essential only, or if you ignore the banner, analytics does not load. You can change your mind by clearing this site's data in your browser and choosing again.",
      ],
    },
    {
      title: "Questions",
      paragraphs: ["Email hello@thecreativebranders.com if you want to know what we store."],
    },
  ],
} as const;
