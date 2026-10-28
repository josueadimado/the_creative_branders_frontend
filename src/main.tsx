import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { LucideProvider } from "lucide-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./i18n";
import "./index.css";

const root = document.getElementById("root")!;
const path = window.location.pathname;
const spaOnly =
  path === "/desk" || path.startsWith("/desk/") || path.startsWith("/dev/");
// If nginx still served the prerendered homepage, wipe it before unhiding.
if (spaOnly) root.replaceChildren();
document.documentElement.classList.remove("tcb-spa-boot");

createRoot(root).render(
  <StrictMode>
    {/* One stroke weight for every Lucide icon, matching the line drawings. */}
    <LucideProvider strokeWidth={1.5}>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </LucideProvider>
  </StrictMode>
);
