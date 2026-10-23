/** Words around the case studies. The studies themselves live in data/portfolio.ts. */

export const workPage = {
  seo: {
    title: "Work",
    description:
      "Nine studios, clinics, and platforms. Each write-up is the problem we walked into, how we approached it, and what we shipped.",
    path: "/work",
  },
  hero: {
    image: "/images/work-clinic.jpg",
    kicker: "Work",
    title: "Proof, not promises.",
    lede: "Nine studios, clinics, and platforms. Each write-up is the problem we walked into, how we approached it, and what we shipped. We do not invent outcome numbers.",
  },
  labels: {
    problem: "The problem",
    approach: "How we approached it",
    built: "What we built",
  },
} as const;
