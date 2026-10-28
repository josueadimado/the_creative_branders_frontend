import { createContext, useContext, type ReactNode } from "react";
import { type Location, useLocation } from "react-router-dom";

const DisplayLocationContext = createContext<Location | null>(null);

/** Supplies the location currently on screen during a page fade. */
export function DisplayLocationProvider({
  location,
  children,
}: {
  location: Location;
  children: ReactNode;
}) {
  return <DisplayLocationContext.Provider value={location}>{children}</DisplayLocationContext.Provider>;
}

/** Prefer the faded location when a transition is in progress; otherwise the live URL. */
export function useDisplayLocation(): Location {
  const live = useLocation();
  return useContext(DisplayLocationContext) ?? live;
}
