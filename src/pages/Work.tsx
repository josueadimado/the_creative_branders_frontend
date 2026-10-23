import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import { portfolio } from "../data/portfolio";

function preloadWorkImages() {
  portfolio.forEach((item) => {
    const img = new Image();
    img.src = item.image;
  });
}

export default function Work() {
  const { hash } = useLocation();

  useEffect(() => {
    preloadWorkImages();
  }, []);

  useEffect(() => {
    const id = hash.replace("#", "");
    if (!id) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 420);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <PageHero
        image="/images/work-clinic.jpg"
        kicker="Work"
        title="Proof, not promises."
        lede="Nine studios, clinics, and platforms. Each write-up is the problem we walked into, how we approached it, and what we shipped. We do not invent outcome numbers."
      />

      <section className="bg-offwhite py-24 sm:py-32">
        <div className="mx-auto max-w-6xl space-y-28 px-6">
          {portfolio.map((item, index) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 grid items-center gap-12 border-b border-navy/10 pb-28 last:border-0 last:pb-0 lg:grid-cols-2 lg:gap-20"
            >
              <Media
                src={item.image}
                className={`aspect-[4/3] ${index % 2 === 1 ? "lg:order-2" : ""}`}
              />
              <div>
                <p className="type-kicker text-blueDark">{item.sector}</p>
                <h2 className="type-display mt-4 text-ink">{item.client}</h2>
                <p className="type-lede mt-6 text-slate">{item.summary}</p>

                <p className="type-kicker mt-12 text-blueDark">The problem</p>
                <p className="type-body mt-3 text-slate">{item.problem}</p>

                <p className="type-kicker mt-9 text-blueDark">How we approached it</p>
                <p className="type-body mt-3 text-slate">{item.approach}</p>

                <p className="type-kicker mt-9 text-blueDark">What we built</p>
                <p className="type-body mt-3 text-slate">{item.built}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand title="Start your project." />
    </>
  );
}
