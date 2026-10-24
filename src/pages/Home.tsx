import { useEffect, useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Helmet } from "react-helmet-async";
import { Menu, Minus, Plus, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { BrowserFrame, BrowserPlaceholder } from "../components/DeviceFrame";
import FamilyIcon from "../components/FamilyIcon";
import Logo from "../components/Logo";
import Seo from "../components/Seo";
import { cta } from "../content/cta";
import { home } from "../content/home";
import { articles, formatInsightDate } from "../content/insights";
import { serviceFamilies } from "../content/services";
import { howWeWork } from "../content/services/howWeWork";
import { workPage } from "../content/work";
import { track } from "../lib/analytics";
import { coverImage, displayName, featuredStudies, studyTags } from "../data/portfolio";
import { socials, studioEmail, whatsappHref } from "../data/socials";

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

/** Same links as the dark bar on the other pages. */
const navLinks = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
];

/**
 * Case-study cards take turns through the brand backgrounds.
 * Navy is the only dark one, so its text and links flip.
 */
const workLooks = [
  { shell: "bg-navy text-white", muted: "text-white/70", link: "text-signal" },
  { shell: "bg-tint text-navy", muted: "text-slate", link: "text-deep" },
  { shell: "bg-paper text-navy", muted: "text-slate", link: "text-deep" },
  { shell: "bg-gold-tint text-navy", muted: "text-slate", link: "text-deep" },
];

const workLogos: Record<string, string> = {
  "relief-chiropractic": "/images/logos/relief-chiropractic.png",
  "push-it": "/images/logos/push-it.png",
  "come-clarity": "/images/logos/come-clarity.png",
  "up2date-connect": "/images/logos/up2date-connect.png",
};

/** The same sector line twice, so the scroll can loop without a jump. */
const sectorBand = `${home.sectors}   ${home.sectors}   `;

/**
 * The black button used on this page.
 * It is a rounded rectangle, matching the reference, not the pill used elsewhere.
 */
