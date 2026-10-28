import { BadgeCheck, FileText, HeartHandshake, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import OptimizedImage from "../components/OptimizedImage";
import { LocaleLink } from "../components/LocaleLink";
import Seo from "../components/Seo";
import { useAboutCopy } from "../content/contentDesk";
import { track } from "../lib/analytics";

/** One icon per value, so each card is easy to tell apart. */
const valueIcons: Record<string, LucideIcon> = {
  Clarity: FileText,
  Care: HeartHandshake,
  Ownership: BadgeCheck,
  Responsibility: ShieldCheck,
  Clarté: FileText,
  Soin: HeartHandshake,
  Implication: BadgeCheck,
  Responsabilité: ShieldCheck,
};

/**
 * Same arrangement as before. Fonts and colours match the homepage:
 * Montserrat for headings, Inter for the reading text, navy, paper,
 * and the signal blue. Signal blue is only used as a background here,
 * with navy text on it, the same way the homepage buttons work.
 */
export default function About() {
  const { t, i18n } = useTranslation(["about", "cta"]);
  const isFr = i18n.language?.startsWith("fr");
  const about = useAboutCopy();

  const hero = {
    kicker: isFr ? t("about:kicker") : about.hero.kicker,
    headline: isFr ? t("about:headline") : about.hero.headline,
    lede: isFr ? t("about:lede") : about.hero.lede,
  };
  const workTitle = isFr ? t("about:workTitle") : about.work.title;
  const startedBody = isFr ? t("about:startedBody") : about.started.body;
  const workParagraphs = isFr
    ? [t("about:workP1"), t("about:workP2")]
    : about.work.paragraphs;
  const factsNote = isFr ? t("about:factsNote") : about.facts.note;
  const valuesTitle = isFr ? t("about:valuesTitle") : about.values.title;
  const valueItems = isFr
    ? [
        { title: t("about:valueClarity"), body: t("about:valueClarityBody") },
        { title: t("about:valueCare"), body: t("about:valueCareBody") },
        { title: t("about:valueOwnership"), body: t("about:valueOwnershipBody") },
        { title: t("about:valueResponsibility"), body: t("about:valueResponsibilityBody") },
      ]
    : about.values.items;
  const seo = {
    ...about.seo,
    title: isFr ? t("about:seoTitle") : about.seo.title,
    description: isFr ? t("about:seoDescription") : about.seo.description,
    path: isFr ? "/fr/about" : "/about",
  };
  const factLabels = isFr
    ? [t("about:statYears"), t("about:statProjects"), t("about:statSpecialists"), t("about:statCountries")]
    : null;

  return (
    <div className="bg-paper font-sans text-navy">
      <Seo {...seo} />

      {/* Opening: everything in this block is centered. */}
      <section className="px-7 pb-8 pt-20 sm:pt-24">
        <p className="type-kicker text-center text-deep">{hero.kicker}</p>
        <h1 className="mx-auto mt-4 max-w-[858px] text-center font-display text-[2.5rem] font-semibold leading-[1.15] sm:text-6xl lg:text-[80px] lg:leading-[104px]">
          {hero.headline}
        </h1>
        <p className="type-body mx-auto mt-8 max-w-[480px] text-center text-slate">{hero.lede}</p>
      </section>

      {/* The two desk photos sit side by side. Nothing covers them. */}
      <section className="mx-auto max-w-[1224px] px-7 pb-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {about.pictures.desks.map((picture) => (
            <OptimizedImage
              key={picture.src}
              src={picture.src}
              alt={picture.alt}
              width={picture.width}
              height={picture.height}
              loading="lazy"
              className="h-auto w-full rounded-[20px]"
            />
          ))}
        </div>
      </section>

      {/* Heading on the left. The two paragraphs sit on the right. */}
      <section className="mx-auto max-w-[1224px] px-7 pb-8 pt-16 lg:px-0 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-[454px_606px] lg:justify-between">
          <h2 className="font-display text-4xl font-semibold leading-[1.15] text-navy sm:text-[48px] sm:leading-[62px]">
            {workTitle}
          </h2>
          {/* Both edges line up. Extra space is shared through the line, without splitting words. */}
          <div className="text-justify [text-justify:inter-character]">
            <p className="type-body text-slate">{startedBody}</p>
            <p className="type-body mt-5 text-slate">{workParagraphs[0]}</p>
            <p className="type-body mt-5 text-slate">{workParagraphs[1]}</p>
          </div>
        </div>

        {about.facts.stats.length > 0 ? (
          <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[224px_1fr] lg:items-center">
            <p className="type-body max-w-[224px] text-slate">{factsNote}</p>
            {/* Two by two on a phone. One row once the screen is wide enough for a desktop. */}
            <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
              {about.facts.stats.map((stat, index) => (
                <div key={stat.label}>
                  <dt className="font-sans text-5xl font-semibold leading-none text-deep sm:text-[56px]">{stat.value}</dt>
                  <dd className="type-body mt-2 text-slate">{factLabels ? factLabels[index] : stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}
      </section>

      {/* The heading is centered. Each card uses the homepage blue, with the name at the top. */}
      <section className="mx-auto max-w-[1224px] px-7 pb-20 pt-16 lg:px-0 lg:pb-28 lg:pt-24">
        <h2 className="mx-auto max-w-[640px] text-center font-display text-4xl font-semibold leading-[1.15] text-navy sm:text-[48px] sm:leading-[62px]">
          {valuesTitle}
        </h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {valueItems.map((item) => {
            const Icon = valueIcons[item.title] ?? FileText;
            return (
              <li key={item.title} className="flex min-h-[280px] flex-col rounded-2xl bg-signal p-6 text-[#0E1E2B]">
                {/* White tile so the navy icon stays clear on the blue card. */}
                <span className="flex size-12 items-center justify-center rounded-xl bg-white text-[#0E1E2B]">
                  <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-[#0E1E2B]">{item.title}</h3>
                <p className="type-body mt-auto pt-6 text-[#0E1E2B]">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Close: the words and the single button are centered on the navy. */}
      <section className="bg-navy">
        <div className="mx-auto flex max-w-[720px] flex-col items-center px-7 py-24 text-center sm:py-32">
          <h2 className="font-display text-4xl font-semibold leading-[1.15] text-white sm:text-[56px] sm:leading-[1.15]">
            {t("cta:title")}
          </h2>
          <p className="type-body mt-6 max-w-[520px] text-white/85">{t("cta:body")}</p>
          <LocaleLink
            to="/contact"
            onClick={() => track("start_project_click", { location: "about-close" })}
            className="btn btn-primary mt-8"
          >
            {t("cta:project")}
          </LocaleLink>
        </div>
      </section>
    </div>
  );
}
