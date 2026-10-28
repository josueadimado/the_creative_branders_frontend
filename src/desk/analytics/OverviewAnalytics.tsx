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
import { countries, devices } from "./sampleData";
import { useDeskAnalytics } from "./useDeskAnalytics";

export default function OverviewAnalytics() {
  const [range, setRange] = useAnalyticsRange();
  const data = useDeskAnalytics(range);

  if (data.loading) {
    return (
      <section>
        <AnalyticsWorkspaceBar sample={!data.gaConnected} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-hidden="true">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index} className="h-32 animate-pulse rounded-[10px] bg-white" />
          ))}
        </div>
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
          title="Analytics overview"
          lede="A clear view of who arrives, what resonates and where enquiries begin."
          connected={data.gaConnected}
        />
        <DateRangeBar value={range} onChange={setRange} live />

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
          <Panel title="Visitors over time" source="ga4">
            <div className="mb-4 flex items-baseline gap-2.5">
              <span className="text-[25px] font-semibold text-navy">{data.overview.visitors}</span>
              <span className="text-[11px] text-slate">
                {data.sampleTraffic ? "Sample GA4 · daily totals" : "Unique visitors · daily totals"}
              </span>
            </div>
            <DailyBars values={data.visitorDaily} tone="ga" />
          </Panel>
          <Panel title="Contact actions" source="studio">
            <div className="mb-4 flex items-baseline gap-2.5">
              <span className="text-[25px] font-semibold text-navy">{data.overview.contactActions}</span>
              <span className="text-[11px] text-slate">Call + WhatsApp + email + Start a project</span>
            </div>
            <DailyBars
              values={data.contactDaily.length ? data.contactDaily : [{ label: "—", value: 0 }]}
              tone="studio"
            />
          </Panel>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <Panel
            title="Top pages"
            source="ga4"
            footer={
              data.sampleTraffic
                ? "Sample GA4 views until GA is connected. Landing briefs come from the studio log."
                : "Views, not people. See all pages in Analytics → Pages."
            }
          >
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                <tr className="border-b border-mist">
                  <th className="pb-2 font-semibold">Page</th>
                  <th className="w-16 pb-2 font-semibold">Views</th>
                  <th className="w-24 pb-2 font-semibold">Landing briefs</th>
                </tr>
              </thead>
              <tbody>
                {data.topPages.map((row) => (
                  <tr key={row.path} className="border-b border-mist/70 last:border-0">
                    <td className="py-3.5 font-medium text-navy">{row.path}</td>
                    <td className="py-3.5 text-slate">{row.views}</td>
                    <td className="py-3.5 text-slate">{row.briefs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <Panel title="Work that gets opened" source="studio">
            {data.workOpens.length === 0 ? (
              <p className="text-sm text-slate">No case study opens in this range yet.</p>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                  <tr className="border-b border-mist">
                    <th className="pb-2 font-semibold">Case study slug</th>
                    <th className="w-14 pb-2 font-semibold">Opens</th>
                    <th className="w-12 pb-2 font-semibold">Briefs</th>
                  </tr>
                </thead>
                <tbody>
                  {data.workOpens.map((row) => (
                    <tr key={row.slug} className="border-b border-mist/70 last:border-0">
                      <td className="py-3.5 font-medium text-navy">{row.slug}</td>
                      <td className="py-3.5 text-slate">{row.opens}</td>
                      <td className="py-3.5 text-slate">{row.briefs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="mt-4 rounded-md bg-[#eaf6f2] px-3 py-3 text-[11px] text-studio">
              Top CTA: {data.topCta}
            </div>
            {data.sampleTraffic ? (
              <>
                <p className="mt-3 text-[11px] text-slate">
                  Devices: mobile {devices.mobile} · desktop {devices.desktop} · tablet {devices.tablet}{" "}
                  (sample)
                </p>
                <p className="text-[11px] text-slate">
                  Countries: {countries.map((c) => `${c.name} ${c.count}`).join(" · ")} (sample)
                </p>
              </>
            ) : null}
            <p className="mt-3 text-[11px] text-slate">
              Case study opens are studio events, not GA4 page views.{" "}
              <BriefLink to="/desk/briefs">Review briefs →</BriefLink>
            </p>
          </Panel>
        </div>

        <PrivacyNote />
      </div>
    </section>
  );
}
