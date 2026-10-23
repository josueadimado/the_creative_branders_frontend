import CtaBand from "../components/CtaBand";
import Illustration from "../components/Illustration";
import Media from "../components/Media";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";

const differences = [
  {
    title: "Rooted in Africa",
    body: "We build for African SMEs and diaspora founders first. The constraints are real: access, infrastructure, trust. The standard is not lowered to match them.",
    drawing: "africa" as const,
  },
  {
    title: "Built to global standard",
    body: "The work has to hold next to anything shipped in London, Toronto, or Nairobi. Craft is not a luxury add-on.",
    drawing: "design" as const,
  },
  {
    title: "Full scope, one team",
    body: "Brand, systems, and intelligence stay in one studio. No hand-off where the story falls apart.",
    drawing: "team" as const,
  },
];

const values = ["Intelligence", "Clarity", "Impact"];

export default function About() {
  return (
    <>
      <PageHero
        image="/images/about-studio.jpg"
        kicker="About"
        title="We started TCB to prove something."
        lede="That African businesses and diaspora-founded companies deserve a studio. Not a freelancer piecing together nights, and not an agency that treats the work as a campaign. A place that holds brand, systems, and intelligence as one brief."
      />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Origin"
            title="A studio, on purpose."
            lede="TCB exists because too much of the market is either too thin or too loud. We wanted a third option: a small team, a full stack, and a voice that does not need a founder’s name on the door. The conviction is institutional. We, not I."
          />
          <div className="mt-20">
            <Media src="/images/about-studio.jpg" className="aspect-[21/9]" />
            <div className="mt-12 max-w-3xl">
              <p className="type-display text-navy">
                Mission: make growth intelligent. How a business looks, how it runs, and how it
                knows.
              </p>
              <p className="type-lede mt-8 text-slate">
                Vision: a generation of African and diaspora businesses that scale with clarity, not
                chaos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Difference" title="What makes TCB different" />
          <div className="mt-20 grid gap-12 border-t border-mist pt-16 md:grid-cols-3 md:gap-0">
            {differences.map((item) => (
              <article key={item.title} className="md:border-r md:border-mist md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                <Illustration name={item.drawing} className="h-32 w-full" />
                <h3 className="type-title mt-6 text-navy">{item.title}</h3>
                <p className="type-body mt-4 text-slate">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">Values</p>
          <div className="mt-10 flex flex-wrap gap-x-16 gap-y-4">
            {values.map((value) => (
              <p key={value} className="type-display text-white">
                {value}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-deep">Partners</p>
          <div className="mt-10 flex flex-wrap gap-x-16 gap-y-4 text-navy">
            <p className="type-title">COME</p>
            <p className="type-title">Elevate Tribe</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
