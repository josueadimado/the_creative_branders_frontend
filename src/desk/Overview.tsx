import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, LayoutTemplate, PanelsTopLeft, Plus } from "lucide-react";
import { deskJson } from "./api";
import { familyLabel } from "./choices";
import { defaultAnalyticsRange } from "./analytics/AnalyticsUI";
import DeskLoader from "./analytics/DeskLoader";
import { useDeskAnalytics } from "./analytics/useDeskAnalytics";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  company: string;
  needs: string[];
  budget_range?: string;
  budget_currency?: string;
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

function weekdayLine(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function budgetLine(brief: Inquiry): string {
  if (!brief.budget_range) return "—";
  if (brief.budget_currency === "GHS") return `GHS ${brief.budget_range}`;
  if (brief.budget_currency === "USD") return `USD ${brief.budget_range}`;
  return brief.budget_range;
}

export default function Overview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [error, setError] = useState("");
  const analytics = useDeskAnalytics(defaultAnalyticsRange());

  useEffect(() => {
    deskJson<OverviewData>("/overview/")
      .then(setData)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load the dashboard."));
  }, []);

  if (error) return <p className="text-sm text-red-800">{error}</p>;
  if (!data) {
    return <DeskLoader label="Loading…" />;
  }

  const waiting = data.unread_inquiries > 0;
  const featured = data.leading_projects.filter((project) => project.featured).length;
  const topBrief = data.latest_inquiries.find((brief) => !brief.reviewed) || data.latest_inquiries[0];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[28px] font-semibold tracking-tight text-navy">Overview</h1>
          <p className="mt-1 text-[13px] text-slate">{weekdayLine()}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] text-slate">
            {analytics.sampleTraffic ? "Sample" : "Live"} · Accra · GMT
          </p>
          <a className="inline-flex items-center gap-1.5 rounded-full border border-mist bg-white px-3.5 py-2 text-sm text-navy" href="/">
            <ArrowUpRight size={16} aria-hidden="true" />
            View site
          </a>
        </div>
      </div>

      {waiting ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[10px] bg-navy px-5 py-4 text-white">
          <div className="min-w-0">
            <p className="font-semibold">
              {data.unread_inquiries} unread brief{data.unread_inquiries === 1 ? "" : "s"}
            </p>
            {topBrief ? (
              <p className="mt-1 text-sm text-white/70">
                {topBrief.name || topBrief.email}
                {topBrief.needs[0] ? ` · ${topBrief.needs[0]}` : ""}
                {topBrief.budget_range ? ` · ${budgetLine(topBrief)}` : ""}
              </p>
            ) : null}
          </div>
          <Link
            to="/desk/briefs"
            className="inline-flex shrink-0 items-center rounded-full bg-signal px-4 py-2 text-sm font-semibold text-navy"
          >
            Open briefs
          </Link>
        </div>
      ) : null}

      <div>
        <h2 className="mb-3 text-sm font-semibold text-navy">This week</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Link to="/desk/analytics" className="rounded-[10px] border border-mist bg-white p-5 hover:border-deep/30">
            <p className="text-xs text-slate">
              Visitors <span className="text-[10px] font-medium text-ga">· GA4</span>
            </p>
            <p className="mt-2 text-[32px] font-semibold tracking-tight text-navy">{analytics.overview.visitors}</p>
            <p className="mt-2 text-[11px] text-slate">{analytics.overview.sessions} sessions</p>
          </Link>
          <Link
            to="/desk/analytics/activity"
            className="rounded-[10px] border border-mist bg-white p-5 hover:border-deep/30"
          >
            <p className="text-xs text-slate">
              Contact actions <span className="text-[10px] font-medium text-studio">· Studio</span>
            </p>
            <p className="mt-2 text-[32px] font-semibold tracking-tight text-navy">
              {analytics.overview.contactActions}
            </p>
            <p className="mt-2 text-[11px] text-slate">{analytics.topCta}</p>
          </Link>
          <Link to="/desk/briefs" className="rounded-[10px] border border-mist bg-white p-5 hover:border-deep/30">
            <p className="text-xs text-slate">
              Briefs <span className="text-[10px] font-medium text-studio">· Studio</span>
            </p>
            <p className="mt-2 text-[32px] font-semibold tracking-tight text-navy">{analytics.overview.briefs}</p>
            <p className="mt-2 text-[11px] text-slate">{data.unread_inquiries} unread</p>
          </Link>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <section className="rounded-[10px] border border-mist bg-white">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="text-sm font-semibold text-navy">Latest briefs</h2>
            <Link className="text-sm text-deep" to="/desk/briefs">
              All ({data.inquiries || data.latest_inquiries.length})
            </Link>
          </div>
          {data.latest_inquiries.length === 0 ? (
            <p className="px-5 pb-8 text-sm text-slate">No briefs yet.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="text-[10px] uppercase tracking-wide text-slate">
                <tr>
                  <th className="px-5 py-2 font-medium">Name</th>
                  <th className="hidden px-3 py-2 font-medium sm:table-cell">Budget</th>
                  <th className="px-5 py-2 text-right font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.latest_inquiries.map((brief) => (
                  <tr key={brief.id} className="border-t border-mist">
                    <td className="px-5 py-3">
                      <Link className="font-medium hover:text-deep" to={`/desk/briefs/${brief.id}`}>
                        {brief.name || brief.email}
                        {brief.needs[0] ? ` — ${brief.needs[0]}` : ""}
                      </Link>
                      <span className="mt-0.5 block text-xs text-slate">{shortWhen(brief.created_at)}</span>
                    </td>
                    <td className="hidden px-3 py-3 text-slate sm:table-cell">{budgetLine(brief)}</td>
                    <td className="px-5 py-3 text-right">
                      {!brief.reviewed ? (
                        <span className="inline-flex rounded-full bg-navy px-2 py-0.5 text-xs font-medium text-white">
                          Unread
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-paper px-2 py-0.5 text-xs text-slate">Read</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="rounded-[10px] border border-mist bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-navy">Case study opens</h2>
            <Link className="text-sm text-deep" to="/desk/analytics/pages">
              Pages →
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {(analytics.workOpens.length ? analytics.workOpens : []).slice(0, 3).map((item) => (
              <li key={item.slug} className="rounded-xl border border-mist bg-paper/60 px-4 py-3">
                <p className="font-medium text-navy">{item.slug}</p>
                <p className="mt-1 text-[11px] text-slate">
                  {item.opens} opens
                  {item.gaViews ? ` · ${item.gaViews} views` : ""}
                </p>
              </li>
            ))}
            {!analytics.workOpens.length ? <li className="text-sm text-slate">No opens yet.</li> : null}
          </ul>
          {data.leading_projects[0] ? (
            <p className="mt-4 text-[11px] text-slate">
              Featured: {data.leading_projects.map((p) => p.public_name).slice(0, 2).join(", ")}
              {data.leading_projects.length > 2 ? "…" : ""}
              {data.leading_projects[0] ? ` · ${familyLabel(data.leading_projects[0].family)}` : ""}
            </p>
          ) : null}
        </section>
      </div>

      <section className="rounded-[10px] border border-mist bg-white p-5">
        <h2 className="text-sm font-semibold text-navy">Shortcuts</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/desk/pages"
            className="inline-flex items-center gap-2 rounded-full border border-mist bg-paper px-4 py-2 text-sm font-medium text-navy hover:border-deep/30"
          >
            <LayoutTemplate size={16} aria-hidden="true" />
            Pages
          </Link>
          <Link
            to="/desk/projects"
            className="inline-flex items-center gap-2 rounded-full border border-mist bg-paper px-4 py-2 text-sm font-medium text-navy hover:border-deep/30"
          >
            <PanelsTopLeft size={16} aria-hidden="true" />
            Projects
          </Link>
          <Link
            to="/desk/notes"
            className="inline-flex items-center gap-2 rounded-full border border-mist bg-paper px-4 py-2 text-sm font-medium text-navy hover:border-deep/30"
          >
            <Plus size={16} aria-hidden="true" />
            New note
          </Link>
        </div>
        <p className="mt-4 text-[11px] text-slate">
          {data.pages} pages · {featured || data.published_projects} live projects · {data.notes} notes
          {data.published_notes ? ` (${data.published_notes} live)` : ""}
        </p>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-mist bg-white px-5 py-3 text-sm">
        <p className="text-slate">
          <span className="font-medium text-navy">Latest</span>
          <span className="mx-2 text-mist">·</span>
          {analytics.activityFeed[0]
            ? `${analytics.activityFeed[0].time} · ${analytics.activityFeed[0].action} · ${analytics.activityFeed[0].detail}`
            : "No activity yet"}
        </p>
        <Link className="inline-flex items-center gap-1 text-deep" to="/desk/analytics/activity">
          Activity
          <ChevronRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
