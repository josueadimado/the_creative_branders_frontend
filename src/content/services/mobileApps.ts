import type { ServiceFamily } from "./types";

const mobileApps: ServiceFamily = {
  slug: "mobile-apps",
  name: "Mobile Apps",
  promise: "Mobile apps people keep using",
  description: "iOS and Android apps, designed and built for your customers, from first version to app store launch.",
  image: "/images/work-edtech.jpg",
  intro:
    "An app has to earn its place on someone's phone. We start with the one or two things your customers will open it for, make those fast and simple, and build from there.",
  services: [
    {
      title: "iOS and Android apps",
      body: "One codebase for both, so updates reach everyone at once.",
    },
    {
      title: "First versions",
      body: "A small, solid app you can put in front of real users and learn from.",
    },
    {
      title: "App design",
      body: "Screens that are easy to use with one thumb on a busy day.",
    },
    {
      title: "App store launch",
      body: "Store listings, screenshots, review and release.",
    },
    {
      title: "Connected to your systems",
      body: "The app talks to your website, payments and admin tools.",
    },
    {
      title: "Updates and support",
      body: "New phone versions, fixes and features after launch.",
    },
  ],
  // No published mobile app study yet, so these web apps stand in.
  relatedSlugs: ["relief-chiropractic", "up2date-connect", "come-clarity", "push-it"],
  relatedDevice: "phone",
  faqs: [
    {
      question: "Do I need an app or a website?",
      answer:
        "If customers use you once in a while, a good mobile website is usually enough. If they come back every week, an app starts to make sense. We'll tell you honestly which fits.",
    },
    {
      question: "iPhone and Android?",
      answer: "Yes, from one codebase, so you're not paying for two separate apps.",
    },
    {
      question: "How long does it take?",
      answer: "A first version usually takes three to five months, including app store review.",
    },
    {
      question: "Who manages the store accounts?",
      answer: "The apps are published under your own Apple and Google accounts. We set them up with you.",
    },
  ],
};

export default mobileApps;
