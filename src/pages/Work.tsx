import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import { workPage } from "../content/work";
import { track } from "../lib/analytics";
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
    track("case_study_view", { case_study: id });
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 420);
    return () => window.clearTimeout(timer);
  }, [hash]);

  return (
    <>
      <Seo {...workPage.seo} />
      <PageHero {...workPage.hero} />

      <section className="bg-paper py-24 sm:py-32">
        <div className="mx-auto max-w-6xl space-y-28 px-6">
          {portfolio.map((item, index) => (
            <article
              key={item.id}
              id={item.id}
              className="scroll-mt-28 grid items-center gap-12 border-b border-mist pb-28 last:border-0 last:pb-0 lg:grid-cols-2 lg:gap-20"
            >
              <Media
                src={item.image}
                className={`aspect-[4/3] ${index % 2 === 1 ? "lg:order-2" : ""}`}
              />
              <div>
                <p className="tag">{item.sector}</p>
                <h2 className="type-display mt-4 text-navy">{item.client}</h2>
                <p className="type-lede mt-6 text-slate">{item.summary}</p>

                <p className="type-kicker mt-12 text-deep">{workPage.labels.problem}</p>
                <p className="type-body mt-3 text-slate">{item.problem}</p>

                <p className="type-kicker mt-9 text-deep">{workPage.labels.approach}</p>
                <p className="type-body mt-3 text-slate">{item.approach}</p>

                <p className="type-kicker mt-9 text-deep">{workPage.labels.built}</p>
                <p className="type-body mt-3 text-slate">{item.built}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
