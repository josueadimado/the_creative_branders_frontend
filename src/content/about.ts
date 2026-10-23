/** Words for the about page. */

export const about = {
  seo: {
    title: "About",
    description:
      "African businesses and diaspora-founded companies deserve a studio that holds brand, systems, and intelligence as one brief.",
    path: "/about",
  },
  hero: {
    image: "/images/about-studio.jpg",
    kicker: "About",
    title: "We started TCB to prove something.",
    lede: "That African businesses and diaspora-founded companies deserve a studio. Not a freelancer piecing together nights, and not an agency that treats the work as a campaign. A place that holds brand, systems, and intelligence as one brief.",
  },
  origin: {
    eyebrow: "Origin",
    title: "A studio, on purpose.",
    lede: "TCB exists because too much of the market is either too thin or too loud. We wanted a third option: a small team, a full stack, and a voice that does not need a founder’s name on the door. The conviction is institutional. We, not I.",
    image: "/images/about-studio.jpg",
    mission: "Mission: make growth intelligent. How a business looks, how it runs, and how it knows.",
    vision: "Vision: a generation of African and diaspora businesses that scale with clarity, not chaos.",
  },
  difference: {
    eyebrow: "Difference",
    title: "What makes TCB different",
    items: [
      {
        title: "Rooted in Africa",
        body: "We build for African SMEs and diaspora founders first. The constraints are real: access, infrastructure, trust. The standard is not lowered to match them.",
        drawing: "africa",
      },
      {
        title: "Built to global standard",
        body: "The work has to hold next to anything shipped in London, Toronto, or Nairobi. Craft is not a luxury add-on.",
        drawing: "design",
      },
      {
        title: "Full scope, one team",
        body: "Brand, systems, and intelligence stay in one studio. No hand-off where the story falls apart.",
        drawing: "team",
      },
    ],
  },
  values: {
    kicker: "Values",
    items: ["Intelligence", "Clarity", "Impact"],
  },
  partners: {
    kicker: "Partners",
    items: ["COME", "Elevate Tribe"],
  },
} as const;
