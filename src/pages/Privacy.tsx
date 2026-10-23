import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { privacy } from "../content/privacy";

export default function Privacy() {
  return (
    <>
      <Seo {...privacy.seo} />
      <section className="text-hero bg-navy">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{privacy.kicker}</p>
          <h1 className="type-h1 mt-5 text-white">{privacy.title}</h1>
          <p className="type-lede mt-8 max-w-xl text-white/70">{privacy.lede}</p>
        </div>
      </section>

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-3xl space-y-12 px-6 type-body text-slate">
          {privacy.sections.map((section) => (
            <div key={section.title}>
              <h2 className="type-title text-navy">{section.title}</h2>
              {"items" in section ? (
                <ul className="mt-4 list-disc space-y-2 pl-5">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <span className="text-navy">{item.label}:</span> {item.text}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}

          <p className="border-t border-mist pt-10 type-caption text-slate">
            {privacy.closing}{" "}
            <Link to="/contact" className="text-deep transition-colors hover:text-deep-hover">
              {privacy.closingLink}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
