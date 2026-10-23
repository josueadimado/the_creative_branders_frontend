import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import PortfolioCard from "../components/PortfolioCard";
import Seo from "../components/Seo";
import { workPage } from "../content/work";
import {
  familiesInUse,
  getPublishedStudy,
  publishedWork,
  sectorsInUse,
  studyMatchesFamily,
  visibleText,
} from "../data/portfolio";
import { trackWorkFilter } from "../lib/analytics";

function FilterGroup({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  options: { id: string; label: string }[];
  onChange: (next: string | null) => void;
}) {
  return (
    <div>
      <p className="type-kicker text-deep">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={label}>
        <button
          type="button"
          aria-pressed={value === null}
          className={`tag cursor-pointer border ${value === null ? "border-navy bg-navy text-white" : "border-transparent"}`}
          onClick={() => onChange(null)}
        >
          {workPage.filters.all}
        </button>
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            aria-pressed={value === option.id}
            className={`tag cursor-pointer border ${value === option.id ? "border-navy bg-navy text-white" : "border-transparent"}`}
            onClick={() => onChange(value === option.id ? null : option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  const { hash } = useLocation();
  const [params, setParams] = useSearchParams();

  // Old links looked like /work#relief-chiropractic. Send them to the real page.
  const legacySlug = decodeURIComponent(hash.replace(/^#/, ""));
  if (legacySlug) {
    const study = getPublishedStudy(legacySlug);
    return <Navigate to={study ? `/work/${study.slug}` : "/work"} replace />;
  }

  const familyOptions = familiesInUse();
  const sectorOptions = sectorsInUse();
  const familyParam = params.get("family");
  const sectorParam = params.get("sector");
  const family = familyOptions.some((option) => option.slug === familyParam) ? familyParam : null;
  const sector = sectorParam && sectorOptions.includes(sectorParam) ? sectorParam : null;

  const studies = publishedWork().filter((item) => {
    if (!studyMatchesFamily(item, family)) return false;
    if (sector && visibleText(item.sector) !== sector) return false;
    return true;
  });

  function choose(key: "family" | "sector", next: string | null) {
    const updated = new URLSearchParams(params);
    if (next) updated.set(key, next);
    else updated.delete(key);
    setParams(updated, { replace: true });
    trackWorkFilter(next ?? "all");
  }

  return (
    <>
      <Seo {...workPage.seo} />
      <section className="bg-navy py-32 sm:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{workPage.kicker}</p>
          <h1 className="type-h1 mt-5 max-w-3xl text-white">{workPage.title}</h1>
          <p className="type-lede mt-8 max-w-xl text-white/70">{workPage.lede}</p>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <FilterGroup
              label={workPage.filters.family}
              value={family}
              options={familyOptions.map((option) => ({ id: option.slug, label: option.label }))}
              onChange={(next) => choose("family", next)}
            />
            <FilterGroup
              label={workPage.filters.sector}
              value={sector}
              options={sectorOptions.map((option) => ({ id: option, label: option }))}
              onChange={(next) => choose("sector", next)}
            />
          </div>

          {studies.length > 0 ? (
            <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
              {studies.map((item) => (
                <PortfolioCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <p className="type-body mt-16 text-slate">{workPage.empty}</p>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
