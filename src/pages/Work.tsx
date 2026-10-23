import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import { workPage } from "../content/work";
import { track } from "../lib/analytics";
import { coverImage, displayName, publishedWork, visibleBuilt, visibleText } from "../data/portfolio";

function preloadWorkImages() {
  publishedWork().forEach((item) => {
    const src = coverImage(item);
    if (!src) return;
    const img = new Image();
    img.src = src;
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
          {publishedWork().map((item, index) => {
            const image = coverImage(item);
            const sector = visibleText(item.sector);
            const summary = visibleText(item.summary);
            const challenge = visibleText(item.challenge);
            const approach = visibleText(item.approach);
            const built = visibleBuilt(item);

            return (
            <article
              key={item.slug}
              id={item.slug}
              className="scroll-mt-28 grid items-center gap-12 border-b border-mist pb-28 last:border-0 last:pb-0 lg:grid-cols-2 lg:gap-20"
            >
              {image ? (
                <Media
                  src={image}
                  alt={displayName(item)}
                  className={`aspect-[4/3] ${index % 2 === 1 ? "lg:order-2" : ""}`}
                />
              ) : null}
              <div>
                {sector ? <p className="tag">{sector}</p> : null}
                <h2 className="type-display mt-4 text-navy">{displayName(item)}</h2>
                {summary ? <p className="type-lede mt-6 text-slate">{summary}</p> : null}

                {challenge ? (
                  <>
                    <p className="type-kicker mt-12 text-deep">{workPage.labels.problem}</p>
                    <p className="type-body mt-3 text-slate">{challenge}</p>
                  </>
                ) : null}

                {approach ? (
                  <>
                    <p className="type-kicker mt-9 text-deep">{workPage.labels.approach}</p>
                    <p className="type-body mt-3 text-slate">{approach}</p>
                  </>
                ) : null}

                {built.length > 0 ? (
                  <>
                    <p className="type-kicker mt-9 text-deep">{workPage.labels.built}</p>
                    <p className="type-body mt-3 text-slate">{built.join(" ")}</p>
                  </>
                ) : null}
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
