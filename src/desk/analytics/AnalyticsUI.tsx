import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  sampleRangeLabel,
  sampleUpdated,
  type DateRange,
  type Provenance,
} from "./sampleData";

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
        {sample ? "Sample traffic · live studio log" : "Live analytics"}
        <span className="mx-1">·</span> Accra, Ghana · GMT
      </p>
    </div>
  );
}

export function AnalyticsHeading({
  title,
  lede,
  connected = true,
}: {
  title: string;
  lede: string;
  connected?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0 max-w-2xl">
        <h1 className="text-[28px] font-semibold tracking-tight text-navy">{title}</h1>
        <p className="mt-1 text-[13px] text-slate">{lede}</p>
      </div>
      <DotStatus ok={connected} label={connected ? "Connected to GA4" : "GA4 disconnected"} />
    </div>
  );
}

export function DateRangeBar({
  value,
  onChange,
  live = false,
}: {
  value: DateRange;
  onChange: (next: DateRange) => void;
  live?: boolean;
}) {
  const options: { id: DateRange; label: string }[] = [
    { id: "today", label: "Today" },
    { id: "7d", label: "7 days" },
    { id: "30d", label: "30 days" },
    { id: "custom", label: "Custom range ↓" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="inline-flex flex-wrap gap-4 rounded-[7px] border border-mist bg-white px-3.5 py-2 text-xs">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={value === option.id ? "font-semibold text-ga" : "font-normal text-slate"}
            onClick={() => onChange(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate">
        {live ? "Live studio range" : sampleRangeLabel}
        <span className="mx-1">·</span>
        {live ? "Updated just now" : sampleUpdated}
      </p>
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
  hint: string;
}) {
  return (
    <div className="flex min-h-[7.5rem] flex-col gap-2.5 rounded-[10px] border border-mist bg-white p-5">
      <p className="text-xs text-slate">
        {label}
        <ProvenanceMark source={source} />
      </p>
      <p className="text-[32px] font-semibold leading-none tracking-tight text-navy">{value}</p>
      <p className="mt-auto text-[11px] text-slate">{hint}</p>
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
              {step.drop != null ? (
                <p className="text-[11px] text-slate">{step.drop}% lower volume</p>
              ) : (
                <p className="text-[11px] text-slate">Starting volume</p>
              )}
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
  return (
    <p className="text-[10px] leading-relaxed text-slate">
      Consent-first aggregates only. No visitor profiles, heatmaps or session recordings. Desk is private and
      noindex.
    </p>
  );
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
  return useState<DateRange>("7d");
}

export function BriefLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="font-medium text-deep hover:text-deep-hover" to={to}>
      {children}
    </Link>
  );
}
