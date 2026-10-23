import type { PortfolioItem } from "../data/portfolio";

type FrameProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  /** Inside a card that already has a border, so this frame does not add a second one. */
  embedded?: boolean;
};

/**
 * A flat browser window. Mist border, no shadow.
 * Screenshots sit inside it so a photo reads as a product, not a poster.
 */
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
export function PhoneFrame({ src, alt, className = "", loading = "lazy" }: FrameProps) {
  return (
    <div className={`mx-auto w-full max-w-[17.5rem] rounded-[2rem] border border-mist bg-white p-2 ${className}`}>
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
  className?: string;
};

/** Picks the browser or the phone from the study. Wide stand-in photos use the browser. */
export default function WorkFrame({ src, alt, device = "browser", loading, embedded, className }: WorkFrameProps) {
  if (device === "phone") {
    return <PhoneFrame src={src} alt={alt} loading={loading} className={className} />;
  }
  return <BrowserFrame src={src} alt={alt} loading={loading} embedded={embedded} className={className} />;
}
