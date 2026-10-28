/**
 * Extra journey signals for Desk: page timing is handled in App PageViews.
 * This file only watches for JavaScript crashes (throttled so one broken page
 * cannot flood the studio log).
 */

import { track } from "./analytics";

let installed = false;
/** Cap noisy error storms from a single visit. */
let errorCount = 0;
const MAX_ERRORS = 5;

function recordError(message: string, source: string) {
  if (errorCount >= MAX_ERRORS) return;
  errorCount += 1;
  track("js_error", {
    message: message.slice(0, 180),
    source: source.slice(0, 120),
    page_path: window.location.pathname || "/",
  });
}

/** Call once when the public site mounts. Safe to call again. */
export function installJourneyErrorCapture() {
  if (installed || typeof window === "undefined") return;
  installed = true;

  window.addEventListener("error", (event) => {
    const message = event.message || "script error";
    const source = event.filename || "window";
    recordError(String(message), String(source));
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason;
    const message =
      reason instanceof Error ? reason.message : String(reason || "unhandled rejection");
    recordError(message, "promise");
  });
}

/** Short reason codes when a form fails validation or the API rejects it. */
export function trackFormError(form: string, reason: string) {
  track("form_error", {
    form: form.slice(0, 40),
    reason: reason.slice(0, 120),
    page_path: window.location.pathname || "/",
  });
}
