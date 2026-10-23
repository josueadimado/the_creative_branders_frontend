/** Words for the project form. The form component reads these labels. */

export const needOptions = [
  "Website",
  "Web app",
  "Mobile app",
  "Brand and design",
  "Automation and AI",
  "Data and reporting",
  "Not sure yet",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "In the next 1 to 3 months",
  "In 3 to 6 months",
  "Just exploring",
] as const;

export const budgetOptions = [
  "Under $2,000",
  "$2,000 to $5,000",
  "$5,000 to $15,000",
  "$15,000 to $40,000",
  "Over $40,000",
  "I'd rather discuss it",
] as const;

export const contact = {
  seo: {
    title: "Start a project",
    description: "Tell us about your project. We'll reply within one business day.",
    path: "/contact",
  },
  hero: {
    kicker: "Start a project",
    title: "Start a project",
    lede: "Tell us what you're building, what's not working today, or what you'd like to try. A few sentences is enough to start.",
  },
  aside:
    "We reply within one business day. If it's easier to talk, message us on WhatsApp or email hello@thecreativebranders.com.",
  next: {
    title: "What happens next",
    steps: [
      "We read your brief.",
      "We reply within one business day with questions or a time to talk.",
      "You get a written proposal and quote.",
    ],
    whatsapp: "Chat on WhatsApp",
  },
  fields: {
    name: "Your name",
    email: "Email",
    company: "Company or organisation (optional)",
    country: "Country (optional)",
    phone: "WhatsApp or phone (optional)",
    needs: "What do you need?",
    timeline: "When would you like to start? (optional)",
    budget: "Budget range (optional)",
    message: "Tell us about the project",
    link: "Link to your current site or a brief (optional)",
  },
  choose: "Select",
  submit: "Send my brief",
  sending: "Sending…",
  success: "Thanks, we've got your brief. We'll reply within one business day.",
  needsError: "Choose what you need.",
} as const;
