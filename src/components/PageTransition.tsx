import { ReactNode, useEffect, useRef, useState } from "react";
import { Location, useLocation } from "react-router-dom";
import { DisplayLocationProvider } from "./DisplayLocation";
import { stripLocale } from "../i18n/locale";


type PageTransitionProps = {
  // The current address, so each page knows which URL is open.
  children: (location: Location) => ReactNode;
};

const OUT_MS = 160;
const IN_MS = 240;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Jump without the smooth slide, so a new page is at the top immediately.
function scrollNow(hash: string) {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  const id = hash.replace(/^#/, "");
  const target = id ? document.getElementById(id) : null;
  if (target) target.scrollIntoView();
  else window.scrollTo(0, 0);

  root.style.scrollBehavior = previous;
}

/**
 * Soft fade when the address changes.
 * Language-only switches keep the scroll position so EN↔FR does not jump.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const shown = useRef(location);
  const [displayLocation, setDisplayLocation] = useState(location);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  useEffect(() => {
    const previous = shown.current;
    const pathChanged = location.pathname !== previous.pathname;
    const searchChanged = location.search !== previous.search;
    const hashChanged = location.hash !== previous.hash;
    if (!pathChanged && !searchChanged && !hashChanged) return;

    // Work filters only change the query. Keep the scroll position and skip the fade.
    if (!pathChanged && !hashChanged && searchChanged) {
      shown.current = location;
      setDisplayLocation(location);
      return;
    }

    const localeOnly =
      pathChanged && stripLocale(location.pathname) === stripLocale(previous.pathname);

    if (prefersReducedMotion()) {
      shown.current = location;
      setDisplayLocation(location);
      setPhase("idle");
      if (!localeOnly) scrollNow(location.hash);
      return;
    }

    const savedScroll = localeOnly ? window.scrollY : null;
    let inTimer = 0;
    setPhase("out");

    const outTimer = window.setTimeout(() => {
      shown.current = location;
      setDisplayLocation(location);
      if (localeOnly && savedScroll !== null) {
        window.scrollTo(0, savedScroll);
      } else {
        scrollNow(location.hash);
      }
      setPhase("in");
      inTimer = window.setTimeout(() => setPhase("idle"), IN_MS);
    }, OUT_MS);

    return () => {
      window.clearTimeout(outTimer);
      window.clearTimeout(inTimer);
    };
  }, [location]);

  const fadeClass =
    phase === "out" ? "page-fade page-fade-out" : phase === "in" ? "page-fade page-fade-in" : "page-fade";

  return (
    <DisplayLocationProvider location={displayLocation}>
      <div className={`flex min-h-0 flex-1 flex-col ${fadeClass}`}>{children(displayLocation)}</div>
    </DisplayLocationProvider>
  );
}

