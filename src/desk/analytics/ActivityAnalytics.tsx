import { useMemo, useState } from "react";
import {
  AnalyticsHeading,
  AnalyticsWorkspaceBar,
  BriefLink,
  DateRangeBar,
  MetricCard,
  PrivacyNote,
  useAnalyticsRange,
} from "./AnalyticsUI";
import { useDeskAnalytics } from "./useDeskAnalytics";

type Filter = "all" | "contact" | "case" | "briefs" | "more";

function matches(filter: Filter, action: string): boolean {
  if (filter === "all") return true;
  if (filter === "contact") {
    return ["WhatsApp", "Email", "Start a project", "Call", "Audit request clicked"].includes(action);
  }
  if (filter === "case") return action === "Case study view";
  if (filter === "briefs") return action === "Brief submitted";
  return !["WhatsApp", "Email", "Start a project", "Call", "Case study view", "Brief submitted"].includes(
    action,
  );
}

export default function ActivityAnalytics() {
  const [range, setRange] = useAnalyticsRange();
  const [filter, setFilter] = useState<Filter>("all");
  const data = useDeskAnalytics(range);
  const items = useMemo(
    () => data.activityFeed.filter((row) => matches(filter, row.action)),
    [data.activityFeed, filter],
  );
  const days = useMemo(() => {
    const map = new Map<string, typeof data.activityFeed>();
    for (const item of items) {
      const list = map.get(item.day) || [];
      list.push(item);
      map.set(item.day, list);
    }
    return [...map.entries()];
  }, [items]);

  if (data.loading) {
    return (
      <section>
        <AnalyticsWorkspaceBar />
        <div className="h-64 animate-pulse rounded-[10px] bg-white" />
      </section>
    );
  }

  if (data.error) return <p className="text-sm text-red-800">{data.error}</p>;

  return (
    <section>
      <AnalyticsWorkspaceBar sample={data.sampleTraffic} />
      <div className="space-y-6">
        <AnalyticsHeading
          title="Studio activity"
          lede="The meaningful actions on your site. Not a stream of every page view."
          connected={data.gaConnected}
          connectionError={data.gaError}
        />
        <DateRangeBar value={range} onChange={setRange} live />

        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Contact actions"
            source="studio"
            value={data.activityMetrics.contactActions}
            hint={data.activityMetrics.contactBreakdown}
          />
          <MetricCard
            label="Briefs submitted"
            source="studio"
            value={data.activityMetrics.briefs}
            hint={data.activityMetrics.briefsHint}
          />
          <MetricCard
            label="Case study opens"
            source="studio"
            value={data.activityMetrics.caseOpens}
            hint={data.activityMetrics.caseBreakdown}
          />
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {(
            [
              ["all", "All actions"],
              ["contact", "Contact CTAs"],
              ["case", "Case study opens"],
              ["briefs", "Briefs"],
              ["more", "More types"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setFilter(id)}
              className={`rounded-full px-3 py-1.5 ${
                filter === id ? "bg-navy text-white" : "border border-mist bg-white text-slate"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <section className="rounded-[10px] border border-mist bg-white">
          <div className="border-b border-mist px-5 py-4">
            <h2 className="text-sm font-semibold text-navy">
              Recent actions <span className="font-normal text-slate">· Studio log</span>
            </h2>
          </div>
          {days.length === 0 ? (
            <p className="px-5 py-10 text-sm text-slate">
              No actions yet. Accept analytics on the public site, then click WhatsApp, Start a project, or open
              a case study.
            </p>
          ) : (
            days.map(([day, rows]) => (
              <div key={day}>
                <p className="bg-paper/80 px-5 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate">
                  {day}
                </p>
                <ul>
                  {rows.map((row) => (
                    <li
                      key={`${row.day}-${row.time}-${row.action}-${row.detail}`}
                      className="flex flex-wrap items-start gap-3 border-t border-mist px-5 py-3.5 text-sm"
                    >
                      <span className="w-12 shrink-0 tabular-nums text-slate">{row.time}</span>
                      <span className="min-w-[8rem] font-medium text-navy">{row.action}</span>
                      <span className="min-w-0 flex-1 text-slate">{row.detail}</span>
                      {row.action === "Brief submitted" ? (
                        <BriefLink to="/desk/briefs">Open briefs →</BriefLink>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>

        <p className="text-[11px] text-slate">
          Recent studio actions · GMT. Aggregate events, not individual visitor profiles.
        </p>
        <PrivacyNote />
      </div>
    </section>
  );
}
