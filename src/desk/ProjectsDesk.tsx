import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deskFetch, deskJson } from "./api";
import { DEVICES, FAMILIES, RELATIONSHIPS, familyLabel } from "./choices";
import { Area, BackLink, Badge, Check, DeskHeading, Empty, Field, Notice, Panel, recordRow, RecordList, SaveBar, SelectInput, TextInput } from "./ui";

type Shot = {
  id: number;
  existing_path: string;
  alt: string;
  sort_order: number;
  url: string;
};

type Benefit = { value: string; label: string };

type Project = {
  id: number;
  slug: string;
  public_name: string;
  company: string;
  anonymous_name: string;
  name_approved: boolean;
  logo_path: string;
  logo_url: string;
  live_url: string;
  link_approved: boolean;
  relationship: string;
  family: string;
  secondary_families: string[];
  sector: string;
  country: string;
  featured: boolean;
  published: boolean;
  position: number;
  summary: string;
  challenge: string;
  approach: string;
  built: string[];
  stack: string[];
  results: Benefit[];
  device: string;
  shots: Shot[];
};

export default function ProjectsDesk() {
  const { id } = useParams();
  if (!id) return <ProjectList />;
  return <ProjectEdit id={id} />;
}

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    deskJson<Project[]>("/projects/")
      .then(setProjects)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load projects."))
      .finally(() => setReady(true));
  }, []);

  async function createProject() {
    setBusy(true);
    setError("");
    try {
      const created = await deskJson<Project>("/projects/", { method: "POST", body: "{}" });
      navigate(`/desk/projects/${created.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create a project.");
      setBusy(false);
    }
  }

  return (
    <section>
      <DeskHeading title="Projects" lede="A project appears on the website only after you mark it published.">
        <button type="button" className="btn btn-inverse" onClick={createProject} disabled={busy}>
          {busy ? "Creating…" : "New project"}
        </button>
      </DeskHeading>
      {error ? <Notice kind="bad">{error}</Notice> : null}
      {ready && projects.length === 0 ? <Empty>No projects yet.</Empty> : null}
      <RecordList>
        {projects.map((project) => (
          <li key={project.id} className="border-b border-mist last:border-0">
            <Link className={recordRow} to={`/desk/projects/${project.id}`}>
              <span>
                <span className="block font-medium">{project.public_name}</span>
                <span className="mt-0.5 block text-sm text-slate">
                  {familyLabel(project.family)}
                  {project.country ? ` · ${project.country}` : ""}
                </span>
              </span>
              <Badge live={project.published}>{project.published ? "On the site" : "Draft"}</Badge>
            </Link>
          </li>
        ))}
      </RecordList>
    </section>
  );
}

function ProjectEdit({ id }: { id: string }) {
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [tools, setTools] = useState("");
  const [delivery, setDelivery] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [picturePath, setPicturePath] = useState("");
  const [pictureAlt, setPictureAlt] = useState("");
  const [pictureFile, setPictureFile] = useState<File | null>(null);

  useEffect(() => {
    deskJson<Project>(`/projects/${id}/`)
      .then((loaded) => {
        setProject(loaded);
        setTools((loaded.stack || []).join("\n"));
        setDelivery((loaded.built || []).join("\n\n"));
      })
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not open that project."));
  }, [id]);

  function set<K extends keyof Project>(key: K, value: Project[K]) {
    setProject((current) => (current ? { ...current, [key]: value } : current));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!project) return;
    setBusy(true);
    setError("");
    setStatus("");
    const body = {
      ...project,
      stack: tools.split("\n").map((line) => line.trim()).filter(Boolean),
      built: delivery.split(/\n\s*\n/).map((chunk) => chunk.trim()).filter(Boolean),
    };
    delete (body as { shots?: Shot[] }).shots;
    delete (body as { logo_url?: string }).logo_url;
    try {
      const saved = await deskJson<Project>(`/projects/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      setProject(saved);
      setStatus("Saved. Refresh the website to see a published project.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  async function uploadLogo(file: File) {
    const body = new FormData();
    body.append("upload", file);
    const response = await deskFetch(`/projects/${id}/logo/`, { method: "POST", body });
    const data = await response.json();
    if (!response.ok) throw new Error(typeof data.detail === "string" ? data.detail : "Could not upload the logo.");
    setProject(data as Project);
  }

  async function addPicture(event: FormEvent) {
    event.preventDefault();
    setError("");
    const body = new FormData();
    if (pictureFile) body.append("upload", pictureFile);
    if (picturePath.trim()) body.append("existing_path", picturePath.trim());
    body.append("alt", pictureAlt);
    body.append("sort_order", String(project?.shots.length || 0));
    try {
      const response = await deskFetch(`/projects/${id}/shots/`, { method: "POST", body });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(typeof data.detail === "string" ? data.detail : "Could not add that picture.");
      }
      setProject((current) => (current ? { ...current, shots: [...current.shots, data as Shot] } : current));
      setPicturePath("");
      setPictureAlt("");
      setPictureFile(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add that picture.");
    }
  }

  async function removeShot(shotId: number) {
    if (!window.confirm("Remove this picture?")) return;
    await deskJson(`/shots/${shotId}/`, { method: "DELETE" });
    setProject((current) =>
      current ? { ...current, shots: current.shots.filter((shot) => shot.id !== shotId) } : current,
    );
  }

  async function removeProject() {
    if (!project || !window.confirm(`Delete ${project.public_name}? This cannot be undone.`)) return;
    await deskJson(`/projects/${id}/`, { method: "DELETE" });
    navigate("/desk/projects");
  }

  if (!project) {
    return error ? <Notice kind="bad">{error}</Notice> : <p className="text-sm text-slate">Loading the project…</p>;
  }

  return (
    <section>
      <DeskHeading title={project.public_name || "Project"} lede="Refresh the work page after you publish a change.">
        <BackLink to="/desk/projects">All projects</BackLink>
      </DeskHeading>
      <form onSubmit={onSubmit} className="grid gap-5">
        <Panel title="Name">
        <Field label="Public name">
          <TextInput value={project.public_name} onChange={(event) => set("public_name", event.target.value)} required />
        </Field>
        <Field label="Web address" hint="Used in the link, for example relief-chiropractic.">
          <TextInput value={project.slug} onChange={(event) => set("slug", event.target.value)} />
        </Field>
        <Field label="Company">
          <TextInput value={project.company} onChange={(event) => set("company", event.target.value)} />
        </Field>
        <Field label="Name to show before it is approved">
          <TextInput value={project.anonymous_name} onChange={(event) => set("anonymous_name", event.target.value)} />
        </Field>
        <Check label="Show the real name and logo" checked={project.name_approved} onChange={(next) => set("name_approved", next)} />
        </Panel>
        <Panel title="Where it appears">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Main service">
            <SelectInput value={project.family} onChange={(event) => set("family", event.target.value)}>
              {FAMILIES.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Kind of work">
            <SelectInput value={project.relationship} onChange={(event) => set("relationship", event.target.value)}>
              {RELATIONSHIPS.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
        <fieldset>
          <legend className="mb-2 text-sm font-medium">Also listed under</legend>
          <div className="grid gap-2">
            {FAMILIES.filter(([value]) => value !== project.family).map(([value, label]) => (
              <Check
                key={value}
                label={label}
                checked={project.secondary_families.includes(value)}
                onChange={(next) =>
                  set(
                    "secondary_families",
                    next
                      ? [...project.secondary_families, value]
                      : project.secondary_families.filter((item) => item !== value),
                  )
                }
              />
            ))}
          </div>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Sector">
            <TextInput value={project.sector} onChange={(event) => set("sector", event.target.value)} />
          </Field>
          <Field label="Country">
            <TextInput value={project.country} onChange={(event) => set("country", event.target.value)} />
          </Field>
        </div>
        <Field label="How the pictures are framed">
          <SelectInput value={project.device} onChange={(event) => set("device", event.target.value)}>
            {DEVICES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Order" hint="Lower numbers appear first.">
          <TextInput
            type="number"
            value={project.position}
            onChange={(event) => set("position", Number(event.target.value))}
          />
        </Field>
        <Check label="Published on the website" checked={project.published} onChange={(next) => set("published", next)} />
        <Check label="Can appear on the homepage" checked={project.featured} onChange={(next) => set("featured", next)} />
        <Field label="Live site">
          <TextInput value={project.live_url} onChange={(event) => set("live_url", event.target.value)} />
        </Field>
        <Check label="Show the Visit site button" checked={project.link_approved} onChange={(next) => set("link_approved", next)} />
        </Panel>
        <Panel title="Logo">
        <Field label="Logo path" hint="A file already on the site, such as /images/logos/come.png.">
          <TextInput value={project.logo_path} onChange={(event) => set("logo_path", event.target.value)} />
        </Field>
        <Field label="Or upload a logo">
          <input
            type="file"
            accept="image/*"
            className="text-sm"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                uploadLogo(file).catch((err: unknown) =>
                  setError(err instanceof Error ? err.message : "Could not upload the logo."),
                );
              }
            }}
          />
          {project.logo_url ? (
            <img src={project.logo_url} alt="" className="mt-3 h-12 w-auto rounded-lg bg-paper p-2" />
          ) : null}
        </Field>
        </Panel>
        <Panel title="The story">
        <Field label="Summary">
          <Area value={project.summary} onChange={(event) => set("summary", event.target.value)} />
        </Field>
        <Field label="The problem">
          <Area value={project.challenge} onChange={(event) => set("challenge", event.target.value)} />
        </Field>
        <Field label="The solution">
          <Area value={project.approach} onChange={(event) => set("approach", event.target.value)} />
        </Field>
        <Field label="The delivery" hint="Leave a blank line between paragraphs.">
          <Area value={delivery} onChange={(event) => setDelivery(event.target.value)} />
        </Field>
        <Field label="Tools" hint="One tool per line.">
          <Area value={tools} onChange={(event) => setTools(event.target.value)} />
        </Field>
        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Benefits</p>
            <button
              type="button"
              className="text-sm text-deep"
              onClick={() => set("results", [...project.results, { value: "", label: "" }])}
            >
              Add a benefit
            </button>
          </div>
          {project.results.map((benefit, index) => (
            <div key={index} className="grid gap-2 rounded-lg bg-white p-3">
              <TextInput
                placeholder="Short line"
                value={benefit.value}
                onChange={(event) => {
                  const results = project.results.slice();
                  results[index] = { ...benefit, value: event.target.value };
                  set("results", results);
                }}
              />
              <TextInput
                placeholder="The sentence under it"
                value={benefit.label}
                onChange={(event) => {
                  const results = project.results.slice();
                  results[index] = { ...benefit, label: event.target.value };
                  set("results", results);
                }}
              />
            </div>
          ))}
        </div>
        </Panel>
        <SaveBar busy={busy} label="Save project" status={status} error={error}>
          <button type="button" className="text-sm text-red-800" onClick={removeProject}>
            Delete project
          </button>
        </SaveBar>
      </form>

      <form onSubmit={addPicture} className="mt-5">
        <Panel title="Pictures">
        <ul className="grid gap-3">
          {project.shots.map((shot) => (
            <li key={shot.id} className="flex items-center gap-3">
              {shot.url ? <img src={shot.url} alt="" className="h-16 w-24 rounded-lg object-cover" /> : null}
              <span className="min-w-0 flex-1 text-sm">{shot.alt || shot.existing_path || "Picture"}</span>
              <button type="button" className="text-sm text-red-800" onClick={() => removeShot(shot.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <Field label="Picture already on the site" hint="For example /images/work/come/homepage.jpg">
          <TextInput value={picturePath} onChange={(event) => setPicturePath(event.target.value)} />
        </Field>
        <Field label="Or choose a file">
          <input type="file" accept="image/*" onChange={(event) => setPictureFile(event.target.files?.[0] || null)} />
        </Field>
        <Field label="Short description of the picture">
          <TextInput value={pictureAlt} onChange={(event) => setPictureAlt(event.target.value)} />
        </Field>
        <button type="submit" className="btn btn-inverse w-fit">
          Add picture
        </button>
        </Panel>
      </form>
    </section>
  );
}
