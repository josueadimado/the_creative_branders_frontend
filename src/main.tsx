import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { LucideProvider } from "lucide-react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
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
