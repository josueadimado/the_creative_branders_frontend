import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Illustration from "../components/Illustration";
import Seo from "../components/Seo";
import TextHero from "../components/TextHero";
import { academy } from "../content/academy";
import { site } from "../content/site";
import { track, trackWaitlistSignup } from "../lib/analytics";
import { useBotGuard } from "../components/BotGuard";
import ConsentCheckbox from "../components/ConsentCheckbox";
import { postAcademyInterest } from "../lib/api";

const fieldClass =
  "mt-2 w-full border border-mist bg-paper px-4 py-3.5 text-[17px] text-navy outline-none transition-colors focus:border-deep";

export default function Academy() {
  return (
    <>
      <Seo {...academy.seo} index={site.academy.launched} />
      <TextHero kicker={academy.hero.kicker} title={academy.hero.title} lede={academy.hero.lede} />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-20 px-6 lg:grid-cols-2">
          <div className="space-y-14">
            <Illustration name="academy" className="w-full" />
            {academy.blocks.map((block) => (
              <div key={block.title}>
                <h2 className="type-title text-navy">{block.title}</h2>
                <p className="type-body mt-4 text-slate">{block.body}</p>
              </div>
            ))}
          </div>
          <AcademyForm />
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-6xl px-6 type-body text-white/70">
          {academy.footer}{" "}
          <Link
            to="/contact"
            className="text-signal transition-colors hover:text-white"
            onClick={() => track("start_project_click", { location: "academy" })}
          >
            {academy.footerLink}
          </Link>
        </div>
      </section>
    </>
  );
}

function AcademyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const bot = useBotGuard();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    if (!consent) {
      setStatus("error");
      setError("Please agree so we can reply to you.");
      return;
    }
    try {
      await postAcademyInterest({ name, email, message: message || undefined, consent: true, ...bot.payload });
      trackWaitlistSignup("academy");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "We could not send that. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-white/15 bg-navy p-10 text-white sm:p-12">
        <p className="type-title">{academy.form.success}</p>
        {academy.form.followUp ? <p className="type-lede mt-4 text-white/70">{academy.form.followUp}</p> : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative h-fit rounded-card border border-mist bg-white p-10 sm:p-12">
      {bot.field}
      <h3 className="type-title text-navy">{academy.form.title}</h3>
      <label className="type-caption mt-8 block font-medium text-navy" htmlFor="academy-name">
        Name
        <input
          id="academy-name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="type-caption mt-5 block font-medium text-navy" htmlFor="academy-email">
        Email
        <input
          id="academy-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="type-caption mt-5 block font-medium text-navy" htmlFor="academy-message">
        Message <span className="text-slate">(optional)</span>
        <textarea
          id="academy-message"
          rows={4}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClass} resize-y`}
        />
      </label>
      <div className="mt-5">
        <ConsentCheckbox id="academy-consent" checked={consent} onChange={setConsent} />
      </div>
      {status === "error" ? (
        <p className="type-caption mt-3 text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className="btn btn-inverse btn-full mt-8 disabled:opacity-60">
        {status === "sending" ? "Sending…" : academy.form.submit}
      </button>
    </form>
  );
}
