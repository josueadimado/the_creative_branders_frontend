import { Helmet } from "react-helmet-async";
import { BookOpen, Boxes, Globe, LayoutGrid, PenLine, Search, Share2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Illustration, { illustrationNames } from "../components/Illustration";
import SocialLinks from "../components/SocialLinks";

const colours = [
  { name: "Navy", hex: "#0E1E2B", className: "bg-navy" },
  { name: "Signal", hex: "#4AA3C6", className: "bg-signal" },
  { name: "Signal hover", hex: "#6BB8D6", className: "bg-signal-hover" },
  { name: "Deep", hex: "#1F6E8C", className: "bg-deep" },
  { name: "Deep hover", hex: "#17556C", className: "bg-deep-hover" },
  { name: "Paper", hex: "#F5F6F3", className: "bg-paper" },
  { name: "White", hex: "#FFFFFF", className: "bg-white" },
  { name: "Slate", hex: "#5B6873", className: "bg-slate" },
  { name: "Mist", hex: "#DCE3E8", className: "bg-mist" },
  { name: "Gold", hex: "#E8C547", className: "bg-gold" },
];

const icons: { name: string; Icon: LucideIcon }[] = [
  { name: "Search", Icon: Search },
  { name: "Pen", Icon: PenLine },
  { name: "Boxes", Icon: Boxes },
  { name: "Growth", Icon: TrendingUp },
  { name: "Globe", Icon: Globe },
  { name: "Share", Icon: Share2 },
  { name: "Grid", Icon: LayoutGrid },
  { name: "Book", Icon: BookOpen },
];

/**
 * A private review page for the brand system.
 * It is not linked from the menu, and search engines are told to skip it.
 */
export default function StyleGuide() {
  return (
    <div className="bg-paper">
      <Helmet>
        <title>Style guide | The Creative Branders</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="bg-navy px-6 py-16 text-white">
        <p className="type-kicker text-signal">Private</p>
        <h1 className="type-h1 mt-4">Style guide</h1>
        <p className="type-lede mt-6 max-w-xl text-white/70">
          Colours, type, buttons, icons, and illustrations in one place.
        </p>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="type-display text-navy">Colours</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-5">
          {colours.map((colour) => (
            <li key={colour.name} className="overflow-hidden rounded-card border border-mist bg-white">
              <div className={`h-16 ${colour.className}`} />
              <p className="type-caption px-3 py-3 text-navy">
                {colour.name}
                <span className="mt-1 block text-slate">{colour.hex}</span>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="type-display text-navy">Type</h2>
        <div className="mt-8 space-y-6">
          <p className="type-hero text-navy">Hero</p>
          <p className="type-h1 text-navy">Page title</p>
          <p className="type-display text-navy">Section heading</p>
          <p className="type-title text-navy">Small heading</p>
          <p className="type-lede max-w-xl text-slate">Lede. A short supporting sentence under a heading.</p>
          <p className="type-body max-w-xl text-slate">Body. The reading text, kept to a comfortable line length.</p>
          <p className="type-caption text-slate">Caption and small labels.</p>
          <p className="type-kicker text-deep">Kicker</p>
          <p className="type-stat text-navy">200+</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="type-display text-navy">Buttons</h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <span className="btn btn-inverse">Primary on light</span>
          <span className="btn border border-deep text-deep">Secondary on light</span>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 rounded-card bg-navy p-8">
          <span className="btn btn-primary">Primary on navy</span>
          <span className="btn btn-secondary">Secondary on navy</span>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="type-display text-navy">Icons</h2>
        <p className="type-body mt-4 max-w-xl text-slate">
          Stroke icons, 20px and 24px. Deep Signal on paper. Signal Blue on navy.
        </p>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {icons.map(({ name, Icon }) => (
            <li key={name} className="rounded-card border border-mist bg-white p-4">
              <div className="flex items-center gap-4 text-deep">
                <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
              </div>
              <p className="type-caption mt-3 text-navy">{name}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-card bg-navy p-6 text-signal">
          <div className="flex flex-wrap gap-6">
            {icons.map(({ name, Icon }) => (
              <Icon key={name} size={24} strokeWidth={1.75} aria-hidden="true" />
            ))}
          </div>
          <div className="mt-4">
            <SocialLinks />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <h2 className="type-display text-navy">Illustrations</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {illustrationNames.map((name) => (
            <li key={name} className="rounded-card border border-mist bg-white p-6">
              <Illustration name={name} className="h-32 w-full" />
              <p className="type-caption mt-4 text-navy">{name}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
