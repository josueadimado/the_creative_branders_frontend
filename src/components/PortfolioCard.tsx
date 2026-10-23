import { Link } from "react-router-dom";
import type { PortfolioItem } from "../data/portfolio";
import Media from "./Media";

type PortfolioCardProps = {
  item: PortfolioItem;
};

export default function PortfolioCard({ item }: PortfolioCardProps) {
  return (
    <article className="flex flex-col">
      <Link to={`/work#${item.id}`} className="block">
        <Media src={item.image} className="aspect-[4/3]" />
      </Link>
      <div className="flex flex-1 flex-col pt-7">
        <p className="type-caption font-semibold text-blueDark">{item.sector}</p>
        <h3 className="type-title mt-3 text-ink">{item.client}</h3>
        <p className="type-body mt-3 flex-1 text-slate">{item.summary}</p>
        <Link
          to={`/work#${item.id}`}
          className="type-body mt-6 self-start text-blue transition-colors hover:text-blueDark"
        >
          Read the case study
        </Link>
      </div>
    </article>
  );
}
