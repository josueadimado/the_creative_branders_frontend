import type { ServiceFamily } from "./types";

const automationAi: ServiceFamily = {
  slug: "automation-ai",
  name: "Automation & AI",
  promise: "Let the routine work run itself",
  description: "WhatsApp assistants, chatbots, CRM setup and automated reminders that save your team time.",
  image: "/images/work-clinic.jpg",
  intro:
    "Confirmations, reminders, follow-ups and status updates take hours each week and are easy to forget. We automate the routine parts so your team can spend that time with customers.",
  services: [
    {
      title: "WhatsApp assistants",
      body: "Answer common questions and take bookings on WhatsApp, day and night.",
    },
    {
      title: "Phone booking assistants",
      body: "Callers book an appointment by speaking, and it goes straight into your calendar.",
    },
    {
      title: "Website chatbots",
      body: "Answers from your own information, with a hand-off to a person when needed.",
    },
    {
      title: "CRM setup",
      body: "Your leads and customers in one place, with follow-ups that don't slip.",
    },
    {
      title: "Reminders and notifications",
      body: "Text and email for appointments, payments and updates.",
    },
    {
      title: "Team training",
      body: "Practical sessions on using AI tools safely in your daily work.",
    },
  ],
  relatedSlugs: ["relief-chiropractic", "up2date-connect"],
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
      question: "Do we need a new system?",
      answer: "Often not. We can add automation to the tools you already use.",
    },
  ],
};

export default automationAi;
