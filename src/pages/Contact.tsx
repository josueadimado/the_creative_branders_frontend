import Seo from "../components/Seo";
import InquiryForm from "../components/InquiryForm";
import SocialLinks from "../components/SocialLinks";
import { contact } from "../content/contact";
import { studioEmail, whatsappHref } from "../data/socials";
import { track } from "../lib/analytics";

export default function Contact() {
  const email = studioEmail;
  const [beforeEmail, afterEmail] = contact.aside.split(email);

  return (
    <>
      <Seo {...contact.seo} />
      <section className="dot-grid text-hero bg-navy">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">{contact.hero.kicker}</p>
          <h1 className="type-h1 mt-5 text-white">{contact.hero.title}</h1>
          <p className="type-lede mt-8 max-w-xl text-white/70">{contact.hero.lede}</p>
        </div>
      </section>

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-20 px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-card border border-mist bg-white p-8 sm:p-12">
            <InquiryForm />
          </div>
          <aside>
            <p className="type-lede text-slate">
              {beforeEmail}
              <a href={`mailto:${email}`} className="text-deep transition-colors hover:text-deep-hover">
                {email}
              </a>
              {afterEmail}
            </p>
            <h2 className="type-title mt-12 text-navy">{contact.next.title}</h2>
            <ol className="mt-6 list-decimal space-y-4 pl-5 type-body text-slate marker:text-navy">
              {contact.next.steps.map((step) => (
                <li key={step} className="pl-2">
                  {step}
                </li>
              ))}
            </ol>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-inverse mt-10"
                onClick={() => track("whatsapp_click", { location: "contact" })}
              >
                {contact.next.whatsapp}
              </a>
            ) : null}
            <div className="mt-10">
              <SocialLinks tone="light" flush />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
