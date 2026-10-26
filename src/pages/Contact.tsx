import Seo from "../components/Seo";
import InquiryForm from "../components/InquiryForm";
import { useContactCopy } from "../content/contentDesk";
import { site } from "../content/site";
import { whatsappHref } from "../data/socials";
import { track, trackWhatsApp } from "../lib/analytics";

/**
 * The project page. Contact details sit beside the form.
 * The street address stays off this page. It is only printed on the legal pages.
 */
export default function Contact() {
  const contact = useContactCopy();

  return (
    <>
      <Seo {...contact.seo} />
      <section className="dot-grid text-hero bg-navy">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="type-h1 text-white">{contact.hero.title}</h1>
          <p className="type-lede mt-6 max-w-xl text-white/70">{contact.seo.description}</p>
        </div>
      </section>

      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-start">
          <address className="min-w-0 not-italic text-navy">
            <p className="type-caption font-medium uppercase tracking-[0.14em] text-slate">Studio</p>
            <ul className="mt-4 space-y-3 text-[17px]">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-words underline decoration-mist underline-offset-4 hover:text-deep"
                  onClick={() => track("email_click", { location: "contact" })}
                >
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneE164}`}
                  className="underline decoration-mist underline-offset-4 hover:text-deep"
                  onClick={() => track("phone_click", { location: "contact" })}
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  className="btn btn-inverse mt-1"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackWhatsApp("contact")}
                >
                  WhatsApp
                </a>
              </li>
              <li>Accra, Ghana</li>
            </ul>
          </address>
          <div className="min-w-0 rounded-card border border-mist bg-white p-8 sm:p-12">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
