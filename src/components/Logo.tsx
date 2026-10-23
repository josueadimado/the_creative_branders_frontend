// Official horizontal logo. The SVG already includes the wordmark,
// so pages should not type "CREATIVE BRANDERS" next to it.
// dark = for navy. light = for white or paper.
const RATIO = 591 / 150;

type LogoVariant = "dark" | "light" | "white" | "black";

export default function Logo({ variant = "dark" }: { variant?: LogoVariant }) {
  // 40px tall on desktop, 34px on smaller screens. Width follows the file
  // so the mark is never stretched. Both stay wider than the 120px minimum.
  const desktopWidth = Math.round(40 * RATIO);
  const mobileWidth = Math.round(34 * RATIO);

  return (
    <span className="inline-flex items-center">
      <img
        src={`/brand/tcb-horizontal-${variant}.svg`}
        alt="The Creative Branders"
        width={desktopWidth}
        height={40}
        className="hidden h-[34px] w-auto min-[360px]:block sm:h-10"
        style={{ minWidth: mobileWidth }}
      />
      <img
        src={`/brand/tcb-monogram-${variant}.svg`}
        alt="The Creative Branders"
        width={34}
        height={34}
        className="block h-[34px] w-[34px] min-[360px]:hidden"
      />
    </span>
  );
}
