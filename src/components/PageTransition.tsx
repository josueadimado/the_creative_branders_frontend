import { ReactNode, useEffect, useRef } from "react";
import { Location, useLocation } from "react-router-dom";

type PageTransitionProps = {
  // The current address, so each page knows which URL is open.
  children: (location: Location) => ReactNode;
};

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
 * Shows the next page as soon as the address changes.
 * The menu stays where it is. The page itself does not fade or wait.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    const pathChanged = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    // A filter on the same page only changes the query. Leave the scroll position.
    if (!pathChanged && !location.hash) return;
    scrollNow(location.hash);
  }, [location.pathname, location.hash]);

  return <div className="flex min-h-0 flex-1 flex-col">{children(location)}</div>;
}
