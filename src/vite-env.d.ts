/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_WHATSAPP_NUMBER?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_GA_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.md?raw" {
  const content: string;
  export default content;
}

interface Window {
  /** False until this page's own title is in the document and the content API has answered. */
  prerenderReady?: boolean;
  /** True once the content API has answered, or the starter file has been chosen because it could not. */
  contentDeskReady?: boolean;
}
