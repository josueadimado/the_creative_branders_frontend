import { FormEvent, ReactNode, useState } from "react";
import { postInquiry } from "../lib/api";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  country: "",
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
        // The studio still stores a budget note. Visitors are not asked for a figure.
        budget_range: "Not sure yet",
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
      <div className="border border-white/15 bg-navy p-10 text-white sm:p-12">
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
  "mt-2 w-full border border-mist bg-paper px-4 py-3.5 text-[17px] text-navy outline-none transition-colors focus:border-deep";

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
    <label htmlFor={htmlFor} className="type-caption block font-medium text-navy">
      {label}
      {children}
    </label>
  );
}
