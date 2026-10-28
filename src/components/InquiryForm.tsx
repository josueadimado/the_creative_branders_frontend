import { FormEvent, ReactNode, useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBotGuard } from "./BotGuard";
import ConsentCheckbox from "./ConsentCheckbox";
import { budgetOptionsGhs, budgetOptionsUsd, type BudgetCurrency } from "../content/contact";
import { countries, countryByCode } from "../data/countries";
import { whatsappLink } from "../data/socials";
import { postInquiry } from "../lib/api";
import { track, trackWhatsApp } from "../lib/analytics";
import { trackFormError } from "../lib/journeyCapture";
import { hasBriefSubmitted, markBriefSubmitted } from "../lib/inquiry";


const NEED_CHOICES = [
  { value: "Brand and websites", labelKey: "need_brand" },
  { value: "Web applications", labelKey: "need_web" },
  { value: "Mobile apps", labelKey: "need_mobile" },
  { value: "Automation and reporting", labelKey: "need_automation" },
  { value: "Not sure yet", labelKey: "need_unsure" },
] as const;

const TIMELINE_CHOICES = [
  { value: "As soon as possible", labelKey: "timeline_asap" },
  { value: "In the next 1 to 3 months", labelKey: "timeline_1_3" },
  { value: "In 3 to 6 months", labelKey: "timeline_3_6" },
  { value: "Just exploring", labelKey: "timeline_exploring" },
] as const;

const emptyNeeds: string[] = [];

/** Stops the browser from offering saved names, emails and phone numbers. */
const noSuggest = {
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "off",
  spellCheck: false,
} as const;

