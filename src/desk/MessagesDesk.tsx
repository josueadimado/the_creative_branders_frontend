import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deskJson, when } from "./api";
import { BackLink, DeskHeading, Empty, Notice, recordRow, RecordList, TextInput } from "./ui";

type Kind = "briefs" | "waitlist" | "newsletter" | "academy";

type Row = {
  id: number;
  name?: string;
  email: string;
  message?: string;
  created_at: string;
  phone?: string;
  company?: string;
  country?: string;
  needs?: string[];
  timeline?: string;
  budget_range?: string;
  brief_link?: string;
};

const copy: Record<Kind, { title: string; lede: string; path: string; empty: string }> = {
  briefs: {
    title: "Project briefs",
    lede: "Messages from the project form.",
    path: "/inquiries/",
    empty: "No project briefs yet.",
  },
  waitlist: {
    title: "Waitlist",
    lede: "People waiting to hear about SmartCRM.",
    path: "/waitlist/",
    empty: "Nobody has joined the waitlist yet.",
  },
  newsletter: {
    title: "Newsletter",
    lede: "People who asked for studio news.",
    path: "/newsletter/",
    empty: "Nobody has joined the newsletter yet.",
  },
  academy: {
    title: "Academy",
    lede: "People who asked about the Academy.",
    path: "/academy/",
    empty: "No academy messages yet.",
  },
};

export default function MessagesDesk({ kind }: { kind: Kind }) {
  const { id } = useParams();
  if (kind === "briefs" && id) return <Brief id={id} />;
  return <MessageList kind={kind} />;
}

function MessageList({ kind }: { kind: Kind }) {
  const info = copy[kind];
  const [rows, setRows] = useState<Row[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const search = query.trim() ? `?q=${encodeURIComponent(query.trim())}` : "";
    const handle = window.setTimeout(() => {
      deskJson<Row[]>(`${info.path}${search}`)
        .then(setRows)
        .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load messages."))
        .finally(() => setReady(true));
    }, 200);
    return () => window.clearTimeout(handle);
  }, [info.path, query]);

  return (
    <section>
      <DeskHeading title={info.title} lede={info.lede} />
      <div className="mb-4 max-w-md">
        <TextInput placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} />
      </div>
      {error ? <Notice kind="bad">{error}</Notice> : null}
      {ready && rows.length === 0 ? <Empty>{info.empty}</Empty> : null}
      {rows.length > 0 ? (
        <RecordList>
          {rows.map((row) => {
            const label = row.name || row.email;
            const inner = (
              <span className={recordRow}>
                <span className="min-w-0">
                  <span className="block font-medium">{label}</span>
                  {row.name ? <span className="mt-0.5 block text-sm text-slate">{row.email}</span> : null}
                  {row.message ? (
                    <span className="mt-1 block truncate text-sm text-slate">{row.message}</span>
                  ) : null}
                </span>
                <span className="shrink-0 text-sm text-slate">{when(row.created_at)}</span>
              </span>
            );
            return (
              <li key={row.id} className="border-b border-mist last:border-0">
                {kind === "briefs" ? (
                  <Link className="block" to={`/desk/briefs/${row.id}`}>
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </RecordList>
      ) : null}
    </section>
  );
}

function line(label: string, value?: string | string[]) {
  const text = Array.isArray(value) ? value.join(", ") : value;
  if (!text) return null;
  return (
    <div className="grid gap-1 border-b border-mist py-3 sm:grid-cols-[10rem_1fr]">
      <dt className="text-sm text-slate">{label}</dt>
      <dd className="whitespace-pre-wrap">{text}</dd>
    </div>
  );
}

function Brief({ id }: { id: string }) {
  const navigate = useNavigate();
  const [row, setRow] = useState<Row | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    deskJson<Row>(`/inquiries/${id}/`)
      .then(setRow)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not open that brief."));
  }, [id]);

  async function remove() {
    if (!row || !window.confirm(`Delete the brief from ${row.name}?`)) return;
    await deskJson(`/inquiries/${id}/`, { method: "DELETE" });
    navigate("/desk/briefs");
  }

  if (!row) {
    return error ? <Notice kind="bad">{error}</Notice> : <p className="text-sm text-slate">Loading the brief…</p>;
  }

  return (
    <section>
      <DeskHeading title={row.name || row.email} lede={when(row.created_at)}>
        <BackLink to="/desk/briefs">All briefs</BackLink>
      </DeskHeading>
      <dl className="rounded-2xl border border-mist bg-white px-5 sm:px-6">
        {line("Email", row.email)}
        {line("Phone", row.phone)}
        {line("Company", row.company)}
        {line("Country", row.country)}
        {line("Needs", row.needs)}
        {line("When to start", row.timeline)}
        {line("Budget", row.budget_range)}
        {line("Link", row.brief_link)}
        {line("Message", row.message)}
      </dl>
      <button type="button" className="mt-4 text-sm text-red-800" onClick={remove}>
        Delete this brief
      </button>
      {error ? <div className="mt-3"><Notice kind="bad">{error}</Notice></div> : null}
    </section>
  );
}
