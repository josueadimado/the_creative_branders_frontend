import ClosingBlock from "./ClosingBlock";

/**
 * The same closing invitation on every page.
 * Kept so existing pages can keep importing this name.
 */
export default function CtaBand({ primary }: { primary?: string }) {
  return <ClosingBlock primary={primary} />;
}
