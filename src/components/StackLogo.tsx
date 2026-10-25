import type { IconType } from "react-icons";
import {
  SiApache,
  SiCelery,
  SiCloudflare,
  SiDjango,
  SiElementor,
  SiFramer,
  SiGooglecalendar,
  SiMoodle,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiReact,
  SiSquare,
  SiStripe,
  SiTailwindcss,
  SiTurbo,
  SiTypescript,
  SiWordpress,
  SiZoom,
} from "react-icons/si";

type Mark = {
  Icon?: IconType;
  /** A logo that is not in the icon set, drawn from its official outline. */
  path?: string;
  color: string;
};

// The colour next to each name is that tool's own logo colour.
const marks: Record<string, Mark> = {
  "Next.js": { Icon: SiNextdotjs, color: "#000000" },
  React: { Icon: SiReact, color: "#61DAFB" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4" },
  "Framer Motion": { Icon: SiFramer, color: "#0055FF" },
  Turbopack: { Icon: SiTurbo, color: "#5C4EE5" },
  Django: { Icon: SiDjango, color: "#092E20" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  Celery: { Icon: SiCelery, color: "#37814A" },
  Square: { Icon: SiSquare, color: "#000000" },
  Stripe: { Icon: SiStripe, color: "#635BFF" },
  "Cloudflare R2": { Icon: SiCloudflare, color: "#F38020" },
  "Google Calendar": { Icon: SiGooglecalendar, color: "#4285F4" },
  Zoom: { Icon: SiZoom, color: "#0B5CFF" },
  Moodle: { Icon: SiMoodle, color: "#F98012" },
  PHP: { Icon: SiPhp, color: "#777BB4" },
  MySQL: { Icon: SiMysql, color: "#4479A1" },
  Apache: { Icon: SiApache, color: "#D22128" },
  WordPress: { Icon: SiWordpress, color: "#21759B" },
  Elementor: { Icon: SiElementor, color: "#92003B" },
  Twilio: { path: "M12 0C5.381-.008.008 5.352 0 11.971V12c0 6.64 5.359 12 12 12 6.64 0 12-5.36 12-12 0-6.641-5.36-12-12-12zm0 20.801c-4.846.015-8.786-3.904-8.801-8.75V12c-.014-4.846 3.904-8.786 8.75-8.801H12c4.847-.014 8.786 3.904 8.801 8.75V12c.015 4.847-3.904 8.786-8.75 8.801H12zm5.44-11.76c0 1.359-1.12 2.479-2.481 2.479-1.366-.007-2.472-1.113-2.479-2.479 0-1.361 1.12-2.481 2.479-2.481 1.361 0 2.481 1.12 2.481 2.481zm0 5.919c0 1.36-1.12 2.48-2.481 2.48-1.367-.008-2.473-1.114-2.479-2.48 0-1.359 1.12-2.479 2.479-2.479 1.361-.001 2.481 1.12 2.481 2.479zm-5.919 0c0 1.36-1.12 2.48-2.479 2.48-1.368-.007-2.475-1.113-2.481-2.48 0-1.359 1.12-2.479 2.481-2.479 1.358-.001 2.479 1.12 2.479 2.479zm0-5.919c0 1.359-1.12 2.479-2.479 2.479-1.367-.007-2.475-1.112-2.481-2.479 0-1.361 1.12-2.481 2.481-2.481 1.358 0 2.479 1.12 2.479 2.481z", color: "#F22F46" },
  OpenAI: { path: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z", color: "#412991" },
};

/** "Twilio (SMS and voice)" still uses the Twilio mark. */
function markFor(name: string): Mark | undefined {
  if (marks[name]) return marks[name];
  const base = name.replace(/\s*\(.*\)$/, "");
  return marks[base];
}

/** A small brand mark for a tool name. Unknown names stay as text only. */
export default function StackLogo({ name }: { name: string }) {
  const mark = markFor(name);
  if (!mark) return null;
  if (mark.Icon) {
    const Icon = mark.Icon;
    return <Icon className="size-3.5 shrink-0" color={mark.color} aria-hidden />;
  }
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 shrink-0" aria-hidden>
      <path fill={mark.color} d={mark.path} />
    </svg>
  );
}
