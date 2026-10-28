import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deskJson } from "./api";
import { FAMILIES, familyLabel } from "./choices";
import { Area, BackLink, Badge, Check, DeskHeading, Empty, Field, Notice, Panel, recordRow, RecordList, SaveBar, SelectInput, TextInput } from "./ui";

type Note = {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  family: string;
  published: boolean;
  published_on: string | null;
};

export default function NotesDesk() {
  const { id } = useParams();
  if (!id) return <NoteList />;
  return <NoteEdit id={id} />;
}

function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    deskJson<Note[]>("/notes/")
      .then(setNotes)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load notes."))
      .finally(() => setReady(true));
  }, []);

  async function createNote() {
    setBusy(true);
    try {
      const created = await deskJson<Note>("/notes/", { method: "POST", body: "{}" });
      navigate(`/desk/notes/${created.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create a note.");
      setBusy(false);
    }
  }

  return (
    <section>
      <DeskHeading title="Notes">
        <button type="button" className="btn btn-inverse" onClick={createNote} disabled={busy}>
          {busy ? "Creating…" : "New note"}
        </button>
      </DeskHeading>
      {error ? <Notice kind="bad">{error}</Notice> : null}
      {ready && notes.length === 0 ? <Empty>No notes yet.</Empty> : null}
      <RecordList>
        {notes.map((note) => (
          <li key={note.id} className="border-b border-mist last:border-0">
            <Link className={recordRow} to={`/desk/notes/${note.id}`}>
              <span>
                <span className="block font-medium">{note.title}</span>
                <span className="mt-0.5 block text-sm text-slate">{familyLabel(note.family)}</span>
              </span>
              <Badge live={note.published}>{note.published ? "Published" : "Draft"}</Badge>
            </Link>
          </li>
        ))}
      </RecordList>
    </section>
  );
}

function NoteEdit({ id }: { id: string }) {
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    deskJson<Note>(`/notes/${id}/`)
      .then(setNote)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not open that note."));
  }, [id]);

  function set<K extends keyof Note>(key: K, value: Note[K]) {
    setNote((current) => (current ? { ...current, [key]: value } : current));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!note) return;
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const saved = await deskJson<Note>(`/notes/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ ...note, published_on: note.published_on || null }),
      });
      setNote(saved);
      setStatus("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function removeNote() {
    if (!note || !window.confirm(`Delete ${note.title}?`)) return;
    await deskJson(`/notes/${id}/`, { method: "DELETE" });
    navigate("/desk/notes");
  }

  if (!note) {
    return error ? <Notice kind="bad">{error}</Notice> : <p className="text-sm text-slate">Loading the note…</p>;
  }

  return (
    <section>
      <DeskHeading title={note.title || "Note"}>
        <BackLink to="/desk/notes">All notes</BackLink>
      </DeskHeading>
      <form onSubmit={onSubmit} className="grid gap-5">
        <Panel title="Note">
        <Field label="Title">
          <TextInput value={note.title} onChange={(event) => set("title", event.target.value)} required />
        </Field>
        <Field label="Web address">
          <TextInput value={note.slug} onChange={(event) => set("slug", event.target.value)} />
        </Field>
        <Field label="Short description">
          <Area value={note.description} onChange={(event) => set("description", event.target.value)} />
        </Field>
        <Field label="Service">
          <SelectInput value={note.family} onChange={(event) => set("family", event.target.value)}>
            {FAMILIES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Date" hint="The day you want the note to show as published.">
          <TextInput
            type="date"
            value={note.published_on || ""}
            onChange={(event) => set("published_on", event.target.value || null)}
          />
        </Field>
        <Check label="Published" checked={note.published} onChange={(next) => set("published", next)} />
        <Field label="Note" hint="Plain paragraphs. Leave a blank line between them.">
          <Area className="min-h-64" value={note.body} onChange={(event) => set("body", event.target.value)} />
        </Field>
        </Panel>
        <SaveBar busy={busy} label="Save note" status={status} error={error}>
          <button type="button" className="text-sm text-red-800" onClick={removeNote}>
            Delete note
          </button>
        </SaveBar>
      </form>
    </section>
  );
}
