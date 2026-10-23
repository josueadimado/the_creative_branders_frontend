import { ReactNode, useEffect, useRef, useState } from "react";
import { Location, useLocation } from "react-router-dom";

type Phase = "idle" | "out" | "load" | "in";

type PageTransitionProps = {
  // We pass the “shown” location into children so the old page
  // can stay on screen while the new URL is already changing.
  children: (location: Location) => ReactNode;
};

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Smooth page changes with a short loading beat.
 *
 * 1. Current page fades down slightly.
 * 2. A thin blue bar runs across the top (the “load”).
 * 3. We jump to the top and fade the new page in.
 *
 * The top menu stays still so it feels like one site, not a refresh.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [shown, setShown] = useState(location);
  const [phase, setPhase] = useState<Phase>("idle");
  const [barKey, setBarKey] = useState(0);
  const runId = useRef(0);
  const shownRef = useRef(shown);
  shownRef.current = shown;

  useEffect(() => {
    const current = shownRef.current;
    // Filter changes (?family=) and old hash links stay on the same page.
    // They should update the address without replaying the loading animation.
    const samePage = location.pathname === current.pathname;

    if (samePage) {
      if (location.search !== current.search || location.hash !== current.hash) setShown(location);
      return;
    }

    const thisRun = ++runId.current;

    if (prefersReducedMotion()) {
      setShown(location);
      window.scrollTo(0, 0);
      setPhase("idle");
      return;
    }

    setBarKey((value) => value + 1);
    setPhase("out");
    document.documentElement.classList.add("is-paging");
    document.body.style.cursor = "wait";

    (async () => {
      await wait(200);
      if (runId.current !== thisRun) return;

      setPhase("load");
      window.scrollTo(0, 0);
      await wait(280);
      if (runId.current !== thisRun) return;

      setShown(location);
      setPhase("in");
      document.body.style.cursor = "";
      await wait(280);
      if (runId.current !== thisRun) return;

      setPhase("idle");
      document.documentElement.classList.remove("is-paging");
    })();

    return () => {
      document.body.style.cursor = "";
      document.documentElement.classList.remove("is-paging");
    };
  }, [location]);

  const busy = phase === "out" || phase === "load";

  return (
    <>
      <div
        key={barKey}
        className={`route-progress route-progress--${phase}`}
        aria-hidden="true"
      />
      <div
        className={`page-shell page-shell--${phase} flex min-h-0 flex-1 flex-col`}
        aria-busy={busy}
      >
        {busy ? (
          <span className="sr-only" aria-live="polite">
            Loading page
          </span>
        ) : null}
        {children(shown)}
      </div>
    </>
  );
}
