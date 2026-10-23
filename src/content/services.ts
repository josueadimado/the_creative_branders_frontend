/** Words for the services overview. Family pages arrive in a later phase. */

export const servicesPage = {
  seo: {
    title: "Services",
    description:
      "Brand, systems, and intelligence as a single brief. Accessible retainers and project ranges, not a menu of add-ons.",
    path: "/services",
  },
  hero: {
    image: "/images/hero-studio.jpg",
    kicker: "Services",
    title: "Everything your business needs to grow, in one place.",
    lede: "Brand, systems, and intelligence as a single brief. Accessible retainers and project ranges, not a menu of add-ons.",
  },
  families: [
    {
      title: "Brand & Digital Experience",
      image: "/images/pillar-brand.jpg",
      what: "How your business looks and how people move through it online: identity, website, and the first impression that has to hold.",
      get: [
        "Positioning and visual identity",
        "Website or platform UI designed for conversion, not decoration",
        "Content structure that explains what you do without noise",
      ],
    },
    {
      title: "Intelligent Systems",
      image: "/images/pillar-systems.jpg",
      what: "The software that actually runs the business: bookings, client records, operations. Built to fit how you work, including SmartCRM when a dedicated CRM is the right tool.",
      get: [
        "Custom operational tools and workflows",
        "SmartCRM as a standalone product",
        "Integrations so data does not live in five different places",
      ],
    },
    {
      title: "Business Intelligence",
      image: "/images/pillar-intelligence.jpg",
      what: "Reporting that founders can actually use. Not a dump of charts. A clear view of performance so decisions are faster and less guesswork.",
      get: [
        "Dashboards tied to the metrics that matter",
        "Simple reporting cadence for owners and operators",
        "A shared picture of growth across brand, systems, and sales",
      ],
    },
  ],
  offers: {
    eyebrow: "Investment",
    title: "Clear ranges. No theatre.",
    lede: "Project work is scoped after a discovery call. SmartCRM is available on its own if you only need the product.",
    quote: "Get a quote",
    note: "SmartCRM is also available on its own.",
    noteLink: "See SmartCRM",
    cards: [
      {
        description: "A focused first move: a site, a brand pass, or a single operational tool.",
        features: ["One primary surface", "Tight scope, fast delivery", "A foundation you can grow from"],
        highlighted: false,
      },
      {
        description: "The range most growing businesses land in: brand plus systems that work together.",
        features: [
          "Brand and digital experience",
          "An operational system or CRM setup",
          "A reporting view of what matters",
        ],
        highlighted: true,
      },
      {
        description: "Multi-surface work: platforms, integrations, and intelligence across the business.",
        features: ["Custom platforms", "Deeper integrations", "Ongoing studio partnership"],
        highlighted: false,
      },
    ],
  },
  process: {
    eyebrow: "Process",
    title: "How we work",
    steps: [
      {
        name: "Discover",
        body: "We learn the business, the constraint, and the outcome that would actually change things.",
        drawing: "discover",
      },
      {
        name: "Design",
        body: "We design the experience and the system together so they do not fight each other later.",
        drawing: "design",
      },
      {
        name: "Build",
        body: "We ship working software and a coherent brand. Not slides. Not prototypes that stall.",
        drawing: "build",
      },
      {
        name: "Grow",
        body: "We stay close as you use it: iterate, measure, and extend what is already working.",
        drawing: "grow",
      },
    ],
  },
} as const;
