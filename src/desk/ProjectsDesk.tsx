import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronRight, ImagePlus, PanelsTopLeft, Plus, X } from "lucide-react";
import { deskFetch, deskJson } from "./api";
import { DEVICES, FAMILIES, RELATIONSHIPS, familyLabel } from "./choices";
import { Area, Badge, Check, Field, Notice, Panel, SelectInput, TextInput } from "./ui";

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
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "live" | "draft">("all");
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

  const liveCount = projects.filter((project) => project.published).length;
  const draftCount = projects.length - liveCount;
  const needle = query.trim().toLowerCase();
  const shown = projects.filter((project) => {
    if (filter === "live" && !project.published) return false;
    if (filter === "draft" && project.published) return false;
    if (!needle) return true;
    return `${project.public_name} ${project.company} ${project.country}`.toLowerCase().includes(needle);
  });

  return (
    <section>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
          <p className="mt-1 max-w-xl text-sm text-slate">
            Case studies on the Work page. A project shows on the site once it is published.
          </p>
        </div>
        {projects.length > 0 ? (
          <button type="button" className="btn btn-inverse rounded-full" onClick={createProject} disabled={busy}>
            {busy ? "Creating…" : "+ New project"}
          </button>
        ) : null}
      </div>
      {error ? <div className="mt-4"><Notice kind="bad">{error}</Notice></div> : null}
      {ready && projects.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-mist bg-white px-6 py-16 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-tint text-deep">
            <PanelsTopLeft size={22} aria-hidden="true" />
          </span>
          <p className="mt-4 text-lg font-semibold">No projects yet</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-slate">
            Add your first case study. It stays a draft until you publish it, so you can take your time.
          </p>
          <button type="button" className="btn btn-inverse mt-5 rounded-full" onClick={createProject} disabled={busy}>
            {busy ? "Creating…" : "+ New project"}
          </button>
        </div>
      ) : null}
      {projects.length > 0 ? (
        <div className="mt-6 overflow-hidden rounded-2xl border border-mist bg-white">
          <div className="flex flex-wrap items-center gap-3 border-b border-mist px-4 py-3">
            <input
              className="min-w-0 flex-1 rounded-full border border-mist bg-paper px-4 py-2 text-sm outline-none focus:border-deep"
              placeholder="Search projects"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {(
              [
                ["all", `All ${projects.length}`],
                ["live", `On the site ${liveCount}`],
                ["draft", `Drafts ${draftCount}`],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`rounded-full px-3 py-1.5 text-sm ${filter === value ? "bg-navy text-white" : "bg-paper text-slate"}`}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate">
              <tr>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="hidden px-3 py-3 font-medium md:table-cell">Main service</th>
                <th className="hidden px-3 py-3 font-medium sm:table-cell">Country</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((project) => (
                <tr key={project.id} className="border-t border-mist">
                  <td className="px-4 py-3">
                    <Link className="flex items-center gap-3" to={`/desk/projects/${project.id}`}>
                      {project.logo_url ? (
                        <img src={project.logo_url} alt="" className="h-9 w-9 rounded-lg bg-paper object-contain p-1" />
                      ) : (
                        <span className="grid h-9 w-9 place-items-center rounded-lg bg-tint text-sm font-medium text-deep">
                          {(project.public_name || "?").slice(0, 1)}
                        </span>
                      )}
                      <span>
                        <span className="block font-medium">{project.public_name}</span>
                        {project.featured ? <span className="text-xs text-slate">Featured</span> : null}
                      </span>
                    </Link>
                  </td>
                  <td className="hidden px-3 py-3 text-slate md:table-cell">{familyLabel(project.family)}</td>
                  <td className="hidden px-3 py-3 text-slate sm:table-cell">{project.country || "Not set"}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center justify-between gap-2">
                      <Badge live={project.published}>{project.published ? "On the site" : "Draft"}</Badge>
                      <ChevronRight size={16} className="text-slate" aria-hidden="true" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-mist px-4 py-3 text-sm text-slate">
            Showing {shown.length} of {projects.length}
          </p>
        </div>
      ) : null}
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
  const [saved, setSaved] = useState("");
  const [toolDraft, setToolDraft] = useState("");
  const [addingPicture, setAddingPicture] = useState(false);

  function storyKey(loaded: Project, toolText: string, deliveryText: string) {
    const copy = { ...loaded } as Partial<Project>;
    delete copy.shots;
    delete copy.logo_url;
    return JSON.stringify({ ...copy, toolText, deliveryText });
  }

  function remember(loaded: Project, toolText: string, deliveryText: string) {
    setProject(loaded);
    setTools(toolText);
    setDelivery(deliveryText);
    setSaved(storyKey(loaded, toolText, deliveryText));
  }

  useEffect(() => {
    deskJson<Project>(`/projects/${id}/`)
      .then((loaded) => remember(loaded, (loaded.stack || []).join("\n"), (loaded.built || []).join("\n\n")))
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
      const savedProject = await deskJson<Project>(`/projects/${id}/`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      remember(savedProject, (savedProject.stack || []).join("\n"), (savedProject.built || []).join("\n\n"));
      setStatus("Saved. Refresh the website to see it.");
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

  const toolList = tools.split("\n").map((line) => line.trim()).filter(Boolean);
  const dirty = storyKey(project, tools, delivery) !== saved;

  function setToolsFromList(next: string[]) {
    setTools(next.join("\n"));
  }

  return (
    <section className="pb-24">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate">
            <Link className="hover:text-navy" to="/desk/projects">Projects</Link>
            <span className="px-1.5">/</span>
            {project.public_name || "Project"}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">{project.public_name || "Project"}</h1>
            <Badge live={project.published}>{project.published ? "On the site" : "Draft"}</Badge>
          </div>
        </div>
        {project.published ? (
          <a className="btn border border-mist bg-white text-navy" href={`/work/${project.slug}`}>
            <ArrowUpRight size={16} aria-hidden="true" />
            View on the site
          </a>
        ) : null}
      </div>
      <form id="project-form" onSubmit={onSubmit} className="mt-6 grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid gap-5">
          <Panel title="The basics">
            <Field label="Public name">
              <TextInput value={project.public_name} onChange={(event) => set("public_name", event.target.value)} required />
            </Field>
            <Field label="Web address">
              <span className="flex overflow-hidden rounded-xl border border-mist bg-white">
                <span className="grid place-items-center bg-paper px-3 text-sm text-slate">/work/</span>
                <input
                  className="min-w-0 flex-1 bg-white px-3 py-2.5 text-base text-navy outline-none"
                  value={project.slug}
                  onChange={(event) => set("slug", event.target.value)}
                />
              </span>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company">
                <TextInput value={project.company} onChange={(event) => set("company", event.target.value)} />
              </Field>
              <Field label="Stand-in name" hint="Shown until the real name is approved.">
                <TextInput value={project.anonymous_name} onChange={(event) => set("anonymous_name", event.target.value)} />
              </Field>
            </div>
            <Check label="Show the real name and logo" checked={project.name_approved} onChange={(next) => set("name_approved", next)} />
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
            <Field label="What was delivered" hint="Leave a blank line between paragraphs.">
              <Area value={delivery} onChange={(event) => setDelivery(event.target.value)} />
            </Field>
            <div>
              <p className="text-sm font-medium">Tools</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {toolList.map((tool) => (
                  <span key={tool} className="inline-flex items-center gap-1 rounded-full bg-paper px-3 py-1 text-sm">
                    {tool}
                    <button type="button" aria-label={`Remove ${tool}`} onClick={() => setToolsFromList(toolList.filter((item) => item !== tool))}>
                      <X size={14} aria-hidden="true" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <TextInput
                  placeholder="Add a tool"
                  value={toolDraft}
                  onChange={(event) => setToolDraft(event.target.value)}
                />
                <button
                  type="button"
                  className="btn border border-mist bg-white text-navy"
                  onClick={() => {
                    const next = toolDraft.trim();
                    if (!next || toolList.includes(next)) return;
                    setToolsFromList([...toolList, next]);
                    setToolDraft("");
                  }}
                >
                  <Plus size={16} aria-hidden="true" />
                  Add
                </button>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Benefits</p>
                <button type="button" className="text-sm text-deep" onClick={() => set("results", [...project.results, { value: "", label: "" }])}>
                  Add a benefit
                </button>
              </div>
              {project.results.map((benefit, index) => (
                <div key={index} className="grid gap-2 rounded-lg bg-paper p-3">
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
        </div>

        <div className="grid gap-5">
          <Panel title="On the website">
            <Toggle
              label="Published"
              hint="Visible on the Work page"
              checked={project.published}
              onChange={(next) => set("published", next)}
            />
            <Toggle
              label="Featured on homepage"
              hint="Leads the Work page"
              checked={project.featured}
              onChange={(next) => set("featured", next)}
            />
            <Field label="Order on the page" hint="Lower numbers appear first.">
              <TextInput type="number" value={project.position} onChange={(event) => set("position", Number(event.target.value))} />
            </Field>
          </Panel>
          <Panel title="Details">
            <div>
              <p className="text-sm font-medium">Logo</p>
              <div className="mt-2 flex items-center gap-3">
                {project.logo_url ? (
                  <img src={project.logo_url} alt="" className="h-12 w-12 rounded-lg bg-paper object-contain p-1" />
                ) : (
                  <span className="grid h-12 w-12 place-items-center rounded-lg bg-paper text-xs text-slate">None</span>
                )}
                <label className="btn cursor-pointer border border-mist bg-white text-navy">
                  Replace
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        uploadLogo(file).catch((err: unknown) =>
                          setError(err instanceof Error ? err.message : "Could not upload the logo."),
                        );
                      }
                    }}
                  />
                </label>
              </div>
              <Field label="Or a logo already on the site">
                <TextInput value={project.logo_path} onChange={(event) => set("logo_path", event.target.value)} />
              </Field>
            </div>
            <Field label="Main service">
              <SelectInput value={project.family} onChange={(event) => set("family", event.target.value)}>
                {FAMILIES.map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </SelectInput>
            </Field>
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
                        next ? [...project.secondary_families, value] : project.secondary_families.filter((item) => item !== value),
                      )
                    }
                  />
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Type</legend>
              <div className="flex flex-wrap gap-2">
                {RELATIONSHIPS.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={`rounded-full px-3 py-1.5 text-sm ${project.relationship === value ? "bg-navy text-white" : "bg-paper text-slate"}`}
                    onClick={() => set("relationship", value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-4">
              <Field label="Sector">
                <TextInput value={project.sector} onChange={(event) => set("sector", event.target.value)} />
              </Field>
              <Field label="Country">
                <TextInput value={project.country} onChange={(event) => set("country", event.target.value)} />
              </Field>
            </div>
            <fieldset>
              <legend className="mb-2 text-sm font-medium">Picture frame</legend>
              <div className="flex flex-wrap gap-2">
                {DEVICES.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    className={`rounded-full px-3 py-1.5 text-sm ${project.device === value ? "bg-navy text-white" : "bg-paper text-slate"}`}
                    onClick={() => set("device", value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>
            <Field label="Live site link">
              <TextInput value={project.live_url} onChange={(event) => set("live_url", event.target.value)} />
            </Field>
            <Check label="Show the Visit site button" checked={project.link_approved} onChange={(next) => set("link_approved", next)} />
          </Panel>
        </div>
      </form>

      <section className="mt-5 rounded-2xl border border-mist bg-white p-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Pictures</h2>
          <span className="text-sm text-slate">{project.shots.length} {project.shots.length === 1 ? "picture" : "pictures"}</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.shots.map((shot) => (
            <figure key={shot.id} className="overflow-hidden rounded-xl border border-mist">
              {shot.url ? <img src={shot.url} alt="" className="h-28 w-full object-cover" /> : <div className="h-28 bg-paper" />}
              <figcaption className="flex items-center justify-between gap-2 px-3 py-2 text-sm">
                <span className="min-w-0 truncate">{shot.alt || "Picture"}</span>
                <button type="button" className="text-slate" aria-label="Remove picture" onClick={() => removeShot(shot.id)}>
                  <X size={14} aria-hidden="true" />
                </button>
              </figcaption>
            </figure>
          ))}
          <button
            type="button"
            className="flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed border-mist text-sm text-slate"
            onClick={() => setAddingPicture((open) => !open)}
          >
            <ImagePlus size={18} aria-hidden="true" />
            <span className="mt-2 font-medium text-navy">Add a picture</span>
            <span className="mt-1 px-4 text-center text-xs">Upload a file or pick one already on the site</span>
          </button>
        </div>
        {addingPicture ? (
          <form onSubmit={addPicture} className="mt-4 grid gap-3">
            <Field label="Picture already on the site" hint="For example /images/work/come/homepage.jpg">
              <TextInput value={picturePath} onChange={(event) => setPicturePath(event.target.value)} />
            </Field>
            <Field label="Or choose a file">
              <input type="file" accept="image/*" onChange={(event) => setPictureFile(event.target.files?.[0] || null)} />
            </Field>
            <Field label="Short description of the picture">
              <TextInput value={pictureAlt} onChange={(event) => setPictureAlt(event.target.value)} />
            </Field>
            <button type="submit" className="btn btn-inverse w-fit rounded-full">Add picture</button>
          </form>
        ) : null}
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-100 bg-white px-5 py-4">
        <div>
          <p className="font-medium text-red-800">Delete this project</p>
          <p className="text-sm text-slate">It is removed from the desk and the website. This can't be undone.</p>
        </div>
        <button type="button" className="rounded-full border border-red-200 px-4 py-2 text-sm text-red-800" onClick={removeProject}>
          Delete project
        </button>
      </div>
      {error ? <div className="mt-3"><Notice kind="bad">{error}</Notice></div> : null}
      {status ? <p className="mt-3 text-sm text-slate">{status}</p> : null}

      {dirty ? (
        <div className="sticky bottom-0 z-20 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-navy px-4 py-3 text-white">
            <p className="text-sm">Unsaved changes. The live site updates when the page is refreshed.</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="rounded-full px-4 py-2 text-sm text-white/80"
                onClick={() => {
                  deskJson<Project>(`/projects/${id}/`).then((loaded) =>
                    remember(loaded, (loaded.stack || []).join("\n"), (loaded.built || []).join("\n\n")),
                  );
                }}
              >
                Discard
              </button>
              <button type="submit" form="project-form" className="btn rounded-full bg-white text-navy" disabled={busy}>
                {busy ? "Saving…" : "Save project"}
              </button>
            </div>
        </div>
      ) : null}
    </section>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button type="button" className="flex w-full items-center justify-between gap-4 text-left" onClick={() => onChange(!checked)} aria-pressed={checked}>
      <span>
        <span className="block text-sm font-medium">{label}</span>
        <span className="block text-xs text-slate">{hint}</span>
      </span>
      <span className={`relative h-6 w-11 shrink-0 rounded-full ${checked ? "bg-deep" : "bg-mist"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${checked ? "left-5" : "left-0.5"}`} />
      </span>
    </button>
  );
}
