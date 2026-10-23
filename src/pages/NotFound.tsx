import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";
import { notFound } from "../content/notFound";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="flex min-h-[70svh] items-center bg-navy py-32 sm:py-44">
      <Seo title={notFound.seo.title} description={notFound.seo.description} path={pathname} />
      <div className="mx-auto max-w-6xl px-6">
        <p className="type-kicker text-signal">{notFound.kicker}</p>
        <h1 className="type-h1 mt-5 text-white">{notFound.title}</h1>
        <p className="type-lede mt-8 max-w-xl text-white/70">{notFound.lede}</p>
        <div className="mt-14">
          <Link to="/" className="btn btn-primary">
            {notFound.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
