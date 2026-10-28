import {
  AnalyticsHeading,
  AnalyticsWorkspaceBar,
  BriefLink,
  DateRangeBar,
  FunnelBars,
  MetricCard,
  PrivacyNote,
  useAnalyticsRange,
} from "./AnalyticsUI";
import { useDeskAnalytics } from "./useDeskAnalytics";

export default function FunnelAnalytics() {
  const [range, setRange] = useAnalyticsRange();
  const data = useDeskAnalytics(range);

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
          title="From interest to enquiry"
          lede="An aggregate directional funnel — not a joined, per-person journey."
          connected={data.gaConnected}
        />
        <DateRangeBar value={range} onChange={setRange} live />

        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Site sessions"
            source="ga4"
            value={data.funnel.sessions}
            hint={data.sampleTraffic ? "Sample traffic baseline" : "Traffic baseline, not a cohort."}
          />
          <MetricCard
            label="Contact or brief events"
            source="studio"
            value={data.funnel.contactOrBrief}
            hint="Combined studio signal — CTAs + briefs."
          />
          <MetricCard
            label="Briefs only"
            source="studio"
            value={data.funnel.briefsOnly}
            hint="Submitted briefs in this range."
          />
        </div>

        <section className="rounded-[10px] border border-mist bg-white p-[22px]">
          <h2 className="text-sm font-semibold text-navy">Directional funnel</h2>
          <div className="mt-5">
            <FunnelBars steps={data.funnel.steps} />
          </div>
          <p className="mt-5 text-[11px] text-slate">
            Percentages show drop-off in aggregate counts, not individual abandonment or a person-level
            conversion rate.
          </p>
        </section>

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="rounded-[10px] border border-mist bg-white p-5">
            <h2 className="text-sm font-semibold text-navy">Read this as direction, not attribution</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate">
              The first two steps use GA4 session counts
              {data.sampleTraffic ? " (sample until GA is connected)" : ""}. The next steps use the live studio
              event log. Sources are not joined across systems, and both require cookie acceptance.
            </p>
          </div>
          <div className="rounded-[10px] border border-mist bg-white p-5">
            <h2 className="text-sm font-semibold text-navy">The meaningful outcome</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate">
              Briefs-only conversions are submitted forms. Contact opens help, but a brief is the studio
              outcome that matters most.
            </p>
            <p className="mt-3 text-[13px]">
              <BriefLink to="/desk/briefs">
                Review the {data.funnel.briefsOnly} submitted brief
                {data.funnel.briefsOnly === 1 ? "" : "s"} →
              </BriefLink>
            </p>
          </div>
        </div>

        <PrivacyNote />
      </div>
    </section>
  );
}
