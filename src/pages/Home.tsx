import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { BrowserPlaceholder } from "../components/DeviceFrame";
import CtaBand from "../components/CtaBand";
import FamilyIcon from "../components/FamilyIcon";
import Seo from "../components/Seo";
import HowWeWork from "../components/HowWeWork";
import PortfolioCard from "../components/PortfolioCard";
import { home, testimonials } from "../content/home";
import { articles, formatInsightDate } from "../content/insights";
import { serviceFamilies } from "../content/services";
import { track } from "../lib/analytics";
import { coverImage, featuredStudies } from "../data/portfolio";
import { socials } from "../data/socials";

const siteOrigin = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Creative Branders",
  url: siteOrigin || undefined,
  logo: `${siteOrigin}/brand/png/tcb-monogram-dark-512.png`,
  sameAs: socials.map((item) => item.href),
};

const featured = featuredStudies();

export default function Home() {
  useEffect(() => {
    featured.forEach((item) => {
      const src = coverImage(item);
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <>
      <Seo {...home.seo} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organization)}</script>
      </Helmet>

      <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy">
        <img src={home.hero.image} alt="" className="photo absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/65 to-transparent" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-end px-6 pb-28 pt-40 sm:pb-36">
          {/* The node line stays behind the words, faint, so it does not split the paragraph from the buttons. */}
          <svg
            className="hero-nodes pointer-events-none absolute left-6 top-16 h-16 w-full max-w-3xl opacity-20"
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
          <div className="relative max-w-3xl">
            <p className="type-kicker text-signal">{home.hero.kicker}</p>
            <h1 className="type-hero mt-5 text-white">{home.hero.title}</h1>
            <p className="type-lede mt-8 max-w-xl text-white/70">{home.hero.lede}</p>
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

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <ul className="grid grid-cols-4 divide-x divide-mist">
            {home.proof.stats.map((stat) => (
              <li key={stat.label} className="px-3 first:pl-0 last:pr-0 sm:px-8">
                <p className="type-stat text-navy">{stat.value}</p>
                <p className="type-caption mt-3 text-slate">{stat.label}</p>
              </li>
            ))}
          </ul>
          <p className="type-caption mt-16 text-slate">{home.proof.line}</p>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
            {home.proof.names.map((name) => (
              <li key={name} className="type-title text-navy">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="type-display max-w-3xl text-navy">{home.work.title}</h2>
          <p className="type-lede mt-6 max-w-2xl text-slate">{home.work.lede}</p>
          <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {featured.map((item) => (
              <PortfolioCard key={item.slug} item={item} summary={home.work.lines[item.slug]} />
            ))}
          </div>
          <p className="mt-14">
            <Link to="/work" className="type-lede text-deep transition-colors hover:text-deep-hover">
              {home.work.link}
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="type-display max-w-3xl text-navy">{home.offer.title}</h2>
          <p className="type-lede mt-6 max-w-2xl text-slate">{home.offer.lede}</p>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {serviceFamilies.map((family) => (
              <Link
                key={family.slug}
                to={`/services/${family.slug}`}
                className="flex flex-col rounded-card border border-mist bg-white p-8 transition-colors hover:border-deep"
              >
                <h3 className="type-title text-navy">{family.name}</h3>
                <p className="type-body mt-4 text-navy">{family.promise}</p>
                <ul className="mt-6 space-y-2 type-body text-slate">
                  {family.services.slice(0, 3).map((service) => (
                    <li key={service.title}>{service.title}</li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl items-start gap-16 px-6 lg:grid-cols-2">
          <div>
            <h2 className="type-display text-navy">{home.different.title}</h2>
            <ul className="mt-10">
              {home.different.points.map((point) => (
                <li key={point.title} className="border-t border-mist py-8">
                  <h3 className="type-title text-navy">{point.title}</h3>
                  <p className="type-body mt-3 text-slate">{point.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <BrowserPlaceholder label={home.different.portal} />
        </div>
      </section>

      <HowWeWork />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="type-body max-w-2xl text-navy">{home.lab.text}</p>
          <Link to="/smartcrm" className="type-body text-deep transition-colors hover:text-deep-hover">
            {home.lab.link}
          </Link>
        </div>
      </section>

      {/* Hidden until a client approves a real quote. An empty list means this renders nothing. */}
      {testimonials.length > 0 ? (
        <section className="bg-paper py-28 sm:py-36">
          <div className="mx-auto max-w-6xl px-6">
            <ul className="grid gap-10 md:grid-cols-2">
              {testimonials.map((item) => (
                <li key={item.name} className="rounded-card border border-mist bg-white p-8">
                  <p className="type-body text-navy">{item.quote}</p>
                  <p className="type-caption mt-6 text-slate">
                    {item.name}, {item.role}, {item.company}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {articles.length > 0 ? (
        <section className={`${testimonials.length > 0 ? "bg-white" : "bg-paper"} py-28 sm:py-36`}>
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="type-display text-navy">
              <Link to="/insights" className="transition-colors hover:text-deep">
                Notes from the studio
              </Link>
            </h2>
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {articles.slice(0, 3).map((article) => (
                <article key={article.slug}>
                  <Link to={`/insights/${article.slug}`} className="block">
                    <FamilyIcon family={article.family} className="text-deep" />
                    <p className="type-caption mt-6 flex flex-wrap gap-x-3 text-slate">
                      <span>{article.familyLabel}</span>
                      <span>{formatInsightDate(article.date)}</span>
                    </p>
                    <h3 className="type-title mt-3 text-navy">{article.title}</h3>
                    <p className="type-body mt-3 text-slate">{article.description}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
