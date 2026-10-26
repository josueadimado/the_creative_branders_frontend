import { lazy, Suspense, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BackToTop from "./components/BackToTop";
import CookieNotice from "./components/CookieNotice";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import WhatsAppButton from "./components/WhatsAppButton";
import { ContentDeskProvider } from "./content/contentDesk";
import { track } from "./lib/analytics";
import PageTransition from "./components/PageTransition";
import Home from "./pages/Home";
import { cookies } from "./content/cookies";
import { terms } from "./content/terms";
// The desk and the other pages load when someone opens them, so the
// homepage does not have to run their code before the first words appear.
const DeskApp = lazy(() => import("./desk/DeskApp"));
const About = lazy(() => import("./pages/About"));
const Academy = lazy(() => import("./pages/Academy"));
const Contact = lazy(() => import("./pages/Contact"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const InsightArticle = lazy(() => import("./pages/InsightArticle"));
const Insights = lazy(() => import("./pages/Insights"));
const ResponsibleAI = lazy(() => import("./pages/ResponsibleAI"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Privacy = lazy(() => import("./pages/Privacy"));
const SmartCRM = lazy(() => import("./pages/SmartCRM"));
const StyleGuide = lazy(() => import("./pages/StyleGuide"));
const Work = lazy(() => import("./pages/Work"));
const WorkStudy = lazy(() => import("./pages/WorkStudy"));

function PageViews() {
  const { pathname } = useLocation();

  useEffect(() => {
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
