import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { about } from "./about";
import { contact } from "./contact";
import { home } from "./home";
import { articles, insightsMenuOpen, type InsightArticle } from "./insights";
import { workPage } from "./work";
import { familyLabel, publishedWork, type FamilySlug, type PortfolioItem } from "../data/portfolio";
import { apiRoot } from "../lib/apiBase";

const API_URL = apiRoot();

/** One page's words, as the content desk sends them. */
export type RemotePage = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  kicker: string;
  headline: string;
  lede: string;
  sectionTitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  stats: { value: string; label: string }[];
};

type RemoteNote = {
  slug: string;
  title: string;
  description: string;
  body: string;
  family: FamilySlug;
  publishedOn: string | null;
};

type Desk = {
  /** ready means the desk answered. fallback means the site keeps its built-in copy. */
  status: "loading" | "ready" | "fallback";
  projects: PortfolioItem[];
  pages: Record<string, RemotePage>;
  notes: RemoteNote[];
};

const ContentDesk = createContext<Desk>({
  status: "loading",
  projects: [],
  pages: {},
  notes: [],
});

async function readList<T>(response: Response): Promise<T[]> {
  const data = await response.json();
  if (Array.isArray(data)) return data as T[];
  if (data && Array.isArray(data.results)) return data.results as T[];
  return [];
}

/** Loads the content desk once, then shares it with every page. */
export function ContentDeskProvider({ children }: { children: ReactNode }) {
  const [desk, setDesk] = useState<Desk>({ status: "loading", projects: [], pages: {}, notes: [] });

  useEffect(() => {
    let cancel = false;

    async function load() {
      try {
        const [projectsRes, pagesRes, notesRes] = await Promise.all([
          fetch(`${API_URL}/content/projects/`),
          fetch(`${API_URL}/content/pages/`),
          fetch(`${API_URL}/content/notes/`),
        ]);
        if (!projectsRes.ok || !pagesRes.ok || !notesRes.ok) throw new Error("content desk");
        const [projects, pages, notes] = await Promise.all([
          readList<PortfolioItem>(projectsRes),
          readList<RemotePage>(pagesRes),
          readList<RemoteNote>(notesRes),
        ]);
        if (cancel) return;
        const bySlug: Record<string, RemotePage> = {};
        pages.forEach((page) => {
          bySlug[page.slug] = page;
        });
        setDesk({ status: "ready", projects, pages: bySlug, notes });
      } catch {
        if (!cancel) setDesk({ status: "fallback", projects: [], pages: {}, notes: [] });
      }
    }

    load();
    return () => {
      cancel = true;
    };
  }, []);

  // The prerender step waits until this is true, so a saved page is not the starter list.
  useEffect(() => {
    const settled = desk.status !== "loading";
    window.contentDeskReady = settled;
    if (!settled) {
      window.prerenderReady = false;
      return;
    }
    // The title may already be in the document. Seo also sets this when the title changes.
    if (document.title.length > 0) window.prerenderReady = true;
  }, [desk.status]);

  return <ContentDesk.Provider value={desk}>{children}</ContentDesk.Provider>;
}

function useDesk() {
  return useContext(ContentDesk);
}

/** A filled-in desk sentence, or the sentence that already ships with the site. */
function prefer(next: string | undefined, current: string) {
  const value = next?.trim();
  return value ? value : current;
}

/** Published projects from the API. The starter file is used only when the API cannot be reached. */
export function useProjects(): PortfolioItem[] {
  const desk = useDesk();
  // The API answered. An empty list means nothing is published.
  if (desk.status === "ready") return desk.projects;
  // Still loading, or the API could not be reached. The starter file keeps the page from going blank.
  return publishedWork();
}

export function useProject(slug: string | undefined): PortfolioItem | undefined {
  return useProjects().find((item) => item.slug === slug);
}

export function useHomeCopy() {
  const desk = useDesk();
  const page = desk.status === "ready" ? desk.pages.home : undefined;
  return {
    ...home,
    seo: {
      ...home.seo,
      title: prefer(page?.seoTitle, home.seo.title),
      description: prefer(page?.seoDescription, home.seo.description),
    },
    hero: {
      ...home.hero,
      kicker: prefer(page?.kicker, home.hero.kicker),
      title: prefer(page?.headline, home.hero.title),
      lede: prefer(page?.lede, home.hero.lede),
    },
  };
}

export function useAboutCopy() {
  const desk = useDesk();
  const page = desk.status === "ready" ? desk.pages.about : undefined;
  const projects = useProjects();
  return {
    ...about,
    seo: {
      ...about.seo,
      title: prefer(page?.seoTitle, about.seo.title),
      description: prefer(page?.seoDescription, about.seo.description),
    },
    hero: {
      ...about.hero,
      kicker: prefer(page?.kicker, about.hero.kicker),
      headline: prefer(page?.headline, about.hero.headline),
      lede: prefer(page?.lede, about.hero.lede),
    },
    started: {
      ...about.started,
      body: prefer(page?.paragraph1, about.started.body),
    },
    work: {
      ...about.work,
      title: prefer(page?.sectionTitle, about.work.title),
      paragraphs: [
        prefer(page?.paragraph2, about.work.paragraphs[0]),
        prefer(page?.paragraph3, about.work.paragraphs[1]),
      ],
    },
    facts: {
      ...about.facts,
      // The other figures stay off this page until they are confirmed.
      // This one is the number of published projects.
      stats: [{ value: String(projects.length), label: "projects delivered" }],
    },
  };
}

export function useWorkCopy() {
  const desk = useDesk();
  const page = desk.status === "ready" ? desk.pages.work : undefined;
  return {
    ...workPage,
    seo: {
      ...workPage.seo,
      title: prefer(page?.seoTitle, workPage.seo.title),
      description: prefer(page?.seoDescription, workPage.seo.description),
    },
    kicker: prefer(page?.kicker, workPage.kicker),
    title: prefer(page?.headline, workPage.title),
    lede: prefer(page?.lede, workPage.lede),
  };
}

export function useContactCopy() {
  const desk = useDesk();
  const page = desk.status === "ready" ? desk.pages.contact : undefined;
  return {
    ...contact,
    seo: {
      ...contact.seo,
      title: prefer(page?.seoTitle, contact.seo.title),
      description: prefer(page?.seoDescription, contact.seo.description),
    },
    hero: {
      ...contact.hero,
      title: prefer(page?.headline, contact.hero.title),
    },
  };
}

/** Published notes from the desk. The built-in notes stay until one is published in the desk. */
export function useNotes(): InsightArticle[] {
  const desk = useDesk();
  if (desk.status !== "ready" || desk.notes.length === 0) return articles;
  return desk.notes
    .map((note) => {
      const words = note.body.split(/\s+/).filter(Boolean).length;
      return {
        slug: note.slug,
        title: note.title,
        description: note.description,
        date: note.publishedOn || "",
        family: note.family,
        familyLabel: familyLabel(note.family),
        cover: "/brand/png/og-default-1200.png",
        body: note.body,
        minutes: Math.max(2, Math.ceil(words / 200)),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function useNote(slug: string | undefined): InsightArticle | undefined {
  return useNotes().find((note) => note.slug === slug);
}

/** Insights links stay off the menu until enough notes are published. */
export function useInsightsMenu(): boolean {
  return insightsMenuOpen(useNotes().length);
}
