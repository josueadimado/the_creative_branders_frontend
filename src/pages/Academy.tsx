import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Illustration from "../components/Illustration";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import { academy } from "../content/academy";
import { postAcademyInterest } from "../lib/api";

const fieldClass =
  "mt-2 w-full border border-mist bg-paper px-4 py-3.5 text-[17px] text-navy outline-none transition-colors focus:border-deep";

export default function Academy() {
  return (
    <>
      <Seo {...academy.seo} />
      <PageHero {...academy.hero} />

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
            <div className="border-t border-mist pt-10">
              <p className="type-kicker text-deep">{academy.impact.kicker}</p>
              <p className="type-stat mt-4 text-navy">{academy.impact.figure}</p>
              <p className="type-caption mt-3 text-slate">{academy.impact.caption}</p>
            </div>
          </div>
          <AcademyForm />
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-6xl px-6 type-body text-white/70">
          {academy.footer}{" "}
          <Link to="/contact" className="text-signal transition-colors hover:text-white">
            {academy.footerLink}
          </Link>
          .
        </div>
      </section>
    </>
  );
}

function AcademyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await postAcademyInterest({ name, email, message: message || undefined });
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "We could not send that. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-white/15 bg-navy p-10 text-white sm:p-12">
        <p className="type-title">{academy.form.success}</p>
        <p className="type-lede mt-4 text-white/70">{academy.form.followUp}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="h-fit rounded-card border border-mist bg-white p-10 sm:p-12">
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
      {status === "error" ? (
        <p className="type-caption mt-3 text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className="btn btn-inverse btn-full mt-8 disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Submit interest"}
      </button>
    </form>
  );
}
