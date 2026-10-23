import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import Illustration from "../components/Illustration";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { about } from "../content/about";

export default function About() {
  return (
    <>
      <Seo {...about.seo} />
      <PageHero {...about.hero} />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={about.origin.eyebrow}
            title={about.origin.title}
            lede={about.origin.lede}
          />
          <div className="mt-20">
            <Media src={about.origin.image} className="aspect-[21/9]" />
            <div className="mt-12 max-w-3xl">
              <p className="type-display text-navy">{about.origin.mission}</p>
              <p className="type-lede mt-8 text-slate">{about.origin.vision}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow={about.difference.eyebrow} title={about.difference.title} />
          <div className="mt-20 grid gap-12 border-t border-mist pt-16 md:grid-cols-3 md:gap-0">
            {about.difference.items.map((item) => (
              <article key={item.title} className="md:border-r md:border-mist md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <Illustration name={item.drawing} className="h-32 w-full" />
                <h3 className="type-title mt-6 text-navy">{item.title}</h3>
                <p className="type-body mt-4 text-slate">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{about.values.kicker}</p>
          <div className="mt-10 flex flex-wrap gap-x-16 gap-y-4">
            {about.values.items.map((value) => (
              <p key={value} className="type-display text-white">
                {value}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-deep">{about.partners.kicker}</p>
          <div className="mt-10 flex flex-wrap gap-x-16 gap-y-4 text-navy">
            {about.partners.items.map((name) => (
              <p key={name} className="type-title">
                {name}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
