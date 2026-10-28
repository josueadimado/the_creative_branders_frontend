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
import DeskLoader from "./DeskLoader";
import { useDeskAnalytics } from "./useDeskAnalytics";

export default function SourcesAnalytics() {
  const [range, setRange] = useAnalyticsRange();
  const data = useDeskAnalytics(range);

  if (data.loading) {
    return (
      <section>
        <AnalyticsWorkspaceBar />
        <DeskLoader label="Loading sources…" />
      </section>
    );
  }

  if (data.error) return <p className="text-sm text-red-800">{data.error}</p>;

  return (
    <section>
      <AnalyticsWorkspaceBar sample={data.sampleTraffic} />
      <div className="space-y-6">
        <AnalyticsHeading
          title="Sources"
          connected={data.gaConnected}
          connectionError={data.gaError}
        />
        <DateRangeBar value={range} onChange={setRange} live updatedAt={data.updatedAt} />

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

        <Panel title="Channels" source="ga4">
          <ChannelBars rows={data.channels} />
        </Panel>

        <Panel title="Campaigns">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[44rem] text-left text-xs">
              <thead className="text-[10px] font-semibold uppercase tracking-wide text-slate">
                <tr className="border-b border-mist">
                  <th className="pb-2 font-semibold">Source</th>
                  <th className="pb-2 font-semibold">Medium</th>
                  <th className="pb-2 font-semibold">Campaign</th>
                  <th className="pb-2 font-semibold">Sessions</th>
                  <th className="pb-2 font-semibold">Contacts</th>
                  <th className="pb-2 font-semibold">Briefs</th>
                  <th className="pb-2 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {data.campaigns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-slate">
                      No tagged campaigns yet.
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
                            {row.briefs} brief{row.briefs === 1 ? "" : "s"} →
                          </BriefLink>
                        ) : (
                          <span className="text-slate">—</span>
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
