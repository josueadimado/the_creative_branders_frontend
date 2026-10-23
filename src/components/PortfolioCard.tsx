import { Link } from "react-router-dom";
import type { PortfolioItem } from "../data/portfolio";
import { track } from "../lib/analytics";
import Media from "./Media";

type PortfolioCardProps = {
  item: PortfolioItem;
};

export default function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-mist bg-white">
      <Link
        to={`/work#${item.id}`}
        className="block"
        onClick={() => track("case_study_view", { case_study: item.id })}
      >
        <Media src={item.image} className="aspect-[4/3] rounded-none" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <p className="tag self-start">{item.sector}</p>
        <h3 className="type-title mt-3 text-navy">{item.client}</h3>
        <p className="type-body mt-3 flex-1 text-slate">{item.summary}</p>
        <Link
          to={`/work#${item.id}`}
          className="type-body mt-6 self-start text-deep transition-colors hover:text-deep-hover"
          onClick={() => track("case_study_view", { case_study: item.id })}
        >
          Read the case study
        </Link>
      </div>
    </article>
  );
}
