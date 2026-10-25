import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Illustration from "../components/Illustration";
import Seo from "../components/Seo";
import TextHero from "../components/TextHero";
import { smartcrm } from "../content/smartcrm";
import { track } from "../lib/analytics";
import { useBotGuard } from "../components/BotGuard";
import { postWaitlist } from "../lib/api";

const fieldClass =
  "mt-2 w-full border border-mist bg-paper px-4 py-3.5 text-[17px] text-navy outline-none transition-colors focus:border-deep";

export default function SmartCRM() {
  return (
    <>
      <Seo {...smartcrm.seo} />
      <TextHero kicker={smartcrm.hero.kicker} title={smartcrm.hero.title} lede={smartcrm.hero.lede} />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-mist md:border-t md:border-mist md:pt-16">
            {smartcrm.features.map((feature, index) => (
              <article key={feature.title} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <Illustration name={feature.drawing} className="h-32 w-full" />
                <p className="type-kicker mt-6 text-deep">0{index + 1}</p>
                <h2 className="type-title mt-3 text-navy">{feature.title}</h2>
                <p className="type-body mt-4 text-slate">{feature.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-2 lg:gap-24">
          <div>
            <h2 className="type-display text-navy">{smartcrm.waitlist.title}</h2>
            <p className="type-lede mt-6 text-slate">{smartcrm.waitlist.body}</p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="type-display text-navy">{smartcrm.faqsTitle}</h2>
          <dl className="mt-14 space-y-12">
            {smartcrm.faqs.map((item) => (
              <div key={item.q} className="border-t border-mist pt-8">
                <dt className="type-title text-navy">{item.q}</dt>
                <dd className="type-body mt-4 text-slate">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-6xl px-6 type-body text-white/70">
          {smartcrm.footer}{" "}
          <Link
            to="/contact"
            className="text-signal transition-colors hover:text-white"
            onClick={() => track("start_project_click", { location: "smartcrm" })}
          >
            {smartcrm.footerLink}
          </Link>
        </div>
      </section>
    </>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "already" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const bot = useBotGuard();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const result = await postWaitlist({ email, name: name || undefined, ...bot.payload });
      setStatus(result.alreadyOnList ? "already" : "success");
      setEmail("");
      setName("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "We could not add you. Please try again.");
    }
  }

  if (status === "success" || status === "already") {
    return (
      <div className="border border-white/15 bg-navy p-10 text-white sm:p-12">
        <p className="type-title">
          {status === "already" ? smartcrm.waitlist.already : smartcrm.waitlist.success}
        </p>
        <p className="type-lede mt-4 text-white/70">{smartcrm.waitlist.followUp}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative rounded-card border border-mist bg-white p-10 sm:p-12">
      {bot.field}
      <h3 className="type-title text-navy">Join the waitlist</h3>
      <label className="type-caption mt-8 block font-medium text-navy" htmlFor="waitlist-name">
        Name <span className="text-slate">(optional)</span>
        <input
          id="waitlist-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className="type-caption mt-5 block font-medium text-navy" htmlFor="waitlist-email">
        Email
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={fieldClass}
        />
      </label>
      {status === "error" ? (
        <p className="type-caption mt-3 text-red-700" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"} className="btn btn-inverse btn-full mt-8 disabled:opacity-60">
        {status === "sending" ? "Joining…" : "Join waitlist"}
      </button>
    </form>
  );
}
