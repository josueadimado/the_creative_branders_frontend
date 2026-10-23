import type { ServiceFamily } from "./types";

const webApplications: ServiceFamily = {
  slug: "web-applications",
  name: "Web Applications",
  promise: "Web apps built around your process",
  description: "Custom web apps, portals, booking systems and dashboards built around how your business works.",
  image: "/images/work-ops.jpg",
  intro:
    "When the spreadsheet, the paper form and the group chat can't keep up, it's usually time for a proper system. We start by learning how the work actually moves through your business, then build software that follows it.",
  services: [
    {
      title: "Custom web apps",
      body: "Software for the way your team works, with the roles and permissions you need.",
    },
    {
      title: "Client and member portals",
      body: "A private place where your customers sign in to see their records, documents and bills.",
    },
    {
      title: "Booking and ordering systems",
      body: "Appointments, classes or orders, with reminders and payment built in.",
    },
    {
      title: "Dashboards and internal tools",
      body: "One screen for the work your staff do every day.",
    },
    {
      title: "Products for startups",
      body: "A first version of your product, ready for real users.",
    },
    {
      title: "Payment integrations",
      body: "Square, Paystack, Stripe and mobile money, connected properly and tested.",
    },
  ],
  relatedSlugs: ["relief-chiropractic", "up2date-connect", "come-clarity", "push-it"],
  faqs: [
    {
      question: "How long does a web app take?",
      answer:
        "A focused first version usually takes two to four months. We'll suggest what to build first so you're using it sooner.",
    },
    {
      question: "Can it handle sensitive data?",
      answer:
        "We build in role-based access, audit logs and encrypted secrets, and we've done this for health and counseling clients. Your legal compliance still sits with you, and we'll work with your advisers on it.",
    },
    {
      question: "Will it work on phones?",
      answer:
        "Yes. Everything we build works in a phone browser, and some apps can be installed to the home screen.",
    },
    {
      question: "What happens after launch?",
      answer:
        "We host it, watch for errors and keep it updated. Changes are logged in our client portal so you always know what was done.",
    },
  ],
};

export default webApplications;
