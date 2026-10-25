import type { ServiceFamily } from "./types";

/**
 * Automation and reporting, joined from the old automation and data pages.
 * Eight included items and five questions.
 */
const automationReporting: ServiceFamily = {
  slug: "automation-reporting",
  name: "Automation and reporting",
  promise: "We help you automate the routine work",
  description:
    "We set up the replies, reminders and follow-ups so they go out on time, and we keep your key numbers updating every day.",
  image: "/images/work-clinic.jpg",
  intro:
    "Confirmations, reminders and follow-ups take hours each week and are easy to forget. We automate the routine parts, then put sales, cash and enquiries on one screen so you can see what changed.",
  services: [
    {
      title: "WhatsApp assistants",
      body: "Answer common questions and take bookings on WhatsApp, day and night.",
    },
    {
      title: "Reminders and follow-ups",
      body: "Text and email for appointments, payments and updates.",
    },
    {
      title: "Phone booking assistants",
      body: "Callers book an appointment by speaking, and it goes straight into your calendar.",
    },
    {
      title: "CRM setup",
      body: "Your leads and customers in one place, with follow-ups that don't slip.",
    },
    {
      title: "Dashboards",
      body: "Sales, cash and key figures on one screen, updated without a spreadsheet.",
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
      title: "Search optimisation",
      body: "Pages that rank for what your customers search for.",
    },
  ],
  relatedSlugs: ["relief-chiropractic"],
  faqs: [
    {
      question: "Will customers know they're talking to an assistant?",
      answer:
        "Yes, they should. We set assistants up to say so and to pass people to your staff when it matters.",
    },
    {
      question: "What can be automated first?",
      answer:
        "Usually appointment reminders and payment reminders. They're simple to set up and save time from the first week.",
    },
    {
      question: "Is our data used to train AI models?",
      answer:
        "We configure the services we use so your customer data isn't used for training, and we explain each tool's data terms before you agree to it.",
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

export default automationReporting;
