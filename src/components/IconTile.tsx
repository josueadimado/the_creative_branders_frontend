import type { LucideIcon } from "lucide-react";

/**
 * A small framed icon. Used beside a short point so the list is easy to scan.
 */
export default function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-mist bg-white text-navy">
      <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}
