/** Words for the about page. No personal names. */
import { site } from "./site";

export const about = {
  seo: {
    title: "About the studio",
    description:
      `${site.name} is a design and development studio for growing businesses. We design and build websites, apps and the systems behind them.`,
    path: "/about",
  },
  hero: {
    kicker: "About the studio",
    title: "About the studio",
    /** Centered in the opening, above the studio photo. */
    headline: "We're the strategy and technology partner behind your business.",
    lede: "From the first idea to the systems you rely on every day, we stay with you as your business grows.",
  },
  services: {
    title: "What we build for growing businesses",
    lede: "The brand and the website, the software your team runs, apps for iPhone and Android, and the reminders and reports that update on their own.",
  },
  /** Line drawings made for this page. The banner photo is used only here. */
  pictures: {
    /** Two work photos. No names. */
    desks: [
      {
        src: "/images/about/desk-evening.jpg",
        alt: "A person working at a desk with code on the screen.",
      },
      {
        src: "/images/about/desk-close.jpg",
        alt: "Hands typing at a keyboard beside a screen of code.",
      },
    ],
    started: {
      src: "/images/about/about-started.jpg",
      alt: "A small shop connected to three app screens.",
    },
    work: {
      src: "/images/about/about-portal.jpg",
      alt: "A project window with a checklist, a chart and a calendar.",
    },
    believe: {
      src: "/images/about/about-pillars.jpg",
      alt: "Three pillars joined by one blue dot.",
    },
  },
  facts: {
    /** Sits to the left of the four numbers. */
    note: "Numbers matter – but the stories behind them matter even more:",
    stats: [
      { value: "6+", label: "Years in technology" },
      { value: "10+", label: "Delivered projects" },
      { value: "15", label: "Specialists on our team" },
      { value: "95%", label: "Client retention" },
    ],
  },
  started: {
    title: "Why we started",
    body: "A lot of growing businesses run on the same setup. A website someone built a few years ago. Bookings in a spreadsheet or a notebook. Customers in WhatsApp. Payments in a separate app. It works until the business grows, and then the owner spends their evenings holding it all together.",
  },
  work: {
    title: "Why we exist",
    paragraphs: [
      `Fixing that properly used to mean hiring an agency built for much larger companies. We started ${site.name} so growing businesses could get the same standard of work at a size and price that fits them: the website, the apps and the systems behind them, planned together.`,
      "One person leads your project from the first call to launch. If it needs a mobile developer, a payments specialist or a data analyst, we bring in people we've worked with before. Everything we do shows up in our client portal, so you always know what's been done and what's next.",
    ],
  },
  believe: {
    title: "What we believe",
    body: "Creativity, technology and finance work best together. A business needs to look credible, run smoothly and know its numbers. The blue dot in our logo is where those three meet.",
  },
  values: {
    title: "What we hold ourselves to",
    items: [
      {
        title: "Clarity",
        body: "We explain things plainly and agree scope and cost in writing before work starts.",
      },
      {
        title: "Care",
        body: "We build every project as if we'll maintain it for years, because we usually do.",
      },
      {
        title: "Ownership",
        body: "If something goes wrong, we fix it and tell you exactly what happened.",
      },
      {
        title: "Responsibility",
        body: "We protect your customers' data and only use tools we'd trust with our own.",
      },
    ],
  },
  organisations: {
    title: "Organisations we've built with",
    names: [
      "Relief Chiropractic",
      "Push-it",
      "COME|CLARITY",
      "Up2Date Connect",
      "Set Free in Christ Mission",
      "COME",
      "Elevate Tribe",
      "Twi Learning Center",
    ],
  },
} as const;
