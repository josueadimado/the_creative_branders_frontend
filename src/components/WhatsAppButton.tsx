import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProjects } from "../content/contentDesk";
import { caseStudyWhatsAppMessage, whatsappLink } from "../data/socials";
import { displayName } from "../data/portfolio";
import { track } from "../lib/analytics";

/**
 * A round chat button fixed to the bottom-right corner on every page.
 * On a case study it already mentions that project. On other pages it uses the usual greeting.
 * It hides when the brief form is showing its own WhatsApp button.
 */
export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const projects = useProjects();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const sync = () => setHidden(document.body.dataset.chatHidden === "true");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-chat-hidden"] });
    return () => observer.disconnect();
  }, []);

  if (hidden) return null;

  const studySlug = pathname.match(/^\/work\/([^/]+)\/?$/)?.[1];
  const study = projects.find((item) => item.slug === studySlug);
  const message = study ? caseStudyWhatsAppMessage(displayName(study)) : undefined;

  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      onClick={() => track("whatsapp_click", { location: study ? "case-study" : "floating" })}
      className="tcb-chat fixed right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-signal text-navy shadow-lg transition-colors hover:bg-signal-hover"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10.1 10.1 0 0 0 4.65 1.12h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.99c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.11-1.81-.11-.42-.14-.95-.31-1.64-.6-2.88-1.25-4.76-4.15-4.9-4.34-.14-.2-1.16-1.54-1.16-2.94s.73-2.08 1-2.37c.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.44-.02.68.52.24.58.83 2 .9 2.15.07.14.12.33.02.53-.1.2-.14.33-.28.5-.14.18-.3.4-.42.53-.14.14-.28.3-.12.57.16.28.72 1.18 1.54 1.91 1.06.94 1.95 1.24 2.23 1.38.28.14.44.12.6-.07.16-.2.7-.81.88-1.09.18-.28.38-.23.64-.14.26.1 1.66.78 1.94.92.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
      </svg>
    </a>
  );
}
