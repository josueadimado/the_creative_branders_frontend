import { Link, useLocation } from "react-router-dom";
import Seo from "../components/Seo";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <section className="flex min-h-[70svh] items-center bg-navy py-32 sm:py-44">
      <Seo
        title="Page not found"
        description="The link may be old, or the address may be mistyped."
        path={pathname}
      />
      <div className="mx-auto max-w-6xl px-6">
        <p className="type-kicker text-signal">404</p>
        <h1 className="type-h1 mt-5 text-white">This page doesn't exist.</h1>
        <p className="type-lede mt-8 max-w-xl text-white/70">
          The link may be old, or the address may be mistyped. Head back to the studio home.
        </p>
        <div className="mt-14">
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
