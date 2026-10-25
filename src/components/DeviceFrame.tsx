import type { PortfolioItem } from "../data/portfolio";

type FrameProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  /** Inside a card that already has a border, so this frame does not add a second one. */
  embedded?: boolean;
  /** Case-study pages use a larger phone. Cards keep the smaller one. */
  feature?: boolean;
};

/**
 * A flat browser window. Mist border, no shadow.
 * Screenshots sit inside it so a photo reads as a product, not a poster.
 */
type PlaceholderProps = {
  /** The client name, or a short label such as "Client portal". */
  label: string;
  embedded?: boolean;
  className?: string;
};

/** The three window buttons on a Mac: close, minimise, zoom. */
function MacWindowButtons() {
  return (
    <span className="flex items-center gap-1.5" aria-hidden="true">
      <span className="size-2.5 rounded-full bg-[#FF5F57]" />
      <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
      <span className="size-2.5 rounded-full bg-[#28C840]" />
    </span>
  );
}

/**
 * A browser window with no screenshot yet.
 * Navy panel, faint dot grid, and the name in the heading typeface.
 */
export function BrowserPlaceholder({ label, embedded = false, className = "" }: PlaceholderProps) {
  return (
    <div className={`bg-white ${embedded ? "" : "overflow-hidden rounded-card border border-mist"} ${className}`}>
      <div className="flex items-center border-b border-mist bg-white px-4 py-3">
        <MacWindowButtons />
      </div>
      <div className="dot-grid flex aspect-[16/10] items-center justify-center bg-navy px-8">
        <p className="type-title text-center text-white">{label}</p>
      </div>
    </div>
  );
}

/**
 * The blank laptop photo, with a project screenshot laid over the black screen.
 * The four numbers are the screen's place inside that photo, as percentages.
 * A different laptop picture would need those numbers measured again.
 */
const LAPTOP_SCREEN = { left: "24.02%", top: "18.44%", width: "52.34%", height: "49.44%" };

export function LaptopMockup({
  src,
  alt,
  className = "",
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <img src="/images/mockups/laptop.jpg" alt="" className="block w-full" />
      {src ? (
        <img
          src={src}
          alt={alt}
          className="absolute object-cover object-top"
          style={{ ...LAPTOP_SCREEN, borderRadius: "4.1% / 6.2%" }}
        />
      ) : null}
    </div>
  );
}

export function BrowserFrame({ src, alt, className = "", loading = "lazy", embedded = false }: FrameProps) {
  return (
    <div
      className={`bg-white ${embedded ? "" : "overflow-hidden rounded-card border border-mist"} ${className}`}
    >
      <div className="flex items-center border-b border-mist bg-white px-4 py-3">
        <MacWindowButtons />
      </div>
      {/* object-top keeps the top of a tall screen visible inside the short frame. */}
      <img src={src} alt={alt} loading={loading} className="block aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

/**
 * A flat phone. Mist border, no shadow.
 * Use this when the screenshot is a portrait app screen.
 */
/**
 * A phone with no screenshot yet.
 * Same navy panel and dot grid as the empty browser window.
 */
export function PhonePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[17.5rem] rounded-[2rem] border border-mist bg-white p-2 ${className}`}>
      <div className="dot-grid flex aspect-[9/16] items-center justify-center overflow-hidden rounded-[1.35rem] border border-mist bg-navy px-3">
        <p className="text-center font-display text-sm font-semibold leading-tight text-white">{label}</p>
      </div>
    </div>
  );
}

export function PhoneFrame({ src, alt, className = "", loading = "lazy", feature = false }: FrameProps) {
  const width = feature ? "max-w-[20rem] sm:max-w-md" : "max-w-[17.5rem]";
  return (
    <div className={`mx-auto w-full ${width} rounded-[2rem] border border-mist bg-white p-2 ${className}`}>
      <div className="overflow-hidden rounded-[1.35rem] border border-mist">
        <img src={src} alt={alt} loading={loading} className="block aspect-[9/16] w-full object-cover object-top" />
      </div>
    </div>
  );
}

type WorkFrameProps = {
  src: string;
  alt: string;
  device?: PortfolioItem["device"];
  loading?: "lazy" | "eager";
  embedded?: boolean;
  feature?: boolean;
  className?: string;
};

/** Picks the browser or the phone from the study. Wide stand-in photos use the browser. */
export default function WorkFrame({ src, alt, device = "browser", loading, embedded, feature, className }: WorkFrameProps) {
  if (device === "phone") {
    return <PhoneFrame src={src} alt={alt} loading={loading} feature={feature} className={className} />;
  }
  return <BrowserFrame src={src} alt={alt} loading={loading} embedded={embedded} className={className} />;
}
