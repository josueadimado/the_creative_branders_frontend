import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Illustration from "../components/Illustration";
import PageHero from "../components/PageHero";
import { postWaitlist } from "../lib/api";

const features = [
  {
    title: "Every customer in one place",
    body: "Contacts, conversations, and history together, instead of spread across phones, notebooks, and spreadsheets.",
    drawing: "crm" as const,
  },
  {
    title: "Follow-ups that don't slip",
    body: "Know who needs a call back, a quote, or a reminder, before the deal goes cold.",
    drawing: "build" as const,
  },
  {
    title: "A clear view of your pipeline",
    body: "See what's coming in, what's stuck, and what's closing, without building a report by hand.",
    drawing: "grow" as const,
  },
];

const faqs = [
  {
    q: "When does SmartCRM launch?",
    a: "We're onboarding a small group of pilot businesses first. Join the waitlist and you'll hear before anyone else.",
  },
  {
    q: "Who is it for?",
    a: "Growing SMEs that need a real CRM without enterprise complexity or enterprise pricing.",
  },
];

const fieldClass =
  "mt-2 w-full border border-mist bg-paper px-4 py-3.5 text-[17px] text-navy outline-none transition-colors focus:border-deep";

export default function SmartCRM() {
  return (
    <>
      <PageHero
        image="/images/smartcrm-product.jpg"
        kicker="Product"
        title="SmartCRM. A CRM built for how you actually sell."
        lede="$10–$30 / month. A CRM for growing businesses that have outgrown notebooks, spreadsheets, and scattered WhatsApp chats. Join the waitlist for early access."
      />

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-deep">What we're designing for</p>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-mist md:border-t md:border-mist md:pt-16">
            {features.map((feature, index) => (
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
            <p className="type-kicker text-deep">Pricing</p>
            <h2 className="type-display mt-4 text-navy">$10–$30 / month</h2>
            <p className="type-lede mt-6 text-slate">
              Standalone SaaS. No project minimum. Final plans will be published at launch.
            </p>
          </div>
          <WaitlistForm />
        </div>
      </section>

      <section className="border-t border-mist bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="type-display text-navy">FAQ</h2>
          <dl className="mt-14 space-y-12">
            {faqs.map((item) => (
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
          Need a custom system instead?{" "}
          <Link to="/contact" className="text-signal transition-colors hover:text-white">
            Talk to the studio
          </Link>
          .
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const result = await postWaitlist({ email, name: name || undefined });
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
      <div className="border border-blue/40 bg-navy p-10 text-white sm:p-12">
        <p className="type-title">
          {status === "already" ? "You're already on the list." : "You are on the list."}
        </p>
        <p className="type-lede mt-4 text-white/70">We will write when SmartCRM is ready.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-mist p-10 sm:p-12">
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
