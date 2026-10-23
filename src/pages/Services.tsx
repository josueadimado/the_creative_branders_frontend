import { Link } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import TextHero from "../components/TextHero";
import { serviceFamilies, servicesPage } from "../content/services";

/**
 * /services lists the six families. Each card links to its own page.
 * The words live in src/content/services so a copy change does not touch this layout.
 */
export default function Services() {
  return (
    <>
      <Seo {...servicesPage.seo} />
      <TextHero kicker={servicesPage.kicker} title={servicesPage.title} lede={servicesPage.lede} />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
          {serviceFamilies.map((family) => (
            <Link
              key={family.slug}
              to={`/services/${family.slug}`}
              className="flex flex-col rounded-card border border-mist bg-white p-8 transition-colors hover:border-deep sm:p-10"
            >
              <h2 className="type-title text-navy">{family.name}</h2>
              <p className="type-body mt-4 text-navy">{family.promise}</p>
              <ul className="mt-6 space-y-2 type-body text-slate">
                {family.services.slice(0, 3).map((service) => (
                  <li key={service.title}>{service.title}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
