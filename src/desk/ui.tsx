import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { Link } from "react-router-dom";

const fieldClass =
  "w-full rounded-xl border border-mist bg-paper px-3.5 py-2.5 text-base text-navy outline-none transition-colors placeholder:text-slate/70 focus:border-deep focus:bg-white";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-navy">{label}</span>
      {children}
      {hint ? <span className="mt-1.5 block text-sm leading-5 text-slate">{hint}</span> : null}
    </label>
  );
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={fieldClass} />;
}

export function Area({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${fieldClass} min-h-32 leading-6 ${className ?? ""}`} />;
}

export function SelectInput(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={fieldClass} />;
}

export function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 rounded-xl border border-mist bg-paper px-3.5 py-3 text-sm text-navy">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 accent-deep"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

export function DeskHeading({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-navy">{title}</h1>
        {lede ? <p className="mt-2 text-sm leading-6 text-slate">{lede}</p> : null}
      </div>
      {children ? <div className="flex flex-wrap items-center gap-3">{children}</div> : null}
    </header>
  );
}

export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-sm font-medium text-deep">
      {children}
    </Link>
  );
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-mist bg-white p-5 sm:p-6">
      <h2 className="mb-5 font-display text-lg font-semibold text-navy">{title}</h2>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

export function Badge({ live, children }: { live?: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${
        live ? "bg-tint text-deep" : "bg-paper text-slate"
      }`}
    >
      {children}
    </span>
  );
}

export function RecordList({ children }: { children: ReactNode }) {
  return <ul className="overflow-hidden rounded-2xl border border-mist bg-white">{children}</ul>;
}

export const recordRow =
  "flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-paper";

export function Notice({ kind, children }: { kind: "ok" | "bad"; children: ReactNode }) {
  const tone = kind === "ok" ? "border-deep/20 bg-tint text-navy" : "border-red-200 bg-red-50 text-red-800";
  return <p className={`rounded-xl border px-3.5 py-2.5 text-sm ${tone}`}>{children}</p>;
}

export function SaveBar({
  busy,
  label,
  status,
  error,
  children,
}: {
  busy: boolean;
  label: string;
  status?: string;
  error?: string;
  children?: ReactNode;
}) {
  return (
    <div className="sticky bottom-4 z-10 flex flex-wrap items-center gap-3 rounded-2xl border border-mist bg-white px-4 py-3 shadow-[0_8px_30px_rgba(14,30,43,0.08)]">
      <button type="submit" className="btn btn-inverse" disabled={busy}>
        {busy ? "Saving…" : label}
      </button>
      {children}
      {status ? <span className="text-sm text-deep">{status}</span> : null}
      {error ? <span className="text-sm text-red-800">{error}</span> : null}
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-mist bg-white px-5 py-10 text-center text-sm text-slate">
      {children}
    </p>
  );
}
