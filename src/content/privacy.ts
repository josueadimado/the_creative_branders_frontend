// Content to be reviewed by a qualified Ghanaian lawyer before wide promotion.
import { site } from "./site";

/** Shown under the title. Change this when the policy text changes. */
const updated = "26 October 2026";

const address = `${site.address.street}, ${site.address.city}, ${site.address.region}, ${site.address.country}`;

export const privacy = {
  seo: {
    title: "Privacy policy",
    description: `How ${site.legalName} handles information you send through this website.`,
    path: "/privacy",
  },
  kicker: "Legal",
  title: "Privacy policy",
  updated,
  lede: `This page explains what ${site.legalName} collects on this website and what we do with it.`,
  sections: [
    {
      title: "Who we are",
      paragraphs: [
        `${site.legalName} runs this website. We are the data controller. That means we decide why and how this information is used. We are registered in ${site.jurisdiction} with the ${site.registrationAuthority}.`,
        `Registration number: ${site.registrationNumber}.`,
        `TIN: ${site.tin}.`,
        `Data Protection Commission registration: ${site.dpcRegistration}.`,
        `Address: ${address}.`,
        `Email: ${site.email}.`,
      ],
    },
    {
      title: "What we collect",
      paragraphs: ["We collect what you choose to send us, and a note of your cookie choice."],
      items: [
        {
          label: "Project brief",
          text: "Your name, email, WhatsApp or phone, company, country, the service you need, budget range, timeline, and your message.",
        },
        {
          label: "Booking",
          text: "If you book a call with us, we keep the details of that booking.",
        },
        {
          label: "Cookies and analytics",
          text: "Only if you accept analytics cookies.",
        },
        {
          label: "WhatsApp and email",
          text: "Messages you send us on WhatsApp or by email.",
        },
      ],
    },
    {
      title: "Why we use it",
      paragraphs: [
        "We use it to reply to enquiries, prepare proposals, deliver projects, improve the site when you allow analytics, and meet legal obligations.",
      ],
    },
    {
      title: "Legal basis",
      paragraphs: [
        "Depending on the situation, we rely on your consent, on steps taken before a contract, on our legitimate interest in answering people who contact the studio, or on a legal obligation.",
      ],
    },
    // When marketing cookies are added, list Meta Pixel and the LinkedIn Insight Tag in this section.
    {
      title: "Who we share it with",
      paragraphs: [
        "Other companies process some of this information for us. We never sell your data.",
      ],
      items: [
        { label: "Resend", text: "Sends our emails." },
        { label: "[HOSTING PROVIDER]", text: "Hosts the website." },
        { label: "Google Analytics", text: "Only if you accept analytics cookies." },
        { label: "WhatsApp (Meta)", text: "Only when you contact us on WhatsApp." },
      ],
    },
    {
      title: "International transfers",
      paragraphs: [
        "Some of these companies store data outside Ghana. We use providers with appropriate safeguards. Clients in the UK and the EU are handled in line with UK and EU GDPR principles.",
      ],
    },
    {
      title: "How long we keep it",
      paragraphs: [
        "Enquiries that do not become projects are deleted after [24] months.",
        "Client project records are kept for [6] years for tax and legal reasons.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        `You can ask for a copy of your data, ask us to correct it, ask us to delete it, object to processing, object to direct marketing, and withdraw consent. Email ${site.email}. We reply within [30] days.`,
      ],
    },
    {
      title: "Complaints",
      paragraphs: [
        "You can complain to the Data Protection Commission of Ghana. Their website is https://www.dataprotection.org.gh/.",
      ],
    },
    {
      title: "Security",
      paragraphs: [
        "Form submissions sit in a private database. Only people who need them for the studio's work can open them, and the emails we send travel over an encrypted connection.",
      ],
    },
    {
      title: "Changes to this policy",
      paragraphs: [
        "We may update this policy. The date at the top of this page shows the latest version.",
      ],
    },
  ],
};
