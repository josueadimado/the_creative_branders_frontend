const KEY = "tcb-newsletter-subscribed";

export function markNewsletterSubscribed() {
  try {
    localStorage.setItem(KEY, "1");
  } catch {
    /* ignore */
  }
}

export function hasNewsletterSubscribed(): boolean {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}
