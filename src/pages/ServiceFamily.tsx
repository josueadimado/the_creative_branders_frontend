import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import FaqAccordion from "../components/FaqAccordion";
import HowWeWork from "../components/HowWeWork";
import TextHero from "../components/TextHero";
import PortfolioCard from "../components/PortfolioCard";
import Seo from "../components/Seo";
import { getServiceFamily } from "../content/services";
import { getPublishedStudy, type PortfolioItem } from "../data/portfolio";
import NotFound from "./NotFound";

/**
 * One template for all six service pages.
 * The slug in the URL picks the family from src/content/services.
 */
export default function ServiceFamily() {
  const { slug } = useParams();
  const family = getServiceFamily(slug);
  if (!family) return <NotFound />;

  const related = family.relatedSlugs
    .map((itemSlug) => getPublishedStudy(itemSlug))
    .filter((item): item is PortfolioItem => item !== undefined);

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: family.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <Seo title={family.promise} description={family.description} path={`/services/${family.slug}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqPage)}</script>
      </Helmet>
      <TextHero kicker={family.name} title={family.promise} lede={family.intro} />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="type-display text-navy">What's included</h2>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {family.services.map((service) => (
              <article key={service.title} className="rounded-card border border-mist bg-white p-8">
                <h3 className="type-title text-navy">{service.title}</h3>
                <p className="type-body mt-4 text-slate">{service.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HowWeWork />

      {related.length > 0 ? (
        <section className="border-t border-mist bg-paper py-28 sm:py-36">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="type-display text-navy">Related work</h2>
            <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
              {related.map((item) => (
                <PortfolioCard key={item.slug} item={item} device={family.relatedDevice} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="type-display text-navy">Questions</h2>
          <FaqAccordion items={family.faqs} />
        </div>
      </section>

      <CtaBand primary={`Get a quote for ${family.name}`} />
    </>
  );
}
