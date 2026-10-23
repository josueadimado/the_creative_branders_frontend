import { Link } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import Illustration from "../components/Illustration";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import PricingTier from "../components/PricingTier";
import SectionHeading from "../components/SectionHeading";

const services = [
  {
    title: "Brand & Digital Experience",
    image: "/images/pillar-brand.jpg",
    what: "How your business looks and how people move through it online: identity, website, and the first impression that has to hold.",
    get: [
      "Positioning and visual identity",
      "Website or platform UI designed for conversion, not decoration",
      "Content structure that explains what you do without noise",
    ],
  },
  {
    title: "Intelligent Systems",
    image: "/images/pillar-systems.jpg",
    what: "The software that actually runs the business: bookings, client records, operations. Built to fit how you work, including SmartCRM when a dedicated CRM is the right tool.",
    get: [
      "Custom operational tools and workflows",
      "SmartCRM as a standalone product ($10–$30 / month)",
      "Integrations so data does not live in five different places",
    ],
  },
  {
    title: "Business Intelligence",
    image: "/images/pillar-intelligence.jpg",
    what: "Reporting that founders can actually use. Not a dump of charts. A clear view of performance so decisions are faster and less guesswork.",
    get: [
      "Dashboards tied to the metrics that matter",
      "Simple reporting cadence for owners and operators",
      "A shared picture of growth across brand, systems, and sales",
    ],
  },
];

const steps = [
  {
    name: "Discover",
    body: "We learn the business, the constraint, and the outcome that would actually change things.",
    drawing: "discover" as const,
  },
  {
    name: "Design",
    body: "We design the experience and the system together so they do not fight each other later.",
    drawing: "design" as const,
  },
  {
    name: "Build",
    body: "We ship working software and a coherent brand. Not slides. Not prototypes that stall.",
    drawing: "build" as const,
  },
  {
    name: "Grow",
    body: "We stay close as you use it: iterate, measure, and extend what is already working.",
    drawing: "grow" as const,
  },
];

export default function Services() {
  return (
    <>
      <PageHero
        image="/images/hero-studio.jpg"
        kicker="Services"
        title="Everything your business needs to grow, in one place."
        lede="Brand, systems, and intelligence as a single brief. Accessible retainers and project ranges, not a menu of add-ons."
      />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl space-y-28 px-6">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="grid items-center gap-12 border-b border-mist pb-28 last:border-0 last:pb-0 md:grid-cols-2 lg:gap-20"
            >
              <Media
                src={service.image}
                className={`aspect-[4/3] ${index % 2 === 1 ? "md:order-2" : ""}`}
              />
              <div>
                <h2 className="type-display text-navy">{service.title}</h2>
                <p className="type-kicker mt-10 text-deep">What it is</p>
                <p className="type-body mt-3 text-slate">{service.what}</p>
                <p className="type-kicker mt-9 text-deep">What you get</p>
                <ul className="mt-4 space-y-3.5 type-body text-slate">
                  {service.get.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-deep" aria-hidden>
                        –
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Investment"
            title="Clear ranges. No theatre."
            lede="Project work is scoped after a discovery call. SmartCRM is available on its own if you only need the product."
          />
          <div className="mt-20 grid overflow-hidden border border-mist divide-y divide-mist lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            <PricingTier
              name="Starter"
              range="$400–$800"
              description="A focused first move: a site, a brand pass, or a single operational tool."
              features={["One primary surface", "Tight scope, fast delivery", "A foundation you can grow from"]}
            />
            <PricingTier
              highlighted
              name="Growth"
              range="$1,200–$2,500"
              description="The range most growing businesses land in: brand plus systems that work together."
              features={[
                "Brand and digital experience",
                "An operational system or CRM setup",
                "A reporting view of what matters",
              ]}
            />
            <PricingTier
              name="Enterprise"
              range="$5,000+"
              description="Multi-surface work: platforms, integrations, and intelligence across the business."
              features={["Custom platforms", "Deeper integrations", "Ongoing studio partnership"]}
            />
          </div>
          <p className="type-body mt-12 text-slate">
            SmartCRM as a standalone SaaS product is $10–$30 / month.{" "}
            <Link to="/smartcrm" className="text-deep transition-colors hover:text-deep-hover">
              See SmartCRM
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Process" title="How we work" />
          <div className="mt-20 grid gap-12 border-t border-mist pt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {steps.map((step, index) => (
              <article
                key={step.name}
                className="lg:border-r lg:border-mist lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <Illustration name={step.drawing} className="h-28 w-full" />
                <p className="type-kicker mt-6 text-deep">0{index + 1}</p>
                <h3 className="type-title mt-3 text-navy">{step.name}</h3>
                <p className="type-body mt-4 text-slate">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Tell us what you need to grow." />
    </>
  );
}
