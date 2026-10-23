import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { socials } from "../data/socials";

const icons: Record<(typeof socials)[number]["label"], IconType> = {
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  Facebook: FaFacebookF,
  X: FaXTwitter,
};

type SocialLinksProps = {
  /** "navy" sits on the footer. "light" sits on paper, so the icons use Deep Signal. */
  tone?: "navy" | "light";
  /** Pull the row left so the first icon lines up with the text above it. */
  flush?: boolean;
};

/**
 * The four studio social accounts as icons.
 * Each hit area is 44px so a thumb can land on it.
 */
export default function SocialLinks({ tone = "navy", flush = false }: SocialLinksProps) {
  const colour =
    tone === "navy" ? "text-paper hover:text-signal" : "text-deep hover:text-deep-hover";

  return (
    <ul className={`flex flex-wrap ${flush ? "-ml-3" : ""}`}>
      {socials.map((item) => {
        const Icon = icons[item.label];
        return (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`The Creative Branders on ${item.label}`}
              className={`inline-flex h-11 w-11 items-center justify-center transition-colors ${colour}`}
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
