import {
  AnalyticsHeading,
  AnalyticsWorkspaceBar,
  BriefLink,
  ChannelBars,
  DateRangeBar,
  MetricCard,
  Panel,
  PrivacyNote,
  useAnalyticsRange,
} from "./AnalyticsUI";
import { useDeskAnalytics } from "./useDeskAnalytics";

export default function SourcesAnalytics() {
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
          title="Sources & campaigns"
          lede="Follow the signal from a campaign to a real project brief."
          connected={data.gaConnected}
          connectionError={data.gaError}
        />
        <DateRangeBar value={range} onChange={setRange} live />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Sessions"
            source="ga4"
            value={data.sources.sessions}
            hint={data.sources.sessionsHint}
          />
          <MetricCard
            label="Campaign sessions"
            source="ga4"
            value={data.sources.campaignSessions}
            hint={data.sources.campaignSessionsHint}
          />
          <MetricCard
            label="Campaign contacts"
            source="studio"
            value={data.sources.campaignContacts}
            hint={data.sources.campaignContactsHint}
          />
          <MetricCard
            label="Campaign briefs"
            source="studio"
            value={data.sources.campaignBriefs}
            hint={data.sources.campaignBriefsHint}
          />
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
          <Panel
            title="Where sessions come from"
            source="ga4"
            footer={
              data.sampleTraffic
                ? "Sample channel mix until GA4 is connected."
                : "Campaign includes named UTM traffic."
            }
          >
            <ChannelBars rows={data.channels} />
          </Panel>
          <div className="rounded-[10px] border border-mist bg-white p-5">
            <h2 className="text-sm font-semibold text-navy">Click → contact → brief</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate">
              Tagged social links stick for the visit. WhatsApp and other CTAs keep those tags even when
              nobody submits a brief yet.
            </p>
            {data.campaigns[0] ? (
              <div className="mt-4 rounded-md bg-[#eaf6f2] px-3 py-3 text-[11px] text-studio">
                {data.campaigns[0].campaign} from {data.campaigns[0].source}:{" "}
                {data.campaigns[0].contacts || 0} contact
                {(data.campaigns[0].contacts || 0) === 1 ? "" : "s"} · {data.campaigns[0].briefs} brief
                {data.campaigns[0].briefs === 1 ? "" : "s"}.
              </div>
            ) : (
              <div className="mt-4 rounded-md bg-paper px-3 py-3 text-[11px] text-slate">
                No tagged campaigns in this range yet. Share links with utm_source and utm_campaign.
              </div>
            )}
          </div>
        </div>

        <Panel title="Campaign attribution">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-left text-xs">
              <thead className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                <tr className="border-b border-mist">
                  <th className="pb-2 font-semibold">utm_source</th>
                  <th className="pb-2 font-semibold">utm_medium</th>
                  <th className="pb-2 font-semibold">utm_campaign</th>
                  <th className="pb-2 font-semibold">Sessions</th>
                  <th className="pb-2 font-semibold">Contacts</th>
                  <th className="pb-2 font-semibold">Briefs</th>
                  <th className="pb-2 font-semibold">Related briefs</th>
                </tr>
              </thead>
              <tbody>
                {data.campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-slate">
                      Rows appear when a tagged visit clicks a CTA or sends a brief.
                    </td>
                  </tr>
                ) : (
                  data.campaigns.map((row) => (
                    <tr
                      key={`${row.source}-${row.medium}-${row.campaign}`}
                      className="border-b border-mist/70 last:border-0"
                    >
                      <td className="py-3.5 font-medium text-navy">{row.source}</td>
                      <td className="py-3.5 text-slate">{row.medium}</td>
                      <td className="py-3.5 text-slate">{row.campaign}</td>
                      <td className="py-3.5 text-slate">{row.sessions || "—"}</td>
                      <td className="py-3.5 text-slate">{row.contacts || 0}</td>
                      <td className="py-3.5 text-slate">{row.briefs}</td>
                      <td className="py-3.5">
                        {row.briefs > 0 ? (
                          <BriefLink to="/desk/briefs">
                            View {row.briefs} brief{row.briefs === 1 ? "" : "s"} →
                          </BriefLink>
                        ) : (
                          <span className="text-slate">No briefs yet</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Panel>

        <PrivacyNote />
      </div>
    </section>
  );
}