function SolidButton({
  to,
  children,
  location,
  onDark = false,
}: {
  to: string;
  children: string;
  location: string;
  /** Signal button when it sits on navy. Navy button on paper, white, or the tints. */
  onDark?: boolean;
}) {
  const colours = onDark
    ? "bg-signal text-navy hover:bg-signal-hover"
    : "bg-navy text-white hover:bg-deep";

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center rounded-2xl px-6 py-3.5 text-[15px] font-medium transition-colors ${colours}`}
      onClick={() => track("start_project_click", { location })}
    >
      {children}
    </Link>
  );
}

/**
 * Organisation logos.
 * On a wide screen they stay in one row, in grey, with a short line between each.
 * On a phone they wrap onto more than one line.
 */
function LogoRow({ wide = false }: { wide?: boolean }) {
  return (
    <div className={wide ? "w-full" : undefined}>
      <p className={`text-center text-navy ${wide ? "text-[13px]" : "text-sm text-slate"}`}>
        {home.proof.line}
      </p>
      <ul className={`mt-4 flex items-center justify-center ${wide ? "flex-nowrap" : "flex-wrap"}`}>
        {home.proof.logos.map((item, index) => (
          <li key={item.name} className="flex items-center">
            <img
              src={item.logo}
              alt={item.name}
              className={`w-auto object-contain grayscale opacity-80 transition hover:opacity-100 hover:grayscale-0 ${
                wide ? "h-6 max-w-[3rem]" : "m-2 h-6 max-w-[4.25rem]"
              }`}
            />
            {wide && index < home.proof.logos.length - 1 ? (
              <span className="mx-2.5 h-6 w-px shrink-0 bg-mist" aria-hidden="true" />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Bottom edge of the white card on a wide screen.
 * The right side rises in one smooth wave, the same shape as the reference,
 * so the logos sit on the colour showing through.
 */
function HeroWave() {
  return (
    <svg
      className="hidden h-[200px] w-full lg:block"
      viewBox="0 0 1240 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        fill="#ffffff"
        d="M0 0 H1240 V16 A44 44 0 0 1 1196 60 H720 C590 60, 620 200, 460 200 H44 A44 44 0 0 1 0 156 V0 Z"
      />
    </svg>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openPanel, setOpenPanel] = useState(0);
  const [dockVisible, setDockVisible] = useState(false);
  const menuSentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    featured.forEach((item) => {
      const src = coverImage(item);
      if (!src) return;
      const img = new Image();
      img.src = src;
    });
  }, []);

  // The bottom menu stays hidden until the top menu has scrolled away.
  useEffect(() => {
    const node = menuSentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setDockVisible(!entry.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // A full-screen menu should not leave the page scrolling behind it.
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

      <div id="home" className="bg-white text-navy">
        {/* Phone header. On a wide screen the same links sit inside the white card. */}
        <header className="sticky top-0 z-40 border-b border-mist bg-white lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <Link to="/" className="inline-flex" onClick={() => setMenuOpen(false)}>
              <Logo variant="black" />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
          {menuOpen ? (
            <nav className="fixed inset-0 z-40 flex flex-col bg-white px-6 pb-12 pt-24" aria-label="Mobile">
              <button
                type="button"
                className="absolute right-4 top-4 inline-flex size-11 items-center justify-center"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <X />
              </button>
              <div className="flex flex-1 flex-col gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-3xl font-semibold"
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
              <Link
                to="/contact"
                onClick={() => {
                  setMenuOpen(false);
                  track("start_project_click", { location: "home-menu" });
                }}
                className="inline-flex w-fit rounded-2xl bg-navy px-6 py-3.5 text-white hover:bg-deep"
              >
                {home.hero.primary}
              </Link>
            </nav>
          ) : null}
        </header>

        {/* Pale wash behind the opening, the same idea as the reference background. */}
        <div className="bg-[linear-gradient(145deg,#F5F6F3_0%,#ffffff_48%,#E3F0F6_100%)]">
          <section className="px-3 pb-4 pt-3 sm:px-6 sm:pt-6 lg:px-10 lg:pt-8">
            <div className="relative mx-auto max-w-[1240px]">
            <div className="rounded-[40px] bg-white px-6 py-8 sm:px-10 sm:py-12 lg:rounded-b-none lg:px-16 lg:pb-10 lg:pt-8">
              <div ref={menuSentinel} className="h-px w-full" aria-hidden="true" />
              <div className="hidden items-center justify-between gap-8 lg:flex">
                <Link to="/" className="inline-flex shrink-0">
                  <Logo variant="black" />
                </Link>
                <nav className="flex items-center gap-8" aria-label="Primary">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `text-[15px] font-medium ${isActive ? "text-navy" : "text-navy/70 hover:text-navy"}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </nav>
                <SolidButton to="/contact" location="home-header">
                  {home.hero.primary}
                </SolidButton>
              </div>

              <div className="mt-10 grid items-center gap-10 lg:mt-20 lg:grid-cols-2 lg:gap-12">
                <div>
                  <p className="inline-flex items-center rounded-full border border-mist bg-white/70 px-3 py-1 text-sm text-deep">
                    {home.hero.kicker}
                  </p>
                  <h1 className="mt-6 font-display text-[2.65rem] font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:text-[4.4rem]">
                    {home.hero.title}
                  </h1>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">{home.hero.lede}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <SolidButton to="/contact" location="home">
                      {home.hero.primary}
                    </SolidButton>
                    <Link to="/work" className="text-navy underline decoration-navy/40 underline-offset-4">
                      {home.hero.secondary}
                    </Link>
                  </div>
                </div>
                <img
                  src={home.hero.image}
                  alt=""
                  className="h-64 w-full rounded-[28px] object-cover sm:h-80 lg:h-[26rem]"
                />
              </div>

            </div>

            {/* The wave is the bottom of the card. Logos sit in the open part, to the right of the curve. */}
            <HeroWave />
            <div id="organisations" className="absolute bottom-0 right-[3%] hidden h-[132px] w-[40%] items-center lg:flex">
              <LogoRow wide />
            </div>
            </div>

            <div className="mx-auto mt-8 max-w-[1240px] px-2 lg:hidden">
              <LogoRow />
            </div>
          </section>

          <section id="services" className="scroll-mt-24 px-6 pb-24 pt-16 sm:pb-32 sm:pt-20">
            <div className="mx-auto grid max-w-[1240px] items-start gap-12 lg:grid-cols-2 lg:gap-20">
              <div className="lg:sticky lg:top-10">
                <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                  <Link to="/services" className="hover:text-deep">
                    {home.offer.title}
                  </Link>
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">{home.offer.lede}</p>
              </div>
              <Accordion.Root type="single" collapsible className="flex flex-col gap-5">
                {serviceFamilies.map((family) => (
                  <Accordion.Item
                    key={family.slug}
                    value={family.slug}
                    className="overflow-hidden rounded-[28px] border-2 border-mist bg-white/60 data-[state=open]:border-deep data-[state=open]:bg-white"
                  >
                    <Accordion.Header className="m-0">
                      <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent px-7 py-7 text-left">
                        <span className="font-display text-xl font-semibold">{family.name}</span>
                        <Plus className="size-5 shrink-0 text-deep group-data-[state=open]:hidden" aria-hidden="true" />
                        <Minus className="hidden size-5 shrink-0 text-deep group-data-[state=open]:block" aria-hidden="true" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content>
                      <p className="px-7 text-navy">{family.promise}</p>
                      <ul className="mt-4 space-y-2 px-7 text-slate">
                        {family.services.slice(0, 3).map((service) => (
                          <li key={service.title}>{service.title}</li>
                        ))}
                      </ul>
                      <p className="px-7 pb-7 pt-4">
                        <Link to={`/services/${family.slug}`} className="text-deep underline decoration-deep/40 underline-offset-4">
                          View {family.name}
                        </Link>
                      </p>
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </div>
          </section>
        </div>

        {/* Photo on the left. Numbers and service tiles on the right. */}
        <section className="bg-white px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1240px] items-center gap-16 lg:grid-cols-2">
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-8 -z-10 rounded-[48px] bg-[linear-gradient(140deg,#F5F6F3,#ffffff_50%,#E3F0F6)] blur-2xl"
                aria-hidden="true"
              />
              <img
                src={home.built.image}
                alt=""
                className="relative aspect-[4/5] w-full rotate-2 rounded-[32px] object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{home.built.title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate">{home.built.lede}</p>
              <ul className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
                {home.proof.stats.map((stat) => (
                  <li key={stat.label}>
                    <p className="font-display text-5xl font-semibold tracking-tight text-deep">{stat.value}</p>
                    <p className="mt-2 text-sm text-slate">{stat.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Wide panels. The open one shows the reason. The others stay as slim titles. */}
        <section className="bg-white px-6 pb-8">
          <div className="mx-auto max-w-[1240px] text-center">
            <h2 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {home.different.title}
            </h2>
          </div>

          <div className="mx-auto mt-12 hidden h-[28rem] max-w-[1240px] gap-3 lg:flex">
            {home.different.points.map((point, index) => {
              const open = openPanel === index;
              return (
                <button
                  key={point.title}
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenPanel(index)}
                  className={`overflow-hidden rounded-[28px] border text-left text-navy transition-all ${
                    open ? "flex-[4] border-deep bg-white p-8" : "w-16 border-mist bg-paper"
                  }`}
                >
                  {open ? (
                    <span className="flex h-full flex-col">
                      <span className="font-display text-3xl font-semibold">{point.title}</span>
                      <span className="mt-4 max-w-md text-slate">{point.body}</span>
                    </span>
                  ) : (
                    <span className="flex h-full items-center justify-center px-2 font-display text-sm font-semibold [writing-mode:vertical-rl]">
                      {point.title}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <Accordion.Root type="single" collapsible className="mx-auto mt-10 flex max-w-[1240px] flex-col gap-4 lg:hidden">
            {home.different.points.map((point) => (
              <Accordion.Item
                key={point.title}
                value={point.title}
                className="overflow-hidden rounded-[28px] border-2 border-mist bg-paper data-[state=open]:border-deep data-[state=open]:bg-white"
              >
                <Accordion.Header className="m-0">
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 bg-transparent px-6 py-6 text-left">
                    <span className="font-display text-lg font-semibold">{point.title}</span>
                    <Plus className="size-5 shrink-0 text-deep group-data-[state=open]:hidden" aria-hidden="true" />
                    <Minus className="hidden size-5 shrink-0 text-deep group-data-[state=open]:block" aria-hidden="true" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content>
                  <p className="px-6 pb-6 text-slate">{point.body}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </section>

        <div className="overflow-hidden border-y border-mist bg-white py-8" aria-hidden="true">
          <div className="home-marquee flex w-max">
            {[0, 1].map((copy) => (
              <p
                key={copy}
                className="px-8 font-display text-5xl font-semibold tracking-tight text-transparent sm:text-7xl"
                style={{ WebkitTextStroke: "1.5px #0E1E2B" }}
              >
                {sectorBand}
              </p>
            ))}
          </div>
        </div>

        <section id="approach" className="scroll-mt-24 bg-white px-6 py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1240px] items-start gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{howWeWork.title}</h2>
              <ol className="mt-10 space-y-8">
                {howWeWork.steps.map((step, index) => (
                  <li key={step.name} className="flex gap-5">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-deep font-display text-sm font-semibold text-deep">
                      0{index + 1}
                    </span>
                    <span>
                      <span className="block font-display text-xl font-semibold">{step.name}</span>
                      <span className="mt-2 block text-slate">{step.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="lg:sticky lg:top-24">
              <div className="relative mx-auto max-w-md">
                <img
                  src={home.approachImage}
                  alt=""
                  className="aspect-[4/5] w-full -rotate-2 rounded-[32px] object-cover"
                />
                <Link
                  to="/contact"
                  onClick={() => track("start_project_click", { location: "home-approach" })}
                  className="absolute bottom-6 left-6 rounded-full bg-white px-5 py-3 text-sm font-medium text-navy"
                >
                  {home.hero.primary}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 bg-paper px-3 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-[1100px] text-center">
            <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{home.work.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate">{home.work.lede}</p>
          </div>
          <div className="mx-auto mt-14 max-w-[1100px] space-y-6">
            {featured.map((item, index) => {
              const look = workLooks[index] ?? workLooks[1];
              const name = displayName(item);
              return (
                <article
                  key={item.slug}
                  className={`rounded-[30px] px-6 py-8 sm:px-10 sm:py-10 md:sticky md:top-6 md:min-h-[70vh] ${look.shell}`}
                >
                  <div className="flex items-start justify-between gap-6">
                    {workLogos[item.slug] ? (
                      <span className="inline-flex rounded-xl bg-white px-3 py-2">
                        <img
                          src={workLogos[item.slug]}
                          alt=""
                          className="h-8 w-auto max-w-[7rem] object-contain"
                        />
                      </span>
                    ) : (
                      <h3 className="font-display text-3xl font-semibold sm:text-4xl">{name}</h3>
                    )}
                  </div>
                  {workLogos[item.slug] ? (
                    <h3 className="mt-6 font-display text-3xl font-semibold sm:text-4xl">{name}</h3>
                  ) : null}
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {studyTags(item).map((tag) => (
                      <li key={tag} className="tag bg-white/80 text-slate">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    {coverImage(item) ? (
                      <BrowserFrame src={coverImage(item) as string} alt="" embedded />
                    ) : (
                      <BrowserPlaceholder label={name} embedded />
                    )}
                  </div>
                  <p className={`mt-6 max-w-xl ${look.muted}`}>{home.work.lines[item.slug] ?? item.summary}</p>
                  <p className="mt-6">
                    <Link
                      to={`/work/${item.slug}`}
                      className={`underline underline-offset-4 ${look.link}`}
                      onClick={() => track("case_study_view", { case_study: item.slug })}
                    >
                      {workPage.read}
                    </Link>
                  </p>
                </article>
              );
            })}
          </div>
          <p className="mx-auto mt-10 max-w-[1100px] text-center">
            <Link to="/work" className="text-lg underline underline-offset-4">
              {home.work.link}
            </Link>
          </p>
        </section>

        {articles.length > 0 ? (
          <section className="bg-white px-6 py-24 sm:py-32">
            <div className="mx-auto max-w-[1240px]">
              <h2 className="font-display text-4xl font-semibold tracking-tight">
                <Link to="/insights">Notes from the studio</Link>
              </h2>
              <div className="mt-12 grid gap-10 md:grid-cols-3">
                {articles.slice(0, 3).map((article) => (
                  <article key={article.slug}>
                    <Link to={`/insights/${article.slug}`} className="block">
                      <FamilyIcon family={article.family} className="text-deep" />
                      <p className="mt-5 flex flex-wrap gap-x-3 text-sm text-slate">
                        <span>{article.familyLabel}</span>
                        <span>{formatInsightDate(article.date)}</span>
                      </p>
                      <h3 className="mt-3 font-display text-xl font-semibold">{article.title}</h3>
                      <p className="mt-3 text-slate">{article.description}</p>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="bg-white px-3 pb-16 sm:px-6">
          <div className="mx-auto grid max-w-[1240px] overflow-hidden rounded-[40px] lg:grid-cols-2">
            <div className="bg-navy px-8 py-12 text-white sm:px-12 sm:py-16">
              <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">{cta.title}</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/75">{cta.body}</p>
              <div className="mt-8">
                <SolidButton to="/contact" location="home-cta" onDark>
                  {cta.primary}
                </SolidButton>
              </div>
              <p className="mt-10 max-w-md text-white/75">
                {home.lab.text}{" "}
                <Link to="/smartcrm" className="text-signal underline underline-offset-4">
                  {home.lab.link}
                </Link>
              </p>
            </div>
            <div className="flex flex-col justify-center gap-6 bg-tint px-8 py-12 sm:px-12">
              <Link to="/contact" className="font-display text-3xl font-semibold text-navy hover:text-deep sm:text-4xl">
                Send a brief
              </Link>
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-3xl font-semibold text-navy hover:text-deep sm:text-4xl"
                  onClick={() => track("whatsapp_click", { location: "home-cta" })}
                >
                  Chat on WhatsApp
                </a>
              ) : null}
              <a
                href={`mailto:${studioEmail}`}
                className="font-display text-2xl font-semibold text-navy hover:text-deep sm:text-3xl"
              >
                {studioEmail}
              </a>
            </div>
          </div>
        </section>

        <nav
          className={`fixed bottom-5 left-1/2 z-40 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-full border border-mist bg-white/95 px-2 py-2 text-navy ${
            dockVisible ? "flex" : "hidden"
          }`}
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="whitespace-nowrap rounded-full px-3 py-2 text-sm hover:bg-paper">
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="whitespace-nowrap rounded-full bg-navy px-3 py-2 text-sm text-white hover:bg-deep"
            onClick={() => track("start_project_click", { location: "home-dock" })}
          >
            {home.hero.primary}
          </Link>
        </nav>
      </div>
    </>
  );
}
