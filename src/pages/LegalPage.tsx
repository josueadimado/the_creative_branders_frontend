import Seo from "../components/Seo";
import { studioEmail } from "../data/socials";

type Section = {
  title: string;
  paragraphs: readonly string[];
};

type LegalPageProps = {
  seo: { title: string; description: string; path: string };
  kicker: string;
  title: string;
  lede: string;
  sections: readonly Section[];
};

/** Shared layout for the short legal pages. */
export default function LegalPage({ seo, kicker, title, lede, sections }: LegalPageProps) {
  return (
    <>
      <Seo {...seo} />
      <section className="text-hero bg-navy">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{kicker}</p>
          <h1 className="type-h1 mt-5 text-white">{title}</h1>
          <p className="type-lede mt-8 max-w-xl text-white/70">{lede}</p>
        </div>
      </section>
      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-3xl space-y-12 px-6">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="type-title text-navy">{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="type-body mt-4 text-slate">
                  {paragraph.includes(studioEmail) ? (
                    <>
                      {paragraph.split(studioEmail)[0]}
                      <a href={`mailto:${studioEmail}`} className="text-deep hover:text-deep-hover">
                        {studioEmail}
                      </a>
                      {paragraph.split(studioEmail)[1]}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
