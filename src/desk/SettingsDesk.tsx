import { useEffect, useState, type FormEvent } from "react";
import { deskJson } from "./api";
import { Area, DeskHeading, Field, Panel, SaveBar, TextInput } from "./ui";

type Settings = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  linkedin_url: string;
  instagram_url: string;
  facebook_url: string;
};

const empty: Settings = {
  name: "",
  tagline: "",
  description: "",
  email: "",
  linkedin_url: "",
  instagram_url: "",
  facebook_url: "",
};

export default function SettingsDesk() {
  const [settings, setSettings] = useState<Settings>(empty);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    deskJson<Settings>("/settings/")
      .then(setSettings)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : "Could not load studio details."));
  }, []);

  function set<K extends keyof Settings>(key: K, value: string) {
    setSettings((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setStatus("");
    try {
      const saved = await deskJson<Settings>("/settings/", {
        method: "PATCH",
        body: JSON.stringify(settings),
      });
      setSettings(saved);
      setStatus("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section>
      <DeskHeading
        title="Studio details"
        lede="The name, the public email, and the social links. The inbox that receives form copies is set on the server, not here."
      />
      <form onSubmit={onSubmit} className="grid gap-5">
        <Panel title="Studio">
        <Field label="Studio name">
          <TextInput value={settings.name} onChange={(event) => set("name", event.target.value)} />
        </Field>
        <Field label="Tagline">
          <TextInput value={settings.tagline} onChange={(event) => set("tagline", event.target.value)} />
        </Field>
        <Field label="Short description">
          <Area value={settings.description} onChange={(event) => set("description", event.target.value)} />
        </Field>
        <Field label="Public email">
          <TextInput type="email" value={settings.email} onChange={(event) => set("email", event.target.value)} />
        </Field>
        </Panel>
        <Panel title="Social links">
        <Field label="LinkedIn">
          <TextInput value={settings.linkedin_url} onChange={(event) => set("linkedin_url", event.target.value)} />
        </Field>
        <Field label="Instagram">
          <TextInput value={settings.instagram_url} onChange={(event) => set("instagram_url", event.target.value)} />
        </Field>
        <Field label="Facebook">
          <TextInput value={settings.facebook_url} onChange={(event) => set("facebook_url", event.target.value)} />
        </Field>
        </Panel>
        <SaveBar busy={busy} label="Save details" status={status} error={error} />
      </form>
    </section>
  );
}
