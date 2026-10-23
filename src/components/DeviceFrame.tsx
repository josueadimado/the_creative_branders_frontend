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

/**
 * A browser window with no screenshot yet.
 * Navy panel, faint dot grid, and the name in the heading typeface.
 */
export function BrowserPlaceholder({ label, embedded = false, className = "" }: PlaceholderProps) {
  return (
    <div className={`bg-white ${embedded ? "" : "overflow-hidden rounded-card border border-mist"} ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-mist bg-white px-4 py-3" aria-hidden="true">
        <span className="h-2 w-2 rounded-full border border-mist bg-paper" />
        <span className="h-2 w-2 rounded-full border border-mist bg-paper" />
        <span className="h-2 w-2 rounded-full border border-mist bg-paper" />
      </div>
      <div className="dot-grid flex aspect-[16/10] items-center justify-center bg-navy px-8">
        <p className="type-title text-center text-white">{label}</p>
      </div>
    </div>
  );
}

export function BrowserFrame({ src, alt, className = "", loading = "lazy", embedded = false }: FrameProps) {
  return (
    <div
      className={`bg-white ${embedded ? "" : "overflow-hidden rounded-card border border-mist"} ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-mist bg-white px-4 py-3" aria-hidden="true">
        <span className="h-2 w-2 rounded-full border border-mist bg-paper" />
        <span className="h-2 w-2 rounded-full border border-mist bg-paper" />
        <span className="h-2 w-2 rounded-full border border-mist bg-paper" />
      </div>
      <img src={src} alt={alt} loading={loading} className="block aspect-[16/10] w-full object-cover" />
    </div>
  );
}

/**
 * A flat phone. Mist border, no shadow.
 * Use this when the screenshot is a portrait app screen.
 */
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
