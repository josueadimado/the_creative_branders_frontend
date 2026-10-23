/** Words for the SmartCRM page. The waitlist form reads the success lines. */

export const smartcrm = {
  seo: {
    title: "SmartCRM",
    description: "SmartCRM is a simple CRM for growing businesses. Join the waitlist for early access.",
    path: "/smartcrm",
  },
  hero: {
    image: "/images/smartcrm-product.jpg",
    kicker: "SmartCRM",
    title: "SmartCRM",
    lede: "A simple CRM for businesses that keep customer details in WhatsApp chats, notebooks and spreadsheets. We're building it now and opening it to a small group first.",
  },
  featuresKicker: "",
  features: [
    {
      title: "Every customer in one place",
      body: "Contact details, conversations and history together.",
      drawing: "crm",
    },
    {
      title: "Follow-ups you won't forget",
      body: "Reminders for call-backs, quotes and payments.",
      drawing: "build",
    },
    {
      title: "A clear view of sales",
      body: "What's new, what's stuck and what's about to close.",
      drawing: "grow",
    },
  ],
  waitlist: {
    kicker: "",
    title: "Join the waitlist",
    body: "Leave your email and we'll let you know when early access opens.",
    already: "You're already on the list.",
    success: "You're on the list.",
    followUp: "We'll let you know when early access opens.",
  },
  faqsTitle: "Questions",
  faqs: [
    {
      q: "When does it open?",
      a: "We're starting with a small pilot group. People on the waitlist hear first.",
    },
    {
      q: "Who is it for?",
      a: "Small and growing businesses that need to keep track of customers without a complicated system.",
    },
  ],
  footer: "Need a system built around your own process?",
  footerLink: "Start a project",
} as const;
