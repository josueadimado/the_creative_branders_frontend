import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * A button that appears after you scroll down and returns you to the top.
 * It sits just above the chat button so the two do not cover each other.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={goTop}
      aria-label="Back to top"
      className="fixed bottom-24 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-signal bg-white text-deep shadow-lg transition-colors hover:bg-tint"
    >
      <ArrowUp className="size-5" aria-hidden="true" />
    </button>
  );
}
