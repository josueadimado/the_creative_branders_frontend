/** Words for the about page. No personal names. */

export const about = {
  seo: {
    title: "About the studio",
    description:
      "The Creative Branders is a design and development studio for growing businesses. We design and build websites, apps and the systems behind them.",
    path: "/about",
  },
  hero: {
    kicker: "About the studio",
    title: "About the studio",
    /** Centered in the opening, above the studio photo. */
    headline: "We design and build websites, apps and the systems behind them.",
    lede: "We work with growing businesses that need a website, an app, or the system their team runs every day.",
  },
  services: {
    title: "What we build for growing businesses",
    lede: "The brand and the website, the software your team runs, apps for iPhone and Android, and the reminders and reports that update on their own.",
  },
  /** Line drawings made for this page. The banner photo is used only here. */
  pictures: {
    banner: {
      src: "/images/about/studio-banner.jpg?v=2",
      alt: "People working together at a studio desk.",
    },
    /** Two work photos under the wide banner. No names. */
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
    note: "From the work we've published.",
    stats: [
      { value: "10", label: "projects shipped" },
      { value: "3", label: "countries: United States, Ghana and Nigeria" },
      { value: "4", label: "languages: English, French, Spanish and Portuguese" },
      { value: "5", label: "currencies: NGN, GHS, KES, ZAR and USD" },
    ],
  },
  started: {
    title: "Why we started",
    body: "We started the studio to give growing businesses software and design of the same quality larger companies get, at a size and price that makes sense for them.",
  },
  work: {
    title: "How we help your business run",
    paragraphs: [
      "Every project has one lead who stays with it from the first call to launch and beyond. When a project needs more, such as a mobile developer, a payments specialist or a data analyst, we bring in people we've worked with before.",
      "You follow the work in our client portal. You can see what's been done, how long it took and what's coming next, at any time.",
    ],
  },
  believe: {
    title: "What we believe",
    body: "Creativity, technology and finance work best together. A business needs to look credible, run smoothly and know its numbers. The blue dot in our logo is where those three meet.",
  },
  values: {
    title: "These values shape every project we take on",
    items: [
      {
        title: "Clarity",
        body: "We explain things plainly, in writing, and we put scope and cost in the proposal before work starts.",
      },
      {
        title: "Care",
        body: "We build as if we'll have to maintain it for years, because usually we do.",
      },
      {
        title: "Ownership",
        body: "When something goes wrong, we fix it and tell you what happened.",
      },
      {
        title: "Responsibility",
        body: "We handle your customers' data carefully and only use tools we'd trust with our own.",
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
