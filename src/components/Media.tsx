import OptimizedImage from "./OptimizedImage";

type MediaProps = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * A photo frame used across the site.
 * The picture sits still, then eases a little larger on hover —
 * a quiet, expensive-feeling motion, not a bounce.
 */
export default function Media({ src, alt = "", width, height, className = "", loading = "lazy" }: MediaProps) {
  return (
    <div className={`media w-full ${className}`}>
      <OptimizedImage src={src} alt={alt} width={width} height={height} loading={loading} className="h-auto w-full" />
    </div>
  );
}
