type Logo = {
  name: string;
  logo: string;
};

/**
 * The sliding row of client logos.
 * Two copies sit side by side so the row can move without a gap.
 */
export default function LogoRow({ logos, label }: { logos: readonly Logo[]; label: string }) {
  return (
    <section className="overflow-hidden border-y border-mist bg-white py-16" aria-label={label}>
      <h2 className="type-display px-6 text-center text-navy">{label}</h2>
      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]">
        <div className="logo-marquee flex w-max">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center gap-20 pr-20" aria-hidden={copy === 1}>
              {logos.map((item) => (
                <li key={`${copy}-${item.name}`} className="flex h-16 items-center">
                  <img
                    src={item.logo}
                    alt={copy === 0 ? item.name : ""}
                    className="h-14 w-auto max-w-none object-contain"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
