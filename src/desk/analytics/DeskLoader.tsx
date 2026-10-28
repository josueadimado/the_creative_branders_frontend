export default function DeskLoader({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      className="flex min-h-[14rem] flex-col items-center justify-center gap-4 rounded-[10px] border border-mist bg-white px-6 py-10 text-slate"
      role="status"
      aria-live="polite"
    >
      <span className="desk-dual-ring" aria-hidden="true" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
