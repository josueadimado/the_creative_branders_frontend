import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import AuditLink from "../components/AuditLink";
import WorkFrame, { BrowserPlaceholder } from "../components/DeviceFrame";
import Seo from "../components/Seo";
import { cta } from "../content/cta";
import { site } from "../content/site";
import StackLogo from "../components/StackLogo";
import { useProject, useProjects } from "../content/contentDesk";
import { workPage } from "../content/work";
import {
  displayLiveUrl,
  displayLogo,
  displayName,
  familyLabel,
  studyScreenshots,
  visibleBuilt,
  visibleResults,
  visibleStack,
  visibleText,
  type PortfolioItem,
  type WorkResult,
} from "../data/portfolio";
import { track } from "../lib/analytics";
import NotFound from "./NotFound";

/** The two projects that follow this one. The list wraps back to the start. */
function followingStudies(slug: string, studies: PortfolioItem[]): PortfolioItem[] {
  const index = studies.findIndex((item) => item.slug === slug);
  if (index === -1 || studies.length < 2) return [];
  return [1, 2]
    .map((step) => studies[(index + step) % studies.length])
    .filter((item) => item.slug !== slug);
}

/**
 * One project page.
 * The order matches a case-study page: the name, the screens, then the problem,
 * the solution, the stack, and what was delivered.
 */
