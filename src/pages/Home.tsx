import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  AppWindow,
  Atom,
  Braces,
  Calendar,
  Cloud,
  CreditCard,
  Database,
  GitBranch,
  Globe,
  Hexagon,
  Layers,
  Menu,
  MessageCircle,
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
import AuditLink from "../components/AuditLink";
import { BrowserFrame } from "../components/DeviceFrame";
import OptimizedImage from "../components/OptimizedImage";
import FamilyIcon from "../components/FamilyIcon";
import InquiryForm from "../components/InquiryForm";
import Logo from "../components/Logo";
import NetworkGlobe from "../components/NetworkGlobe";
import Seo from "../components/Seo";
import { useHomeCopy, useInsightsMenu, useProjects } from "../content/contentDesk";
import { home } from "../content/home";
import { site } from "../content/site";
import { serviceWhatsAppMessage, whatsappLink } from "../data/socials";
import { workPage } from "../content/work";
import { track, trackWhatsApp } from "../lib/analytics";
import {
  coverImage,
  displayName,
  familyLabel,
  joinCountries,
  projectCountries,
  type FamilySlug,
} from "../data/portfolio";
import { approvedTestimonials, type Testimonial } from "../data/testimonials";
import { serviceSchemas } from "../content/schema";

const siteOrigin = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  description: home.seo.description,
  ...(siteOrigin ? { url: siteOrigin } : {}),
  publisher: { "@type": "Organization", name: site.name },
};

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
      "We help you establish your look from the first click. We shape your brand and build the website that turns visitors into enquiries.",
    tags: ["Brand identity", "Business websites", "Online stores"],
    icon: Globe,
  },
  {
    slug: "web-applications",
    name: "Web applications",
    description:
      "We help you build software around how your business works. We set it up so customers can book, pay and sign in, and your team can run the day from one place.",
    tags: ["Booking and payments", "Client portals", "Admin dashboards"],
    icon: AppWindow,
  },
  {
    slug: "mobile-apps",
    name: "Mobile apps",
    description:
      "We help you build iOS and Android apps your customers keep using. We take the app from the first version to the app store, and we handle every update after.",
    tags: ["iOS and Android", "App design", "App store launch"],
    icon: Smartphone,
  },
  {
    slug: "automation-reporting",
    name: "Automation and reporting",
    description:
      "We help you automate the routine work. We set up the replies, reminders and follow-ups so they go out on time, and we keep your key numbers updating every day.",
    tags: ["WhatsApp assistants", "Reminders and follow-ups", "Dashboards"],
    icon: Workflow,
  },
];

const basePageLinks = [
  // Services stays on this page. The link only scrolls to that section.
  { href: "#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

/** A link on this page stays an anchor. A link to another page uses the app router. */
function HomeNavLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className: string;
  children: string;
  onClick?: () => void;
}) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} className={className} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

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
  nowrap = false,
}: {
  id?: string;
  first: string;
  second: string;
  light?: boolean;
  accent?: boolean;
  /** Keep the second line on one line, for a long sentence. */
  nowrap?: boolean;
}) {
  // The bright blue is too light on a white section, so that line uses the darker blue.
  const secondColour = accent ? "text-deep" : light ? "text-white" : "text-slate";
  return (
    <h2
      id={id}
      className={`mt-4 font-display text-5xl font-semibold leading-[0.92] tracking-tight sm:text-6xl ${
        light ? "text-white" : "text-navy"
      }`}
    >
      {first}
      <br />
      <span className={`${secondColour} ${nowrap ? "block lg:whitespace-nowrap" : ""}`}>{second}</span>
    </h2>
  );
}

