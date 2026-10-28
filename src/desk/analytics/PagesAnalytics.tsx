import { useMemo, useState } from "react";
import { BookStack, FilterList, Page, ReportColumns } from "iconoir-react";
import {
  AnalyticsHeading,
  AnalyticsWorkspaceBar,
  BriefLink,
  DateRangeBar,
  FilterChip,
  MetricCard,
  Panel,
  PrivacyNote,
  useAnalyticsRange,
} from "./AnalyticsUI";
import DeskLoader from "./DeskLoader";
import { useDeskAnalytics } from "./useDeskAnalytics";

type Filter = "all" | "case" | "insights" | "marketing";

export default function PagesAnalytics() {
  const [range, setRange] = useAnalyticsRange();
  const [filter, setFilter] = useState<Filter>("all");
  const data = useDeskAnalytics(range);
  const rows = useMemo(
    () => (filter === "all" ? data.pageRows : data.pageRows.filter((row) => row.kind === filter)),
    [data.pageRows, filter],
  );

  if (data.loading) {
    return (
      <section>
        <AnalyticsWorkspaceBar />
        <DeskLoader label="Loading pages…" />
      </section>
    );
  }

  if (data.error) return <p className="text-sm text-red-800">{data.error}</p>;

  return (
    <section>
      <AnalyticsWorkspaceBar sample={data.sampleTraffic} />
      <div className="space-y-6">
        <AnalyticsHeading
          title="Pages"
          connected={data.gaConnected}
          connectionError={data.gaError}
        />
        <DateRangeBar value={range} onChange={setRange} live updatedAt={data.updatedAt} />

        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Page views"
            source="ga4"
            value={data.pagesMetrics.pageViews}
            hint={data.pagesMetrics.pageViewsHint}
          />
          <MetricCard
            label="Case study opens"
            source="studio"
            value={data.pagesMetrics.caseOpens}
            hint={data.pagesMetrics.caseOpensHint}
          />
          <MetricCard
            label="Attributed briefs"
            source="studio"
            value={data.pagesMetrics.attributedBriefs}
            hint={data.pagesMetrics.attributedHint}
          />
        </div>

        <Panel title="By page">
          <div className="mb-4 flex flex-wrap gap-2">
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              icon={<FilterList width={14} height={14} strokeWidth={1.6} />}
            >
              All
            </FilterChip>
            <FilterChip
              active={filter === "case"}
              onClick={() => setFilter("case")}
              icon={<ReportColumns width={14} height={14} strokeWidth={1.6} />}
            >
              Case studies
            </FilterChip>
            <FilterChip
              active={filter === "insights"}
              onClick={() => setFilter("insights")}
              icon={<BookStack width={14} height={14} strokeWidth={1.6} />}
            >
              Insights
            </FilterChip>
            <FilterChip
              active={filter === "marketing"}
              onClick={() => setFilter("marketing")}
              icon={<Page width={14} height={14} strokeWidth={1.6} />}
            >
              Marketing
            </FilterChip>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-xs">
              <thead className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                <tr className="border-b border-mist">
                  <th className="pb-2 font-semibold">Page</th>
                  <th className="pb-2 font-semibold">Views · GA4</th>
                  <th className="pb-2 font-semibold">Studio</th>
                  <th className="pb-2 font-semibold">Landing briefs</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-slate">
                      Nothing in this filter yet.
                    </td>
                  </tr>
                ) : (
                  rows.map((row) => (
                    <tr key={row.path} className="border-b border-mist/70 last:border-0">
                      <td className="py-3.5 font-medium text-navy">{row.path}</td>
                      <td className="py-3.5 text-slate">{row.views || (data.sampleTraffic ? "—" : 0)}</td>
                      <td className="py-3.5 text-slate">
                        {row.studioCount} · {row.studioLabel}
                      </td>
                      <td className="py-3.5 text-slate">{row.briefs}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {data.workOpens[0] ? (
            <p className="mt-4 text-[13px] text-slate">
              {data.workOpens[0].slug} · {data.workOpens[0].opens} opens ·{" "}
              <BriefLink to="/desk/briefs">Briefs →</BriefLink>
            </p>
          ) : null}
        </Panel>

        <PrivacyNote />
      </div>
    </section>
  );
}
