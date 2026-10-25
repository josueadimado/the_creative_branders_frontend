import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { workPage } from "../content/work";
import {
  displayName,
  studyScreenshots,
  visibleStack,
  visibleText,
  type PortfolioItem,
} from "../data/portfolio";
import { track } from "../lib/analytics";
import { BrowserFrame, BrowserPlaceholder } from "./DeviceFrame";
import StackLogo from "./StackLogo";

type PortfolioCardProps = {
  item: PortfolioItem;
  /** Homepage cards use a shorter line than the case-study summary. */
  summary?: string;
};

/**
 * The picture area on a work card.
 * The first screenshot is large enough to read the real site.
 * A second screenshot sits in front on the right.
 * No screenshot yet means a navy panel with the project name.
 * On hover each screen lifts and tips, the same way as the homepage.
 * People who prefer less motion stay still.
 */
const shotMotion =
  "origin-center transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:-rotate-2";

function ScreenshotStage({ item, name }: { item: PortfolioItem; name: string }) {
  // The clinic booking page shows a phone number, so the work card uses the other shots.
  const shots = studyScreenshots(item)
    .filter((src) => src !== "/images/work/relief-chiropractic/homepage.jpg")
    .slice(0, 2);

  if (shots.length === 0) {
    return (
      <div className="p-4 sm:p-6">
        <div className={shotMotion}>
          <BrowserPlaceholder label={name} />
        </div>
      </div>
    );
  }

  if (shots.length === 1) {
    return (
      <div className="p-4 sm:p-6">
        <div className={shotMotion}>
          <BrowserFrame src={shots[0]} alt={`${name} on screen`} loading="lazy" />
        </div>
      </div>
    );
  }

  return (
    // Shorter on a phone, taller once two cards sit side by side.
    <div className="relative h-[18rem] sm:h-[22rem] lg:h-[26rem]">
      {/* Main site on the left. The second screen sits in front, fully inside the panel. */}
      <div className="absolute left-3 top-4 w-[72%] sm:left-5 sm:top-6 sm:w-[70%]">
        <div className={shotMotion}>
          <BrowserFrame src={shots[0]} alt={`${name} on screen`} loading="lazy" />
        </div>
      </div>
      <div className="absolute bottom-3 right-3 w-[48%] sm:bottom-5 sm:right-5 sm:w-[44%]">
        <div className={shotMotion}>
          <BrowserFrame src={shots[1]} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export default function PortfolioCard({ item, summary: summaryOverride }: PortfolioCardProps) {
  const name = displayName(item);
  const summary = summaryOverride ?? visibleText(item.summary);
  const stack = visibleStack(item);
  const href = `/work/${item.slug}`;

  return (
    // From a tablet up, two cards share the same rows, so the titles and the
    // "Read the case study" line start at the same height even when one card
    // has more stack pills or a longer title. A phone keeps one card per row.
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-card border border-mist bg-white md:row-span-3 md:mb-8 md:grid md:grid-rows-subgrid">
      <Link
        to={href}
        className="group flex h-full min-w-0 flex-col md:row-span-3 md:grid md:grid-rows-subgrid"
        onClick={() => track("case_study_view", { case_study: item.slug })}
      >
        {/* Soft panel. The screens sit inside it, and the arrow opens the case study. */}
        <div className="relative overflow-hidden bg-tint">
          {/* Hidden until the pointer is over this project. */}
          <span className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-mist bg-white text-navy opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
          <ScreenshotStage item={item} name={name} />
          {stack.length > 0 ? (
            <ul className="flex flex-wrap content-start gap-2 px-5 pb-5 sm:px-6">
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
          ) : (
            // Keeps a little space under the screens when a project has no stack.
            <div className="h-5" />
          )}
        </div>

        <div className="px-5 pt-6 sm:px-8 sm:pt-8">
          <h3 className="font-display text-2xl font-semibold leading-tight text-navy sm:text-3xl">
            {name}
            <ArrowUpRight className="ml-2 inline size-5 -translate-y-0.5 text-deep sm:size-7 sm:-translate-y-1" aria-hidden="true" />
          </h3>

          {summary ? <p className="type-body mt-3 text-slate">{summary}</p> : null}
        </div>

        <p className="type-body mt-auto px-5 pb-6 pt-6 text-navy sm:px-8 sm:pb-8">{workPage.read}</p>
      </Link>
    </article>
  );
}
