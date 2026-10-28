import { useMemo, useState } from "react";
import {
  AnalyticsHeading,
  AnalyticsWorkspaceBar,
  BriefLink,
  DateRangeBar,
  MetricCard,
  Panel,
  PrivacyNote,
  useAnalyticsRange,
} from "./AnalyticsUI";
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
          title="Pages & case studies"
          lede="See which pages get traffic, which work gets opened, and which landings bring briefs."
          connected={data.gaConnected}
          connectionError={data.gaError}
        />
        <DateRangeBar value={range} onChange={setRange} live />

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

        <Panel title="Content performance">
          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            {(
              [
                ["all", "All pages"],
                ["case", "Case studies"],
                ["insights", "Insights"],
                ["marketing", "Marketing pages"],
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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-xs">
              <thead className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                <tr className="border-b border-mist">
                  <th className="pb-2 font-semibold">Page / case study</th>
                  <th className="pb-2 font-semibold">Views · GA4</th>
                  <th className="pb-2 font-semibold">Opens / clicks · Studio</th>
                  <th className="pb-2 font-semibold">Landing briefs</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-slate">
                      No rows in this filter yet. Browse the site after Accepting analytics to fill the studio
                      log.
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
          <p className="mt-4 text-[11px] text-slate">
            Landing attribution belongs to the submitted brief. It is not a matched GA4 visitor journey.
          </p>
        </Panel>

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-[10px] border border-mist bg-white p-5">
            <h2 className="text-sm font-semibold text-navy">The work bringing enquiries</h2>
            <p className="mt-2 text-[13px] text-slate">
              {data.workOpens[0]
                ? `${data.workOpens[0].slug} leads this range with ${data.workOpens[0].opens} case study opens and ${data.workOpens[0].briefs} attributed briefs.`
                : "Open a case study on the public site after Accepting analytics to see opens here."}
            </p>
            <p className="mt-3 text-[13px]">
              <BriefLink to="/desk/briefs">View related project briefs →</BriefLink>
            </p>
          </div>
          <div className="rounded-[10px] border border-mist bg-white p-5">
            <h2 className="text-sm font-semibold text-navy">Two measures, two meanings</h2>
            <p className="mt-2 text-[13px] text-slate">
              GA4 counts page loads. The studio log counts meaningful clicks and form success. They are not
              expected to match.
            </p>
          </div>
        </div>

        <PrivacyNote />
      </div>
    </section>
  );
}
