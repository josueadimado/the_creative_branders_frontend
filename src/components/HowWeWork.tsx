import Illustration from "./Illustration";
import { howWeWork } from "../content/services/howWeWork";

type HowWeWorkProps = {
  /** Paper or white, so this block never matches the section above it. */
  surface?: "paper" | "white";
  /** Lets a menu link scroll straight to the steps, for example /about#process. */
  id?: string;
  /** Overrides the heading when the page already has a "How we work" section. */
  title?: string;
};

/**
 * The four project steps, on the About page and every service page.
 * On a phone the steps stack, with a line down the left.
 * On a desktop they sit in one row, with a line across the top.
 */
export default function HowWeWork({ surface = "paper", id = "process", title }: HowWeWorkProps) {
  const background = surface === "white" ? "bg-white" : "bg-paper";

  return (
    <section id={id} className={`${background} scroll-mt-24 py-28 sm:py-36`}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="type-display text-navy">{title ?? howWeWork.title}</h2>
        <ol className="stepper mt-16 lg:mt-20">
          {howWeWork.steps.map((step, index) => (
            <li key={step.name}>
              <div className="stepper-node" aria-hidden="true">
                <span className="stepper-dot" />
              </div>
              <div className="stepper-body">
                <Illustration name={step.drawing} className="h-24 w-full" />
                <p className="type-kicker mt-6 text-deep">0{index + 1}</p>
                <h3 className="type-title mt-3 text-navy">{step.name}</h3>
                <p className="type-body mt-4 text-slate">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
