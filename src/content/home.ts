import { site } from "./site";

/** Words for the homepage. The page file only handles layout. */

export const home = {
  seo: {
    title: "Designed for intelligent growth",
    description: site.description,
    path: "/",
  },
  hero: {
    image: "/images/hero-studio.jpg",
    kicker: "Digital intelligence studio",
    title: "Designed for intelligent growth.",
    lede: "We design and build websites, web apps and mobile apps, then connect them to the payments, messages and numbers your business runs on.",
    primary: "Start a project",
    secondary: "See the work",
  },
  proof: {
    stats: [
      { value: "10", label: "projects shipped" },
      { value: "3", label: "countries" },
      { value: "4", label: "languages" },
      { value: "5", label: "currencies" },
    ],
    names: [
      "Relief Chiropractic",
      "Push-it",
      "COME|CLARITY",
      "Up2Date Connect",
      "Set Free in Christ Mission",
      "COME",
      "Elevate Tribe",
      "Twi Learning Center",
    ],
    line: "Some of the organisations we've built with.",
  },
  work: {
    title: "Recent work",
    lede: "Clinics, learning platforms, a creator marketplace and a ministry. Each one is live and used every day.",
    link: "See all work",
    /** One line under the name on the homepage card. The case study keeps its own summary. */
    lines: {
      "relief-chiropractic":
        "Patients book online or by phone, check in on a lobby screen and pay at the desk, all in one system.",
      "push-it": "Brands fund campaigns, creators post the videos and get paid in naira, cedis or mobile money.",
      "come-clarity":
        "Leaders apply, pay and learn in live cohorts, with facilitators running each class from the same platform.",
      "up2date-connect":
        "Counseling organisations run their programmes, clients and referral partners under their own brand.",
    } as Record<string, string>,
  },
  offer: {
    title: "What we build",
    lede: "Most clients come to us for a website or an app. The other services usually follow once that's live.",
  },
  different: {
    title: "Why clients stay with us",
    /** Shown inside the browser frame until a real client-portal screenshot exists. */
    portal: "Client portal",
    points: [
      {
        title: "You work with the person doing the work.",
        body: "One lead takes your project from the first call to launch. You won't be passed to an account manager.",
      },
      {
        title: "We bring in specialists when you need them.",
        body: "For a mobile app, a payments integration or a data project, we add people who've done exactly that before. You don't pay for a large team you don't need.",
      },
      {
        title: "We build for how your customers actually pay and talk.",
        body: "Mobile money and Paystack in Ghana and Nigeria. Square and insurance claims in the US. WhatsApp and SMS where email gets ignored.",
      },
      {
        title: "You can see what you're paying for.",
        body: "Our client portal shows every change we ship, how long it took and what's next.",
      },
      {
        title: "It keeps working after launch.",
        body: "We host, monitor and update what we build, so you're not left with a site nobody maintains.",
      },
    ],
  },
  lab: {
    text: "We're building SmartCRM, a simple CRM for businesses that keep their customers in WhatsApp chats and notebooks.",
    link: "Join the waitlist",
  },
} as const;

/** Quotes stay off the homepage until a client has approved one. */
export const testimonials: readonly {
  quote: string;
  name: string;
  role: string;
  company: string;
}[] = [];
