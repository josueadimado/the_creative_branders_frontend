import { Link } from "react-router-dom";
import { coverImage, displayName, studyTags, visibleText, type PortfolioItem } from "../data/portfolio";
import { workPage } from "../content/work";
import { track } from "../lib/analytics";
import Media from "./Media";

type PortfolioCardProps = {
  item: PortfolioItem;
};

export default function PortfolioCard({ item }: PortfolioCardProps) {
  const image = coverImage(item);
  const name = displayName(item);
  const summary = visibleText(item.summary);
  const tags = studyTags(item);
  const href = `/work/${item.slug}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-mist bg-white">
      <Link
        to={href}
        className="flex flex-1 flex-col"
        onClick={() => track("case_study_view", { case_study: item.slug })}
      >
        {image ? <Media src={image} alt={name} className="aspect-[4/3] rounded-none" /> : null}
        <div className="flex flex-1 flex-col p-6">
          <h3 className="type-title text-navy">{name}</h3>
          {summary ? <p className="type-body mt-3 flex-1 text-slate">{summary}</p> : null}
          {tags.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
          <span className="type-body mt-6 self-start text-deep">{workPage.read}</span>
        </div>
      </Link>
    </article>
  );
}
