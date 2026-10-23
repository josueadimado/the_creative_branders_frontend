import type { ServiceFamily } from "./types";

const dataGrowth: ServiceFamily = {
  slug: "data-growth",
  name: "Data & Growth",
  promise: "Know your numbers every week",
  description: "Dashboards, analytics, financial reporting and SEO so you can see what's working and grow from it.",
  image: "/images/pillar-intelligence.jpg",
  intro:
    "Most owners know roughly how the business is doing. We help you know exactly, with dashboards that pull from your sales, payments and website, updated without anyone building a spreadsheet.",
  services: [
    {
      title: "Business dashboards",
      body: "Sales, cash and key figures on one screen.",
    },
    {
      title: "Website analytics",
      body: "Tracking set up properly, so you can see where enquiries come from.",
    },
    {
      title: "Sales and stock reporting",
      body: "What sold, what's running low and what's slow.",
    },
    {
      title: "Search optimisation (SEO)",
      body: "Pages that rank for what your customers search for.",
    },
    {
      title: "Marketing reporting",
      body: "What you spent, what it brought in and what to change.",
    },
    {
      title: "Investor and donor reports",
      body: "Clear monthly or quarterly reports for the people who fund you.",
    },
  ],
  relatedSlugs: ["elevate-tribe-analytics", "push-it"],
  faqs: [
    {
      question: "What tools do you use?",
      answer: "Power BI, Looker Studio and Google Analytics, or reporting built into your own system.",
    },
    {
      question: "We don't have clean data. Can you still help?",
      answer: "Yes. Cleaning up and organising the data is usually the first part of the work.",
    },
    {
      question: "How often are dashboards updated?",
      answer: "Daily for most clients. Some update live.",
    },
    {
      question: "Can you help us appear on Google?",
      answer: "Yes. We fix the technical basics first, then write pages around what your customers search for.",
    },
  ],
};

export default dataGrowth;
