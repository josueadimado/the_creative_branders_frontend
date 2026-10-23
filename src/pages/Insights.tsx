import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { insights } from "../content/insights";

export default function Insights() {
  return (
    <>
      <Seo {...insights.seo} />
      <section className="bg-navy py-32 sm:py-40">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{insights.kicker}</p>
          <h1 className="type-h1 mt-5 max-w-3xl text-white">{insights.title}</h1>
          <p className="type-lede mt-8 text-white/70">{insights.lede}</p>
          <Link to="/contact" className="btn btn-primary mt-12">
            {insights.button}
          </Link>
        </div>
      </section>
    </>
  );
}
