import { useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import { deskJson } from "./api";
import { PAGE_NAMES } from "./choices";
import { Area, BackLink, DeskHeading, Field, Panel, recordRow, RecordList, SaveBar, TextInput } from "./ui";

type PageCopy = {
  slug: string;
  seo_title: string;
  seo_description: string;
  kicker: string;
  headline: string;
  lede: string;
  section_title: string;
  paragraph_1: string;
  paragraph_2: string;
  paragraph_3: string;
  stat_1_value: string;
  stat_1_label: string;
  stat_2_value: string;
  stat_2_label: string;
  stat_3_value: string;
  stat_3_label: string;
  stat_4_value: string;
  stat_4_label: string;
};

const empty: PageCopy = {
  slug: "",
  seo_title: "",
  seo_description: "",
  kicker: "",
  headline: "",
  lede: "",
  section_title: "",
  paragraph_1: "",
  paragraph_2: "",
  paragraph_3: "",
  stat_1_value: "",
  stat_1_label: "",
  stat_2_value: "",
  stat_2_label: "",
  stat_3_value: "",
  stat_3_label: "",
  stat_4_value: "",
  stat_4_label: "",
};

function pageName(slug: string) {
  return PAGE_NAMES[slug] || slug;
}

export default function PagesDesk() {
  const { slug } = useParams();
  if (!slug) return <PageList />;
  return <PageEdit slug={slug} />;
}

function PageList() {
  const [pages, setPages] = useState<PageCopy[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    deskJson<PageCopy[]>("/pages/")
      .then(setPages)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load pages."));
  }, []);

  return (
    <section>
      <DeskHeading
        title="Pages"
        lede="The sentences on the homepage, About, Work, and Contact. Leave a box empty to keep the sentence already on the site."
      />
      {error ? <p className="text-sm text-red-800">{error}</p> : null}
      <RecordList>
        {pages.map((page) => (
          <li key={page.slug} className="border-b border-mist last:border-0">
            <Link className={recordRow} to={`/desk/pages/${page.slug}`}>
              <span>
                <span className="block font-medium">{pageName(page.slug)}</span>
                <span className="mt-0.5 block text-sm text-slate">{page.headline || "Using the built-in title"}</span>
              </span>
            </Link>
          </li>
        ))}
      </RecordList>
    </section>
  );
}

function PageEdit({ slug }: { slug: string }) {
  const [page, setPage] = useState<PageCopy>(empty);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    deskJson<PageCopy>(`/pages/${slug}/`)
      .then(setPage)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not open that page."));
  }, [slug]);

  function set<K extends keyof PageCopy>(key: K, value: PageCopy[K]) {
    setPage((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const { slug: _slug, ...body } = page;
      const saved = await deskJson<PageCopy>(`/pages/${slug}/`, {
        method: "PATCH",
        body: JSON.stringify(body),
      });
      setPage(saved);
      setStatus("Saved. Refresh the website to see it.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  const stats: [keyof PageCopy, keyof PageCopy][] = [
    ["stat_1_value", "stat_1_label"],
    ["stat_2_value", "stat_2_label"],
    ["stat_3_value", "stat_3_label"],
    ["stat_4_value", "stat_4_label"],
  ];

  return (
    <section>
      <DeskHeading title={pageName(slug)} lede="Refresh the public page after saving to see the new sentences.">
        <BackLink to="/desk/pages">All pages</BackLink>
      </DeskHeading>
      <form onSubmit={onSubmit} className="grid gap-5">
        <Panel title="Search">
          <Field label="Browser title" hint="The words in the browser tab.">
            <TextInput value={page.seo_title} onChange={(event) => set("seo_title", event.target.value)} />
          </Field>
          <Field label="Search description">
            <Area value={page.seo_description} onChange={(event) => set("seo_description", event.target.value)} />
          </Field>
        </Panel>
        <Panel title="Opening">
          <Field label="Small line above the title">
            <TextInput value={page.kicker} onChange={(event) => set("kicker", event.target.value)} />
          </Field>
          <Field label="Main title">
            <TextInput value={page.headline} onChange={(event) => set("headline", event.target.value)} />
          </Field>
          <Field label="Introduction">
            <Area value={page.lede} onChange={(event) => set("lede", event.target.value)} />
          </Field>
        </Panel>
        {slug === "about" ? (
          <Panel title="Story and numbers">
            <Field label="Story title">
              <TextInput value={page.section_title} onChange={(event) => set("section_title", event.target.value)} />
            </Field>
            <Field label="Opening story">
              <Area value={page.paragraph_1} onChange={(event) => set("paragraph_1", event.target.value)} />
            </Field>
            <Field label="Next paragraph">
              <Area value={page.paragraph_2} onChange={(event) => set("paragraph_2", event.target.value)} />
            </Field>
            <Field label="Last paragraph">
              <Area value={page.paragraph_3} onChange={(event) => set("paragraph_3", event.target.value)} />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map(([valueKey, labelKey], index) => (
                <div key={valueKey} className="grid gap-3 rounded-xl bg-paper p-4">
                  <Field label={`Number ${index + 1}`}>
                    <TextInput value={page[valueKey]} onChange={(event) => set(valueKey, event.target.value)} />
                  </Field>
                  <Field label="What the number means">
                    <TextInput value={page[labelKey]} onChange={(event) => set(labelKey, event.target.value)} />
                  </Field>
                </div>
              ))}
            </div>
          </Panel>
        ) : null}
        <SaveBar busy={busy} label="Save page" status={status} error={error} />
      </form>
    </section>
  );
}
