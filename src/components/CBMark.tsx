type CBMarkProps = {
  size?: number;
  variant?: "dark" | "light";
  className?: string;
};

function polar(cx: number, cy: number, radius: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy - radius * Math.sin(rad),
  };
}

function getMarkGeometry(r = 100, sw = r * 0.24) {
  const cx = 0;
  const cy = 0;

  // C — open arc, 50° to 310°, gap faces right (3 o'clock), SAME center as B
  const cStart = polar(cx, cy, r, 50);
  const cEnd = polar(cx, cy, r, 310);

  // B shares the same (cx, cy) — stem sits just right of center, bowls
  // reach outward past the C's own radius, emerging through its gap.
  const stemWidth = sw * 0.9;
  const stemX = cx + r * 0.18;
  const stemTop = cy - r * 0.95;
  const stemBottom = cy + r * 0.95;

  const stemRect = {
    x: stemX - stemWidth / 2,
    y: stemTop,
    width: stemWidth,
    height: stemBottom - stemTop,
    rx: stemWidth / 2,
  };

  const topReach = stemX + r * 1.1;
  const bottomReach = stemX + r * 1.18;

  const topBowl = {
    d: `M ${stemX} ${stemTop} C ${topReach} ${stemTop}, ${topReach} ${cy}, ${stemX} ${cy}`,
  };
  const bottomBowl = {
    d: `M ${stemX} ${cy} C ${bottomReach} ${cy}, ${bottomReach} ${stemBottom}, ${stemX} ${stemBottom}`,
  };

  const node = { cx: stemX, cy, r: sw * 0.72 };

  // Bounding box covers the full C circle AND the B's rightward reach.
  const pad = sw * 0.65;
  const minX = cx - r - sw / 2 - pad;
  const maxX = bottomReach + sw / 2 + pad;
  const minY = cy - r - sw / 2 - pad;
  const maxY = cy + r + sw / 2 + pad;

  return {
    r,
    sw,
    cStart,
    cEnd,
    stemRect,
    topBowl,
    bottomBowl,
    node,
    viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
  };
}

export default function CBMark({
  size = 48,
  variant = "dark",
  className,
}: CBMarkProps) {
  const g = getMarkGeometry();
  const stroke = variant === "dark" ? "#FFFFFF" : "#0E1E2B";
  const nodeFill = "#E8E154";

  return (
    <svg
      width={size}
      height={size}
      viewBox={g.viewBox}
      className={className}
      role="img"
      aria-label="The Creative Branders"
    >
      <title>The Creative Branders</title>
      <path
        d={`M ${g.cStart.x} ${g.cStart.y} A ${g.r} ${g.r} 0 1 0 ${g.cEnd.x} ${g.cEnd.y}`}
        fill="none"
        stroke={stroke}
        strokeWidth={g.sw}
        strokeLinecap="round"
      />
      <rect
        x={g.stemRect.x}
        y={g.stemRect.y}
        width={g.stemRect.width}
        height={g.stemRect.height}
        rx={g.stemRect.rx}
        fill={stroke}
      />
      <path
        d={g.topBowl.d}
        fill="none"
        stroke={stroke}
        strokeWidth={g.sw}
        strokeLinecap="round"
      />
      <path
        d={g.bottomBowl.d}
        fill="none"
        stroke={stroke}
        strokeWidth={g.sw}
        strokeLinecap="round"
      />
      <circle cx={g.node.cx} cy={g.node.cy} r={g.node.r} fill={nodeFill} />
    </svg>
  );
}
