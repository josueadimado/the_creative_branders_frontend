type IllustrationName =
  | "pillars"
  | "discover"
  | "design"
  | "build"
  | "grow"
  | "africa"
  | "team"
  | "crm"
  | "academy";

type IllustrationProps = {
  name: IllustrationName;
  className?: string;
};

const navy = "#0E1E2B";
const signal = "#4AA3C6";
const deep = "#1F6E8C";
const paper = "#F5F6F3";

/**
 * Simple brand drawings, made with code (not generated images).
 * Navy and signal blue. Gold stays out of these drawings.
 */
export default function Illustration({ name, className = "" }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 160 120"
      className={className}
      role="img"
      aria-hidden="true"
    >
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
      <rect x="22" y="28" width="32" height="64" rx="8" fill={navy} />
      <rect x="64" y="40" width="32" height="52" rx="8" fill={signal} />
      <rect x="106" y="22" width="32" height="70" rx="8" fill={deep} />
      <circle cx="80" cy="28" r="6" fill={signal} />
    </g>
  );
}

function Discover() {
  return (
    <g>
      <circle cx="80" cy="52" r="28" fill="none" stroke={navy} strokeWidth="4" />
      <circle cx="80" cy="52" r="8" fill={signal} />
      <line x1="100" y1="72" x2="122" y2="94" stroke={navy} strokeWidth="6" strokeLinecap="round" />
    </g>
  );
}

function Design() {
  return (
    <g>
      <rect x="30" y="28" width="72" height="52" rx="8" fill="none" stroke={navy} strokeWidth="3" />
      <rect x="52" y="44" width="72" height="52" rx="8" fill={signal} opacity="0.35" />
      <rect x="58" y="50" width="28" height="18" rx="4" fill={navy} />
      <rect x="92" y="50" width="22" height="18" rx="4" fill={deep} />
    </g>
  );
}

function Build() {
  return (
    <g>
      <rect x="28" y="36" width="36" height="24" rx="8" fill={navy} />
      <rect x="96" y="36" width="36" height="24" rx="8" fill={deep} />
      <rect x="62" y="70" width="36" height="24" rx="8" fill={signal} />
      <line x1="64" y1="48" x2="96" y2="48" stroke={navy} strokeWidth="3" />
      <line x1="80" y1="60" x2="80" y2="70" stroke={navy} strokeWidth="3" />
      <circle cx="80" cy="48" r="4" fill={signal} />
    </g>
  );
}

function Grow() {
  return (
    <g>
      <path d="M28 88 C52 88 58 40 80 40 C102 40 108 88 132 88" fill="none" stroke={signal} strokeWidth="4" />
      <circle cx="80" cy="40" r="7" fill={navy} />
      <rect x="36" y="78" width="10" height="18" rx="3" fill={navy} />
      <rect x="54" y="66" width="10" height="30" rx="3" fill={deep} />
      <rect x="72" y="52" width="10" height="44" rx="3" fill={signal} />
      <rect x="90" y="44" width="10" height="52" rx="3" fill={navy} />
    </g>
  );
}

function Africa() {
  return (
    <g>
      <circle cx="78" cy="58" r="34" fill="none" stroke={navy} strokeWidth="3" />
      <circle cx="62" cy="50" r="5" fill={signal} />
      <circle cx="88" cy="44" r="4" fill={deep} />
      <circle cx="94" cy="68" r="5" fill={navy} />
      <circle cx="70" cy="74" r="4" fill={signal} />
      <line x1="62" y1="50" x2="88" y2="44" stroke={signal} strokeWidth="2" />
      <line x1="88" y1="44" x2="94" y2="68" stroke={signal} strokeWidth="2" />
      <line x1="94" y1="68" x2="70" y2="74" stroke={signal} strokeWidth="2" />
      <line x1="70" y1="74" x2="62" y2="50" stroke={signal} strokeWidth="2" />
    </g>
  );
}

function Team() {
  return (
    <g>
      <circle cx="56" cy="42" r="12" fill={navy} />
      <rect x="38" y="58" width="36" height="28" rx="14" fill={navy} />
      <circle cx="80" cy="40" r="12" fill={signal} />
      <rect x="62" y="56" width="36" height="28" rx="14" fill={signal} />
      <circle cx="104" cy="42" r="12" fill={deep} />
      <rect x="86" y="58" width="36" height="28" rx="14" fill={deep} />
    </g>
  );
}

function Crm() {
  return (
    <g>
      <rect x="22" y="30" width="34" height="60" rx="8" fill={navy} />
      <rect x="63" y="30" width="34" height="60" rx="8" fill={signal} />
      <rect x="104" y="30" width="34" height="60" rx="8" fill={deep} />
      <circle cx="39" cy="48" r="6" fill={paper} />
      <circle cx="80" cy="48" r="6" fill={paper} />
      <circle cx="121" cy="48" r="6" fill={paper} />
    </g>
  );
}

function Academy() {
  return (
    <g>
      <rect x="40" y="70" width="80" height="10" rx="4" fill={navy} />
      <path d="M48 70 L80 28 L112 70 Z" fill={signal} />
      <rect x="74" y="48" width="12" height="22" fill={navy} />
    </g>
  );
}
