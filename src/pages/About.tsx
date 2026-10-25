import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { about } from "../content/about";
import { cta } from "../content/cta";
import { track } from "../lib/analytics";

/**
 * Same arrangement as before. Fonts and colours match the homepage:
 * Montserrat for headings, Inter for the reading text, navy, paper,
 * and the signal blue. Signal blue is only used as a background here,
 * with navy text on it, the same way the homepage buttons work.
 */
export default function About() {
  return (
    <div className="bg-paper font-sans text-navy">
      <Seo {...about.seo} />

      {/* Opening: everything in this block is centered. */}
      <section className="px-7 pb-8 pt-20 sm:pt-24">
        <p className="type-kicker text-center text-deep">{about.hero.kicker}</p>
        <h1 className="mx-auto mt-4 max-w-[858px] text-center font-display text-[2.5rem] font-semibold leading-[1.15] sm:text-6xl lg:text-[80px] lg:leading-[104px]">
          {about.hero.headline}
        </h1>
        <p className="type-body mx-auto mt-8 max-w-[480px] text-center text-slate">{about.hero.lede}</p>
      </section>

      {/* The wide photo, then the two desk photos beside each other. Nothing covers them. */}
      <section className="mx-auto max-w-[1224px] px-7 pb-8">
        <img
          src={about.pictures.banner.src}
          alt={about.pictures.banner.alt}
          className="h-auto w-full rounded-[20px]"
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {about.pictures.desks.map((picture) => (
            <img key={picture.src} src={picture.src} alt={picture.alt} className="h-auto w-full rounded-[20px]" />
          ))}
        </div>
      </section>

      {/* Heading on the left. The two paragraphs sit on the right. */}
      <section className="mx-auto max-w-[1224px] px-7 pb-8 pt-16 lg:px-0 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[454px_606px] lg:justify-between">
          <h2 className="font-display text-4xl font-semibold leading-[1.15] text-navy sm:text-[48px] sm:leading-[62px]">
            {about.work.title}
          </h2>
          <div>
            <p className="type-body text-slate">{about.started.body}</p>
            <p className="type-body mt-5 text-slate">{about.work.paragraphs[0]}</p>
            <p className="type-body mt-5 text-slate">{about.work.paragraphs[1]}</p>
          </div>
        </div>

        {/* The short note stays on the left. The four numbers sit in a row beside it. */}
        <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[224px_1fr] lg:items-center">
          <p className="type-body max-w-[224px] text-slate">{about.facts.note}</p>
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {about.facts.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-sans text-5xl font-semibold leading-none text-deep sm:text-[56px]">{stat.value}</dt>
                <dd className="type-body mt-2 text-slate">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* The heading is centered. Each card uses the homepage blue, with the name at the top. */}
      <section className="mx-auto max-w-[1224px] px-7 pb-20 pt-16 lg:px-0 lg:pb-28 lg:pt-24">
        <h2 className="mx-auto max-w-[640px] text-center font-display text-4xl font-semibold leading-[1.15] text-navy sm:text-[48px] sm:leading-[62px]">
          {about.values.title}
        </h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {about.values.items.map((item) => (
            <li key={item.title} className="flex min-h-[280px] flex-col rounded-2xl bg-signal p-6 text-navy">
              <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
              <p className="mt-auto pt-8 font-sans text-[15px] leading-6">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Close: the words and the single button are centered on the navy. */}
      <section className="bg-navy">
        <div className="mx-auto flex max-w-[720px] flex-col items-center px-7 py-24 text-center sm:py-32">
          <h2 className="font-display text-4xl font-semibold leading-[1.15] text-white sm:text-[56px] sm:leading-[1.15]">
            {cta.title}
          </h2>
          <p className="type-body mt-6 max-w-[520px] text-white/85">{cta.body}</p>
          <Link
            to="/contact"
            onClick={() => track("start_project_click", { location: "about-close" })}
            className="btn btn-primary mt-8 min-w-[194px]"
          >
            {cta.primary}
          </Link>
        </div>
      </section>
    </div>
  );
}
