import { Link } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import Illustration from "../components/Illustration";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { servicesPage } from "../content/services";
import { track } from "../lib/analytics";

export default function Services() {
  return (
    <>
      <Seo {...servicesPage.seo} />
      <PageHero {...servicesPage.hero} />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl space-y-28 px-6">
          {servicesPage.families.map((service, index) => (
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
            eyebrow={servicesPage.offers.eyebrow}
            title={servicesPage.offers.title}
            lede={servicesPage.offers.lede}
          />
          <div className="mt-20 grid gap-6 lg:grid-cols-3">
            {servicesPage.offers.cards.map((offer) => (
              <article
                key={offer.description}
                className={
                  offer.highlighted
                    ? "flex flex-col rounded-card border border-mist bg-navy p-10 text-white sm:p-12"
                    : "flex flex-col rounded-card border border-mist bg-white p-10 text-navy sm:p-12"
                }
              >
                {offer.highlighted ? <p className="type-kicker mb-6 text-gold">Most chosen</p> : null}
                <p className={`type-body ${offer.highlighted ? "text-white/70" : "text-slate"}`}>
                  {offer.description}
                </p>
                <ul className="mt-10 flex-1 space-y-3.5 type-body">
                  {offer.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className={offer.highlighted ? "text-signal" : "text-deep"} aria-hidden>
                        –
                      </span>
                      <span className={offer.highlighted ? "text-white/90" : "text-slate"}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-10 self-start ${offer.highlighted ? "btn btn-primary" : "btn btn-inverse"}`}
                  onClick={() => track("start_project_click", { location: "services" })}
                >
                  {servicesPage.offers.quote}
                </Link>
              </article>
            ))}
          </div>
          <p className="type-body mt-12 text-slate">
            {servicesPage.offers.note}{" "}
            <Link to="/smartcrm" className="text-deep transition-colors hover:text-deep-hover">
              {servicesPage.offers.noteLink}
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow={servicesPage.process.eyebrow} title={servicesPage.process.title} />
          <div className="node-row mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {servicesPage.process.steps.map((step, index) => (
              <article key={step.name}>
                <Illustration name={step.drawing} className="h-28 w-full" />
                <p className="type-kicker mt-6 text-deep">0{index + 1}</p>
                <h3 className="type-title mt-3 text-navy">{step.name}</h3>
                <p className="type-body mt-4 text-slate">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
