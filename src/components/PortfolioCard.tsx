import { Link } from "react-router-dom";
import { coverImage, displayName, visibleText, type PortfolioItem } from "../data/portfolio";
import { track } from "../lib/analytics";
import Media from "./Media";

type PortfolioCardProps = {
  item: PortfolioItem;
};

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const image = coverImage(item);
  const name = displayName(item);
  const sector = visibleText(item.sector);
  const summary = visibleText(item.summary);

  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-mist bg-white">
      {image ? (
        <Link
          to={`/work#${item.slug}`}
          className="block"
          onClick={() => track("case_study_view", { case_study: item.slug })}
        >
          <Media src={image} alt={name} className="aspect-[4/3] rounded-none" />
        </Link>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        {sector ? <p className="tag self-start">{sector}</p> : null}
        <h3 className="type-title mt-3 text-navy">{name}</h3>
        {summary ? <p className="type-body mt-3 flex-1 text-slate">{summary}</p> : null}
        <Link
          to={`/work#${item.slug}`}
          className="type-body mt-6 self-start text-deep transition-colors hover:text-deep-hover"
          onClick={() => track("case_study_view", { case_study: item.slug })}
        >
          Read the case study
        </Link>
      </div>
    </article>
  );
}
