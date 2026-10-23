import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import WorkFrame, { BrowserPlaceholder } from "../components/DeviceFrame";
import Seo from "../components/Seo";
import { workPage } from "../content/work";
import {
  displayCountry,
  displayLiveUrl,
  displayLogo,
  displayName,
  familyLabel,
  getPublishedStudy,
  studyFamilies,
  visibleBuilt,
  visibleQuote,
  visibleResults,
  visibleStack,
  studyScreenshots,
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
  const images = studyScreenshots(item);
  const hero = images[0];
  const sector = visibleText(item.sector);
  const country = displayCountry(item);
  const families = studyFamilies(item).map((family) => familyLabel(family)).join(", ");
  const facts = [
    sector ? { label: workPage.labels.sector, value: sector } : null,
    country ? { label: workPage.labels.country, value: country } : null,
    { label: workPage.labels.family, value: families },
  ].flatMap((fact) => (fact ? [fact] : []));
  const description = summary ?? workPage.lede;

  return (
    <>
      <Seo title={name} description={description} path={`/work/${item.slug}`} image={hero} />

      <article className="bg-paper">
        <header className="border-b border-mist py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              {logo ? <img src={logo} alt="" className="mb-6 h-10 w-auto" /> : null}
              <h1 className="type-h1 text-navy">{name}</h1>
              {item.relationship === "venture" ? (
                <p className="type-caption mt-4 text-slate">Studio venture</p>
              ) : null}
              <dl className="mt-10 border-t border-mist">
                {facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-mist py-4 sm:grid-cols-[9rem_1fr]">
                    <dt className="type-caption text-slate">{fact.label}</dt>
                    <dd className="type-body text-navy">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {liveUrl ? (
                <p className="mt-6">
                  <a
                    href={liveUrl}
                    className="type-body text-deep hover:text-deep-hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {workPage.labels.visit}
                  </a>
                </p>
              ) : null}
              {summary ? <p className="type-lede mt-8 text-slate">{summary}</p> : null}
            </div>
          </div>
        </header>

        <div className="bg-paper py-16 sm:py-24">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
            {images.length > 0 ? (
              images.map((src, index) => (
                <WorkFrame
                  key={`${src}-${index}`}
                  src={src}
                  alt={name}
                  device={item.device}
                  feature
                  loading={index === 0 ? "eager" : "lazy"}
                />
              ))
            ) : (
              <BrowserPlaceholder label={name} />
            )}
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">

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