export default function InquiryForm({ layout = "stack" }: { layout?: "stack" | "split" }) {
  const { t } = useTranslation(["forms", "contact"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // Starts on Ghana (+233). Stays on Ghana until they pick another country or code.
  const [dialCode, setDialCode] = useState("GH");
  // Stays true after they pick a calling code themselves, so changing country does not overwrite it.
  const [dialChosen, setDialChosen] = useState(false);
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [needs, setNeeds] = useState(emptyNeeds);
  const [timeline, setTimeline] = useState("");
  const [currency, setCurrency] = useState<BudgetCurrency>("GHS");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [consent, setConsent] = useState(false);
  // After a successful send we remember it, so the form stays hidden on return visits.
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(() =>
    hasBriefSubmitted() ? "success" : "idle",
  );
  const [justSent, setJustSent] = useState(false);
  const [error, setError] = useState("");
  const bot = useBotGuard();

  // The round chat button hides while this success message is on screen,
  // because the message already has its own WhatsApp button.
  useEffect(() => {
    document.body.dataset.chatHidden = status === "success" ? "true" : "";
    return () => {
      delete document.body.dataset.chatHidden;
    };
  }, [status]);


  function chooseCountry(name: string) {
    setCountry(name);
    // Leave a calling code they already picked. Otherwise match the country, so Nigeria selects +234.
    if (dialChosen) return;
    const match = countries.find((item) => item.name === name);
    if (match) setDialCode(match.code);
  }

  function chooseCurrency(next: BudgetCurrency) {
    setCurrency(next);
    const options: readonly string[] = next === "GHS" ? budgetOptionsGhs : budgetOptionsUsd;
    if (budget && !options.includes(budget)) setBudget("");
  }

  function toggleNeed(option: string) {
    setNeeds((current) =>
      current.includes(option) ? current.filter((item) => item !== option) : [...current, option],
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (needs.length === 0) {
      setStatus("error");
      setError(t("needsError"));
      trackFormError("brief", "needs_required");
      return;
    }
    if (!consent) {
      setStatus("error");
      setError(t("consentError"));
      trackFormError("brief", "consent_required");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      await postInquiry({
        name,
        email,
        phone: phoneWithCode(dialCode, phone),
        company: company || undefined,
        country: country || undefined,
        needs,
        timeline: timeline || undefined,
        budget_range: budget || undefined,
        budget_currency: currency,
        brief_link: link || undefined,
        message,
        consent: true,
        ...bot.payload,
      });
      markBriefSubmitted();
      setJustSent(true);
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setDialCode("GH");
      setDialChosen(false);
      setCompany("");
      setCountry("");
      setNeeds([]);
      setTimeline("");
      setCurrency("GHS");
      setBudget("");
      setMessage("");
      setLink("");
      setConsent(false);
      track("brief_submit", {
        service: needs.join(", "),
        budget_band: budget || "not set",
        currency,
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "We could not send that. Please try again.");
      trackFormError("brief", "submit_failed");
    }
  }

  const split = layout === "split";
  const calling = countryByCode(dialCode);
  const budgetChoices = currency === "GHS" ? budgetOptionsGhs : budgetOptionsUsd;
  const controlClass = split
    ? "w-full border border-mist bg-white px-3 py-3 text-[15px] text-navy outline-none transition-colors focus:border-deep"
    : "w-full border border-mist bg-paper px-4 py-3.5 text-[17px] text-navy outline-none transition-colors focus:border-deep";
  const fieldClass = `mt-2 ${controlClass} ${split ? "rounded-md" : ""}`;
  const choiceClass = split ? "text-[15px]" : "text-[17px]";

  if (status === "success") {
    return (
      <div className="inquiry-success border border-white/15 bg-navy p-10 text-white sm:p-12">
        <p className="type-title">{justSent ? t("forms:success") : t("forms:successDone")}</p>
        <a
          href={whatsappLink("Hello, I just sent a brief and would like a faster answer.")}
          className="btn btn-primary mt-8"
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsApp("brief-success")}
        >
          {t("forms:successWhatsApp")}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`inquiry-form relative space-y-5 ${split ? "is-split" : ""}`}
      autoComplete="off"
    >
      {bot.field}
      {split ? <p className="type-body text-slate">{t("contact:seoDescription")}</p> : null}

      {/* Name and email sit side by side on the homepage, stacked on the contact page. */}
      <div className={split ? "grid gap-4 sm:grid-cols-2" : "space-y-5"}>
        <Field label={t("forms:name")} htmlFor="full-name" mark>
          <input
            id="full-name"
            name="inquiry-full-name"
            required
            {...noSuggest}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label={t("forms:email")} htmlFor="inquiry-email" mark>
          <input
            id="inquiry-email"
            name="inquiry-email"
            type="email"
            required
            {...noSuggest}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />
        </Field>
      </div>
      <Field label={t("forms:company")} htmlFor="inquiry-company">
        <input
          id="inquiry-company"
          name="inquiry-company"
          {...noSuggest}
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className={fieldClass}
        />
      </Field>
      <div className={split ? "grid gap-4 sm:grid-cols-2" : "space-y-5"}>
        <Field label={t("forms:country")} htmlFor="inquiry-country">
          <select
            id="inquiry-country"
            name="inquiry-country"
            {...noSuggest}
            value={country}
            onChange={(event) => chooseCountry(event.target.value)}
            className={fieldClass}
          >
            <option value="">{t("forms:choose")}</option>
            {countries.map((item) => (
              <option key={item.code} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t("forms:phone")} htmlFor="inquiry-phone">
          {/* One box, so clicking the number highlights the flag and the number together. */}
          <span
            className={`mt-2 flex overflow-hidden border border-mist focus-within:border-deep ${
              split ? "rounded-md bg-white" : "bg-paper"
            }`}
          >
            <span className="relative flex shrink-0 self-stretch border-r border-mist">
              <span
                className={`pointer-events-none flex items-center gap-1.5 px-3 ${
                  split ? "py-3" : "py-3.5"
                }`}
              >
                {calling ? (
                  <>
                    {/* A letter flag, drawn by the browser. An outside picture was blocked and showed as a broken icon. */}
                    <span className="text-base leading-none" aria-hidden="true">
                      {flagEmoji(calling.code)}
                    </span>
                    <span className="text-sm tabular-nums text-navy">+{calling.dial}</span>
                  </>
                ) : (
                  <Globe className="size-4 text-slate" aria-hidden="true" />
                )}
                <ChevronDown className="size-3.5 shrink-0 text-slate" aria-hidden="true" />
              </span>
              <select
                aria-label={calling ? `${calling.name} +${calling.dial}` : "Country calling code"}
                name="inquiry-calling-code"
                {...noSuggest}
                value={dialCode}
                onChange={(event) => {
                  setDialCode(event.target.value);
                  setDialChosen(true);
                }}
                className="absolute inset-0 cursor-pointer opacity-0"
              >
                <option value="">Code</option>
                {countries.map((item) => (
                  <option key={item.code} value={item.code}>
                    {flagEmoji(item.code)} +{item.dial} {item.name}
                  </option>
                ))}
              </select>
            </span>
            <input
              id="inquiry-phone"
              name="inquiry-phone"
              type="text"
              inputMode="tel"
              {...noSuggest}
              placeholder="Phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={`min-w-0 flex-1 bg-transparent px-3 text-navy outline-none ${split ? "py-3 text-[15px]" : "py-3.5 text-[17px]"}`}
            />
          </span>
        </Field>
      </div>

      <fieldset>
        <legend className="type-caption font-medium text-navy">
          {t("forms:needs")}
          <RequiredMark />
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {NEED_CHOICES.map((option) => (
            <label key={option.value} className={`${choiceClass} flex items-center gap-3 text-navy`}>
              <input
                type="checkbox"
                checked={needs.includes(option.value)}
                onChange={() => toggleNeed(option.value)}
                className="h-4 w-4 accent-deep"
              />
              {t(`forms:${option.labelKey}`)}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Currency sits on the budget label, so the two lists start on the same line. */}
      <div className={split ? "grid gap-4 sm:grid-cols-2" : "space-y-5"}>
        <div>
          <label htmlFor="timeline" className="flex min-h-7 items-center type-caption font-medium text-navy">
            {t("forms:timeline")}
          </label>
          <select id="timeline" name="inquiry-timeline" {...noSuggest} value={timeline} onChange={(event) => setTimeline(event.target.value)} className={fieldClass}>
            <option value="">{t("forms:choose")}</option>
            {TIMELINE_CHOICES.map((option) => (
              <option key={option.value} value={option.value}>
                {t(`forms:${option.labelKey}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="flex min-h-7 items-center justify-between gap-3">
            <label htmlFor="budget" className="type-caption font-medium text-navy">
              {t("forms:budget")}
            </label>
            <div className="flex shrink-0 rounded-md border border-mist p-0.5" role="group" aria-label={t("forms:currency")}>
              {(["GHS", "USD"] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={currency === code}
                  onClick={() => chooseCurrency(code)}
                  className={`h-6 rounded px-2 text-xs font-medium ${
                    currency === code ? "bg-navy text-white" : "text-navy"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
          <select id="budget" name="inquiry-budget" {...noSuggest} value={budget} onChange={(event) => setBudget(event.target.value)} className={fieldClass}>
            <option value="">{t("forms:choose")}</option>
            {budgetChoices.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Field label={t("forms:message")} htmlFor="message" mark>
        <textarea
          id="message"
          name="inquiry-message"
          required
          rows={5}
          {...noSuggest}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`${fieldClass} resize-y`}
        />
      </Field>
      <Field label={t("forms:link")} htmlFor="link">
        <input id="link" name="inquiry-link" {...noSuggest} value={link} onChange={(event) => setLink(event.target.value)} className={fieldClass} />
      </Field>

      <ConsentCheckbox id="inquiry-consent" checked={consent} onChange={setConsent} />

      {status === "error" ? (
        <p className="type-caption text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className={`btn btn-inverse btn-full disabled:opacity-60 ${split ? "!rounded-md" : ""}`}
      >
        {status === "sending" ? t("forms:sending") : t("forms:submit")}
        {split && status !== "sending" ? <ArrowUpRight className="ml-2 size-4" aria-hidden="true" /> : null}
      </button>
    </form>
  );
}

/** Turns a country code such as GH into its flag, for the phone-code list. */
function flagEmoji(code: string): string {
  return code
    .toUpperCase()
    .replace(/./g, (letter) => String.fromCodePoint(127397 + letter.charCodeAt(0)));
}

/** Joins the calling code and the number. An empty number is left off the message. */
function phoneWithCode(dialCode: string, phone: string): string | undefined {
  const number = phone.trim();
  if (!number) return undefined;
  const match = countryByCode(dialCode);
  const combined = match ? `+${match.dial} ${number}` : number;
  return combined.slice(0, 40);
}

/** The red star marks a field the form will not send without. */
function RequiredMark() {
  return (
    <span className="text-red-600" aria-hidden="true">
      {" *"}
    </span>
  );
}

function Field({
  label,
  htmlFor,
  mark = false,
  children,
}: {
  label: string;
  htmlFor: string;
  /** Shows the red star. Used on fields the form will not send without. */
  mark?: boolean;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="type-caption block font-medium text-navy">
      {label}
      {mark ? <RequiredMark /> : null}
      {children}
    </label>
  );
}
