import { Link, useParams } from "react-router-dom";
import ArticleBody from "../components/ArticleBody";
import CtaBand from "../components/CtaBand";
import Seo from "../components/Seo";
import { formatInsightDate, getArticle } from "../content/insights";
import NotFound from "./NotFound";

export default function InsightArticle() {
  const { slug } = useParams();
  const article = getArticle(slug);
  if (!article) return <NotFound />;

  return (
    <>
      <Seo
        title={article.title}
        description={article.description}
        path={`/insights/${article.slug}`}
      />
      <article>
        <header className="text-hero bg-navy">
          <div className="mx-auto max-w-3xl px-6">
            <p className="type-kicker text-signal">
              <Link to="/insights" className="hover:text-white">
                Insights
              </Link>
            </p>
            <h1 className="type-h1 mt-5 text-white">{article.title}</h1>
            <p className="type-caption mt-8 flex flex-wrap gap-x-3 text-white/70">
              <span>{article.familyLabel}</span>
              <span>{formatInsightDate(article.date)}</span>
              <span>{article.minutes} min read</span>
            </p>
          </div>
        </header>
        <div className="bg-paper py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <ArticleBody body={article.body} />
          </div>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
