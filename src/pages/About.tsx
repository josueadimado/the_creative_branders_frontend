import { Link } from "react-router-dom";
import { BrowserFrame, PhonePlaceholder } from "../components/DeviceFrame";
import Seo from "../components/Seo";
import { about } from "../content/about";
import { cta } from "../content/cta";
import { track } from "../lib/analytics";

/** Real screens. COME|CLARITY has no screenshot yet, so that slot stays a navy panel. */
const shots = {
  relief: {
    src: "/images/work/relief-chiropractic/staff-sign-in.jpg",
    alt: "Staff sign-in for the chiropractic clinic system.",
  },
  pushIt: {
    src: "/images/work/push-it/brands-home.jpg",
    alt: "Push-it homepage for launching campaigns.",
  },
  up2date: {
    src: "/images/work/up2date-connect/homepage.jpg",
    alt: "Up2Date Connect homepage.",
  },
};

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

      {/* Opening: the words on the left, project screens on the right. */}
      <section className="bg-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
          <div>
            <p className="type-kicker text-deep">{about.hero.kicker}</p>
            <h1 className="type-h1 mt-4 text-navy">{about.hero.headline}</h1>
            <p className="type-body mt-6 text-slate">{about.hero.lede}</p>
          </div>
          <div className="grid items-center gap-4 sm:grid-cols-[1fr_11rem]">
            <div className="grid gap-4">
              <BrowserFrame src={shots.relief.src} alt={shots.relief.alt} loading="eager" />
              <div className="grid gap-4 sm:grid-cols-2">
                <BrowserFrame src={shots.pushIt.src} alt={shots.pushIt.alt} />
                <BrowserFrame src={shots.up2date.src} alt={shots.up2date.alt} />
              </div>
            </div>
            <PhonePlaceholder label="COME|CLARITY" />
          </div>
        </div>
      </section>

      {/* Heading on the left. The story sits on the right. */}
      <section className="border-t border-mist bg-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:py-28">
          <h2 className="type-display text-navy">{about.started.title}</h2>
          <p className="type-body text-slate">{about.started.body}</p>
        </div>

        {/* The short note stays on the left. The four numbers sit in a row beside it. */}
        <div className="mx-auto mt-4 grid max-w-6xl gap-10 px-6 pb-20 lg:grid-cols-[224px_1fr] lg:items-center">
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
