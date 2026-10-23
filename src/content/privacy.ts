/** Words for the privacy policy. Square brackets stay until the owner fills them in. */

export const privacy = {
  seo: {
    title: "Privacy policy",
    description: "How The Creative Branders handles information you send through this website.",
    path: "/privacy",
  },
  kicker: "Legal",
  title: "Privacy policy",
  lede: "How The Creative Branders Ltd handles information you send through this website.",
  sections: [
    {
      title: "Who we are",
      paragraphs: [
        "This website is operated by The Creative Branders Ltd, a company registered in the United Kingdom. Contact for privacy requests: hello@thecreativebranders.com.",
      ],
    },
    {
      title: "What this policy covers",
      paragraphs: [
        "It covers the three forms on this site: the contact inquiry form, the SmartCRM waitlist, and the Academy expression of interest. It does not cover third-party websites we link to (for example social networks).",
      ],
    },
    {
      title: "What we collect",
      paragraphs: [
        "We do not ask for payment card details on this website. We do not sell your personal data.",
      ],
      items: [
        {
          label: "Contact inquiry",
          text: "name, email, what you need, your project description, and any optional details you add: company, country, phone, timeline, budget range, and a link.",
        },
        {
          label: "SmartCRM waitlist",
          text: "email, and name if you choose to give it.",
        },
        {
          label: "Academy interest",
          text: "name, email, and an optional message.",
        },
      ],
    },
    {
      title: "Why we collect it",
      paragraphs: [
        "We use the information so we can reply to your inquiry, add you to a product waitlist, or note your interest in the Academy. That is a legitimate interest in running a studio and responding to people who contact us. Where you ask us to email you (for example a waitlist), we rely on your request.",
      ],
    },
    {
      title: "How we store it and for how long",
      paragraphs: [
        "Submissions are stored in our private database and reviewed in a staff admin panel. We keep them for as long as we need them to handle your request and keep a sensible business record, then delete or anonymise them when they are no longer needed. If you ask us to delete your data sooner, we will do so unless we must keep it for a legal reason.",
      ],
    },
    {
      title: "Email provider",
      paragraphs: [
        "When a form is submitted, we may send a notification email to the studio, and for contact inquiries we may send you a short confirmation email. Those messages are sent using Resend (or another email service we configure). The provider processes the address and content of the email so it can be delivered.",
      ],
    },
    {
      title: "Who we share it with",
      paragraphs: [
        "We share personal data only with the tools that help us run the site (hosting, database, and email delivery). We do not share form submissions with advertisers.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "Depending on where you live, you may ask us for a copy of your data, ask us to correct it, or ask us to delete it. To make a request, email hello@thecreativebranders.com and tell us which form you used and the email address you submitted.",
      ],
    },
    {
      title: "Changes",
      paragraphs: [
        "We may update this policy from time to time. The version on this page is the current one.",
      ],
    },
  ],
  closing: "Questions about a project rather than privacy?",
  closingLink: "Start an inquiry",
} as const;
