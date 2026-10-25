// Official horizontal logo. The SVG already includes the wordmark,
// so pages should not type "CREATIVE BRANDERS" next to it.
// dark = for navy. light = for white or paper.
const RATIO = 591 / 150;

type LogoVariant = "dark" | "light" | "white" | "black";

export default function Logo({
  variant = "dark",
  size = "default",
}: {
  variant?: LogoVariant;
  /** The footer uses a taller mark. Everywhere else stays the header size. */
  size?: "default" | "large";
}) {
  // Width follows the file so the mark is never stretched.
  const desktopHeight = size === "large" ? 56 : 40;
  const mobileHeight = size === "large" ? 48 : 34;
  const desktopWidth = Math.round(desktopHeight * RATIO);
  const mobileWidth = Math.round(mobileHeight * RATIO);

  return (
    <span className="inline-flex items-center">
      <img
        src={`/brand/tcb-horizontal-${variant}.svg`}
        alt="The Creative Branders"
        width={desktopWidth}
        height={desktopHeight}
        className={
          size === "large"
            ? "hidden h-12 w-auto min-[360px]:block sm:h-14"
            : "hidden h-[34px] w-auto min-[360px]:block sm:h-10"
        }
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
