export const illustrationNames = [
  "pillars",
  "discover",
  "design",
  "build",
  "grow",
  "africa",
  "team",
  "crm",
  "academy",
] as const;

export type IllustrationName = (typeof illustrationNames)[number];

type IllustrationProps = {
  name: IllustrationName;
  className?: string;
};

const navy = "#0E1E2B";
const signal = "#4AA3C6";

// One stroke for every drawing: thin, round ends, navy only.
const line = {
  fill: "none",
  stroke: navy,
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// The single Signal Blue mark allowed in each drawing.
function Accent({ cx, cy }: { cx: number; cy: number }) {
  return <circle cx={cx} cy={cy} r={3.5} fill={signal} />;
}

/**
 * Line drawings for the brand. Navy outlines, one blue dot each.
 * No fills, no gradients, and no people.
 */
export default function Illustration({ name, className = "" }: IllustrationProps) {
  return (
    <svg viewBox="0 0 160 120" className={className} role="img" aria-hidden="true">
      <rect width="160" height="120" fill="none" />
      {name === "pillars" ? <Pillars /> : null}
      {name === "discover" ? <Discover /> : null}
      {name === "design" ? <Design /> : null}
      {name === "build" ? <Build /> : null}
      {name === "grow" ? <Grow /> : null}
      {name === "africa" ? <Africa /> : null}
      {name === "team" ? <Team /> : null}
      {name === "crm" ? <Crm /> : null}
      {name === "academy" ? <Academy /> : null}
    </svg>
  );
}

function Pillars() {
  return (
    <g>
      <rect x="28" y="52" width="28" height="48" rx="2" {...line} />
      <rect x="66" y="34" width="28" height="66" rx="2" {...line} />
      <rect x="104" y="22" width="28" height="78" rx="2" {...line} />
      <Accent cx={118} cy={14} />
    </g>
  );
}

function Discover() {
  return (
    <g>
      <circle cx="68" cy="52" r="26" {...line} />
      <line x1="88" y1="72" x2="122" y2="104" {...line} />
      <Accent cx={68} cy={52} />
    </g>
  );
}

function Design() {
  return (
    <g>
      <rect x="22" y="24" width="84" height="58" rx="8" {...line} />
      <rect x="54" y="42" width="84" height="54" rx="8" {...line} />
      <Accent cx={126} cy={34} />
    </g>
  );
}

function Build() {
  return (
    <g>
      <circle cx="36" cy="40" r="12" {...line} />
      <circle cx="124" cy="40" r="12" {...line} />
      <circle cx="80" cy="88" r="12" {...line} />
      <line x1="48" y1="40" x2="112" y2="40" {...line} />
      <line x1="80" y1="40" x2="80" y2="76" {...line} />
      <Accent cx={80} cy={40} />
    </g>
  );
}

function Grow() {
  return (
    <g>
      <line x1="24" y1="96" x2="140" y2="96" {...line} />
      <polyline points="32,82 58,70 84,52 110,36 132,24" {...line} />
      <Accent cx={132} cy={24} />
    </g>
  );
}

function Africa() {
  return (
    <g>
      <circle cx="80" cy="60" r="36" {...line} />
      <ellipse cx="80" cy="60" rx="16" ry="36" {...line} />
      <line x1="44" y1="60" x2="116" y2="60" {...line} />
      <Accent cx={98} cy={46} />
    </g>
  );
}

function Team() {
  return (
    <g>
      <circle cx="36" cy="64" r="16" {...line} />
      <circle cx="80" cy="46" r="16" {...line} />
      <circle cx="124" cy="64" r="16" {...line} />
      <line x1="50" y1="58" x2="66" y2="52" {...line} />
      <line x1="94" y1="52" x2="110" y2="58" {...line} />
      <Accent cx={80} cy={46} />
    </g>
  );
}

function Crm() {
  return (
    <g>
      <rect x="16" y="28" width="38" height="68" rx="6" {...line} />
      <rect x="61" y="28" width="38" height="68" rx="6" {...line} />
      <rect x="106" y="28" width="38" height="68" rx="6" {...line} />
      <line x1="26" y1="46" x2="44" y2="46" {...line} />
      <line x1="71" y1="46" x2="89" y2="46" {...line} />
      <line x1="116" y1="46" x2="134" y2="46" {...line} />
      <Accent cx={80} cy={18} />
    </g>
  );
}

function Academy() {
  return (
    <g>
      <path d="M80 34 L34 54 V96 L80 76 Z" {...line} />
      <path d="M80 34 L126 54 V96 L80 76 Z" {...line} />
      <line x1="80" y1="34" x2="80" y2="76" {...line} />
      <Accent cx={80} cy={24} />
    </g>
  );
}
