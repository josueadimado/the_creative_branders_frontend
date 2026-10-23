import Illustration from "../components/Illustration";
import Seo from "../components/Seo";
import InquiryForm from "../components/InquiryForm";
import { socials } from "../data/socials";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Inquiry-first. We reply within 48 hours. Write to the studio and we will take it from there."
        path="/contact"
      />
      <section className="bg-navy py-32 sm:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">Contact</p>
          <h1 className="type-h1 mt-5 text-white">Book your free discovery call.</h1>
          <p className="type-lede mt-8 max-w-xl text-white/70">
            Inquiry-first. We reply within 48 hours. No phone number. Write us here and we will
            take it from there.
          </p>
        </div>
      </section>

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-20 px-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-card border border-mist bg-white p-8 sm:p-12">
            <InquiryForm />
          </div>
          <aside>
            <Illustration name="team" className="mb-12 w-full" />
            <p className="type-kicker text-deep">Response time</p>
            <p className="type-display mt-4 text-navy">We reply within 48 hours.</p>
            <p className="type-lede mt-6 text-slate">
              Tell us the business, the country, and the range you are working with. That is enough
              to start.
            </p>
            <p className="type-kicker mt-14 text-deep">Social</p>
            <ul className="mt-5 space-y-3 type-body">
              {socials.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-deep transition-colors hover:text-deep-hover"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
