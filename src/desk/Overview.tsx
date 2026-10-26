import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, FileText, Inbox, LayoutTemplate, PanelsTopLeft } from "lucide-react";
import { deskJson } from "./api";
import { Badge } from "./ui";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  company: string;
  needs: string[];
  created_at: string;
};

type ProjectCard = {
  id: number;
  public_name: string;
  published: boolean;
  featured: boolean;
};

type OverviewData = {
  pages: number;
  projects: number;
  published_projects: number;
  notes: number;
  published_notes: number;
  inquiries: number;
  waitlist: number;
  newsletter: number;
  academy: number;
  latest_inquiries: Inquiry[];
  draft_projects: ProjectCard[];
  leading_projects: ProjectCard[];
};

/** A short time for a list. Today shows the clock. Older days show the date. */
function shortWhen(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString(undefined, { timeStyle: "short" });
  }
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function countWords(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

function statusLine(data: OverviewData): string {
  const drafts = data.projects - data.published_projects;
  if (data.inquiries > 0) {
    return countWords(data.inquiries, "brief is waiting for a reply.", "briefs are waiting for a reply.");
  }
  if (drafts > 0) return countWords(drafts, "project is still a draft.", "projects are still drafts.");
  return "The inbox is clear, and every project is on the website.";
}

function Metric({
  to,
  label,
  value,
  hint,
  icon,
  attention,
}: {
  to: string;
  label: string;
  value: number;
  hint: string;
  icon: ReactNode;
  attention?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`flex min-h-36 flex-col rounded-2xl border p-5 transition-colors hover:border-deep/40 ${
        attention ? "border-deep/30 bg-tint" : "border-mist bg-white"
      }`}
    >
      <span className="flex items-center justify-between gap-3 text-sm font-medium text-slate">
        {label}
        <span className="text-deep">{icon}</span>
      </span>
      <span className="mt-auto pt-6 font-display text-4xl font-semibold tracking-tight text-navy">{value}</span>
      <span className="mt-1 text-sm text-slate">{hint}</span>
    </Link>
  );
}

function PanelHead({ title, to, action }: { title: string; to: string; action: string }) {
  return (
    <div className="mb-2 flex items-center justify-between gap-3">
      <h2 className="font-display text-lg font-semibold text-navy">{title}</h2>
      <Link to={to} className="text-sm font-medium text-deep">
        {action}
      </Link>
    </div>
  );
}

function ProjectRow({ project }: { project: ProjectCard }) {
  return (
    <li className="border-b border-mist last:border-0">
      <Link
        to={`/desk/projects/${project.id}`}
        className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-paper"
      >
        <span className="min-w-0 truncate font-medium">{project.public_name}</span>
        <Badge live={project.published}>{project.published ? "On the site" : "Draft"}</Badge>
      </Link>
    </li>
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid gap-4" aria-hidden="true">
      <div className="h-16 animate-pulse rounded-2xl bg-white" />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-36 animate-pulse rounded-2xl bg-white" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="h-72 animate-pulse rounded-2xl bg-white lg:col-span-3" />
        <div className="h-72 animate-pulse rounded-2xl bg-white lg:col-span-2" />
      </div>
    </div>
  );
}

