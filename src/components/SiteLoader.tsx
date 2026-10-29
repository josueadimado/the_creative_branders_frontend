import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useContentDeskStatus } from "../content/contentDesk";

/**
 * Thin top bar + small mark while the content desk answers.
 * Hides once the API is ready or we fall back to the built-in copy.
 */
export default function SiteLoader() {
  const { t } = useTranslation("common");
  const status = useContentDeskStatus();
  const busy = status === "loading";
  const [visible, setVisible] = useState(busy);

  useEffect(() => {
    if (busy) {
      setVisible(true);
      return;
    }
    // Keep the bar on screen a beat so it does not flash off mid-paint.
    const timer = window.setTimeout(() => setVisible(false), 220);
    return () => window.clearTimeout(timer);
  }, [busy]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60]"
      role="status"
      aria-live="polite"
      aria-busy={busy}
    >
      <div className="site-load-bar" />
      <span className="sr-only">{t("loading")}</span>
    </div>
  );
}
