/** A client quote. Nothing here is shown until approved is true. */

export type Testimonial = {
  quote: string;
  role: string;
  company: string;
  /** Optional name of the project this quote is about. */
  project?: string;
  approved: boolean;
};

/**
 * Leave this list empty until a client has approved the words.
 * Do not add a quote that has not been approved.
 */
export const testimonials: Testimonial[] = [];

/** Quotes that are approved and have real words. Bracket notes stay off the page. */
export function approvedTestimonials(items: Testimonial[] = testimonials): Testimonial[] {
  return items.filter((item) => {
    if (!item.approved) return false;
    const quote = item.quote.trim();
    if (!quote || quote.includes("[")) return false;
    if (!item.role.trim() || !item.company.trim()) return false;
    return true;
  });
}
