/** Words for the project form. The form component reads these labels. */

export const needOptions = [
  "Brand and websites",
  "Web applications",
  "Mobile apps",
  "Automation and reporting",
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
    title: "Start a project",
  },
  fields: {
    name: "Your full name",
    email: "Email",
    company: "Company or organisation (optional)",
    country: "Country (optional)",
    phone: "WhatsApp or phone (optional)",
    needs: "What do you need?",
    timeline: "When to start (optional)",
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
