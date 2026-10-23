type TextHeroProps = {
  kicker: string;
  title: string;
  lede?: string;
};

/**
 * A page opener with no photograph.
 * Navy background, and the same faint dot grid used in the footer.
 */
export default function TextHero({ kicker, title, lede }: TextHeroProps) {
  return (
    <section className="dot-grid text-hero bg-navy">
      <div className="mx-auto max-w-6xl px-6">
        <p className="type-kicker text-signal">{kicker}</p>
        <h1 className="type-h1 mt-5 max-w-4xl text-white">{title}</h1>
        {lede ? <p className="type-lede mt-8 max-w-xl text-white/70">{lede}</p> : null}
      </div>
    </section>
  );
}
