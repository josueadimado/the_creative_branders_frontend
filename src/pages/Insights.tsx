import { Link } from "react-router-dom";
import Seo from "../components/Seo";

// The articles themselves arrive in a later phase. The menu needs a real page now.
export default function Insights() {
  return (
    <>
      <Seo
        title="Insights"
        description="Notes from the studio. Articles are on the way."
        path="/insights"
      />
      <section className="bg-navy py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <p className="type-kicker text-signal">Insights</p>
        <h1 className="type-h1 mt-5 max-w-3xl text-white">Notes from the studio.</h1>
        <p className="type-lede mt-8 text-white/70">[Articles are on the way.]</p>
        <Link to="/contact" className="btn btn-primary mt-12">
          Start a project
        </Link>
      </div>
    </section>
    </>
  );
}
