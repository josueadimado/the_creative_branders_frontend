import { useState, type CSSProperties } from "react";

type OptimizedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** eager for the first picture on the page. Everything else waits until it is near the screen. */
  loading?: "lazy" | "eager";
  className?: string;
  draggable?: boolean;
  /** Used when a photo is placed over another picture, such as a laptop screen. */
  style?: CSSProperties;
  /** True for a photo that is only decoration. The name then stays empty. */
  decorative?: boolean;
};

/** Swap the file ending, so a photo can offer a smaller copy beside the original. */
function withEnding(src: string, ending: string) {
  return src.replace(/\.(png|jpe?g|webp)$/i, ending);
}

/**
 * Offers the smallest copy the browser understands: AVIF, then WebP, then the original.
 * Width and height are the real pixel size, so the page does not jump when the photo arrives.
 * If a modern format 404s (missing on the server), we fall back to the original file.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  className,
  draggable,
  style,
  decorative = false,
}: OptimizedImageProps) {
  const [useOriginalOnly, setUseOriginalOnly] = useState(false);
  const avif = withEnding(src, ".avif");
  const webp = withEnding(src, ".webp");
  // A phone does not need the full-size photo. The smaller copy is used when the slot is wide in the file.
  const wide = (width ?? 0) > 700;
  const smallAvif = avif.replace(/\.avif$/, "-640.avif");
  const image = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={loading === "lazy" ? "async" : "auto"}
      // The first picture is part of the opening view, so the browser fetches it first.
      fetchPriority={loading === "eager" ? "high" : "low"}
      className={className}
      draggable={draggable}
      style={style}
      aria-hidden={decorative ? true : undefined}
      onError={() => setUseOriginalOnly(true)}
    />
  );

  // Drawings and logos that are already SVG stay as they are.
  if (avif === src || useOriginalOnly) return image;

  return (
    <picture>
      {avif !== src ? (
        <source
          srcSet={wide ? `${smallAvif} 640w, ${avif} 1280w` : avif}
          sizes={wide ? "(max-width: 768px) 100vw, 720px" : undefined}
          type="image/avif"
        />
      ) : null}
      {webp !== src ? <source srcSet={webp} type="image/webp" /> : null}
      {image}
    </picture>
  );
}

