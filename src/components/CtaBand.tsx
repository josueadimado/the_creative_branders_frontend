import { Link } from "react-router-dom";

type CtaBandProps = {
  title: string;
  lede?: string;
};

/**
 * Closing invitation. Stays in the navy family so the page does not
 * suddenly switch to a different color at the end. Blue is the button.
 */
export default function CtaBand({ title, lede }: CtaBandProps) {
  return (
    <section className="border-t border-white/[0.08] bg-navy py-24 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-10 px-6 sm:flex-row sm:items-center">
        <div className="max-w-2xl">
          <p className="type-display text-white">{title}</p>
          {lede ? <p className="type-lede mt-4 text-white/70">{lede}</p> : null}
        </div>
        <Link to="/contact" className="btn btn-primary shrink-0">
          Book a discovery call
        </Link>
      </div>
    </section>
  );
}
