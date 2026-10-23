import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <>
      <section className="bg-navy py-32 sm:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <p className="type-kicker text-signal">Legal</p>
          <h1 className="type-hero mt-5 text-white">Privacy policy</h1>
          <p className="type-lede mt-8 max-w-xl text-white/70">
            How The Creative Branders Ltd handles information you send through this website.
          </p>
        </div>
      </section>

      <section className="bg-paper py-28 sm:py-36">
        <div className="mx-auto max-w-3xl space-y-12 px-6 type-body text-slate">
          <div>
            <h2 className="type-title text-navy">Who we are</h2>
            <p className="mt-4">
              This website is operated by The Creative Branders Ltd, a company registered in the
              United Kingdom. Company number: [TO CONFIRM]. Contact for privacy requests:{" "}
              <span className="text-navy">[TO CONFIRM]</span>.
            </p>
          </div>

          <div>
            <h2 className="type-title text-navy">What this policy covers</h2>
            <p className="mt-4">
              It covers the three forms on this site: the contact inquiry form, the SmartCRM
              waitlist, and the Academy expression of interest. It does not cover third-party
              websites we link to (for example social networks).
            </p>
          </div>

          <div>
            <h2 className="type-title text-navy">What we collect</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              <li>
                <span className="text-navy">Contact inquiry:</span> name, email, optional WhatsApp
                or phone, optional company, country, budget range, and your message.
              </li>
              <li>
                <span className="text-navy">SmartCRM waitlist:</span> email, and name if you choose
                to give it.
              </li>
              <li>
                <span className="text-navy">Academy interest:</span> name, email, and an optional
                message.
              </li>
            </ul>
            <p className="mt-4">
              We do not ask for payment card details on this website. We do not sell your personal
              data.
            </p>
          </div>

          <div>
            <h2 className="type-title text-navy">Why we collect it</h2>
            <p className="mt-4">
              We use the information so we can reply to your inquiry, add you to a product waitlist,
              or note your interest in the Academy. That is a legitimate interest in running a
              studio and responding to people who contact us. Where you ask us to email you (for
              example a waitlist), we rely on your request.
            </p>
          </div>

          <div>
            <h2 className="type-title text-navy">How we store it and for how long</h2>
            <p className="mt-4">
              Submissions are stored in our private database and reviewed in a staff admin panel.
              We keep them for as long as we need them to handle your request and keep a sensible
              business record, then delete or anonymise them when they are no longer needed. If you
              ask us to delete your data sooner, we will do so unless we must keep it for a legal
              reason.
            </p>
          </div>

          <div>
            <h2 className="type-title text-navy">Email provider</h2>
            <p className="mt-4">
              When a form is submitted, we may send a notification email to the studio, and for
              contact inquiries we may send you a short confirmation email. Those messages are sent
              using Resend (or another email service we configure). The provider processes the
              address and content of the email so it can be delivered.
            </p>
          </div>

          <div>
            <h2 className="type-title text-navy">Who we share it with</h2>
            <p className="mt-4">
              We share personal data only with the tools that help us run the site (hosting,
              database, and email delivery). We do not share form submissions with advertisers.
            </p>
          </div>

          <div>
            <h2 className="type-title text-navy">Your rights</h2>
            <p className="mt-4">
              Depending on where you live, you may ask us for a copy of your data, ask us to correct
              it, or ask us to delete it. To make a request, email{" "}
              <span className="text-navy">[TO CONFIRM]</span> and tell us which form you used and the
              email address you submitted.
            </p>
          </div>

          <div>
            <h2 className="type-title text-navy">Changes</h2>
            <p className="mt-4">
              We may update this policy from time to time. The version on this page is the current
              one.
            </p>
          </div>

          <p className="border-t border-mist pt-10 type-caption text-slate">
            Questions about a project rather than privacy?{" "}
            <Link to="/contact" className="text-deep transition-colors hover:text-deep-hover">
              Start an inquiry
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
