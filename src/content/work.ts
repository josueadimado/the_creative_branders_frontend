/** Words around the case studies. The studies themselves live in data/portfolio.ts. */

export const workPage = {
  seo: {
    title: "Work",
    description:
      "Work that moved the numbers. Each study is the problem we walked into, how we approached it, and what we shipped.",
    path: "/work",
  },
  kicker: "Work",
  title: "Work that moved the numbers.",
  lede: "Each study is the problem we walked into, how we approached it, and what we shipped.",
  filters: {
    family: "Service",
    sector: "Sector",
    all: "All",
  },
  empty: "Nothing in this set yet.",
  read: "Read the case study",
  labels: {
    challenge: "The challenge",
    approach: "Our approach",
    built: "What we built",
    stack: "Built with",
    results: "Results",
    gallery: "Gallery",
    visit: "Visit site",
    similar: "Start a similar project",
  },
} as const;
