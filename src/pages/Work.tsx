import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useSearchParams } from "react-router-dom";
import CtaBand from "../components/CtaBand";
import PortfolioCard from "../components/PortfolioCard";
import Seo from "../components/Seo";
import { useProjects, useWorkCopy } from "../content/contentDesk";
import { familiesInUse, studyMatchesFamily } from "../data/portfolio";
import { localeFromPath, localizedPath } from "../i18n/locale";
import { trackWorkFilter } from "../lib/analytics";

function FilterGroup({
  label,
  allLabel,
  value,
  options,
  onChange,
}: {
  label: string;
  allLabel: string;
  value: string | null;
  options: { id: string; label: string }[];
  onChange: (next: string | null) => void;
}) {
  // The heading stays for screen readers. On screen the chips are the whole control.
  const chip = (active: boolean) =>
    `cursor-pointer rounded-full border px-4 py-2 font-sans text-sm font-medium ${
      active ? "border-navy bg-navy text-white" : "border-mist bg-white text-navy"
    }`;

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      <button type="button" aria-pressed={value === null} className={chip(value === null)} onClick={() => onChange(null)}>
        {allLabel}
      </button>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          className={chip(value === option.id)}
          onClick={() => onChange(value === option.id ? null : option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default function Work() {
  const { t, i18n } = useTranslation("work");
  const isFr = i18n.language?.startsWith("fr");
  const workPage = useWorkCopy();
  const catalog = useProjects();
  const { hash, pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const [params, setParams] = useSearchParams();
  // Auto-animate skips the motion when the visitor has asked for reduced motion.
  const [grid] = useAutoAnimate();

  // Old links looked like /work#relief-chiropractic. Send them to the real page.
  const legacySlug = decodeURIComponent(hash.replace(/^#/, ""));
  if (legacySlug) {
    const study = catalog.find((item) => item.slug === legacySlug);
    return (
      <Navigate
        to={localizedPath(study ? `/work/${study.slug}` : "/work", locale)}
        replace
      />
    );
  }

  // Only services that already have a published project. Mobile apps stays off this row until one is listed.
  const serviceOptions = familiesInUse(catalog);
  const serviceParam = params.get("family");
  const service = serviceParam && serviceOptions.some((option) => option.slug === serviceParam) ? serviceParam : null;

  const studies = catalog.filter((item) => studyMatchesFamily(item, service));

  function chooseService(next: string | null) {
    const updated = new URLSearchParams(params);
    updated.delete("sector");
    if (next) updated.set("family", next);
    else updated.delete("family");
    setParams(updated, { replace: true });
    trackWorkFilter(next ?? "all");
  }

  const seo = {
    ...workPage.seo,
    title: isFr ? t("seoTitle") : workPage.seo.title,
    description: isFr ? t("seoDescription") : workPage.seo.description,
    path: isFr ? "/fr/work" : "/work",
  };

  return (
    <>
      <Seo {...seo} />
      <section className="text-hero bg-navy">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{isFr ? t("kicker") : workPage.kicker}</p>
          <h1 className="type-h1 mt-5 max-w-3xl text-white">{isFr ? t("title") : workPage.title}</h1>
          <p className="type-lede mt-8 max-w-xl text-white/70">{isFr ? t("lede") : workPage.lede}</p>
        </div>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-3">
            <FilterGroup
              allLabel={isFr ? t("all") : workPage.filters.all}
              label={isFr ? t("family") : workPage.filters.family}
              value={service}
              options={serviceOptions.map((option) => ({ id: option.slug, label: option.label }))}
              onChange={chooseService}
            />
          </div>

          <div
            ref={grid}
            className={
              studies.length > 0
                ? "mt-16 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-0"
                : undefined
            }
          >
            {studies.map((item) => (
              <PortfolioCard key={item.slug} item={item} />
            ))}
          </div>
          {studies.length === 0 ? (
            <p className="type-body mt-16 text-slate">{isFr ? t("empty") : workPage.empty}</p>
          ) : null}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
