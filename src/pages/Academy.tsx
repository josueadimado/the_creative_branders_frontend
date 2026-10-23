import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Illustration from "../components/Illustration";
import PageHero from "../components/PageHero";
import { postAcademyInterest } from "../lib/api";

const fieldClass =
  "mt-2 w-full border border-navy/15 bg-navy/[0.04] px-4 py-3.5 text-[17px] text-ink outline-none transition-colors focus:border-blue";

export default function Academy() {
  return (
    <>
      <PageHero
        image="/images/academy-workshop.jpg"
        kicker="Academy"
        title="Train for intelligent work."
        lede="A learning track for people who want to build brand, systems, and intelligence, not just take a course. Opening soon."
      />

      <section className="bg-offwhite py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-20 px-6 lg:grid-cols-2">
          <div className="space-y-14">
            <Illustration name="academy" className="w-full" />
            <div>
              <h2 className="type-title text-ink">What the Academy teaches</h2>
              <p className="type-body mt-4 text-slate">
                Practical tracks in digital brand, business systems, and data, taught the way the
                studio works: on real briefs, with real tools.
              </p>
            </div>
            <div>
              <h2 className="type-title text-ink">Partnership</h2>
              <p className="type-body mt-4 text-slate">
                Built in partnership with COME. Together we are aiming at 200+ youth trained. That
                is a target, not a claim of work already done.
              </p>
            </div>
            <div>
              <h2 className="type-title text-ink">Who should apply</h2>
              <p className="type-body mt-4 text-slate">
                Early-career builders, operators inside SMEs, and people who want studio-grade craft
                without a four-year detour.
              </p>
            </div>
            <div className="border-t border-navy/10 pt-10">
              <p className="type-kicker text-blueDark">Impact</p>
              <p className="type-hero mt-4 text-ink">200+</p>
              <p className="type-caption mt-3 text-slate">
                Our goal with COME: young people trained
              </p>
            </div>
          </div>
          <AcademyForm />
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-6xl px-6 type-body text-white/70">
          Looking for studio work instead?{" "}
          <Link to="/contact" className="text-blue transition-colors hover:text-white">
            Start a project
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
      <div className="border border-blue/40 bg-navy p-10 text-white sm:p-12">
        <p className="type-title">Interest received.</p>
        <p className="type-lede mt-4 text-white/70">We will be in touch as the Academy opens.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="h-fit border border-navy/10 p-10 sm:p-12">
      <h3 className="type-title text-ink">Expression of interest</h3>
      <label className="type-caption mt-8 block font-medium text-ink" htmlFor="academy-name">
        Name
        <input
          id="academy-name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="type-caption mt-5 block font-medium text-ink" htmlFor="academy-email">
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
      <label className="type-caption mt-5 block font-medium text-ink" htmlFor="academy-message">
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
