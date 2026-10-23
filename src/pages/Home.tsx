import { useEffect } from "react";
import { Link } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import Illustration from "../components/Illustration";
import Media from "../components/Media";
import PortfolioCard from "../components/PortfolioCard";
import SectionHeading from "../components/SectionHeading";
import { portfolio } from "../data/portfolio";

const pillars = [
  {
    title: "Brand & Digital Experience",
    body: "Identity, websites, and digital presence that make a business look as capable as it is.",
    image: "/images/pillar-brand.jpg",
  },
  {
    title: "Intelligent Systems",
    body: "Booking, CRM, and operations tools that run the work, so growth does not depend on memory and spreadsheets.",
    image: "/images/pillar-systems.jpg",
  },
  {
    title: "Business Intelligence",
    body: "Clear numbers and reporting so founders can see what is working and decide with evidence.",
    image: "/images/pillar-intelligence.jpg",
  },
];

const featured = portfolio.slice(0, 4);

const process = [
  { name: "Discover", body: "We learn the business and the outcome that would actually change things.", drawing: "discover" as const },
  { name: "Design", body: "Experience and system, designed together so they do not fight later.", drawing: "design" as const },
  { name: "Build", body: "Working software and a coherent brand. Not slides.", drawing: "build" as const },
  { name: "Grow", body: "We stay close: iterate, measure, and extend what is working.", drawing: "grow" as const },
];

export default function Home() {
  useEffect(() => {
    featured.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  return (
    <>
      {/* Full-height opener: the photograph is the luxury; type sits in the quiet left. */}
      <section className="relative isolate min-h-[100svh] overflow-hidden bg-navy">
        <img
          src="/images/hero-studio.jpg"
          alt=""
          className="photo absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/65 to-transparent" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl items-end px-6 pb-28 pt-40 sm:pb-36">
          <div className="max-w-3xl">
            <p className="type-kicker text-signal">Digital Intelligence Studio</p>
            <h1 className="type-hero mt-5 text-white">
              We make your business look, run, and scale smarter.
            </h1>
            <p className="type-lede mt-8 max-w-xl text-white/70">
              Brand, systems, and intelligence for African SMEs and diaspora founders. One studio.
              One scope. Built to last.
            </p>
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
              <Link to="/contact" className="btn btn-primary">
                Book your free discovery call
              </Link>
              <Link to="/work" className="btn btn-secondary">
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-end gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <SectionHeading
              eyebrow="What we do"
              title="Three disciplines. One studio."
              lede="Most businesses are asked to hire an agency for the look, a freelancer for the build, and a consultant for the numbers. We hold the whole stack."
            />
            <Illustration name="pillars" className="hidden w-full lg:block" />
          </div>
          <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-3">
            {pillars.map((pillar, index) => (
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
            eyebrow="How we work"
            title="A short path from brief to growth."
            lede="Four steps, held by one team. Discover, design, build, then stay close as you grow."
          />
          <div className="node-row mt-20 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {process.map((step, index) => (
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
          <SectionHeading
            eyebrow="Selected work"
            title="Proof, not promises."
            lede="Clinics, nonprofits, learning platforms, and community products. Open any story to read the full brief."
          />
          <div className="mt-20 grid gap-x-10 gap-y-16 md:grid-cols-2">
            {featured.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
          <p className="mt-14">
            <Link to="/work" className="type-lede text-deep transition-colors hover:text-deep-hover">
              View all work
            </Link>
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-32 sm:py-40">
        <img
          src="/images/about-studio.jpg"
          alt=""
          className="photo absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            tone="light"
            eyebrow="Why TCB"
            title="Not an agency. Not a freelancer. Something better."
            lede="Agencies scale by adding layers. Freelancers scale by adding hours. We are a studio: a small team with a full brief. Brand, systems, and intelligence, held together so the work stays coherent as you grow."
          />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
