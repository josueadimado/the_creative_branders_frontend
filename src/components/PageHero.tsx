type PageHeroProps = {
  image: string;
  kicker: string;
  title: string;
  lede: string;
};

/**
 * Interior page opener: a full-width photograph with type sitting on the left.
 * The gradient is heavier on the left so the words stay readable, and lighter
 * on the right so the photo still feels like the luxury of the page.
 */
export default function PageHero({ image, kicker, title, lede }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-navy">
      <img src={image} alt="" className="photo absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-[rgb(14_30_43/0.70)] to-[rgb(14_30_43/0.20)]" />
      <div className="relative mx-auto max-w-6xl px-6 py-32 sm:py-44">
        <p className="type-kicker text-signal">{kicker}</p>
        <h1 className="type-h1 mt-5 max-w-4xl text-white">{title}</h1>
        <p className="type-lede mt-8 max-w-xl text-white/70">{lede}</p>
      </div>
    </section>
  );
}
