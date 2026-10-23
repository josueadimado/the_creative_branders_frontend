import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import WorkFrame from "../components/DeviceFrame";
import Seo from "../components/Seo";
import { workPage } from "../content/work";
import {
  displayLiveUrl,
  displayLogo,
  displayName,
  getPublishedStudy,
  studyTags,
  visibleBuilt,
  visibleQuote,
  visibleResults,
  visibleStack,
  visibleText,
} from "../data/portfolio";
import { track } from "../lib/analytics";
import NotFound from "./NotFound";

export default function WorkStudy() {
  const { slug } = useParams();
  const item = getPublishedStudy(slug);

  useEffect(() => {
    if (!item) return;
    track("case_study_view", { case_study: item.slug });
  }, [item]);

  if (!item) return <NotFound />;

  const name = displayName(item);
  const logo = displayLogo(item);
  const liveUrl = displayLiveUrl(item);
  const summary = visibleText(item.summary);
  const challenge = visibleText(item.challenge);
  const approach = visibleText(item.approach);
  const built = visibleBuilt(item);
  const stack = visibleStack(item);
  const results = visibleResults(item);
  const quote = visibleQuote(item);
  const images = item.images.flatMap((src) => {
    const text = visibleText(src);
    return text ? [text] : [];
  });
  const hero = images[0];
  const gallery = images.slice(1);
  const tags = studyTags(item);
  const description = summary ?? workPage.lede;

  return (
    <>
      <Seo title={name} description={description} path={`/work/${item.slug}`} image={hero} />

      <article className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          {hero ? <WorkFrame src={hero} alt={name} device={item.device} loading="eager" /> : null}

          <div className="mt-12 max-w-3xl">
            {logo ? <img src={logo} alt="" className="mb-6 h-10 w-auto" /> : null}
            <h1 className="type-h1 text-navy">{name}</h1>
            {tags.length > 0 ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
            {summary ? <p className="type-lede mt-8 text-slate">{summary}</p> : null}
            {liveUrl ? (
              <p className="mt-6">
                <a href={liveUrl} className="type-body text-deep hover:text-deep-hover" target="_blank" rel="noreferrer">
                  {workPage.labels.visit}
                </a>
              </p>
            ) : null}
          </div>

          {challenge ? (
            <section className="mt-16 max-w-3xl">
              <h2 className="type-kicker text-deep">{workPage.labels.challenge}</h2>
              <p className="type-body mt-3 text-slate">{challenge}</p>
            </section>
          ) : null}

          {approach ? (
            <section className="mt-12 max-w-3xl">
              <h2 className="type-kicker text-deep">{workPage.labels.approach}</h2>
              <p className="type-body mt-3 text-slate">{approach}</p>
            </section>
          ) : null}

          {built.length > 0 ? (
            <section className="mt-12 max-w-3xl">
              <h2 className="type-kicker text-deep">{workPage.labels.built}</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5">
                {built.map((line) => (
                  <li key={line} className="type-body text-slate">
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {stack.length > 0 ? (
            <section className="mt-12 max-w-3xl">
              <h2 className="type-kicker text-deep">{workPage.labels.stack}</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stack.map((tool) => (
                  <li key={tool} className="tag">
                    {tool}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {results.length > 0 ? (
            <section className="mt-16">
              <h2 className="type-kicker text-deep">{workPage.labels.results}</h2>
              <div className="mt-6 grid gap-10 sm:grid-cols-3">
                {results.map((result) => (
                  <div key={`${result.value}-${result.label}`}>
                    <p className="type-stat text-navy">{result.value}</p>
                    <p className="type-body mt-2 text-slate">{result.label}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {gallery.length > 0 ? (
            <section className="mt-16">
              <h2 className="type-kicker text-deep">{workPage.labels.gallery}</h2>
              <div className="mt-6 grid gap-8 md:grid-cols-2">
                {gallery.map((src) => (
                  <WorkFrame key={src} src={src} alt={name} device={item.device} />
                ))}
              </div>
            </section>
          ) : null}

          {quote ? (
            <blockquote className="mt-16 max-w-3xl border-l border-deep pl-6">
              <p className="type-lede text-navy">{visibleText(quote.text)}</p>
              {visibleText(quote.name) ? (
                <footer className="type-body mt-4 text-slate">
                  {visibleText(quote.name)}
                  {visibleText(quote.title) ? `, ${visibleText(quote.title)}` : ""}
                  {visibleText(quote.company) ? `, ${visibleText(quote.company)}` : ""}
                </footer>
              ) : null}
            </blockquote>
          ) : null}

          <p className="mt-16">
            <Link
              to="/contact"
              className="btn btn-inverse"
              onClick={() => track("start_project_click", { location: "case_study" })}
            >
              {workPage.labels.similar}
            </Link>
          </p>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
