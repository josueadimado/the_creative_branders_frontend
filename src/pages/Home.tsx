import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowDown,
  ArrowUpRight,
  AppWindow,
  Atom,
  Braces,
  Check,
  Calendar,
  Cloud,
  CodeXml,
  CreditCard,
  Database,
  Fingerprint,
  GitBranch,
  Globe,
  Hexagon,
  Layers,
  MapPin,
  Menu,
  MessageCircle,
  MessagesSquare,
  Smartphone,
  Sparkles,
  Terminal,
  Video,
  Wallet,
  Workflow,
  X,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import FamilyIcon from "../components/FamilyIcon";
import InquiryForm from "../components/InquiryForm";
import Logo from "../components/Logo";
import NetworkGlobe from "../components/NetworkGlobe";
import Seo from "../components/Seo";
import { about } from "../content/about";
import { cta } from "../content/cta";
import { home } from "../content/home";
import { howWeWork } from "../content/services/howWeWork";
import webApplications from "../content/services/webApplications";
import websites from "../content/services/websites";
import { workPage } from "../content/work";
import { track } from "../lib/analytics";
import {
  coverImage,
  displayCountry,
  displayName,
  featuredStudies,
  studyTags,
  type FamilySlug,
} from "../data/portfolio";
import { socials } from "../data/socials";

const siteOrigin = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "The Creative Branders",
  url: siteOrigin || undefined,
  logo: `${siteOrigin}/brand/png/tcb-monogram-dark-512.png`,
  sameAs: socials.map((item) => item.href),
};

const featured = featuredStudies();
const leadStudies = featured.slice(0, 2);
const moreStudies = featured.slice(2);

/**
 * Tools the studio actually ships with.
 * WordPress and Webflow are the site builders named in the website service.
 * The others come from the project stacks.
 */
const tools: { name: string; icon: LucideIcon | "badge" }[] = [
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Hexagon },
  { name: "TypeScript", icon: "badge" },
  { name: "Django", icon: Hexagon },
  { name: "PostgreSQL", icon: Database },
  { name: "WordPress", icon: Globe },
  { name: "Webflow", icon: Layers },
  { name: "Paystack", icon: Wallet },
  { name: "Square", icon: CreditCard },
  { name: "Stripe", icon: CreditCard },
  { name: "WhatsApp", icon: MessageCircle },
  { name: "Twilio", icon: MessageCircle },
  { name: "Celery", icon: Zap },
  { name: "Cloudflare", icon: Cloud },
  { name: "OpenAI", icon: Sparkles },
  { name: "Zoom", icon: Video },
  { name: "Google Calendar", icon: Calendar },
];

/** Questions already published on the service pages. */
const questions = [...websites.faqs, webApplications.faqs[3]];

/**
 * Homepage rows for the four service families.
 * The words here are the short version. The service pages keep the full list.
 */
const buildGroups: {
  slug: FamilySlug;
  name: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
}[] = [
  {
    slug: "brand-websites",
    name: "Brand and websites",
    description:
      "Look established from the first click. We shape your brand and build the website that turns visitors into enquiries.",
    tags: ["Brand identity", "Business websites", "Online stores"],
    icon: Globe,
  },
  {
    slug: "web-applications",
    name: "Web applications",
    description:
      "Software built around how your business works. Customers book, pay and sign in, and your team runs the day from one place.",
    tags: ["Booking and payments", "Client portals", "Admin dashboards"],
    icon: AppWindow,
  },
  {
    slug: "mobile-apps",
    name: "Mobile apps",
    description:
      "iOS and Android apps your customers keep using, from the first version to the app store and every update after.",
    tags: ["iOS and Android", "App design", "App store launch"],
    icon: Smartphone,
  },
  {
    slug: "automation-reporting",
    name: "Automation and reporting",
    description:
      "The routine work runs on its own. Replies, reminders and follow-ups go out on time, and your key numbers update every day.",
    tags: ["WhatsApp assistants", "Reminders and follow-ups", "Dashboards"],
    icon: Workflow,
  },
];

const pageLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
];

/**
 * The small square and uppercase label that sits above a section title.
 */
