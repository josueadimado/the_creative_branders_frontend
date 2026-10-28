import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Academy from "../pages/Academy";
import Contact from "../pages/Contact";
import InsightArticle from "../pages/InsightArticle";
import Insights from "../pages/Insights";
import LegalPage from "../pages/LegalPage";
import NotFound from "../pages/NotFound";
import Privacy from "../pages/Privacy";
import ResponsibleAI from "../pages/ResponsibleAI";
import SmartCRM from "../pages/SmartCRM";
import Work from "../pages/Work";
import WorkStudy from "../pages/WorkStudy";
import { cookies } from "../content/cookies";
import { terms } from "../content/terms";

const StyleGuide = lazy(() => import("../pages/StyleGuide"));

/** Shared public pages. Pass pathPrefix "" for English or "/fr" for French. */
export function publicRouteElements(pathPrefix: "" | "/fr") {
  const p = (path: string) => {
    if (pathPrefix === "") return path;
    if (path === "/") return "/fr";
    return `${pathPrefix}${path}`;
  };
  const servicesTarget = pathPrefix === "/fr" ? "/fr#services" : "/#services";

  return (
    <>
      <Route path={p("/")} element={<Home />} />
      <Route path={p("/services")} element={<Navigate to={servicesTarget} replace />} />
      <Route path={p("/services/:slug")} element={<Navigate to={servicesTarget} replace />} />
      <Route path={p("/work")} element={<Work />} />
      <Route path={p("/work/:slug")} element={<WorkStudy />} />
      <Route path={p("/about")} element={<About />} />
      <Route path={p("/insights")} element={<Insights />} />
      <Route path={p("/insights/:slug")} element={<InsightArticle />} />
      <Route path={p("/smartcrm")} element={<SmartCRM />} />
      <Route path={p("/academy")} element={<Academy />} />
      <Route path={p("/contact")} element={<Contact />} />
      {pathPrefix === "" ? (
        <Route
          path="/dev/styleguide"
          element={
            <Suspense fallback={null}>
              <StyleGuide />
            </Suspense>
          }
        />
      ) : null}
      <Route path={p("/privacy")} element={<Privacy />} />
      <Route path={p("/terms")} element={<LegalPage {...terms} />} />
      <Route path={p("/cookies")} element={<LegalPage {...cookies} />} />
      <Route path={p("/responsible-ai")} element={<ResponsibleAI />} />
      <Route path={p("/404")} element={<NotFound />} />
    </>
  );
}
