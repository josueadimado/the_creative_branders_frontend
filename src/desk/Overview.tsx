import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check, ChevronRight, Clock, FileText, GraduationCap, Inbox, LayoutTemplate, Mail, PanelsTopLeft } from "lucide-react";
import { deskJson } from "./api";
import { familyLabel } from "./choices";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  company: string;
  needs: string[];
  reviewed: boolean;
  created_at: string;
};

type ProjectCard = {
  id: number;
  public_name: string;
  published: boolean;
  featured: boolean;
  family: string;
};

type OverviewData = {
  pages: number;
  projects: number;
  published_projects: number;
  notes: number;
  published_notes: number;
  inquiries: number;
  unread_inquiries: number;
  waitlist: number;
  newsletter: number;
  academy: number;
  latest_inquiries: Inquiry[];
  leading_projects: ProjectCard[];
};

function shortWhen(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const time = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (date.toDateString() === new Date().toDateString()) return `Today, ${time}`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function countWords(count: number, one: string, many: string): string {
  return `${count} ${count === 1 ? one : many}`;
}

function statusLine(data: OverviewData): string {
  if (data.unread_inquiries > 0) {
    return countWords(data.unread_inquiries, "brief is waiting for a reply.", "briefs are waiting for a reply.");
  }
  return "Nothing is waiting. Here is what is on the website.";
}

function Metric({
  to,
  label,
  value,
  hint,
  icon,
  dark,
  action,
}: {
  to: string;
  label: string;
  value: number;
  hint: string;
  icon: ReactNode;
  dark?: boolean;
  action?: string;
}) {
  return (
    <Link
      to={to}
      className={`flex min-h-[9.5rem] flex-col rounded-2xl border p-5 ${
        dark ? "border-navy bg-navy text-white" : "border-mist bg-white text-navy hover:border-deep/30"
      }`}
    >
      <span className={`flex items-center gap-2 text-sm ${dark ? "text-white/70" : "text-slate"}`}>
        {icon}
        {label}
      </span>
      <span className="mt-3 text-4xl font-semibold tracking-tight">{value}</span>
      <span className={`mt-auto pt-3 text-sm ${dark ? "text-white" : "text-slate"}`}>
        {action || hint}
        {action ? <ChevronRight className="ml-1 inline" size={14} aria-hidden="true" /> : null}
      </span>
    </Link>
  );
}

export default function Overview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    deskJson<OverviewData>("/overview/")
      .then(setData)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load the dashboard."));
  }, []);

  if (error) return <p className="text-sm text-red-800">{error}</p>;
  if (!data) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="h-36 animate-pulse rounded-2xl bg-white" />
        ))}
      </div>
    );
  }

  const drafts = data.projects - data.published_projects;
  const waiting = data.unread_inquiries > 0;
  const notesHint =
    data.published_notes === data.notes
      ? "All published"
      : data.published_notes === 0
        ? "None published yet"
        : `${data.published_notes} published`;

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-sm text-slate">{statusLine(data)}</p>
        </div>
        <a className="btn border border-mist bg-white text-navy" href="/">
          <ArrowUpRight size={16} aria-hidden="true" />
          View the website
        </a>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          to="/desk/briefs"
          label="Briefs waiting"
          value={data.unread_inquiries}
          hint="You're all caught up"
          action={waiting ? "Read the new brief" : undefined}
          icon={<Inbox size={16} aria-hidden="true" />}
          dark={waiting}
        />
        <Metric
          to="/desk/projects"
          label="Live projects"
          value={data.published_projects}
          hint={drafts > 0 ? countWords(drafts, "draft", "drafts") : "All of them are live"}
          icon={<PanelsTopLeft size={16} aria-hidden="true" />}
        />
        <Metric
          to="/desk/notes"
          label="Notes"
          value={data.notes}
          hint={notesHint}
          icon={<FileText size={16} aria-hidden="true" />}
        />
        <Metric
          to="/desk/pages"
          label="Pages"
          value={data.pages}
          hint="Home, About, Work, Contact"
          icon={<LayoutTemplate size={16} aria-hidden="true" />}
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-mist bg-white">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="font-semibold">Newest briefs</h2>
            <Link className="text-sm text-deep" to="/desk/briefs">
              All briefs
            </Link>
          </div>
          {data.latest_inquiries.length === 0 ? (
            <div className="px-5 pb-10 pt-6 text-center">
              <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-tint text-deep">
                <Check size={18} aria-hidden="true" />
              </span>
              <p className="mt-3 font-medium">No briefs waiting</p>
              <p className="mx-auto mt-1 max-w-xs text-sm text-slate">
                New messages from the Start a project page will show here.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-slate">
                <tr>
                  <th className="px-5 py-2 font-medium">From</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">Needs</th>
                  <th className="px-5 py-2 text-right font-medium">Received</th>
                </tr>
              </thead>
              <tbody>
                {data.latest_inquiries.map((brief) => (
                  <tr key={brief.id} className="border-t border-mist">
                    <td className="px-5 py-3">
                      <Link className="font-medium hover:text-deep" to={`/desk/briefs/${brief.id}`}>
                        {brief.name || brief.email}
                      </Link>
                      {brief.company ? <span className="mt-0.5 block text-slate">{brief.company}</span> : null}
                    </td>
                    <td className="hidden px-3 py-3 text-slate sm:table-cell">
                      {brief.needs.slice(0, 2).join(", ") || "—"}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-slate">{shortWhen(brief.created_at)}</span>
                      {!brief.reviewed ? (
                        <span className="ml-2 inline-flex rounded-full bg-navy px-2 py-0.5 text-xs font-medium text-white">
                          New
                        </span>
                      ) : (
                        <span className="ml-2 inline-flex rounded-full bg-paper px-2 py-0.5 text-xs text-slate">Read</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="rounded-2xl border border-mist bg-white">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="font-semibold">Leading the Work page</h2>
            <Link className="text-sm text-deep" to="/desk/projects">
              All projects
            </Link>
          </div>
          <ol>
            {data.leading_projects.map((project, index) => (
              <li key={project.id} className="border-t border-mist">
                <Link className="flex items-center gap-3 px-5 py-3 hover:bg-paper" to={`/desk/projects/${project.id}`}>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-tint text-sm font-medium text-deep">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 font-medium">{project.public_name}</span>
                  <span className="hidden text-sm text-slate sm:inline">{familyLabel(project.family)}</span>
                  <ChevronRight size={16} className="text-slate" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
          <div className="border-t border-mist px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate">Published projects</span>
              <span>
                {data.published_projects} of {data.projects}
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist">
              <div
                className="h-full rounded-full bg-deep"
                style={{ width: data.projects ? `${(data.published_projects / data.projects) * 100}%` : "0%" }}
              />
            </div>
          </div>
        </section>
      </div>

      <h2 className="mt-6 text-sm text-slate">Other inboxes</h2>
      <div className="mt-2 grid gap-3 sm:grid-cols-3">
        {[
          { to: "/desk/waitlist", label: "Waitlist", value: data.waitlist, icon: <Clock size={16} aria-hidden="true" /> },
          { to: "/desk/newsletter", label: "Newsletter", value: data.newsletter, icon: <Mail size={16} aria-hidden="true" /> },
          { to: "/desk/academy", label: "Academy", value: data.academy, icon: <GraduationCap size={16} aria-hidden="true" /> },
        ].map((item) => (
          <Link key={item.to} to={item.to} className="flex items-center gap-3 rounded-2xl border border-mist bg-white px-4 py-4">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-tint text-deep">{item.icon}</span>
            <span className="flex-1 text-sm">{item.label}</span>
            <span className="text-lg font-semibold">{item.value}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
