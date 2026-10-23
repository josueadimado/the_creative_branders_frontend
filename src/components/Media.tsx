type MediaProps = {
  src: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
};

/**
 * A photo frame used across the site.
 * The picture sits still, then eases a little larger on hover —
 * a quiet, expensive-feeling motion, not a bounce.
 */
export default function Media({ src, alt = "", className = "", loading = "lazy" }: MediaProps) {
  return (
    <div className={`media w-full ${className}`}>
      <img src={src} alt={alt} loading={loading} />
    </div>
  );
}
