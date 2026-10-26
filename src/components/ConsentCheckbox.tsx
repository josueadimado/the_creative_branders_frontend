import { Link } from "react-router-dom";
import { site } from "../content/site";

/**
 * Required privacy agreement for every public form.
 * The server records the time this was ticked. The page does not send that time.
 */
export default function ConsentCheckbox({
  id,
  checked,
  onChange,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 text-sm leading-6 text-navy">
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
        I agree that {site.name} may use these details to reply to my enquiry, as described in the{" "}
        <Link to="/privacy" className="text-deep underline hover:text-deep-hover">
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}
