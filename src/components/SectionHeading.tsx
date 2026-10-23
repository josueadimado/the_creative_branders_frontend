type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lede?: string;
  // Dark headings sit on paper sections; light headings sit on navy.
  tone?: "dark" | "light";
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "mx-auto text-center" : "text-left";
  const titleColor = tone === "light" ? "text-white" : "text-navy";
  const ledeColor = tone === "light" ? "text-white/70" : "text-slate";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        <p className={`type-kicker mb-4 ${tone === "light" ? "text-signal" : "text-deep"}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`type-display ${titleColor}`}>{title}</h2>
      {lede ? <p className={`type-lede mt-6 ${ledeColor}`}>{lede}</p> : null}
    </div>
  );
}
