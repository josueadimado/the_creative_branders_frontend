import CtaBand from "../components/CtaBand";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import { about } from "../content/about";

export default function About() {
  return (
    <>
      <Seo {...about.seo} />
      <PageHero {...about.hero} />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-3xl space-y-16 px-6">
          <div>
            <h2 className="type-display text-navy">{about.started.title}</h2>
            <p className="type-body mt-6 text-slate">{about.started.body}</p>
          </div>
          <div>
            <h2 className="type-display text-navy">{about.work.title}</h2>
            {about.work.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-body mt-6 text-slate">
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <h2 className="type-display text-navy">{about.believe.title}</h2>
            <p className="type-body mt-6 text-slate">{about.believe.body}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="type-display text-navy">{about.values.title}</h2>
          <div className="mt-16 grid gap-12 md:grid-cols-2">
            {about.values.items.map((item) => (
              <article key={item.title}>
                <h3 className="type-title text-navy">{item.title}</h3>
                <p className="type-body mt-4 text-slate">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="type-display text-navy">{about.organisations.title}</h2>
          <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {about.organisations.names.map((name) => (
              <li key={name} className="type-title text-navy">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