export default function Overview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    deskJson<OverviewData>("/overview/")
      .then(setData)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "The desk could not load."));
  }, []);

  const drafts = data?.projects ? data.projects - data.published_projects : 0;
  const liveShare = data && data.projects > 0 ? Math.round((data.published_projects / data.projects) * 100) : 0;
  const siteProjects = data && data.draft_projects.length > 0 ? data.draft_projects : data?.leading_projects || [];

  return (
    <section>
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-navy">Dashboard</h1>
          {data ? <p className="mt-2 text-sm text-slate">{statusLine(data)}</p> : null}
        </div>
        <a className="btn gap-2 border border-mist bg-white text-navy hover:border-deep/40" href="/">
          View the website
          <ArrowUpRight size={16} />
        </a>
      </header>

      {error ? <p className="text-sm text-red-800">{error}</p> : null}
      {!data && !error ? <DashboardSkeleton /> : null}

      {data ? (
        <div className="grid gap-4">
          {/* Four numbers. The brief card is tinted only when someone is waiting. */}
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              to="/desk/briefs"
              label="Briefs"
              value={data.inquiries}
              hint={data.inquiries > 0 ? "Open the newest first" : "Inbox is clear"}
              icon={<Inbox size={18} />}
              attention={data.inquiries > 0}
            />
            <Metric
              to="/desk/projects"
              label="Live projects"
              value={data.published_projects}
              hint={drafts > 0 ? countWords(drafts, "draft is hidden", "drafts are hidden") : "All of them are live"}
              icon={<PanelsTopLeft size={18} />}
            />
            <Metric
              to="/desk/notes"
              label="Notes"
              value={data.notes}
              hint={
                data.notes === 0
                  ? "None saved yet"
                  : data.published_notes === data.notes
                    ? "All of them are published"
                    : data.published_notes === 0
                      ? "None published yet"
                      : countWords(data.published_notes, "is published", "are published")
              }
              icon={<FileText size={18} />}
            />
            <Metric
              to="/desk/pages"
              label="Pages"
              value={data.pages}
              hint="Homepage, About, Work, Contact"
              icon={<LayoutTemplate size={18} />}
            />
          </div>

          <div className="grid items-start gap-4 lg:grid-cols-5">
            <section className="rounded-2xl border border-mist bg-white p-5 lg:col-span-3">
              <PanelHead title="Newest briefs" to="/desk/briefs" action="See all" />
              {data.latest_inquiries.length === 0 ? (
                <p className="px-1 py-8 text-sm text-slate">No project briefs yet. New ones will show up here.</p>
              ) : (
                <ul className="-mx-2">
                  {data.latest_inquiries.map((item) => (
                    <li key={item.id} className="border-b border-mist last:border-0">
                      <Link
                        to={`/desk/briefs/${item.id}`}
                        className="flex items-center justify-between gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-paper"
                      >
                        <span className="min-w-0">
                          <span className="block truncate font-medium">{item.name || item.email}</span>
                          <span className="mt-0.5 block truncate text-sm text-slate">
                            {item.company || item.email}
                            {item.needs[0] ? ` · ${item.needs[0]}` : ""}
                          </span>
                        </span>
                        <span className="shrink-0 text-sm text-slate">{shortWhen(item.created_at)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <div className="grid gap-4 lg:col-span-2">
              <section className="rounded-2xl border border-mist bg-white p-5">
                <PanelHead
                  title={data.draft_projects.length > 0 ? "Still a draft" : "First on the work page"}
                  to="/desk/projects"
                  action="Projects"
                />
                <p className="mb-3 text-sm text-slate">
                  {data.published_projects} of {data.projects} projects are on the website.
                </p>
                <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-paper" aria-hidden="true">
                  <div className="h-full rounded-full bg-deep" style={{ width: `${liveShare}%` }} />
                </div>
                {siteProjects.length === 0 ? (
                  <p className="text-sm text-slate">No projects yet.</p>
                ) : (
                  <ul className="-mx-4">
                    {siteProjects.map((project) => (
                      <ProjectRow key={project.id} project={project} />
                    ))}
                  </ul>
                )}
              </section>

              <section className="rounded-2xl border border-mist bg-white p-5">
                <h2 className="mb-3 font-display text-lg font-semibold text-navy">Other messages</h2>
                <ul>
                  {[
                    { label: "Waitlist", value: data.waitlist, to: "/desk/waitlist" },
                    { label: "Newsletter", value: data.newsletter, to: "/desk/newsletter" },
                    { label: "Academy", value: data.academy, to: "/desk/academy" },
                  ].map((row) => (
                    <li key={row.to} className="border-b border-mist last:border-0">
                      <Link
                        to={row.to}
                        className="flex items-center justify-between py-2.5 text-sm transition-colors hover:text-deep"
                      >
                        <span>{row.label}</span>
                        <span className="font-medium text-navy">{row.value}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
