import Seo from "../components/Seo";
import InquiryForm from "../components/InquiryForm";
import { useContactCopy } from "../content/contentDesk";

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
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-card border border-mist bg-white p-8 sm:p-12">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
