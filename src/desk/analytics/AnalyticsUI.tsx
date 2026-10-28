import { useMemo, useState, type ReactNode } from "react";
import { Calendar, NavArrowDown, Refresh } from "iconoir-react";
import { Link } from "react-router-dom";
import {
  sampleRangeLabel,
  sampleUpdated,
  type DateRange,
  type Provenance,
} from "./sampleData";

export type AnalyticsRangeValue = {
  preset: DateRange;
  from: string;
  to: string;
};

function todayIso() {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function daysAgoIso(days: number) {
  const now = new Date();
  now.setDate(now.getDate() - days);
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function defaultAnalyticsRange(): AnalyticsRangeValue {
  return { preset: "7d", from: daysAgoIso(6), to: todayIso() };
}

export function ProvenanceMark({ source }: { source: Provenance }) {
  if (source === "ga4") {
    return <span className="text-[10px] font-medium text-ga"> · GA4</span>;
  }
  return <span className="text-[10px] font-medium text-studio"> · Studio log</span>;
}

export function DotStatus({ ok, label }: { ok: boolean; label: string }) {
  return (
    <p className="shrink-0 text-[11px] text-slate">
      <span className={ok ? "text-studio" : "text-red-700"} aria-hidden="true">
        ●
      </span>{" "}
      {label}
    </p>
  );
}

export function AnalyticsWorkspaceBar({ sample = true }: { sample?: boolean }) {
  return (
    <div className="-mx-6 mb-6 flex h-12 items-center justify-between border-b border-mist bg-white px-6 text-[12px] text-slate lg:-mx-8 lg:px-8">
      <p>
        Creative Branders <span className="text-mist">/</span> Analytics
      </p>
      <p className="text-[11px]">
        {sample ? "Sample · studio log" : "Live"}
        <span className="mx-1">·</span> Accra · GMT
      </p>
    </div>
  );
}

export function AnalyticsHeading({
  title,
  lede,
  connected = true,
  connectionError = "",
}: {
  title: string;
  lede?: string;
  connected?: boolean;
  connectionError?: string;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0 max-w-2xl">
        <h1 className="font-display text-[28px] font-semibold tracking-tight text-navy">{title}</h1>
        {lede ? <p className="mt-1 text-[13px] text-slate">{lede}</p> : null}
        {!connected && connectionError ? (
          <p className="mt-2 max-w-xl text-[12px] leading-snug text-red-800" role="status">
            GA4 error: {connectionError}
          </p>
        ) : null}
      </div>
      <DotStatus ok={connected} label={connected ? "Connected to GA4" : "GA4 disconnected"} />
    </div>
  );
}

export function DateRangeBar({
  value,
  onChange,
  live = false,
  updatedAt,
}: {
  value: AnalyticsRangeValue;
  onChange: (next: AnalyticsRangeValue) => void;
  live?: boolean;
  updatedAt?: string;
}) {
  const options: { id: DateRange; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "7d", label: "7 days" },
    { id: "30d", label: "30 days" },
    { id: "custom", label: "Custom range" },
  ];

  const rangeLabel = useMemo(() => {
    if (value.preset === "custom" && value.from && value.to) {
      return `${value.from} → ${value.to}`;
    }
    if (value.preset === "today") return "Today";
    if (value.preset === "30d") return "Last 30 days";
    if (value.preset === "7d") return "Last 7 days";
    return sampleRangeLabel;
  }, [value]);

  function pickPreset(preset: DateRange) {
    if (preset === "today") {
      const day = todayIso();
      onChange({ preset, from: day, to: day });
      return;
    }
    if (preset === "30d") {
      onChange({ preset, from: daysAgoIso(29), to: todayIso() });
      return;
    }
    if (preset === "7d") {
      onChange({ preset, from: daysAgoIso(6), to: todayIso() });
      return;
    }
    onChange({
      preset: "custom",
      from: value.from || daysAgoIso(6),
      to: value.to || todayIso(),
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex flex-wrap items-center gap-1 rounded-[7px] border border-mist bg-white p-1 text-xs">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 ${
                value.preset === option.id ? "bg-navy font-semibold text-white" : "font-normal text-slate"
              }`}
              onClick={() => pickPreset(option.id)}
            >
              {option.id === "custom" ? <Calendar width={14} height={14} strokeWidth={1.6} /> : null}
              {option.label}
              {option.id === "custom" ? <NavArrowDown width={12} height={12} strokeWidth={1.6} /> : null}
            </button>
          ))}
        </div>
        <p className="inline-flex items-center gap-1.5 text-xs text-slate">
          <Refresh width={14} height={14} strokeWidth={1.6} aria-hidden="true" />
          {live ? rangeLabel : sampleRangeLabel}
          <span className="mx-0.5">·</span>
          {live
            ? updatedAt
              ? `Updated ${new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
              : "Updated just now"
            : sampleUpdated}
        </p>
      </div>

      {value.preset === "custom" ? (
        <div className="flex flex-wrap items-end gap-3 rounded-[10px] border border-mist bg-white px-4 py-3">
          <label className="text-xs text-slate">
            From
            <input
              type="date"
              className="mt-1 block rounded-md border border-mist bg-paper px-3 py-2 text-sm text-navy outline-none focus:border-deep"
              value={value.from}
              max={value.to || todayIso()}
              onChange={(event) =>
                onChange({ preset: "custom", from: event.target.value, to: value.to || todayIso() })
              }
            />
          </label>
          <label className="text-xs text-slate">
            To
            <input
              type="date"
              className="mt-1 block rounded-md border border-mist bg-paper px-3 py-2 text-sm text-navy outline-none focus:border-deep"
              value={value.to}
              min={value.from || undefined}
              max={todayIso()}
              onChange={(event) =>
                onChange({ preset: "custom", from: value.from || daysAgoIso(6), to: event.target.value })
              }
            />
          </label>
        </div>
      ) : null}
    </div>
  );
}

export function MetricCard({
  label,
  source,
  value,
  hint,
}: {
  label: string;
  source: Provenance;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="flex min-h-[7.5rem] flex-col gap-2.5 rounded-[10px] border border-mist bg-white p-5">
      <p className="text-xs text-slate">
        {label}
        <ProvenanceMark source={source} />
      </p>
      <p className="text-[32px] font-semibold leading-none tracking-tight text-navy">{value}</p>
      {hint ? <p className="mt-auto text-[11px] text-slate">{hint}</p> : null}
    </div>
  );
}

export function DailyBars({
  values,
  tone,
}: {
  values: { label: string; value: number }[];
  tone: "ga" | "studio";
}) {
  if (!values.length) {
    return <p className="py-8 text-center text-sm text-slate">No data yet.</p>;
  }
  const max = Math.max(...values.map((item) => item.value), 1);
  const bar = tone === "ga" ? "bg-ga" : "bg-studio";
  return (
    <div>
      <div className="flex h-20 items-end gap-1.5 sm:gap-2.5">
        {values.map((item) => (
          <div
            key={item.label}
            className={`w-full max-w-[34px] flex-1 rounded-[3px] ${bar}`}
            style={{ height: `${Math.max(12, (item.value / max) * 100)}%` }}
            title={`${item.label}: ${item.value}`}
          />
        ))}
      </div>
      <div className="mt-2 flex text-center text-[10px] text-slate">
        {values.map((item) => (
          <span key={item.label} className="flex-1">
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ChannelBars({
  rows,
}: {
  rows: { name: string; sessions: number; briefs: number }[];
}) {
  if (!rows.length) {
    return <p className="py-8 text-center text-sm text-slate">No channels yet.</p>;
  }
  const max = Math.max(...rows.map((row) => row.sessions), 1);
  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.name}>
          <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
            <span className="font-medium text-navy">{row.name}</span>
            <span className="text-slate">
              {row.sessions} sessions · {row.briefs} brief{row.briefs === 1 ? "" : "s"}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-mist">
            <div className="h-full rounded-full bg-ga" style={{ width: `${(row.sessions / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function FunnelBars({
  steps,
}: {
  steps: { title: string; source: Provenance; count: number; detail: string; drop: number | null }[];
}) {
  const max = Math.max(...steps.map((step) => step.count), 1);
  return (
    <ol className="space-y-5">
      {steps.map((step) => (
        <li key={step.title}>
          <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-navy">
                {step.title}
                <ProvenanceMark source={step.source} />
              </p>
              <p className="text-[11px] text-slate">{step.detail}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-navy">{step.count}</p>
              {step.drop != null ? <p className="text-[11px] text-slate">{step.drop}% drop</p> : null}
            </div>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-mist">
            <div
              className={`h-full rounded-full ${step.source === "ga4" ? "bg-ga" : "bg-studio"}`}
              style={{ width: `${(step.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ol>
  );
}

export function PrivacyNote() {
  return null;
}

export function Panel({
  title,
  source,
  children,
  footer,
}: {
  title: string;
  source?: Provenance;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="flex flex-col rounded-[10px] border border-mist bg-white p-[22px]">
      <h2 className="text-sm font-semibold text-navy">
        {title}
        {source ? <ProvenanceMark source={source} /> : null}
      </h2>
      <div className="mt-[18px] flex-1">{children}</div>
      {footer ? <div className="mt-4 text-[11px] text-slate">{footer}</div> : null}
    </section>
  );
}

export function useAnalyticsRange() {
  return useState<AnalyticsRangeValue>(() => defaultAnalyticsRange());
}

export function BriefLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="font-medium text-deep hover:text-deep-hover" to={to}>
      {children}
    </Link>
  );
}

export function FilterChip({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs ${
        active ? "bg-navy text-white" : "border border-mist bg-white text-slate"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}