/** The homepage title is two lines. The split is the first full stop. */
function HeroTitle({ title }: { title: string }) {
  const splitAt = title.indexOf(".");
  const first = splitAt === -1 ? title : title.slice(0, splitAt + 1).trim();
  const second = splitAt === -1 ? "" : title.slice(splitAt + 1).trim();

  return (
    <>
      <span className="block">{first}</span>
      {second ? <span className="block text-signal">{second}</span> : null}
    </>
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

/** Shown only when two or more clients have approved a quote. */
function ClientQuotes({ items }: { items: Testimonial[] }) {
  if (items.length < 2) return null;
  return (
    <section className="border-b border-mist bg-white px-5 py-20 sm:py-28" aria-label="What clients say">
      <div className="mx-auto max-w-[1180px]">
        <Eyebrow>Clients</Eyebrow>
        <ul className="mt-10 grid gap-10 md:grid-cols-2">
          {items.map((item) => (
            <li key={`${item.company}-${item.role}-${item.quote}`} className="border-t border-mist pt-8">
              <blockquote className="font-display text-2xl font-semibold leading-snug text-navy">“{item.quote}”</blockquote>
              <p className="mt-6 text-sm text-slate">
                {item.role}, {item.company}
                {item.project ? ` · ${item.project}` : null}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function Home() {
  const homeLive = useHomeCopy();
  const projects = useProjects();
  const where = projectCountries(projects);
  const countryLine = joinCountries(where);
  const leadStudies = projects.filter((item) => item.featured).slice(0, 2);
  const showInsights = useInsightsMenu();
  const pageLinks = showInsights ? [...basePageLinks, { href: "/insights", label: "Insights" }] : basePageLinks;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <Seo
        {...homeLive.seo}
        jsonLd={[
          { ...website, description: homeLive.seo.description },
          ...serviceSchemas(),
        ]}
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-navy"
      >
        Skip to content
      </a>

      <div className="bg-white text-navy">
        <header className="sticky top-0 z-40 border-b border-white/10 bg-navy text-white">
          <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 px-5 py-3.5 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <Link to="/" aria-label={`${site.name} home`} onClick={() => setMenuOpen(false)}>
              <Logo variant="dark" />
            </Link>
            <nav className="hidden items-center gap-8 text-sm text-white/75 lg:flex" aria-label="Primary">
              {pageLinks.map((link) => (
                <HomeNavLink key={link.href} href={link.href} className="hover:text-white">
                  {link.label}
                </HomeNavLink>
              ))}
            </nav>
            <AuditLink
              className="hidden max-w-xs items-center justify-self-end rounded-md bg-signal px-4 py-2.5 text-left text-sm font-medium leading-snug text-navy hover:bg-signal-hover lg:inline-flex"
              location="home-header"
            />
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
                <HomeNavLink
                  key={link.href}
                  href={link.href}
                  className="font-display text-2xl"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </HomeNavLink>
              ))}
              <AuditLink className="font-display text-2xl text-signal" location="home-header" />
              <a href="#estimate" className="font-display text-2xl text-white" onClick={() => setMenuOpen(false)}>
                {homeLive.hero.secondary}
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
                  {homeLive.hero.kicker}
                </p>
                {/* Montserrat, same semibold weight as the other titles. The size grows with the screen so both lines stay inside the column. */}
                <h1
                  id="hero-title"
                  className="mt-8 font-display text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-tight lg:mt-10"
                >
                  <HeroTitle title={homeLive.hero.title} />
                </h1>
                <p className="type-body mt-8 max-w-lg text-white/75 lg:mt-10">{homeLive.hero.lede}</p>
                <div className="mt-8 flex flex-wrap items-center gap-6 lg:mt-10">
                  <AuditLink
                    className="inline-flex max-w-md items-center rounded-md bg-signal px-5 py-3 text-left text-[15px] font-medium leading-snug text-navy hover:bg-signal-hover"
                    location="home-hero"
                  />
                  <a href="#estimate" className="inline-flex min-h-11 items-center gap-2 text-sm text-white/80 hover:text-white">
                    {homeLive.hero.secondary}
                    <ArrowDown className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* The window and the white card stay stuck together. To move them, change the top space on this box. */}
              <div className="relative mx-auto mt-10 w-full min-w-0 max-w-[640px] pb-8 lg:mt-20 lg:max-w-none lg:pb-4">
                <div className="relative z-10 origin-center rounded-xl border border-white/10 bg-[#101820] shadow-[0_30px_70px_rgb(0_0_0/0.4)] lg:rotate-[4deg]">
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5 text-[11px] text-white/75">
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
                      ["01", <span className="text-white/75">{"// From the brief to something people use."}</span>],
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
                          {"  "}where: [
                          {where.map((name, index) => (
                            <span key={name}>
                              {index > 0 ? ", " : null}
                              <span className="text-white">{`'${name}'`}</span>
                            </span>
                          ))}
                          ],
                        </>,
                      ],
                      ["06", <>{"  "}quality: <span className="text-signal">true</span></>],
                      ["07", "});"],
                    ].map(([n, line]) => (
                      <div key={String(n)} className="grid grid-cols-[1.75rem_minmax(0,1fr)] gap-3 whitespace-pre-wrap">
                        <span className="text-right text-white/75" aria-hidden="true">
                          {n}
                        </span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 border-t border-white/10 px-4 py-2.5 text-[11px] text-white/75">
                    <GitBranch className="size-3" aria-hidden="true" />
                    main
                  </div>
                </div>
                <div className="relative z-20 ml-6 mt-1 flex w-[min(100%,28rem)] items-center gap-3 border-b-[5px] border-r-[5px] border-signal bg-white px-4 py-3.5 text-navy shadow-xl lg:ml-10 lg:mt-2">
                  <span className="flex size-10 shrink-0 items-center justify-center bg-navy text-signal">
                    <Braces className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-sm">
                      {projects.length} {projects.length === 1 ? "project" : "projects"} shipped
                    </strong>
                    {countryLine ? <span className="block text-xs text-slate">{countryLine}</span> : null}
                  </span>
                  <ArrowUpRight className="ml-auto size-4 shrink-0" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div className="border-t border-white/10">
              <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-4 text-[11px] uppercase tracking-[0.18em] text-white/75">
                <span className="normal-case tracking-normal">{homeLive.sectors}</span>
                <a href="#services" className="inline-flex min-h-11 shrink-0 items-center gap-2 hover:text-white">
                  Scroll to explore
                  <ArrowDown className="size-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>

          <section className="overflow-hidden border-b border-mist bg-white" aria-label="Tools we ship with">
            {/* On a phone the label sits above the row, so the names have the full width. */}
            <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:gap-8 sm:py-6">
              <p className="shrink-0 text-[11px] font-semibold uppercase leading-snug tracking-[0.16em] text-navy">
                Tools we
                <br className="hidden sm:block" /> ship with.
              </p>
              {/* Two copies of the same list. The row slides left until the second copy takes the first copy's place. */}
              <div className="min-w-0 w-full flex-1 touch-pan-y overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)]">
                <div className="tools-marquee flex w-max select-none">
                  {[0, 1].map((copy) => (
                    <ul key={copy} className="flex items-center gap-8 pr-8 sm:gap-10 sm:pr-10" aria-hidden={copy === 1}>
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
                <p className="type-body mt-6 max-w-xl text-slate">
                  The brand and the website, the software your team runs, apps for iPhone and Android, and the reminders and reports that update on their own.
                </p>
              </div>
              {/* Four rows. The detail lives here, so these do not open another page. */}
              <div className="mt-16 border-t border-mist">
                {buildGroups.map((group, index) => (
                  <div
                    key={group.slug}
                    className="grid grid-cols-[auto_auto_1fr] items-center gap-x-4 gap-y-4 border-b border-mist py-8 lg:grid-cols-[3rem_4.5rem_18rem_1fr] lg:gap-x-8 lg:py-10"
                  >
                    <span className="text-sm text-slate">/{String(index + 1).padStart(2, "0")}</span>
                    <span className="flex size-14 items-center justify-center rounded-xl bg-paper text-deep">
                      <group.icon size={24} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="font-display text-2xl font-semibold leading-tight text-navy">
                      {group.name}
                    </span>
                    <div className="col-span-3 min-w-0 lg:col-span-1">
                      <span className="type-body block max-w-none text-slate">{group.description}</span>
                      <span className="mt-4 flex flex-wrap gap-2">
                        {group.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center rounded-full bg-tint px-3 py-1 text-xs font-medium text-deep">
                            {tag}
                          </span>
                        ))}
                      </span>
                      <a
                        href={whatsappLink(serviceWhatsAppMessage(group.name))}
                        className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-deep hover:text-navy"
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackWhatsApp("service")}
                      >
                        Ask on WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="work" className="scroll-mt-24 bg-white px-5 py-20 sm:py-28">
            <div className="mx-auto max-w-[1180px]">
              <div>
                <Eyebrow>Selected work</Eyebrow>
                <SplitTitle first="Some of the projects" second="we built to make a difference." nowrap />
              </div>
              {/* Two large cards. Each image, title and "Read the case study" opens that project. */}
              <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-12">
                {leadStudies.map((item) => {
                  const name = displayName(item);
                  const shot = coverImage(item);
                  const studyPath = `/work/${item.slug}`;
                  // On hover the screen tips a little left and lifts. People who prefer less motion stay still.
                  const shotMotion =
                    "origin-center transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:-rotate-2";
                  return (
                    <article key={item.slug} className="group flex flex-col">
                      <Link
                        to={studyPath}
                        className="relative block overflow-hidden rounded-2xl bg-tint p-5 sm:p-8"
                        onClick={() => track("case_study_view", { case_study: item.slug })}
                      >
                        {shot ? (
                          <BrowserFrame
                            src={shot}
                            alt={`${name} on screen`}
                            embedded
                            loading="lazy"
                            className={`overflow-hidden rounded-xl border border-mist ${shotMotion}`}
                          />
                        ) : (
                          <span className={`flex aspect-[16/10] items-center justify-center rounded-xl bg-white text-deep ${shotMotion}`}>
                            <FamilyIcon family={item.family} />
                          </span>
                        )}
                        {/* Hidden until the pointer is over this project. */}
                        <span className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full border border-mist bg-white text-navy opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </span>
                        <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.16em] text-navy">
                          {item.sector} · {familyLabel(item.family)}
                        </span>
                      </Link>
                      {/* Sized to stay on one line beside the other project, including the arrow. */}
                      <h3 className="mt-6 font-display text-3xl font-semibold leading-tight lg:whitespace-nowrap lg:text-[clamp(1.65rem,2.3vw,2.05rem)]">
                        <Link
                          to={studyPath}
                          className="hover:text-deep"
                          onClick={() => track("case_study_view", { case_study: item.slug })}
                        >
                          {name} <ArrowUpRight className="inline size-6 align-middle" aria-hidden="true" />
                        </Link>
                      </h3>
                      <Link
                        to={studyPath}
                        className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-navy hover:text-deep"
                        onClick={() => track("case_study_view", { case_study: item.slug })}
                      >
                        {workPage.read}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    </article>
                  );
                })}
              </div>
              <div className="mt-14 flex justify-center">
                <Link
                  to="/work"
                  className="inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-[15px] font-medium text-white hover:bg-deep"
                >
                  {homeLive.work.link}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          <section className="overflow-hidden border-y border-mist bg-white py-16" aria-label={homeLive.proof.line}>
            <p className="px-5 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate">
              {homeLive.proof.line}
            </p>
            {/* Each mark sits in the same size box, so a wide logo does not open a big empty gap.
                Two copies sit side by side so the row can slide without a jump. */}
            <div className="mt-8 touch-pan-y overflow-hidden sm:mt-10 [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-16px),transparent)]">
              <div className="logo-marquee flex w-max select-none">
                {[0, 1].map((copy) => (
                  <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
                    {homeLive.proof.logos.map((item) => (
                      <li key={`${copy}-${item.name}`} className="flex h-14 w-[7.25rem] shrink-0 items-center justify-center px-2 sm:h-16 sm:w-44 sm:px-4">
                        <OptimizedImage
                          src={item.logo}
                          alt={copy === 0 ? item.name : ""}
                          width={240}
                          height={80}
                          draggable={false}
                          className="max-h-9 w-auto max-w-full object-contain sm:max-h-12"
                        />
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </section>

          <ClientQuotes items={approvedTestimonials()} />

          <section id="estimate" className="scroll-mt-24 bg-paper px-5 py-20 sm:py-28">
            <div className="mx-auto grid max-w-[1180px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
              <div className="min-w-0 lg:sticky lg:top-28">
                <Eyebrow>Start a project</Eyebrow>
                <SplitTitle first="Tell us what" second="you're building." accent />
              </div>
              <div className="min-w-0 rounded-2xl border border-mist bg-white p-6 shadow-sm sm:p-10">
                <InquiryForm layout="split" />
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
