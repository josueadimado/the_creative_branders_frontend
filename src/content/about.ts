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
    headline: "The strategy and technology partner behind growing businesses.",
    lede: "We plan, build and run software for clinics, schools, ministries and startups. You work directly with the person leading your project, and we bring in specialists when the work needs them.",
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
  started: {
    title: "Why we started",
    body: "Too many good businesses were stuck between a cheap website that didn't do much and an agency they couldn't afford. We started the studio to give growing businesses the kind of software and design larger companies get, at a size and price that makes sense for them.",
  },
  work: {
    title: "How we work with you",
    points: [
      {
        title: "You work with the person doing the work.",
        body: "One lead takes your project from the first call to launch.",
      },
      {
        title: "Specialists join when you need them.",
        body: "Mobile, payments or data experts we've worked with before. You don't pay for a large team you don't need.",
      },
      {
        title: "Built for how your customers pay and talk.",
        body: "Mobile money and Paystack, Square and insurance claims, WhatsApp and SMS.",
      },
      {
        title: "You can see what you're paying for.",
        body: "Our client portal shows every change, how long it took and what's next.",
      },
      {
        title: "It keeps working after launch.",
        body: "We host, monitor and update what we build.",
      },
    ],
  },
  believe: {
    title: "What we believe",
    body: "A business needs to look credible, run smoothly and know its numbers. Creativity, technology and finance work best together, and the blue dot in our logo is where they meet.",
  },
  values: {
    title: "What we hold ourselves to",
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
