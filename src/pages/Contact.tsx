import Illustration from "../components/Illustration";
import Seo from "../components/Seo";
import InquiryForm from "../components/InquiryForm";
import { contact } from "../content/contact";
import { socials } from "../data/socials";

export default function Contact() {
  return (
    <>
      <Seo {...contact.seo} />
      <section className="bg-navy py-32 sm:py-44">
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
            <Illustration name="team" className="mb-12 w-full" />
            <p className="type-kicker text-deep">{contact.aside.kicker}</p>
            <p className="type-display mt-4 text-navy">{contact.aside.title}</p>
            <p className="type-lede mt-6 text-slate">{contact.aside.body}</p>
            <p className="type-kicker mt-14 text-deep">{contact.aside.socials}</p>
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