function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${
        light ? "text-white/70" : "text-slate"
      }`}
    >
      <span className="size-2 shrink-0 bg-signal" aria-hidden="true" />
      {children}
    </p>
  );
}

/**
 * A two-line title. The second line is quieter on a light background.
 */
function SplitTitle({
  id,
  first,
  second,
  light = false,
  accent = false,
}: {
  id?: string;
  first: string;
  second: string;
  light?: boolean;
  accent?: boolean;
}) {
  const secondColour = accent ? "text-signal" : light ? "text-white" : "text-slate";
  return (
    <h2
      id={id}
      className={`mt-4 font-display text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl ${
        light ? "text-white" : "text-navy"
      }`}
    >
      {first}
      <br />
      <span className={secondColour}>{second}</span>
    </h2>
  );
}

function ToolIcon({ tool }: { tool: (typeof tools)[number] }) {
  if (tool.icon === "badge") {
    return (
      <span className="flex size-6 items-center justify-center rounded-sm bg-navy text-[10px] font-semibold text-white">
        TS
      </span>
    );
  }
  const Icon = tool.icon;
  return <Icon className="size-6" strokeWidth={1.5} aria-hidden="true" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <Seo {...home.seo} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organization)}</script>
      </Helmet>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>

      <div className="bg-white text-navy">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-3.5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <Link to="/" aria-label="The Creative Branders home" onClick={() => setMenuOpen(false)}>
              <Logo variant="dark" />
            </Link>
            <nav className="hidden items-center gap-8 text-sm text-white/75 lg:flex" aria-label="Primary">
              {pageLinks.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              ))}
              <Link to="/insights" className="hover:text-white">
                Insights
              </Link>
            </nav>
            <a
              href="#estimate"
              className="hidden items-center justify-self-end gap-2 rounded-md bg-signal px-4 py-2.5 text-sm font-medium text-navy hover:bg-signal-hover lg:inline-flex"
              onClick={() => track("start_project_click", { location: "home-header" })}
            >
              {home.hero.primary}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {menuOpen ? (
            <nav className="flex flex-col gap-5 border-t border-white/10 px-6 py-6 lg:hidden" aria-label="Mobile">
              {pageLinks.map((link) => (
                <a key={link.href} href={link.href} className="font-display text-2xl" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <Link to="/insights" className="font-display text-2xl" onClick={() => setMenuOpen(false)}>
                Insights
              </Link>
              <a href="#estimate" className="font-display text-2xl text-signal" onClick={() => setMenuOpen(false)}>
                {home.hero.primary}
              </a>
            </nav>
          ) : null}
        </header>

        <main id="main-content">
          <section
            className="relative flex min-h-[calc(100dvh-4.875rem)] flex-col overflow-hidden bg-navy text-white"
            aria-labelledby="hero-title"
          >
            <div className="hero-grid" aria-hidden="true" />
            {/* The ball stays inside the first screen so both sides can show. */}
            <NetworkGlobe className="absolute bottom-20 right-0 z-0 h-[20rem] w-[20rem] lg:bottom-auto lg:right-[2%] lg:top-10 lg:h-[36rem] lg:w-[36rem]" />
            <div className="mx-auto grid w-full min-w-0 max-w-[1240px] flex-1 place-content-center items-center gap-8 px-5 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6 lg:py-8">
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm font-semibold text-signal">
                  <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
                  {home.hero.kicker}
                </p>
                <h1
                  id="hero-title"
                  className="mt-8 font-hero text-[3.4rem] font-extrabold leading-[0.82] tracking-tight sm:text-7xl lg:mt-10 lg:text-[7.25rem]"
                >
                  <span className="block whitespace-nowrap">Big ideas.</span>
                  <span className="block text-signal lg:whitespace-nowrap">Real products.</span>
                </h1>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/75 lg:mt-10">{home.hero.lede}</p>
                <div className="mt-8 flex flex-wrap items-center gap-6 lg:mt-10">
                  <a
                    href="#estimate"
                    className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-[15px] font-medium text-navy hover:bg-signal-hover"
                    onClick={() => track("start_project_click", { location: "home-hero" })}
                  >
                    {home.hero.primary}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                  <a href="#work" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
                    {home.hero.secondary}
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* The window and the white card stay stuck together. To move them, change the top space on this box. */}
              <div className="relative mx-auto mt-10 w-full min-w-0 max-w-[640px] pb-8 lg:mt-20 lg:max-w-none lg:pb-4">
                <div className="relative z-10 origin-center rounded-xl border border-white/10 bg-[#101820] shadow-[0_30px_70px_rgb(0_0_0/0.4)] lg:rotate-[4deg]">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 text-[11px] text-white/50">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <i className="size-2 rounded-full bg-white/25" />
                      <i className="size-2 rounded-full bg-white/40" />
                      <i className="size-2 rounded-full bg-signal" />
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Terminal className="size-3" aria-hidden="true" />
                      project.ts
                    </span>
                    <span className="hidden sm:inline">STUDIO / ENGINEERING</span>
                  </div>
                  <div className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-6 text-white/85 sm:px-5 sm:py-5 sm:text-sm sm:leading-7">
                    {[
                      ["01", <span className="text-white/40">{"// From the brief to something people use."}</span>],
                      [
                        "02",
                        <>
                          <span className="text-signal">const</span> project = <span className="text-signal">await</span> studio.
                          <span className="text-white">build</span>({"{"}
                        </>,
                      ],
                      ["03", <>{"  "}start: <span className="text-white">{"'a website or an app'"}</span>,</>],
                      [
                        "04",
                        <>
                          {"  "}then: [<span className="text-white">{"'payments'"}</span>, <span className="text-white">{"'messages'"}</span>,{" "}
                          <span className="text-white">{"'reporting'"}</span>],
                        </>,
                      ],
                      [
                        "05",
                        <>
                          {"  "}where: [<span className="text-white">{"'United States'"}</span>, <span className="text-white">{"'Ghana'"}</span>,{" "}
                          <span className="text-white">{"'Nigeria'"}</span>],
                        </>,
                      ],
                      ["06", <>{"  "}quality: <span className="text-signal">true</span></>],
                      ["07", "});"],
                    ].map(([n, line]) => (
                      <div key={String(n)} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3 whitespace-pre-wrap">
                        <span className="text-right text-white/30" aria-hidden="true">
                          {n}
                        </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 border-t border-white/10 px-4 py-2.5 text-[11px] text-white/45">
                    <GitBranch className="size-3" aria-hidden="true" />
                    main
                  </div>
                </div>
                <div className="relative z-20 ml-6 mt-1 flex w-[min(100%,28rem)] items-center gap-3 border-b-[5px] border-r-[5px] border-signal bg-white px-4 py-3.5 text-navy shadow-xl lg:ml-10 lg:mt-2">
                  <span className="flex size-10 shrink-0 items-center justify-center bg-navy text-signal">
                    <Braces className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-sm">10+ projects shipped</strong>
                    <span className="block text-xs text-slate">United States, Ghana and Nigeria</span>
                  </span>
                  <ArrowUpRight className="ml-auto size-4 shrink-0" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="border-t border-white/10">
              <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-white/45">
                <span className="normal-case tracking-normal">{home.sectors}</span>
                <a href="#services" className="inline-flex shrink-0 items-center gap-2 hover:text-white">
                  Scroll to explore
                  <ArrowDown className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section className="overflow-hidden border-b border-mist bg-white" aria-label="Tools we ship with">
            <div className="mx-auto flex max-w-[1180px] items-center gap-8 px-5 py-6">
              <p className="shrink-0 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-navy">
                Tools we
                <br />
                ship with.
              </p>
              {/* Two copies of the same list. The row slides left until the second copy takes the first copy's place. */}
              <div className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]">
                <div className="tools-marquee flex w-max">
                  {[0, 1].map((copy) => (
                    <ul key={copy} className="flex items-center gap-10 pr-10" aria-hidden={copy === 1}>
                      {tools.map((tool) => (
                        <li key={`${copy}-${tool.name}`} className="inline-flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-navy">
                          <ToolIcon tool={tool} />
                          {tool.name}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="services" className="scroll-mt-24 bg-white px-5 py-20 sm:py-28">
            <div className="mx-auto max-w-[1180px]">
              <div>
                <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-navy sm:text-6xl">
                  What we build
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
                  Most projects start with a website or an app. Automation and reporting usually follow once it's live.
                </p>
              </div>
              {/* Four rows. Each one opens the matching service page. */}
              <div className="mt-16 border-t border-mist">
                {buildGroups.map((group, index) => (
                  <Link
                    key={group.slug}
                    to={`/services/${group.slug}`}
                    className="group grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-4 gap-y-4 border-b border-mist py-8 lg:grid-cols-[3rem_4.5rem_18rem_1fr_3.5rem] lg:gap-x-8 lg:py-10"
                  >
                    <span className="text-sm text-slate">/{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex size-14 items-center justify-center rounded-xl bg-paper text-deep">
                      <group.icon size={24} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="font-display text-2xl font-semibold leading-tight text-navy group-hover:text-deep">
                      {group.name}
                    </span>
                    <span className="col-span-4 min-w-0 lg:col-span-1 lg:col-start-4">
                      <span className="block max-w-md text-sm leading-relaxed text-slate">{group.description}</span>
                      <span className="mt-4 flex flex-wrap gap-2">
                        {group.tags.map((tag) => (
                          <span key={tag} className="rounded-md border border-mist px-2.5 py-1 text-xs text-navy">
                            {tag}
                          </span>
                        ))}
                      </span>
                    </span>
                    <span className="col-start-4 row-start-1 flex size-12 items-center justify-center justify-self-end rounded-full border border-mist text-navy group-hover:border-deep group-hover:text-deep lg:col-start-5">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section id="work" className="scroll-mt-24 bg-paper px-5 py-20 sm:py-28">
            <div className="mx-auto max-w-[1180px]">
              <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <Eyebrow>Work</Eyebrow>
                  <SplitTitle first="Recent" second="work." />
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-slate lg:justify-self-end lg:text-right">{home.work.lede}</p>
              </div>
              <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-10">
                {leadStudies.map((item) => {
                  const name = displayName(item);
                  const shot = coverImage(item);
                  const country = displayCountry(item);
                  return (
                    <article key={item.slug} className="flex flex-col">
                      <Link
                        to={`/work/${item.slug}`}
                        className="relative block overflow-hidden rounded-2xl bg-white"
                        onClick={() => track("case_study_view", { case_study: item.slug })}
                      >
                        {shot ? (
                          <img src={shot} alt="" className="aspect-[16/10] w-full object-cover object-top" />
                        ) : (
                          <span className="flex aspect-[16/10] items-center justify-center bg-tint text-deep">
                            <FamilyIcon family={item.family} />
                          </span>
                        )}
                        <span className="absolute bottom-3 left-3 rounded bg-navy/85 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
                          {item.sector}
                        </span>
                      </Link>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">{item.sector}</span>
                        {country ? (
                          <span className="rounded border border-mist bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate">
                            {country}
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 font-display text-4xl font-semibold leading-tight">
                        <Link to={`/work/${item.slug}`} className="hover:text-deep">
                          {name} <ArrowUpRight className="inline size-6 align-middle" aria-hidden="true" />
                        </Link>
                      </h3>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">{home.work.lines[item.slug] ?? item.summary}</p>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
                        <div className="flex flex-wrap gap-2">
                          {studyTags(item)
                            .slice(0, 3)
                            .map((tag) => (
                              <span key={tag} className="rounded-md border border-mist bg-white px-2 py-1 text-[11px] text-navy">
                                {tag}
                              </span>
                            ))}
                        </div>
                        <Link
                          to={`/work/${item.slug}`}
                          className="inline-flex items-center gap-2 text-sm text-navy hover:text-deep"
                          onClick={() => track("case_study_view", { case_study: item.slug })}
                        >
                          {workPage.read}
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
              <div className="mt-10">
                {moreStudies.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/work/${item.slug}`}
                    className="group flex flex-col gap-3 border-t border-mist py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                    onClick={() => track("case_study_view", { case_study: item.slug })}
                  >
                    <span>
                      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">{item.sector}</span>
                      <strong className="mt-1 block font-display text-xl font-semibold">{displayName(item)}</strong>
                      <span className="mt-1 block text-sm font-normal text-slate">{home.work.lines[item.slug] ?? item.summary}</span>
                    </span>
                    <ArrowUpRight className="size-6 shrink-0 text-navy group-hover:text-deep" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-mist bg-white" aria-label={home.proof.line}>
            <div className="mx-auto max-w-[1180px] px-5 py-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">{home.proof.line}</p>
              <ul className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-5">
                {home.proof.logos.map((item) => (
                  <li key={item.name}>
                    <img src={item.logo} alt={item.name} className="h-8 w-auto" />
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section id="process" className="scroll-mt-24 bg-navy text-white">
            <div className="mx-auto max-w-[1180px] px-5 py-20 sm:py-28">
              <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <Eyebrow light>Process</Eyebrow>
                  <SplitTitle first="How we" second="work." light />
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-white/65 lg:justify-self-end lg:text-right">
                  {home.different.points[0].body}
                </p>
              </div>
              <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                {howWeWork.steps.map((step, index) => (
                  <article key={step.name}>
                    <div className="flex items-center justify-between border-b border-white/15 pb-4">
                      <span className="font-display text-5xl font-semibold text-signal">0{index + 1}</span>
                      <ArrowUpRight className="size-5 text-white/35" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold">{step.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/65">{step.body}</p>
                  </article>
                ))}
              </div>
              <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm">
                <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                  One lead, from the first call to launch
                </span>
                <a href="#estimate" className="inline-flex items-center gap-2 text-signal hover:text-signal-hover">
                  {home.hero.primary}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section id="about" className="relative scroll-mt-24 overflow-hidden bg-white px-5 py-20 sm:py-28">
            <span className="absolute right-8 top-10 hidden h-16 w-16 border-r-2 border-t-2 border-signal lg:block" aria-hidden="true" />
            <div className="mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-2">
              <div>
                <Eyebrow>About</Eyebrow>
                <SplitTitle first="About the" second="studio." />
                <p className="mt-6 max-w-xl text-base leading-relaxed text-slate">{about.hero.lede}</p>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">{about.started.body}</p>
                <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-navy hover:text-deep">
                  Read about the studio
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy">
                  {about.values.items.slice(0, 3).map((item, index) => {
                    const Icon = [CodeXml, MessagesSquare, Fingerprint][index];
                    return (
                      <li key={item.title} className="inline-flex items-center gap-2">
                        <Icon className="size-4 text-deep" aria-hidden="true" />
                        {item.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <figure className="relative">
                <img src={home.approachImage} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 border-b-4 border-signal bg-navy px-4 py-3 text-white">
                  <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
                    <MapPin className="size-3.5 text-signal" aria-hidden="true" />
                    US, Ghana, Nigeria
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-white/60">10 projects</span>
                </div>
                <figcaption className="mt-3 text-xs text-slate">
                  Photo placeholder. We'll swap this when studio photos are ready.
                </figcaption>
              </figure>
            </div>
          </section>

          <section className="border-t border-mist bg-white px-5 py-20 sm:py-28" aria-labelledby="questions-title">
            <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <Eyebrow>Questions</Eyebrow>
                <SplitTitle id="questions-title" first="Before we" second="start." />
              </div>
              <div className="border-t border-mist">
                {questions.map((item) => (
                  <details key={item.question} className="group border-b border-mist">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base text-navy">
                      {item.question}
                      <span className="text-xl leading-none text-slate group-open:hidden" aria-hidden="true">
                        +
                      </span>
                      <span className="hidden text-xl leading-none text-slate group-open:inline" aria-hidden="true">
                        –
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-5 text-sm leading-relaxed text-slate">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section id="estimate" className="scroll-mt-24 bg-paper px-5 py-20 sm:py-28">
            <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
              <div className="lg:sticky lg:top-28">
                <Eyebrow>Start a project</Eyebrow>
                <SplitTitle first="Tell us what" second="you're building." accent />
                <p className="mt-6 max-w-md text-sm leading-relaxed text-slate">{cta.body}</p>
                <ul className="mt-8 flex flex-col gap-3 text-sm">
                  <li className="inline-flex items-center gap-2">
                    <Check className="size-4 text-deep" aria-hidden="true" />
                    We read your brief
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <Check className="size-4 text-deep" aria-hidden="true" />
                    Reply within one business day
                  </li>
                  <li className="inline-flex items-center gap-2">
                    <Check className="size-4 text-deep" aria-hidden="true" />
                    A written proposal and quote
                  </li>
                </ul>
                <div className="mt-8 flex items-start gap-3 border-t border-mist pt-6">
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                  <span className="text-sm">
                    United States, Ghana and Nigeria
                    <small className="mt-1 block text-xs text-slate">We reply within one business day.</small>
                  </span>
                </div>
                <p className="mt-8 max-w-md text-sm text-slate">
                  {home.lab.text}{" "}
                  <Link to="/smartcrm" className="text-deep underline underline-offset-4">
                    {home.lab.link}
                  </Link>
                </p>
              </div>
              <div className="rounded-2xl border border-mist bg-white p-6 shadow-sm sm:p-10">
                <InquiryForm layout="split" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
