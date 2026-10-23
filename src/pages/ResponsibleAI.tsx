import Seo from "../components/Seo";
import { responsibleAi } from "../content/responsibleAi";
import { studioEmail } from "../data/socials";

export default function ResponsibleAI() {
  return (
    <>
      <Seo {...responsibleAi.seo} />
      <section className="bg-navy py-32 sm:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{responsibleAi.kicker}</p>
          <h1 className="type-h1 mt-5 text-white">{responsibleAi.title}</h1>
        </div>
      </section>
      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-3xl space-y-6 px-6 type-body text-slate">
          {responsibleAi.paragraphs.map((paragraph) => (
            <p key={paragraph}>
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
      </section>
    </>
  );
}
