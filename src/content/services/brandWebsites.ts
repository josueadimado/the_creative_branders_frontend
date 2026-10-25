import type { ServiceFamily } from "./types";

/**
 * Brand and websites, joined from the old websites and brand pages.
 * Eight included items and five questions, so the page stays readable.
 */
const brandWebsites: ServiceFamily = {
  slug: "brand-websites",
  name: "Brand and websites",
  promise: "We help you establish your look from the first click",
  description:
    "We shape your brand and build the website that turns visitors into enquiries.",
  image: "/images/work-nonprofit.jpg",
  intro:
    "People decide quickly whether a business looks trustworthy. We set the name, the look and the words, then build the site that answers a customer's questions and makes the next step easy.",
  services: [
    {
      title: "Brand identity",
      body: "A logo, colours and type that work at every size, from an app icon to a signboard.",
    },
    {
      title: "Positioning and messaging",
      body: "What you do, who it's for and why you, in words your customers use.",
    },
    {
      title: "Business websites",
      body: "Clear pages for what you do, who it's for and how to get in touch.",
    },
    {
      title: "Online stores",
      body: "Product pages, checkout and payments by card or mobile money.",
    },
    {
      title: "Landing pages",
      body: "One page for one campaign or offer, built to convert.",
    },
    {
      title: "Websites your team can edit",
      body: "Change text, photos and news yourself, without calling a developer.",
    },
    {
      title: "Brand guidelines",
      body: "A short guide your team and suppliers can actually follow.",
    },
    {
      title: "Interface design",
      body: "Screens for websites and apps that match your brand and are easy to use.",
    },
  ],
  relatedSlugs: ["set-free-in-christ", "come", "twi-learning-center", "elevate-tribe-analytics"],
  faqs: [
    {
      question: "How long does a website take?",
      answer:
        "Most business sites take four to eight weeks from signed proposal to launch. Online stores and multilingual sites take longer. You'll get a date in the proposal.",
    },
    {
      question: "What do you need from us?",
      answer:
        "Your logo if you have one, any photos you want to use, and someone who can answer questions about the business. We can write the copy if you don't have it.",
    },
    {
      question: "Can the site be in more than one language?",
      answer: "Yes. Set Free in Christ Mission runs in English, French, Spanish and Portuguese.",
    },
    {
      question: "Who owns the site?",
      answer: "You do. Once the project is paid, the design files, code and domain are yours.",
    },
    {
      question: "Can you work with our existing logo?",
      answer: "Yes. Often the logo only needs tidying up and using consistently.",
    },
  ],
};

export default brandWebsites;
