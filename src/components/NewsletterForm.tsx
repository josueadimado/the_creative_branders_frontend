import { FormEvent, useId, useState } from "react";
import { Mail } from "iconoir-react";
import { useTranslation } from "react-i18next";
import { useBotGuard } from "./BotGuard";
import ConsentCheckbox from "./ConsentCheckbox";
import { LocaleLink } from "./LocaleLink";
import { postNewsletter } from "../lib/api";
import { markNewsletterSubscribed } from "../lib/newsletter";
import { site } from "../content/site";

export default function NewsletterForm({ onSubscribed }: { onSubscribed?: () => void }) {
  const { t } = useTranslation("forms");
  const reactId = useId();
  const consentId = `newsletter-consent-${reactId}`;
  const emailId = `newsletter-email-${reactId}`;
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const bot = useBotGuard();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    if (!consent) {
      setStatus("error");
      setError(t("consentRequired"));
      return;
    }
    try {
      await postNewsletter({ email, consent: true, ...bot.payload });
      markNewsletterSubscribed();
      setStatus("done");
      onSubscribed?.();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t("couldNotSubscribe"));
    }
  }

  if (status === "done") {
    return <p className="text-sm leading-6 text-navy/80">{t("subscribed")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-3">
      {bot.field}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label className="relative min-w-0 flex-1" htmlFor={emailId}>
          <span className="sr-only">{t("emailLabel")}</span>
          <Mail
            width={18}
            height={18}
            strokeWidth={1.6}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-deep"
            aria-hidden="true"
          />
          <input
            id={emailId}
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-mist bg-white py-3 pl-11 pr-4 text-[15px] text-navy outline-none transition-colors placeholder:text-slate/70 focus:border-deep"
          />
        </label>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-inverse shrink-0 rounded-md px-6 disabled:opacity-60 sm:self-stretch"
        >
          {status === "sending" ? t("subscribing") : t("subscribe")}
        </button>
      </div>
      <ConsentCheckbox id={consentId} checked={consent} onChange={setConsent} className="text-navy/80">
        {t("consentNewsletter", { name: site.name })}{" "}
        <LocaleLink to="/privacy" className="text-deep underline hover:text-deep-hover">
          {t("privacyPolicy")}
        </LocaleLink>
        .
      </ConsentCheckbox>
      {status === "error" ? (
        <p className="text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
