import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import type { ServiceFaq } from "../content/services/types";

type FaqAccordionProps = {
  items: ServiceFaq[];
};

/**
 * One question opens at a time. Radix supplies the button, the keyboard
 * controls, and the expanded state. A plus becomes a minus when the row is open.
 * Rows are separated by Mist lines only: no card, no shadow.
 */
export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <Accordion.Root type="single" collapsible className="mt-14 border-t border-mist">
      {items.map((item) => (
        <Accordion.Item key={item.question} value={item.question} className="border-b border-mist">
          <Accordion.Header className="m-0">
            <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent py-6 text-left text-navy">
              <span className="type-title">{item.question}</span>
              <Plus className="size-5 shrink-0 text-deep group-data-[state=open]:hidden" aria-hidden="true" />
              <Minus className="hidden size-5 shrink-0 text-deep group-data-[state=open]:block" aria-hidden="true" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <p className="type-body pb-6 text-slate">{item.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
