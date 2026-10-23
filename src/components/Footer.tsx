import { Link } from "react-router-dom";
import { socials } from "../data/socials";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="dot-grid border-t border-white/[0.06] bg-navy">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-3">
        <div>
          <Link to="/" className="inline-flex">
            <Logo variant="dark" />
          </Link>
          <p className="type-caption mt-5 max-w-xs text-white/70">
            Digital intelligence studio. Designed for intelligent growth.
          </p>
        </div>

        <div>
          <p className="type-caption font-semibold text-signal">Studio</p>
          <ul className="mt-5 space-y-3 type-caption text-white/70">
            <li>
              <Link to="/services" className="transition-colors hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link to="/work" className="transition-colors hover:text-white">
                Work
              </Link>
            </li>
            <li>
              <Link to="/smartcrm" className="transition-colors hover:text-white">
                SmartCRM
              </Link>
            </li>
            <li>
              <Link to="/academy" className="transition-colors hover:text-white">
                Academy
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-white">
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="type-caption font-semibold text-signal">Connect</p>
          <ul className="mt-5 space-y-3 type-caption text-white/70">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link to="/contact" className="transition-colors hover:text-white">
                Inquiry
              </Link>
            </li>
          </ul>
          <p className="type-caption mt-8 text-white/55">We reply within 48 hours.</p>
        </div>
      </div>
      <div className="border-t border-white/[0.06] px-6 py-6 text-center type-caption text-white/55">
        <p>
          © {new Date().getFullYear()} The Creative Branders. All rights reserved.{" "}
          <Link to="/privacy" className="transition-colors hover:text-white">
            Privacy
          </Link>
        </p>
      </div>
    </footer>
  );
}
