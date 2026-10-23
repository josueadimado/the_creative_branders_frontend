/** Words around the case studies. The studies themselves live in data/portfolio.ts. */

export const workPage = {
  seo: {
    title: "Our work",
    description:
      "Websites, web apps and platforms we've built for clinics, schools, nonprofits and startups in the US, Ghana and Nigeria.",
    path: "/work",
  },
  kicker: "Work",
  title: "Our work",
  lede: "A selection of what we've designed and built. Each project page explains what the client needed, what we made and what it runs on.",
  filters: {
    family: "Service",
    sector: "Sector",
    all: "All",
  },
  empty: "Nothing in this set yet.",
  read: "Read the case study",
  labels: {
    challenge: "The challenge",
    approach: "How we approached it",
    built: "What we built",
    stack: "Built with",
    results: "Results",
    gallery: "Gallery",
    visit: "Visit site",
    similar: "Start a similar project",
  },
} as const;
