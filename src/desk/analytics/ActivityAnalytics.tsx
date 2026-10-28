import { useMemo, useState, type ReactNode } from "react";
import { ChatBubble, FilterList, Mail, Page, ReportColumns } from "iconoir-react";
import {
  AnalyticsHeading,
  AnalyticsWorkspaceBar,
  BriefLink,
  DateRangeBar,
  FilterChip,
  MetricCard,
  PrivacyNote,
  useAnalyticsRange,
} from "./AnalyticsUI";
import DeskLoader from "./DeskLoader";
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

const FILTERS: { id: Filter; label: string; icon: ReactNode }[] = [
  { id: "all", label: "All actions", icon: <FilterList width={14} height={14} strokeWidth={1.6} /> },
  { id: "contact", label: "Contact CTAs", icon: <ChatBubble width={14} height={14} strokeWidth={1.6} /> },
  { id: "case", label: "Case study opens", icon: <ReportColumns width={14} height={14} strokeWidth={1.6} /> },
  { id: "briefs", label: "Briefs", icon: <Mail width={14} height={14} strokeWidth={1.6} /> },
  { id: "more", label: "More types", icon: <Page width={14} height={14} strokeWidth={1.6} /> },
];

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
        <DeskLoader label="Loading activity…" />
      </section>
    );
  }

  if (data.error) return <p className="text-sm text-red-800">{data.error}</p>;

  return (
    <section>
      <AnalyticsWorkspaceBar sample={data.sampleTraffic} />
      <div className="space-y-6">
        <AnalyticsHeading
          title="Activity"
          connected={data.gaConnected}
          connectionError={data.gaError}
        />
        <DateRangeBar value={range} onChange={setRange} live updatedAt={data.updatedAt} />

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

        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <FilterChip
              key={item.id}
              active={filter === item.id}
              onClick={() => setFilter(item.id)}
              icon={item.icon}
            >
              {item.label}
            </FilterChip>
          ))}
        </div>

        <section className="rounded-[10px] border border-mist bg-white">
          <div className="border-b border-mist px-5 py-4">
            <h2 className="text-sm font-semibold text-navy">Recent</h2>
          </div>
          {days.length === 0 ? (
            <p className="px-5 py-10 text-sm text-slate">No actions yet.</p>
          ) : (
            days.map(([day, rows]) => (
              <div key={day}>
                <p className="bg-paper/80 px-5 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate">
                  {day}
                </p>
                <ul>
                  {rows.map((row, index) => {
                    const origin = [row.source, row.campaign].filter(Boolean).join(" / ");
                    const context = [
                      row.device || null,
                      row.client_ip || null,
                      origin ? `via ${origin}` : null,
                      row.landing_page ? `landed ${row.landing_page}` : null,
                    ].filter(Boolean);
                    const paths =
                      row.visit_paths && row.visit_paths.length > 1
                        ? row.visit_paths.join(" → ")
                        : "";
                    return (
                      <li
                        key={`${row.day}-${row.time}-${row.action}-${row.detail}-${index}`}
                        className="border-t border-mist px-5 py-3.5 text-sm"
                      >
                        <div className="flex flex-wrap items-start gap-3">
                          <span className="w-12 shrink-0 tabular-nums text-slate">{row.time}</span>
                          <span className="min-w-[8rem] font-medium text-navy">{row.action}</span>
                          <span className="min-w-0 flex-1 text-slate">{row.detail}</span>
                          {row.action === "Brief submitted" ? (
                            <BriefLink to="/desk/briefs">Open briefs →</BriefLink>
                          ) : null}
                        </div>
                        {context.length || paths || row.referrer ? (
                          <div className="mt-1.5 space-y-0.5 pl-[3.75rem] text-[11px] text-slate">
                            {context.length ? <p>{context.join(" · ")}</p> : null}
                            {paths ? <p>{paths}</p> : null}
                            {row.referrer ? <p className="truncate">Referrer: {row.referrer}</p> : null}
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </section>

        <PrivacyNote />
      </div>
    </section>
  );
}
