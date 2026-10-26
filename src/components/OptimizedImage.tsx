type OptimizedImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** eager for the first picture on the page. Everything else waits until it is near the screen. */
  loading?: "lazy" | "eager";
  className?: string;
  draggable?: boolean;
};

/**
 * Shows a smaller WebP copy when the browser understands it.
 * The original photo stays in place as the backup.
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  className,
  draggable,
}: OptimizedImageProps) {
  const webp = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const image = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      // The first picture is part of the opening view, so the browser fetches it first.
      fetchPriority={loading === "eager" ? "high" : "auto"}
      className={className}
      draggable={draggable}
    />
  );

  if (webp === src) return image;

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      {image}
    </picture>
  );
}
