import LegalPage from "./LegalPage";
import { privacy } from "../content/privacy";

/** The privacy policy. The words live in content/privacy.ts. */
export default function Privacy() {
  return <LegalPage {...privacy} />;
}
