import { lazy, Suspense, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BackToTop from "./components/BackToTop";
import CookieNotice from "./components/CookieNotice";
import Footer from "./components/Footer";
import LocaleLayout from "./components/LocaleLayout";
import Navbar from "./components/Navbar";
import { publicRouteElements } from "./components/PublicRoutes";
import WhatsAppButton from "./components/WhatsAppButton";
import { ContentDeskProvider } from "./content/contentDesk";
import { organizationSchema, professionalServiceSchema } from "./content/schema";
import { isLocale, stripLocale } from "./i18n/locale";
import { track } from "./lib/analytics";
import { captureVisit } from "./lib/visit";
import PageTransition from "./components/PageTransition";
import PreferLocale from "./components/PreferLocale";
import NotFound from "./pages/NotFound";


const DeskApp = lazy(() => import("./desk/DeskApp"));

function PageViews() {
  const { pathname } = useLocation();

  useEffect(() => {
    captureVisit();
    track("page_view", { page_path: stripLocale(pathname) });
  }, [pathname]);

  return null;
}

/** /es/about or /en/about → English bare path. Only /fr is a real locale prefix. */
function PublicCatchAll() {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/([a-z]{2})(\/.*)?$/i);
  if (match) {
    const code = match[1].toLowerCase();
    if (code === "en" || !isLocale(code)) {
      return <Navigate to={match[2] || "/"} replace />;
    }
  }
  return <NotFound />;
}

export default function App() {
  const location = useLocation();
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
        <PreferLocale />
        <WhatsAppButton />
        <BackToTop />
        <PageTransition>
          {(location) => (
            <>
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={null}>
                  <Routes location={location}>
                    <Route element={<LocaleLayout forceLocale="en" />}>{publicRouteElements("")}</Route>
                    <Route element={<LocaleLayout forceLocale="fr" />}>{publicRouteElements("/fr")}</Route>
                    <Route path="*" element={<PublicCatchAll />} />
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
