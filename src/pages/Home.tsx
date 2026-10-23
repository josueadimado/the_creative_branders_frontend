import { useEffect } from "react";
import { Link } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import Illustration from "../components/Illustration";
import Media from "../components/Media";
import PortfolioCard from "../components/PortfolioCard";
import SectionHeading from "../components/SectionHeading";
import { home } from "../content/home";
import { track } from "../lib/analytics";
import { portfolio } from "../data/portfolio";

const featured = portfolio.slice(0, 4);

export default function Home() {
  useEffect(() => {
    featured.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  return (
    <>
      <Seo {...home.seo} />
      {/* Full-height opener: the photograph is the luxury; type sits in the quiet left. */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy">
        <img
          src={home.hero.image}
          alt=""
          className="photo absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/65 to-transparent" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-end px-6 pb-28 pt-40 sm:pb-36">
          <div className="max-w-3xl">
            <p className="type-kicker text-signal">{home.hero.kicker}</p>
            <h1 className="type-hero mt-5 text-white">{home.hero.title}</h1>
            <p className="type-lede mt-8 max-w-xl text-white/70">{home.hero.lede}</p>
            <svg
              className="hero-nodes mt-14 h-16 w-full max-w-xl"
              viewBox="0 0 560 64"
              fill="none"
              aria-hidden="true"
            >
              <path d="M8 32 H552" stroke="#4AA3C6" strokeWidth="1" />
              <circle cx="8" cy="32" r="4" fill="#4AA3C6" />
              <circle cx="190" cy="32" r="4" fill="#4AA3C6" />
              <circle cx="370" cy="32" r="4" fill="#4AA3C6" />
              <circle cx="552" cy="32" r="4" fill="#4AA3C6" />
            </svg>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="btn btn-primary"
                onClick={() => track("start_project_click", { location: "home" })}
              >
                {home.hero.primary}
              </Link>
              <Link to="/work" className="btn btn-secondary">
                {home.hero.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-end gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <SectionHeading
              eyebrow={home.pillars.eyebrow}
              title={home.pillars.title}
              lede={home.pillars.lede}
            />
            <Illustration name="pillars" className="hidden w-full lg:block" />
          </div>
          <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-3">
            {home.pillars.items.map((pillar, index) => (
              <article key={pillar.title}>
                <Media src={pillar.image} className="aspect-[4/3]" />
                <p className="type-kicker mt-7 text-deep">0{index + 1}</p>
                <h3 className="type-title mt-3 text-navy">{pillar.title}</h3>
                <p className="type-body mt-4 text-slate">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow={home.process.eyebrow}
            title={home.process.title}
            lede={home.process.lede}
          />
          <div className="node-row mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {home.process.steps.map((step, index) => (
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

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow={home.work.eyebrow} title={home.work.title} lede={home.work.lede} />
          <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {featured.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
          <p className="mt-14">
            <Link to="/work" className="type-lede text-deep transition-colors hover:text-deep-hover">
              {home.work.link}
            </Link>
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-32 sm:py-40">
        <img
          src={home.why.image}
          alt=""
          className="photo absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            tone="light"
            eyebrow={home.why.eyebrow}
            title={home.why.title}
            lede={home.why.lede}
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
