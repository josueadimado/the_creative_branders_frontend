import Illustration from "./Illustration";
import { howWeWork } from "../content/services/howWeWork";

/**
 * The same four steps on the homepage and every service page.
 * On a phone the steps stack, with a line down the left.
 * On a desktop they sit in one row, with a line across the top.
 */
export default function HowWeWork() {
  return (
    <section className="border-t border-mist bg-paper py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="type-display text-navy">{howWeWork.title}</h2>
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
