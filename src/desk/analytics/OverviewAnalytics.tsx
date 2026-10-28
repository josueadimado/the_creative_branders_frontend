import {
  AnalyticsHeading,
  AnalyticsWorkspaceBar,
  BriefLink,
  DailyBars,
  DateRangeBar,
  MetricCard,
  Panel,
  PrivacyNote,
  useAnalyticsRange,
} from "./AnalyticsUI";
import DeskLoader from "./DeskLoader";
import { useDeskAnalytics } from "./useDeskAnalytics";

export default function OverviewAnalytics() {
  const [range, setRange] = useAnalyticsRange();
  const data = useDeskAnalytics(range);

  if (data.loading) {
    return (
      <section>
        <AnalyticsWorkspaceBar sample={!data.gaConnected} />
        <DeskLoader />
      </section>
    );
  }

  if (data.error) {
    return <p className="text-sm text-red-800">{data.error}</p>;
  }

  return (
    <section>
      <AnalyticsWorkspaceBar sample={data.sampleTraffic} />
      <div className="space-y-6">
        <AnalyticsHeading
          title="Overview"
          connected={data.gaConnected}
          connectionError={data.gaError}
        />
        <DateRangeBar value={range} onChange={setRange} live updatedAt={data.updatedAt} />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Visitors"
            source="ga4"
            value={data.overview.visitors}
            hint={data.overview.visitorsHint}
          />
          <MetricCard
            label="Sessions"
            source="ga4"
            value={data.overview.sessions}
            hint={data.overview.sessionsHint}
          />
          <MetricCard
            label="Contact actions"
            source="studio"
            value={data.overview.contactActions}
            hint={data.overview.contactHint}
          />
          <MetricCard
            label="Briefs submitted"
            source="studio"
            value={data.overview.briefs}
            hint={data.overview.briefsHint}
          />
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <Panel title="Visitors" source="ga4">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <span className="text-[11px] text-slate">Daily</span>
              <span className="text-[25px] font-semibold text-navy">{data.overview.visitors}</span>
            </div>
            <DailyBars values={data.visitorDaily} tone="ga" />
          </Panel>
          <Panel title="Contact actions" source="studio">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <span className="text-[11px] text-slate">WhatsApp · project · email · call</span>
              <span className="text-[25px] font-semibold text-navy">{data.overview.contactActions}</span>
            </div>
            <DailyBars values={data.contactDaily} tone="studio" />
          </Panel>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <Panel title="Top pages" source="ga4">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[20rem] text-left text-xs">
                <thead className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                  <tr className="border-b border-mist">
                    <th className="pb-2 font-semibold">Page</th>
                    <th className="pb-2 font-semibold">Views</th>
                    <th className="pb-2 font-semibold">Landing briefs</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topPages.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-slate">
                        No pages yet.
                      </td>
                    </tr>
                  ) : (
                    data.topPages.slice(0, 6).map((row) => (
                      <tr key={row.path} className="border-b border-mist/70 last:border-0">
                        <td className="py-3.5 font-medium text-navy">{row.path}</td>
                        <td className="py-3.5 text-slate">{row.views}</td>
                        <td className="py-3.5 text-slate">{row.briefs}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Panel>
          <Panel title="Case study opens" source="studio">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[20rem] text-left text-xs">
                <thead className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                  <tr className="border-b border-mist">
                    <th className="pb-2 font-semibold">Slug</th>
                    <th className="pb-2 font-semibold">Opens</th>
                    <th className="pb-2 font-semibold">Briefs</th>
                  </tr>
                </thead>
                <tbody>
                  {data.workOpens.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-slate">
                        No opens yet.
                      </td>
                    </tr>
                  ) : (
                    data.workOpens.slice(0, 6).map((row) => (
                      <tr key={row.slug} className="border-b border-mist/70 last:border-0">
                        <td className="py-3.5 font-medium text-navy">{row.slug}</td>
                        <td className="py-3.5 text-slate">{row.opens}</td>
                        <td className="py-3.5 text-slate">{row.briefs}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="mt-4 rounded-md bg-[#eaf6f2] px-3 py-3 text-[11px] text-studio">
              Top CTA: {data.topCta}
            </div>
            <p className="mt-3 text-[11px]">
              <BriefLink to="/desk/briefs">Review briefs →</BriefLink>
            </p>
          </Panel>
        </div>

        <PrivacyNote />
      </div>
    </section>
  );
}
