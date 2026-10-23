import { Link, useLocation, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import { placeholder, serviceFamilies } from "../content/placeholder";
import NotFound from "./NotFound";

type PlaceholderProps = {
  kicker?: string;
  title?: string;
};

export default function Placeholder({ kicker = "", title = "" }: PlaceholderProps) {
  const { slug } = useParams();
  const { pathname } = useLocation();
  const familyName = slug ? serviceFamilies[slug] : undefined;

  if (slug && !familyName) {
    return <NotFound />;
  }

  const heading = familyName || title;

  return (
    <section className="bg-navy py-32 sm:py-40">
      <Seo title={heading} description={placeholder.lede} path={pathname} />
      <div className="mx-auto max-w-6xl px-6">
        {kicker || familyName ? (
          <p className="type-kicker text-signal">{familyName ? "Services" : kicker}</p>
        ) : null}
        <h1 className="type-h1 mt-5 max-w-3xl text-white">{heading}</h1>
        <p className="type-lede mt-8 text-white/70">{placeholder.lede}</p>
        <Link to="/contact" className="btn btn-primary mt-12">
          {familyName ? placeholder.serviceButton : placeholder.pageButton}
        </Link>
      </div>
    </section>
  );
}
