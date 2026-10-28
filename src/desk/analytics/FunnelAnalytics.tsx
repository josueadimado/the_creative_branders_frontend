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
import DeskLoader from "./DeskLoader";
import { useDeskAnalytics } from "./useDeskAnalytics";

export default function FunnelAnalytics() {
  const [range, setRange] = useAnalyticsRange();
  const data = useDeskAnalytics(range);

  if (data.loading) {
    return (
      <section>
        <AnalyticsWorkspaceBar />
        <DeskLoader label="Loading funnel…" />
      </section>
    );
  }

  if (data.error) return <p className="text-sm text-red-800">{data.error}</p>;

  return (
    <section>
      <AnalyticsWorkspaceBar sample={data.sampleTraffic} />
      <div className="space-y-6">
        <AnalyticsHeading
          title="Funnel"
          connected={data.gaConnected}
          connectionError={data.gaError}
        />
        <DateRangeBar value={range} onChange={setRange} live updatedAt={data.updatedAt} />

        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Sessions"
            source="ga4"
            value={data.funnel.sessions}
            hint={data.sampleTraffic ? "Sample" : "GA4"}
          />
          <MetricCard
            label="Contact or brief"
            source="studio"
            value={data.funnel.contactOrBrief}
            hint="CTAs + briefs"
          />
          <MetricCard
            label="Briefs"
            source="studio"
            value={data.funnel.briefsOnly}
            hint="Submitted"
          />
        </div>

        <section className="rounded-[10px] border border-mist bg-white p-[22px]">
          <h2 className="text-sm font-semibold text-navy">Steps</h2>
          <div className="mt-5">
            <FunnelBars steps={data.funnel.steps} />
          </div>
          <p className="mt-5 text-[13px]">
            <BriefLink to="/desk/briefs">
              {data.funnel.briefsOnly} brief{data.funnel.briefsOnly === 1 ? "" : "s"} →
            </BriefLink>
          </p>
        </section>

        <PrivacyNote />
      </div>
    </section>
  );
}
