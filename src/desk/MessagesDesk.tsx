import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, GraduationCap, Inbox, Mail, Trash2, Users, type LucideIcon } from "lucide-react";
import { deskJson, when } from "./api";
import { DeskHeading, Notice, recordRow, RecordList, TextInput } from "./ui";

type Kind = "briefs" | "waitlist" | "newsletter" | "academy";

type Row = {
  id: number;
  name?: string;
  email: string;
  message?: string;
  reviewed?: boolean;
  phone?: string;
  company?: string;
  country?: string;
  needs?: string[];
  timeline?: string;
  budget_range?: string;
  budget_currency?: string;
  brief_link?: string;
  consent_at?: string;
  created_at: string;
};

const copy: Record<Kind, { title: string; lede: string; path: string; empty: string; emptyDetail?: string; icon: LucideIcon }> = {
  briefs: {
    title: "Project briefs",
    lede: "Messages from the Start a project page.",
    path: "/inquiries/",
    empty: "No briefs yet",
    emptyDetail: "When someone sends a brief from the website, it appears here and a copy goes to your email.",
    icon: Inbox,
  },
  waitlist: {
    title: "Waitlist",
    lede: "People waiting to hear about SmartCRM.",
    path: "/waitlist/",
    empty: "Nobody has joined the waitlist yet.",
    icon: Users,
  },
  newsletter: {
    title: "Newsletter",
    lede: "People who asked for studio news.",
    path: "/newsletter/",
    empty: "Nobody has joined the newsletter yet.",
    icon: Mail,
  },
  academy: {
    title: "Academy",
    lede: "People who asked about the Academy.",
    path: "/academy/",
    empty: "No academy messages yet.",
    icon: GraduationCap,
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
      {ready && rows.length === 0 ? (
        <div className="rounded-2xl border border-mist bg-white px-6 py-16 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-tint text-deep">
            <info.icon size={22} aria-hidden="true" />
          </span>
          <p className="mt-4 text-lg font-semibold">{info.empty}</p>
          {info.emptyDetail ? <p className="mx-auto mt-2 max-w-sm text-sm text-slate">{info.emptyDetail}</p> : null}
          {kind === "briefs" ? (
            <a className="btn mt-5 rounded-full border border-mist bg-white text-navy" href="/contact">
              <ArrowUpRight size={16} aria-hidden="true" />
              Open the Start a project page
            </a>
          ) : null}
        </div>
      ) : null}
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

function receivedLine(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const time = date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  if (date.toDateString() === new Date().toDateString()) return `Received today at ${time}`;
  return when(value);
}

function whatsappNumber(phone?: string): string {
  return (phone || "").replace(/\D/g, "");
}

/** Cedis get a GHS prefix. Dollar ranges already include the $ sign. */
function budgetText(row: Row): string | undefined {
  if (!row.budget_range) return undefined;
  if (row.budget_currency === "GHS") return `GHS ${row.budget_range}`;
  return row.budget_range;
}

function detailLine(label: string, value?: string | string[]) {
  const text = Array.isArray(value) ? value.join(", ") : value;
  if (!text) return null;
  return (
    <div className="border-b border-mist px-5 py-3 last:border-0">
      <dt className="text-xs uppercase tracking-wide text-slate">{label}</dt>
      <dd className="mt-1 break-words">
        {label === "Email" || label === "Link" ? (
          <a className="text-deep" href={label === "Email" ? `mailto:${text}` : text}>
            {text}
          </a>
        ) : (
          text
        )}
      </dd>
    </div>
  );
}

function Brief({ id }: { id: string }) {
  const navigate = useNavigate();
  const [row, setRow] = useState<Row | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancel = false;
    deskJson<Row>(`/inquiries/${id}/`)
      .then((loaded) => {
        if (cancel) return;
        setRow(loaded);
        if (!loaded.reviewed) {
          deskJson(`/inquiries/${id}/`, { method: "POST" }).catch(() => undefined);
        }
      })
      .catch((err: unknown) => {
        if (!cancel) setError(err instanceof Error ? err.message : "Could not open that brief.");
      });
    return () => {
      cancel = true;
    };
  }, [id]);

  async function remove() {
    if (!row || !window.confirm(`Delete the brief from ${row.name}?`)) return;
    await deskJson(`/inquiries/${id}/`, { method: "DELETE" });
    navigate("/desk/briefs");
  }

  if (!row) {
    return error ? <Notice kind="bad">{error}</Notice> : <p className="text-sm text-slate">Loading the brief…</p>;
  }

  const company = [row.company, receivedLine(row.created_at)].filter(Boolean).join(" · ");
  const whatsapp = whatsappNumber(row.phone);

  return (
    <section>
      <Link className="inline-flex items-center gap-1 text-sm text-slate hover:text-navy" to="/desk/briefs">
        <ChevronLeft size={16} aria-hidden="true" />
        Project briefs
      </Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">{row.name || row.email}</h1>
            {!row.reviewed ? (
              <span className="rounded-full bg-navy px-2 py-0.5 text-xs font-medium text-white">New</span>
            ) : null}
          </div>
          {company ? <p className="mt-1 text-sm text-slate">{company}</p> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <a className="btn btn-inverse rounded-full" href={`mailto:${row.email}`}>
            <Mail size={16} aria-hidden="true" />
            Reply by email
          </a>
          {whatsapp ? (
            <a className="btn rounded-full border border-mist bg-white text-navy" href={`https://wa.me/${whatsapp}`} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          ) : null}
        </div>
      </div>
      <div className="mt-6 grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="rounded-2xl border border-mist bg-white p-5">
          <h2 className="font-semibold">The message</h2>
          <p className="mt-4 whitespace-pre-wrap leading-relaxed">{row.message}</p>
        </section>
        <dl className="rounded-2xl border border-mist bg-white">
          <div className="border-b border-mist px-5 py-3 font-semibold">Details</div>
          {detailLine("Email", row.email)}
          {detailLine("WhatsApp or phone", row.phone)}
          {detailLine("Company", row.company)}
          {detailLine("Country", row.country)}
          {detailLine("Needs", row.needs)}
          {detailLine("Wants to start", row.timeline)}
          {detailLine("Budget", budgetText(row))}
          {detailLine("Link", row.brief_link)}
          {detailLine("Agreed to privacy", row.consent_at ? when(row.consent_at) : undefined)}
        </dl>
      </div>
      <div className="mt-6 flex justify-end">
        <button type="button" className="inline-flex items-center gap-2 text-sm text-red-800" onClick={remove}>
          <Trash2 size={16} aria-hidden="true" />
          Delete this brief
        </button>
      </div>
      {error ? <div className="mt-3"><Notice kind="bad">{error}</Notice></div> : null}
    </section>
  );
}
