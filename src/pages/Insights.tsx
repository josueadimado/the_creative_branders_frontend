import { Link, useSearchParams } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import FamilyIcon from "../components/FamilyIcon";
import Seo from "../components/Seo";
import { articles, formatInsightDate, insightsPage } from "../content/insights";

export default function Insights() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("family");
  const families = Array.from(new Map(articles.map((article) => [article.family, article.familyLabel])).entries());
  const family = families.some(([slug]) => slug === requested) ? requested : null;
  const visible = family ? articles.filter((article) => article.family === family) : articles;

  return (
    <>
      <Seo {...insightsPage.seo} />
      <section className="dot-grid bg-navy py-32 sm:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{insightsPage.kicker}</p>
          <h1 className="type-h1 mt-5 max-w-3xl text-white">{insightsPage.title}</h1>
          <p className="type-lede mt-8 max-w-xl text-white/70">{insightsPage.lede}</p>
        </div>
      </section>

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Service">
            <FilterChip
              pressed={family === null}
              label={insightsPage.all}
              onClick={() => setParams({})}
            />
            {families.map(([slug, label]) => (
              <FilterChip
                key={slug}
                pressed={family === slug}
                label={label}
                onClick={() => setParams(family === slug ? {} : { family: slug })}
              />
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="type-body mt-16 text-slate">{insightsPage.empty}</p>
          ) : (
            <div className="mt-16 grid gap-10 md:grid-cols-3">
              {visible.map((article) => (
                <article key={article.slug} className="flex flex-col rounded-card border border-mist bg-white">
                  <Link to={`/insights/${article.slug}`} className="flex flex-1 flex-col p-6">
                    <FamilyIcon family={article.family} className="text-deep" />
                    <div className="mt-6 flex flex-1 flex-col">
                      <p className="type-caption flex flex-wrap gap-x-3 text-slate">
                        <span>{article.familyLabel}</span>
                        <span>{formatInsightDate(article.date)}</span>
                        <span>{article.minutes} min</span>
                      </p>
                      <h2 className="type-title mt-3 text-navy">{article.title}</h2>
                      <p className="type-body mt-3 text-slate">{article.description}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function FilterChip({ pressed, label, onClick }: { pressed: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`tag cursor-pointer border ${pressed ? "border-navy bg-navy text-white" : "border-transparent"}`}
    >
      {label}
    </button>
  );
}
