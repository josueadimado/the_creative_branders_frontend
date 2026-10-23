import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";

const links = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/smartcrm", label: "SmartCRM" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the phone menu as soon as we leave for another page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-navy/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-4">
        <Link to="/" className="inline-flex shrink-0" onClick={() => setOpen(false)}>
          <Logo variant="dark" />
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-[15px] font-medium tracking-normal transition-colors duration-300 ${
                  isActive ? "text-blue" : "text-white/70 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/contact" className="btn btn-primary !px-5 !py-2">
            Book a discovery call
          </Link>
        </nav>

        <button
          type="button"
          className="text-white lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="block h-px w-6 bg-white" />
          <span className="mt-2 block h-px w-6 bg-white" />
          <span className="mt-2 block h-px w-6 bg-white" />
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/[0.06] px-6 py-8 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col gap-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `type-lede ${isActive ? "text-blue" : "text-white"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary self-start"
            >
              Book a discovery call
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
