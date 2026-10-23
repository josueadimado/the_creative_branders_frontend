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
            <p className="type-kicker text-blue">Digital Intelligence Studio</p>
            <h1 className="type-hero mt-5 text-white">
              We make your business look, run, and scale{" "}
              <span className="underline decoration-yellow decoration-2 underline-offset-[0.12em]">
                smarter
              </span>
              .
            </h1>
            <p className="type-lede mt-8 max-w-xl text-white/70">
              Brand, systems, and intelligence for African SMEs and diaspora founders. One studio.
              One scope. Built to last.
            </p>
            <div className="mt-14 flex flex-wrap gap-4">
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

      <section className="bg-offwhite py-28 sm:py-36">
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
                <p className="type-kicker mt-7 text-blueDark">0{index + 1}</p>
                <h3 className="type-title mt-3 text-ink">{pillar.title}</h3>
                <p className="type-body mt-4 text-slate">{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-offwhite py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="How we work"
            title="A short path from brief to growth."
            lede="Four steps, held by one team. Discover, design, build, then stay close as you grow."
          />
          <div className="mt-20 grid gap-12 border-t border-navy/10 pt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {process.map((step, index) => (
              <article
                key={step.name}
                className="lg:border-r lg:border-navy/10 lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <Illustration name={step.drawing} className="h-28 w-full" />
                <p className="type-kicker mt-6 text-blueDark">0{index + 1}</p>
                <h3 className="type-title mt-3 text-ink">{step.name}</h3>
                <p className="type-body mt-4 text-slate">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/10 bg-offwhite py-28 sm:py-36">
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
            <Link to="/work" className="type-lede text-blue transition-colors hover:text-blueDark">
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

      <CtaBand
        title="Ready to build something intelligent?"
        lede="Tell us what you are building. We reply within 48 hours."
      />
    </>
  );
}
