type PricingTierProps = {
  name: string;
  range: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  note?: string;
};

export default function PricingTier({
  name,
  range,
  description,
  features,
  highlighted = false,
  note,
}: PricingTierProps) {
  return (
    <article
      className={
        highlighted
          ? "flex flex-col bg-navy p-10 text-white sm:p-12"
          : "flex flex-col bg-paper p-10 text-navy sm:p-12"
      }
    >
      {highlighted ? <p className="type-kicker mb-6 text-gold">Most chosen</p> : null}
      <h3 className="type-title">{name}</h3>
      <p className={`type-display mt-3 ${highlighted ? "text-white" : "text-navy"}`}>{range}</p>
      <p className={`type-body mt-5 ${highlighted ? "text-white/70" : "text-slate"}`}>{description}</p>
      <ul className="mt-10 flex-1 space-y-3.5 type-body">
        {features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span className={highlighted ? "text-signal" : "text-deep"} aria-hidden>
              –
            </span>
            <span className={highlighted ? "text-white/90" : "text-slate"}>{feature}</span>
          </li>
        ))}
      </ul>
      {note ? (
        <p className={`type-caption mt-8 ${highlighted ? "text-white/70" : "text-slate"}`}>{note}</p>
      ) : null}
    </article>
  );
}
