/** Words for the homepage. The page file only handles layout. */

export const home = {
  seo: {
    title: "We make your business look, run, and scale smarter",
    description:
      "Brand, systems, and intelligence for African SMEs and diaspora founders. One studio. One scope. Built to last.",
    path: "/",
  },
  hero: {
    image: "/images/hero-studio.jpg",
    kicker: "Digital Intelligence Studio",
    title: "We make your business look, run, and scale smarter.",
    lede: "Brand, systems, and intelligence for African SMEs and diaspora founders. One studio. One scope. Built to last.",
    primary: "Book your free discovery call",
    secondary: "See the work",
  },
  pillars: {
    eyebrow: "What we do",
    title: "Three disciplines. One studio.",
    lede: "Most businesses are asked to hire an agency for the look, a freelancer for the build, and a consultant for the numbers. We hold the whole stack.",
    items: [
      {
        title: "Brand & Digital Experience",
        body: "Identity, websites, and digital presence that make a business look as capable as it is.",
        image: "/images/pillar-brand.jpg",
      },
      {
        title: "Intelligent Systems",
        body: "Booking, CRM, and operations tools that run the work, so growth does not depend on memory and spreadsheets.",
        image: "/images/pillar-systems.jpg",
      },
      {
        title: "Business Intelligence",
        body: "Clear numbers and reporting so founders can see what is working and decide with evidence.",
        image: "/images/pillar-intelligence.jpg",
      },
    ],
  },
  process: {
    eyebrow: "How we work",
    title: "A short path from brief to growth.",
    lede: "Four steps, held by one team. Discover, design, build, then stay close as you grow.",
    steps: [
      { name: "Discover", body: "We learn the business and the outcome that would actually change things.", drawing: "discover" },
      { name: "Design", body: "Experience and system, designed together so they do not fight later.", drawing: "design" },
      { name: "Build", body: "Working software and a coherent brand. Not slides.", drawing: "build" },
      { name: "Grow", body: "We stay close: iterate, measure, and extend what is working.", drawing: "grow" },
    ],
  },
  work: {
    eyebrow: "Selected work",
    title: "Proof, not promises.",
    lede: "Clinics, nonprofits, learning platforms, and community products. Open any story to read the full brief.",
    link: "View all work",
  },
  different: {
    title: "What makes us different.",
    points: [
      "One accountable lead from brief to launch. You deal with the person doing the thinking, not an account manager.",
      "The right specialist for each job. Vetted developers, designers and data experts join when the project needs them, so you get depth without a big agency's overheads.",
      "Built for real markets. We've designed for customers in very different economies, so the work fits how your customers actually buy, pay and talk to you.",
      "Measured, not guessed. Every project ships with the numbers that show it worked.",
      "You see every change and every bill. Our client portal shows what we shipped, what it took and what's next, updated as the work happens.",
    ],
  },
  why: {
    image: "/images/about-studio.jpg",
    eyebrow: "Why TCB",
    title: "Not an agency. Not a freelancer. Something better.",
    lede: "Agencies scale by adding layers. Freelancers scale by adding hours. We are a studio: a small team with a full brief. Brand, systems, and intelligence, held together so the work stays coherent as you grow.",
  },
} as const;
