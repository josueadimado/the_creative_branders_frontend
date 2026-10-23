import { FormEvent, ReactNode, useState } from "react";
import { budgetOptions, contact, needOptions, timelineOptions } from "../content/contact";
import { postInquiry } from "../lib/api";
import { track } from "../lib/analytics";

const emptyNeeds: string[] = [];

export default function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [needs, setNeeds] = useState(emptyNeeds);
  const [timeline, setTimeline] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  function toggleNeed(option: string) {
    setNeeds((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (needs.length === 0) {
      setStatus("error");
      setError(contact.needsError);
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await postInquiry({
        name,
        email,
        phone: phone || undefined,
        company: company || undefined,
        country: country || undefined,
        needs,
        timeline: timeline || undefined,
        budget_range: budget || undefined,
        brief_link: link || undefined,
        message,
      });
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setCountry("");
      setNeeds([]);
      setTimeline("");
      setBudget("");
      setMessage("");
      setLink("");
      track("inquiry_submit");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "We could not send that. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-white/15 bg-navy p-10 text-white sm:p-12">
        <p className="type-title">{contact.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label={contact.fields.name} htmlFor="name">
        <input id="name" required value={name} onChange={(event) => setName(event.target.value)} className={inputClass} />
      </Field>
      <Field label={contact.fields.email} htmlFor="email">
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
        />
      </Field>
      <Field label={contact.fields.company} htmlFor="company">
        <input id="company" value={company} onChange={(event) => setCompany(event.target.value)} className={inputClass} />
      </Field>
      <Field label={contact.fields.country} htmlFor="country">
        <input id="country" value={country} onChange={(event) => setCountry(event.target.value)} className={inputClass} />
      </Field>
      <Field label={contact.fields.phone} htmlFor="phone">
        <input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className={inputClass} />
      </Field>

      <fieldset>
        <legend className="type-caption font-medium text-navy">{contact.fields.needs}</legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {needOptions.map((option) => (
            <label key={option} className="type-body flex items-center gap-3 text-navy">
              <input
                type="checkbox"
                checked={needs.includes(option)}
                onChange={() => toggleNeed(option)}
                className="h-4 w-4 accent-deep"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label={contact.fields.timeline} htmlFor="timeline">
        <select id="timeline" value={timeline} onChange={(event) => setTimeline(event.target.value)} className={inputClass}>
          <option value="">{contact.choose}</option>
          {timelineOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label={contact.fields.budget} htmlFor="budget">
        <select id="budget" value={budget} onChange={(event) => setBudget(event.target.value)} className={inputClass}>
          <option value="">{contact.choose}</option>
          {budgetOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label={contact.fields.message} htmlFor="message">
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${inputClass} resize-y`}
        />
      </Field>
      <Field label={contact.fields.link} htmlFor="link">
        <input id="link" value={link} onChange={(event) => setLink(event.target.value)} className={inputClass} />
      </Field>

      {status === "error" ? (
        <p className="type-caption text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className="btn btn-inverse btn-full disabled:opacity-60">
        {status === "sending" ? contact.sending : contact.submit}
      </button>
    </form>
  );
}

const inputClass =
  "mt-2 w-full border border-mist bg-paper px-4 py-3.5 text-[17px] text-navy outline-none transition-colors focus:border-deep";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="type-caption block font-medium text-navy">
      {label}
      {children}
    </label>
  );
}
