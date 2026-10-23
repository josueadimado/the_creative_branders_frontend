import Illustration from "../components/Illustration";
import Seo from "../components/Seo";
import InquiryForm from "../components/InquiryForm";
import SocialLinks from "../components/SocialLinks";
import { contact } from "../content/contact";

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
            <div className="mt-3">
              <SocialLinks tone="light" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
