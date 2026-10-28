import { useMemo, useState } from "react";
import { ArrowLeft, CircleAlert } from "lucide-react";
import {
  AnalyticsHeading,
  AnalyticsWorkspaceBar,
  DateRangeBar,
  MetricCard,
  Panel,
  PrivacyNote,
  useAnalyticsRange,
} from "./AnalyticsUI";
import DeskLoader from "./DeskLoader";
import { useDeskAnalytics, type JourneyItem } from "./useDeskAnalytics";

function formatDuration(sec: number): string {
  if (sec < 60) return `${sec}s`;
  const minutes = Math.floor(sec / 60);
  const rest = sec % 60;
  return rest ? `${minutes}m ${rest}s` : `${minutes}m`;
}

function outcomeTone(outcome: string, converted: boolean): string {
  if (converted) return "bg-emerald-50 text-emerald-900";
  if (outcome === "bounced") return "bg-amber-50 text-amber-900";
  if (outcome === "js_error" || outcome === "form_error") return "bg-red-50 text-red-900";
  return "bg-mist/60 text-navy";
}

function JourneyDetail({
  journey,
  onBack,
}: {
  journey: JourneyItem;
  onBack: () => void;
}) {
  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-[13px] text-deep hover:underline"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.6} />
        All journeys
      </button>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-[22px] font-semibold tracking-tight text-navy">
            {journey.started_label}
          </p>
          <p className="mt-1 text-[12px] text-slate">
            {journey.device || "device unknown"}
            {journey.source ? ` · ${journey.source}` : ""}
            {journey.campaign ? ` / ${journey.campaign}` : ""}
          </p>
        </div>
        <span
          className={`rounded-md px-2.5 py-1 text-[11px] font-medium ${outcomeTone(journey.outcome, journey.converted)}`}
        >
          {journey.outcome_label}
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        <div className="rounded-[10px] border border-mist bg-white p-3">
          <p className="text-[11px] text-slate">Landing</p>
          <p className="mt-1 truncate text-[13px] text-navy">{journey.landing_page || "—"}</p>
        </div>
        <div className="rounded-[10px] border border-mist bg-white p-3">
          <p className="text-[11px] text-slate">Last page</p>
          <p className="mt-1 truncate text-[13px] text-navy">{journey.exit_page || "—"}</p>
        </div>
        <div className="rounded-[10px] border border-mist bg-white p-3">
          <p className="text-[11px] text-slate">Time on site</p>
          <p className="mt-1 text-[13px] text-navy">{formatDuration(journey.duration_sec)}</p>
        </div>
        <div className="rounded-[10px] border border-mist bg-white p-3">
          <p className="text-[11px] text-slate">Pages · events</p>
          <p className="mt-1 text-[13px] text-navy">
            {journey.page_count} · {journey.event_count}
          </p>
        </div>
      </div>

      {journey.pages.length ? (
        <p className="text-[12px] text-slate">
          Path: {journey.pages.join(" → ")}
        </p>
      ) : null}

      <Panel title="Timeline" source="studio">
        <ol className="space-y-0">
          {journey.steps.map((step, index) => (
            <li key={`${step.created_at}-${index}`} className="relative flex gap-3 pb-4 last:pb-0">
              <div className="flex w-14 shrink-0 flex-col items-end pt-0.5">
                <span className="font-mono text-[11px] text-slate">{step.time}</span>
              </div>
              <div className="relative flex flex-col items-center">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-deep" />
                {index < journey.steps.length - 1 ? (
                  <span className="mt-1 w-px flex-1 bg-mist" aria-hidden="true" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1 pb-1">
                <p className="text-[13px] font-medium text-navy">{step.label}</p>
                <p className="mt-0.5 text-[12px] text-slate">
                  {step.path || "—"}
                  {step.detail && step.detail !== step.path ? ` · ${step.detail}` : ""}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}

export default function JourneysAnalytics() {
  const [range, setRange] = useAnalyticsRange();
  const data = useDeskAnalytics(range);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "converted" | "bounced" | "errors">("all");

  const journeys = data.journeys.items;
  const selected = useMemo(
    () => journeys.find((row) => row.visit_id === selectedId) || null,
    [journeys, selectedId],
  );

  const filtered = useMemo(() => {
    return journeys.filter((row) => {
      if (filter === "converted") return row.converted;
      if (filter === "bounced") return row.outcome === "bounced";
      if (filter === "errors") return row.error_count > 0;
      return true;
    });
  }, [journeys, filter]);

  if (data.loading) {
    return (
      <section>
        <AnalyticsWorkspaceBar sample={data.sampleTraffic} />
        <DeskLoader label="Loading journeys…" />
      </section>
    );
  }

  if (data.error) return <p className="text-sm text-red-800">{data.error}</p>;

  return (
    <section>
      <AnalyticsWorkspaceBar sample={data.sampleTraffic} />
      <div className="space-y-6">
        <AnalyticsHeading
          title="Journeys"
          lede="How each consented visitor moved through the site — pages, time, clicks, and where they dropped off."
          connected={data.gaConnected}
          connectionError={data.gaError}
        />
        <DateRangeBar value={range} onChange={setRange} live updatedAt={data.updatedAt} />

        {selected ? (
          <JourneyDetail journey={selected} onBack={() => setSelectedId(null)} />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <MetricCard
                label="Visits tracked"
                source="studio"
                value={data.journeys.stats.visits}
                hint="With a visit id"
              />
              <MetricCard
                label="Took action"
                source="studio"
                value={data.journeys.stats.converted}
                hint="Contact CTA or brief"
              />
              <MetricCard
                label="Left quickly"
                source="studio"
                value={data.journeys.stats.bounced}
                hint="One page, no CTA"
              />
              <MetricCard
                label="Avg time"
                source="studio"
                value={formatDuration(data.journeys.stats.avg_duration_sec)}
                hint={`${data.journeys.stats.avg_pages} pages avg`}
              />
            </div>

            <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
              <Panel title="What to improve" source="studio">
                <ul className="space-y-3">
                  {data.journeys.tips.map((tip) => (
                    <li key={tip.title} className="flex gap-2.5">
                      <CircleAlert
                        className={
                          tip.severity === "high"
                            ? "mt-0.5 h-4 w-4 shrink-0 text-red-700"
                            : tip.severity === "medium"
                              ? "mt-0.5 h-4 w-4 shrink-0 text-amber-700"
                              : "mt-0.5 h-4 w-4 shrink-0 text-slate"
                        }
                        strokeWidth={1.6}
                      />
                      <div>
                        <p className="text-[13px] font-medium text-navy">{tip.title}</p>
                        <p className="mt-0.5 text-[12px] leading-snug text-slate">{tip.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Panel>

              <Panel title="Common exit pages" source="studio">
                {data.journeys.top_exit_pages.length ? (
                  <ul className="space-y-2">
                    {data.journeys.top_exit_pages.map((row) => (
                      <li key={row.path} className="flex items-baseline justify-between gap-3 text-[13px]">
                        <span className="truncate text-navy">{row.path}</span>
                        <span className="shrink-0 tabular-nums text-slate">{row.count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-[13px] text-slate">No exit pattern yet.</p>
                )}
              </Panel>
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["all", "All"],
                  ["converted", "Took action"],
                  ["bounced", "Left quickly"],
                  ["errors", "Had errors"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  className={`rounded-md border px-3 py-1.5 text-[12px] ${
                    filter === id
                      ? "border-deep bg-deep text-white"
                      : "border-mist bg-white text-navy hover:border-deep/40"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <Panel title="Recent visits" source="studio">
              {filtered.length ? (
                <ul className="divide-y divide-mist">
                  {filtered.map((row) => (
                    <li key={row.visit_id}>
                      <button
                        type="button"
                        onClick={() => setSelectedId(row.visit_id)}
                        className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 py-3 text-left hover:bg-paper/80"
                      >
                        <span className="w-28 shrink-0 text-[12px] text-slate">{row.started_label}</span>
                        <span className="min-w-0 flex-1 truncate text-[13px] text-navy">
                          {row.landing_page}
                          {row.exit_page && row.exit_page !== row.landing_page
                            ? ` → ${row.exit_page}`
                            : ""}
                        </span>
                        <span className="text-[12px] tabular-nums text-slate">
                          {formatDuration(row.duration_sec)} · {row.page_count}p
                        </span>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${outcomeTone(row.outcome, row.converted)}`}
                        >
                          {row.outcome_label}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[13px] text-slate">
                  No journeys in this range yet. They appear after visitors accept analytics cookies.
                </p>
              )}
            </Panel>
          </>
        )}

        <PrivacyNote />
      </div>
    </section>
  );
}
