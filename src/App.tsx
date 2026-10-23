import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageTransition from "./components/PageTransition";
import About from "./pages/About";
import Academy from "./pages/Academy";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Services from "./pages/Services";
import SmartCRM from "./pages/SmartCRM";
import Work from "./pages/Work";

// App.tsx is the map of the website: which URL shows which page.
// Navbar stays put. Page + footer fade together so the swap feels smooth.
export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <PageTransition>
        {(location) => (
          <>
            <main className="flex-1">
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/work" element={<Work />} />
                <Route path="/about" element={<About />} />
                <Route path="/smartcrm" element={<SmartCRM />} />
                <Route path="/academy" element={<Academy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
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