export default function WorkStudy() {
  const { slug } = useParams();
  const item = useProject(slug);
  const catalog = useProjects();

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
  // The clinic booking page shows a phone number, so that shot stays off this page.
  const images = studyScreenshots(item).filter((src) => src !== "/images/work/relief-chiropractic/homepage.jpg");
  const sector = visibleText(item.sector);
  const kicker = [sector, familyLabel(item.family)].filter(Boolean).join(" · ");
  const description = summary ?? workPage.lede;
  const next = followingStudies(item.slug, catalog);
  const origin = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
  const pagePath = `/work/${item.slug}`;

  return (
    <>
      <Seo
        title={name}
        description={description}
        path={pagePath}
        image={images[0]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name,
          description,
          ...(origin ? { url: `${origin}${pagePath}` } : {}),
          ...(origin && images[0] ? { image: `${origin}${images[0]}` } : {}),
          creator: { "@type": "Organization", name: site.name },
        }}
      />

      <article className="bg-white">
        <header className="mx-auto max-w-6xl px-6 pb-14 pt-10 sm:pb-16 sm:pt-14">
          <Link to="/work" className="inline-flex items-center gap-2 text-sm font-medium text-slate hover:text-navy">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {workPage.back}
          </Link>

          <div className="mt-12 max-w-3xl">
            {logo ? <img src={logo} alt="" className="mb-5 h-12 w-auto" /> : null}
            {kicker ? (
              <p className="inline-flex rounded-full border border-mist bg-paper px-3.5 py-1.5 font-sans text-sm font-medium text-navy">
                {kicker}
              </p>
            ) : null}
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] text-navy sm:text-5xl lg:text-7xl">{name}</h1>
            {item.relationship === "venture" ? (
              <p className="type-caption mt-4 text-slate">Studio venture</p>
            ) : null}
            {summary ? <p className="type-lede mt-6 max-w-xl text-slate">{summary}</p> : null}
            {liveUrl ? (
              <a
                href={liveUrl}
                className="btn btn-inverse mt-8 gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                {workPage.labels.visit}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            ) : null}
          </div>
        </header>

        <div className="bg-tint py-8 sm:py-10">
          <div className="mx-auto max-w-3xl px-6">
            <ScreenSet images={images} name={name} device={item.device} />
            {stack.length > 0 ? (
              <div className="mt-8">
                <p className="type-kicker text-slate">{workPage.labels.stack}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {stack.map((tool) => (
                    <li
                      key={tool}
                      className="inline-flex items-center gap-1.5 rounded-full border border-mist bg-white px-3 py-1.5 font-sans text-sm font-medium text-navy"
                    >
                      <StackLogo name={tool} />
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {challenge ? (
          <StudyBlock index="01" title={workPage.problem}>
            <p className="type-body text-slate">{challenge}</p>
          </StudyBlock>
        ) : null}

        {approach ? (
          <StudyBlock index="02" title={workPage.solution}>
            <p className="type-body text-slate">{approach}</p>
          </StudyBlock>
        ) : null}

        {built.length > 0 ? (
          <StudyBlock index="03" title={workPage.delivery}>
            <div className="space-y-5">
              {built.map((line) => (
                <p key={line} className="type-body text-slate">
                  {line}
                </p>
              ))}
            </div>
          </StudyBlock>
        ) : null}

        {results.length > 0 ? <OutcomeBand results={results} /> : null}
      </article>

      <ProjectClose />

      {next.length > 0 ? (
        <section className="border-t border-mist bg-white" aria-label={workPage.more}>
          <div className="mx-auto grid max-w-6xl sm:grid-cols-2">
            {next.map((study) => {
              const studyName = displayName(study);
              const studyKicker = [visibleText(study.sector), familyLabel(study.family)].filter(Boolean).join(" · ");
              return (
                <Link
                  key={study.slug}
                  to={`/work/${study.slug}`}
                  className="group flex min-w-0 items-center justify-between gap-4 border-b border-mist px-6 py-8 hover:bg-paper sm:border-b-0 sm:gap-6 sm:py-10 sm:odd:border-r"
                >
                  <span className="min-w-0">
                    {studyKicker ? (
                      <span className="inline-flex rounded-full border border-mist bg-paper px-3 py-1 font-sans text-sm font-medium text-navy">
                        {studyKicker}
                      </span>
                    ) : null}
                    <span className="mt-2 block text-balance font-display text-2xl font-semibold text-navy group-hover:text-deep sm:text-3xl">
                      {studyName}
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 text-navy" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}

/**
 * The screens for one project.
 * One screen sits centered. Two or more put the main screen on the left
 * and the rest in a column on the right, so they read as one set.
 */
function ScreenSet({
  images,
  name,
  device,
}: {
  images: string[];
  name: string;
  device: PortfolioItem["device"];
}) {
  if (images.length === 0) return <BrowserPlaceholder label={name} />;
  if (images.length === 1) {
    return <WorkFrame src={images[0]} alt={name} device={device} loading="eager" />;
  }
  const [lead, ...rest] = images;
  return (
    <div className="grid items-center gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-5">
      <WorkFrame src={lead} alt={name} device={device} loading="eager" />
      <div className="grid gap-5">
        {rest.map((src) => (
          <WorkFrame key={src} src={src} alt="" device={device} loading="lazy" />
        ))}
      </div>
    </div>
  );
}

/**
 * What the project changed for the client.
 * The short line is the benefit. The sentence under it says how.
 */
function OutcomeBand({ results }: { results: WorkResult[] }) {
  return (
    <section className="bg-navy" aria-label={workPage.benefits}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-white/50">{workPage.benefits}</p>
        <div className="mt-10 grid gap-12 sm:grid-cols-2 sm:gap-10">
          {results.map((result) => (
            <div key={`${result.value}-${result.label}`}>
              <p className="font-display text-4xl font-semibold leading-tight text-signal sm:text-5xl">{result.value}</p>
              <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/75">{result.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** The last invitation on a project page. White page, navy button. */
function ProjectClose() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-slate">{workPage.closeKicker}</p>
        <h2 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[0.95] text-navy sm:text-6xl lg:text-7xl">
          {workPage.closeTitle}
          <br />
          <span className="text-slate">{workPage.closeTitleRest}</span>
        </h2>
        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
          <AuditLink className="btn btn-inverse" location="case-study" />
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md border border-navy px-5 py-3 text-[15px] font-medium text-navy hover:bg-paper"
            onClick={() => track("start_project_click", { location: "case-study" })}
          >
            {cta.project}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** A numbered block: the label on the left, the writing on the right. */
function StudyBlock({ index, title, children }: { index: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-mist">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="type-kicker text-slate">{index}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight text-navy sm:text-5xl">{title}</h2>
        </div>
        <div className="lg:pt-10">{children}</div>
      </div>
    </section>
  );
}
