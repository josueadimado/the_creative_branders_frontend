import { FormEvent, ReactNode, useState } from "react";
import { postInquiry } from "../lib/api";

const BUDGETS = ["$400–$800", "$1,200–$2,500", "$5,000+", "Not sure yet"];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
  budget_range: BUDGETS[1],
  message: "",
};

export default function InquiryForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      await postInquiry({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        company: form.company || undefined,
        country: form.country,
        budget_range: form.budget_range,
        message: form.message,
      });
      setStatus("success");
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "We could not send that. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-blue/40 bg-navy p-10 text-white sm:p-12">
        <p className="type-title">Inquiry received.</p>
        <p className="type-lede mt-3 text-white/70">
          Thank you. We reply within 48 hours. If your brief is time-sensitive, include that in a
          follow-up once we write back.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Name" htmlFor="name">
        <input
          id="name"
          required
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Email" htmlFor="email">
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="WhatsApp or phone (optional)" htmlFor="phone">
        <input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Company (optional)" htmlFor="company">
        <input
          id="company"
          value={form.company}
          onChange={(event) => setForm({ ...form, company: event.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Country" htmlFor="country">
        <input
          id="country"
          required
          value={form.country}
          onChange={(event) => setForm({ ...form, country: event.target.value })}
          className={inputClass}
        />
      </Field>
      <Field label="Budget range" htmlFor="budget_range">
        <select
          id="budget_range"
          required
          value={form.budget_range}
          onChange={(event) => setForm({ ...form, budget_range: event.target.value })}
          className={inputClass}
        >
          {BUDGETS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {status === "error" ? (
        <p className="type-caption text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button type="submit" disabled={status === "sending"} className="btn btn-inverse btn-full disabled:opacity-60">
        {status === "sending" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}

const inputClass =
  "mt-2 w-full border border-navy/15 bg-navy/[0.04] px-4 py-3.5 text-[17px] text-ink outline-none transition-colors focus:border-blue";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="type-caption block font-medium text-ink">
      {label}
      {children}
    </label>
  );
}
