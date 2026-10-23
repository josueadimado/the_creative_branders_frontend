import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";

const families: Record<string, string> = {
  websites: "Websites",
  "web-applications": "Web Applications",
  "mobile-apps": "Mobile Apps",
  "brand-design": "Brand & Design",
  "automation-ai": "Automation & AI",
  "data-growth": "Data & Growth",
};

type PlaceholderProps = {
  kicker?: string;
  title?: string;
};

// Short stand-in so new menu links open a real page. Later phases replace the words.
export default function Placeholder({ kicker = "", title = "" }: PlaceholderProps) {
  const { slug } = useParams();
  const familyName = slug ? families[slug] : undefined;

  if (slug && !familyName) {
    return <NotFound />;
  }

  const heading = familyName || title;

  return (
    <section className="bg-navy py-32 sm:py-40">
      <div className="mx-auto max-w-6xl px-6">
        {kicker || familyName ? (
          <p className="type-kicker text-signal">{familyName ? "Services" : kicker}</p>
        ) : null}
        <h1 className="type-h1 mt-5 max-w-3xl text-white">{heading}</h1>
        <p className="type-lede mt-8 text-white/70">[This page is being written.]</p>
        <Link to="/contact" className="btn btn-primary mt-12">
          {familyName ? "Get a quote" : "Start a project"}
        </Link>
      </div>
    </section>
  );
}
