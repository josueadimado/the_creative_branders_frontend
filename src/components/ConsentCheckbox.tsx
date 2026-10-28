import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { site } from "../content/site";

export default function ConsentCheckbox({
  id,
  checked,
  onChange,
  children,
  className = "text-navy",
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={id} className={`flex items-start gap-3 text-sm leading-6 ${className}`}>
      <input
        id={id}
        name={id}
        type="checkbox"
        required
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-deep"
      />
      <span>
        {children ?? (
          <>
            I agree {site.name} may use these details to reply.{" "}
            <Link to="/privacy" className="text-deep underline hover:text-deep-hover">
              Privacy Policy
            </Link>
            .
          </>
        )}
      </span>
    </label>
  );
}
