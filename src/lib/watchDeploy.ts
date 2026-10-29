/**
 * After a push/deploy, open tabs pick up the new build without a hard refresh.
 *
 * 1. Reads /version.json (written at build time).
 * 2. When the tab becomes visible again, checks for a new build id.
 * 3. Reloads once if the id changed, or if a hashed JS chunk failed to load.
 */

const STORAGE_KEY = "tcb-build-id";
const RELOAD_FLAG = "tcb-build-reload";

type VersionFile = { buildId?: string };

async function readBuildId(): Promise<string | null> {
  try {
    const response = await fetch(`/version.json?t=${Date.now()}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    const data = (await response.json()) as VersionFile;
    return typeof data.buildId === "string" && data.buildId ? data.buildId : null;
  } catch {
    return null;
  }
}

function softReload() {
  // Avoid a reload loop if version.json is broken after a bad deploy.
  if (sessionStorage.getItem(RELOAD_FLAG) === "1") return;
  sessionStorage.setItem(RELOAD_FLAG, "1");
  window.location.reload();
}

async function checkForNewBuild() {
  const next = await readBuildId();
  if (!next) return;
  const previous = sessionStorage.getItem(STORAGE_KEY);
  if (!previous) {
    sessionStorage.setItem(STORAGE_KEY, next);
    sessionStorage.removeItem(RELOAD_FLAG);
    return;
  }
  if (previous === next) {
    sessionStorage.removeItem(RELOAD_FLAG);
    return;
  }
  sessionStorage.setItem(STORAGE_KEY, next);
  softReload();
}

/** Call once from the app entry. Safe to call more than once. */
export function watchDeploy() {
  if (typeof window === "undefined") return;
  if ((window as Window & { __tcbWatchDeploy?: boolean }).__tcbWatchDeploy) return;
  (window as Window & { __tcbWatchDeploy?: boolean }).__tcbWatchDeploy = true;

  void checkForNewBuild();

  const onVisible = () => {
    if (document.visibilityState === "visible") void checkForNewBuild();
  };
  document.addEventListener("visibilitychange", onVisible);
  window.addEventListener("focus", () => void checkForNewBuild());

  // Vite hashed chunks 404 after a new deploy until the page reloads.
  window.addEventListener("vite:preloadError", ((event: Event) => {
    event.preventDefault();
    softReload();
  }) as EventListener);

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message = reason instanceof Error ? reason.message : String(reason ?? "");
    if (/Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module/i.test(message)) {
      softReload();
    }
  });
}
