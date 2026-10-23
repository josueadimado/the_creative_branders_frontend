import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite is the build tool. In Docker we listen on 0.0.0.0 so the
// published port 3000 is reachable from your browser.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
  },
});
