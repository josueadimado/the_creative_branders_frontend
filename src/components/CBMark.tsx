// Bold CB monogram: C = arc, B = stem + two bowls, one accent dot at the centre.
// The blue dot is the only accent. Do not recolour it.
const COLORS = {
  dark: { mark: "#F5F6F3", dot: "#4AA3C6" }, // on navy
  light: { mark: "#0E1E2B", dot: "#4AA3C6" }, // on white / paper
  mono: { mark: "currentColor", dot: "currentColor" },
};

export default function CBMark({
  variant = "dark",
  size = 40,
  title = "The Creative Branders",
}: {
  variant?: keyof typeof COLORS;
  size?: number;
  title?: string;
}) {
  const k = COLORS[variant];
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} role="img" aria-label={title}>
      <g fill="none" stroke={k.mark} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round">
        <path d="M66 14.39 A46 46 0 1 0 66 105.61" />
        <path d="M66 14.39 V105.61 M66 14.39 H80 A21.3 21.3 0 0 1 80 57 H66 M66 57 H82 A24.3 24.3 0 0 1 82 105.61 H66" />
      </g>
      <circle cx="66" cy="57" r="13" fill={k.dot} />
    </svg>
  );
}
