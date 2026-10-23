import type { ServiceFamily } from "./types";

const brandDesign: ServiceFamily = {
  slug: "brand-design",
  name: "Brand & Design",
  promise: "Look as good as your work",
  description: "Brand strategy, logos, identity systems, interface design and pitch decks for growing businesses.",
  image: "/images/pillar-brand.jpg",
  intro:
    "People decide quickly whether a business looks trustworthy. We help you look established and consistent, on your website, your app, your invoices and your pitch deck.",
  services: [
    {
      title: "Positioning and messaging",
      body: "What you do, who it's for and why you, in words your customers use.",
    },
    {
      title: "Logos and identity",
      body: "A logo, colours and type that work at every size, from app icon to signboard.",
    },
    {
      title: "Brand guidelines",
      body: "A short guide your team and suppliers can actually follow.",
    },
    {
      title: "Interface design",
      body: "Screens for websites and apps that match your brand and are easy to use.",
    },
    {
      title: "Pitch and investor decks",
      body: "A clear story with clean slides.",
    },
    {
      title: "Marketing materials",
      body: "Social templates, flyers, packaging and print.",
    },
  ],
  relatedSlugs: ["elevate-tribe-learning", "elevate-tribe-analytics", "come"],
  faqs: [
    {
      question: "Can you work with our existing logo?",
      answer: "Yes. Often the logo only needs tidying up and using consistently.",
    },
    {
      question: "What do we get at the end?",
      answer: "Logo files for print and screen, colour and font details, and a brand guide.",
    },
    {
      question: "How many options will we see?",
      answer: "We show two or three directions, then refine the one you choose.",
    },
    {
      question: "Do you design apps and websites too?",
      answer: "Yes. Most of our brand work leads straight into a site or app, so it's designed to be used there.",
    },
  ],
};

export default brandDesign;
