import ClosingBlock from "./ClosingBlock";

/**
 * The closing invitation at the bottom of a page.
 * Kept so existing pages can keep importing this name.
 */
export default function CtaBand({
  primary,
  showAudit = false,
  projectTo,
  location,
}: {
  primary?: string;
  showAudit?: boolean;
  projectTo?: string;
  location?: string;
}) {
  return <ClosingBlock primary={primary} showAudit={showAudit} projectTo={projectTo} location={location} />;
}
