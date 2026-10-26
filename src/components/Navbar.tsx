import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { track } from "../lib/analytics";
import { useInsightsMenu } from "../content/contentDesk";
import Logo from "./Logo";
import { cta } from "../content/cta";

const baseLinks = [
  // Always the homepage list, even when this menu is on another page.
  { to: "/#services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const showInsights = useInsightsMenu();
  const links = showInsights ? [...baseLinks, { to: "/insights", label: "Insights" }] : baseLinks;

  // Close the phone menu as soon as we leave for another page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // A full-screen menu should not leave the page scrolling behind it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // The homepage draws its own light header inside the opening card.
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-navy/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <Link to="/" className="inline-flex shrink-0" onClick={() => setOpen(false)}>
          <Logo variant="dark" />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {links.map((link) =>
            link.to.includes("#") ? (
              <Link
                key={link.to}
                to={link.to}
                className="text-[15px] font-medium tracking-normal text-white/70 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </Link>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-[15px] font-medium tracking-normal transition-colors duration-300 ${
                    isActive ? "text-signal" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
          <Link
            to="/contact"
            className="btn btn-primary !px-5 !py-2"
            onClick={() => track("start_project_click", { location: "navbar" })}
          >
            {cta.project}
          </Link>
        </nav>

        <button
          type="button"
          className="relative z-50 text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={`block h-px w-6 bg-white transition ${open ? "translate-y-[5px] rotate-45" : ""}`} />
          <span className={`mt-2 block h-px w-6 bg-white transition ${open ? "opacity-0" : ""}`} />
          <span className={`mt-2 block h-px w-6 bg-white transition ${open ? "-translate-y-[13px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open ? (
        <nav
          className="fixed inset-0 z-40 flex flex-col bg-navy px-6 pb-12 pt-24 lg:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-1 flex-col gap-8">
            {links.map((link) =>
              link.to.includes("#") ? (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="type-display text-white"
                >
                  {link.label}
                </Link>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `type-display ${isActive ? "text-signal" : "text-white"}`
                  }
                >
                  {link.label}
                </NavLink>
              ),
            )}
          </div>
          <Link
            to="/contact"
            onClick={() => {
              setOpen(false);
              track("start_project_click", { location: "navbar" });
            }}
            className="btn btn-primary"
          >
            {cta.project}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
