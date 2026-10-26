import { joinCountries, projectCountries, publishedWork } from "../data/portfolio";
import { site } from "./site";

/** Countries on the published studies. Ghana is listed first. */
const shippedCountries = projectCountries(publishedWork());

/** Words for the homepage. The page file only handles layout. */

export const home = {
  seo: {
    title: "Big ideas. Real products.",
    description: site.description,
    path: "/",
  },
  hero: {
    /** Not used on any other page. Swap this file when the studio photos arrive. */
    image: "/images/work-mentorship.jpg",
    kicker: "Your business, running smarter",
    title: "Big ideas. Real products.",
    lede: "We're the strategy and technology partner behind growing businesses. We take the pressure off your day, so you can focus on your customers and your next move.",
    primary: "Book a free 20-minute systems audit",
    secondary: "Start a project",
  },
  proof: {
    stats: [
      { value: "10", label: "projects shipped" },
      { value: "3", label: "countries" },
      { value: "4", label: "languages" },
      { value: "5", label: "currencies" },
    ],
    /** Real logos from each organisation's site. The name is the text a screen reader hears. */
    logos: [
      { name: "Relief Chiropractic", logo: "/images/logos/relief-chiropractic.png" },
      { name: "Push-it", logo: "/images/logos/push-it.png" },
      { name: "Up2Date Connect", logo: "/images/logos/up2date-connect.png" },
      { name: "Set Free in Christ Mission", logo: "/images/logos/set-free.png" },
      { name: "COME", logo: "/images/logos/come.png" },
      { name: "Elevate Tribe", logo: "/images/logos/elevate-tribe.png" },
      { name: "Twi Learning Center", logo: "/images/logos/twi-learning-center.png" },
      { name: "Ikedoo Engineering", logo: "/images/logos/ikedoo.png" },
      { name: "Apex Home Care", logo: "/images/logos/apex-homecare.jpg" },
    ],
    line: "Some of the organisations we've built with.",
  },
  /** The numbers block. Its heading is not the hero line. */
  built: {
    title: "Built around how your business runs.",
    lede: `We've shipped booking systems, learning platforms, a creator marketplace and multilingual sites for clients in ${joinCountries(shippedCountries)}.`,
    /** This photo is only used here. */
    image: "/images/pillar-systems.jpg",
  },
  /** One line at the bottom of the first screen. */
  sectors: "Trusted by clinics, schools, ministries and startups.",
  work: {
    title: "Some of the projects we built to make a difference.",
    link: "See all our work",
    /** One line under the name on the homepage card. The case study keeps its own summary. */
    lines: {
      "relief-chiropractic":
        "Patients book online or by phone, check in on a lobby screen and pay at the desk, all in one system.",
      "push-it": "Brands fund campaigns, creators post the videos and get paid in naira, cedis or mobile money.",
      "come-clarity":
        "Leaders apply, pay and learn in live cohorts, with facilitators running each class from the same platform.",
      "up2date-connect":
        "Counseling organisations run their programmes, clients and referral partners under their own brand.",
      "secure-counseling":
        "One counseling clinic runs its programmes, sessions, payments and progress reports in a private platform.",
    } as Record<string, string>,
  },
  /** Photo beside the steps. Not the About page photo. */
  approachImage: "/images/work-counseling.jpg",
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
