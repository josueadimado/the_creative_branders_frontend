import type { ReactNode } from "react";

/** Turns the article markdown into paragraphs. The articles only use text and bold. */
export default function ArticleBody({ body }: { body: string }) {
  const blocks = body.split(/\n\n+/).filter(Boolean);
  return (
    <div className="space-y-6 type-body text-slate">
      {blocks.map((block) => (
        <p key={block}>{renderInline(block)}</p>
      ))}
    </div>
  );
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-medium text-navy">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}
