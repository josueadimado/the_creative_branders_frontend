import type { ServiceFamily } from "./types";

const websites: ServiceFamily = {
  slug: "websites",
  name: "Websites",
  promise: "Websites that bring in business",
  description: "Business websites, online stores and landing pages, designed and built to bring in enquiries.",
  image: "/images/work-nonprofit.jpg",
  intro:
    "A good website answers the questions a customer would ask you in person, then makes the next step easy. We plan the pages around those questions before we design anything.",
  services: [
    {
      title: "Business websites",
      body: "Clear pages for what you do, who it's for and how to get in touch.",
    },
    {
      title: "Landing pages",
      body: "One page for one campaign or offer, built to convert.",
    },
    {
      title: "Online stores",
      body: "Product pages, checkout and payments by card or mobile money.",
    },
    {
      title: "Websites your team can edit",
      body: "Change text, photos and news yourself, without calling a developer.",
    },
    {
      title: "Redesigns",
      body: "We keep what works on your current site and fix what doesn't.",
    },
    {
      title: "Hosting and care",
      body: "Hosting, backups, security updates and small changes each month.",
    },
  ],
  relatedSlugs: ["set-free-in-christ", "twi-learning-center", "come"],
  faqs: [
    {
      question: "How long does a website take?",
      answer:
        "Most business sites take four to eight weeks from signed proposal to launch. Online stores and multilingual sites take longer. You'll get a date in the proposal.",
    },
    {
      question: "What do you need from us?",
      answer:
        "Your logo, any photos you want to use, and someone who can answer questions about the business. We can write the copy if you don't have it.",
    },
    {
      question: "Can the site be in more than one language?",
      answer: "Yes. Set Free in Christ Mission runs in English, French, Spanish and Portuguese.",
    },
    {
      question: "Who owns the site?",
      answer: "You do. Once the project is paid, the design files, code and domain are yours.",
    },
  ],
};

export default websites;
