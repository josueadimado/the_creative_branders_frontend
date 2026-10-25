import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import { track } from "./lib/analytics";
import PageTransition from "./components/PageTransition";
import About from "./pages/About";
import Academy from "./pages/Academy";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import LegalPage from "./pages/LegalPage";
import InsightArticle from "./pages/InsightArticle";
import Insights from "./pages/Insights";
import ResponsibleAI from "./pages/ResponsibleAI";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import { cookies } from "./content/cookies";
import { serviceRedirects } from "./content/services";
import { terms } from "./content/terms";
import ServiceFamily from "./pages/ServiceFamily";
import Services from "./pages/Services";
import SmartCRM from "./pages/SmartCRM";
import StyleGuide from "./pages/StyleGuide";
import Work from "./pages/Work";
import WorkStudy from "./pages/WorkStudy";

function PageViews() {
  const { pathname } = useLocation();

  useEffect(() => {
    track("page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}

// App.tsx is the map of the website: which URL shows which page.
// Navbar stays put. Page + footer fade together so the swap feels smooth.
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <CookieConsent />
      <PageViews />
      <Navbar />
      <WhatsAppButton />
      <PageTransition>
        {(location) => (
          <>
            <main className="flex-1">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                {/* Old family addresses. Nginx also sends a permanent redirect for these. */}
                {Object.entries(serviceRedirects).map(([from, to]) => (
                  <Route key={from} path={`/services/${from}`} element={<Navigate to={`/services/${to}`} replace />} />
                ))}
                <Route path="/services/:slug" element={<ServiceFamily />} />
                <Route path="/work" element={<Work />} />
                <Route path="/work/:slug" element={<WorkStudy />} />
                <Route path="/about" element={<About />} />
                <Route path="/insights" element={<Insights />} />
                <Route path="/insights/:slug" element={<InsightArticle />} />
                <Route path="/smartcrm" element={<SmartCRM />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dev/styleguide" element={<StyleGuide />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<LegalPage {...terms} />} />
                <Route path="/cookies" element={<LegalPage {...cookies} />} />
                <Route path="/responsible-ai" element={<ResponsibleAI />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </>
        )}
      </PageTransition>
    </div>
  );
}
