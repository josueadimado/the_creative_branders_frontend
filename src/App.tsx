import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BackToTop from "./components/BackToTop";
import CookieNotice from "./components/CookieNotice";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import { ContentDeskProvider } from "./content/contentDesk";
import { organizationSchema, professionalServiceSchema } from "./content/schema";
import { track } from "./lib/analytics";
import { captureVisit } from "./lib/visit";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import About from "./pages/About";
import Academy from "./pages/Academy";
import Contact from "./pages/Contact";
import InsightArticle from "./pages/InsightArticle";
import Insights from "./pages/Insights";
import LegalPage from "./pages/LegalPage";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import ResponsibleAI from "./pages/ResponsibleAI";
import SmartCRM from "./pages/SmartCRM";
import Work from "./pages/Work";
import WorkStudy from "./pages/WorkStudy";
import { cookies } from "./content/cookies";
import { terms } from "./content/terms";
// The desk and the style guide are private screens. They load when opened.
// Public pages stay in the first file so a saved page does not disappear while its code arrives.
const DeskApp = lazy(() => import("./desk/DeskApp"));
const StyleGuide = lazy(() => import("./pages/StyleGuide"));

function PageViews() {
  const { pathname } = useLocation();

  useEffect(() => {
    captureVisit();
    track("page_view", { page_path: pathname });
  }, [pathname]);

  return null;
}

// App.tsx is the map of the website: which URL shows which page.
// Navbar stays put. The next page shows as soon as the address changes.
export default function App() {
  const location = useLocation();
  // The studio desk is a private set of screens. It does not use the public header or footer.
  if (location.pathname === "/desk" || location.pathname.startsWith("/desk/")) {
    return (
      <Suspense fallback={null}>
        <DeskApp />
      </Suspense>
    );
  }

  return (
    <ContentDeskProvider>
    <div className="flex min-h-screen flex-col">
      <PageViews />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(professionalServiceSchema())}</script>
      </Helmet>
      <Navbar />
      <WhatsAppButton />
      <BackToTop />
      <PageTransition>
        {(location) => (
          <>
            <main className="flex-1">
              <Suspense fallback={null}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                {/* Services are listed on the homepage. Old addresses land there. */}
                <Route path="/services" element={<Navigate to="/#services" replace />} />
                <Route path="/services/:slug" element={<Navigate to="/#services" replace />} />
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
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Suspense>
            </main>
            <Footer />
          </>
        )}
      </PageTransition>
      <CookieNotice />
    </div>
    </ContentDeskProvider>
  );
}
