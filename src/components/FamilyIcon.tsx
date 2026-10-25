import { AppWindow, Globe, Smartphone, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FamilySlug } from "../data/portfolio";

const icons: Record<FamilySlug, LucideIcon> = {
  "brand-websites": Globe,
  "web-applications": AppWindow,
  "mobile-apps": Smartphone,
  "automation-reporting": Workflow,
};

/** A thin line icon for one service family. The stroke matches the drawings. */
export default function FamilyIcon({ family, className = "" }: { family: FamilySlug; className?: string }) {
  const Icon = icons[family];
  return <Icon size={24} strokeWidth={1.5} className={className} aria-hidden="true" />;
}
