import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
// Public URLs, including each published case study.
// /dev/styleguide stays off this list, so it is left out of the sitemap and prerender.
import { indexableRoutes, publicRoutes } from "./src/siteRoutes";

function siteOrigin() {
  return (process.env.VITE_SITE_URL || "").replace(/\/$/, "");
}

function sitemapXml() {
  const origin = siteOrigin();
  const urls = indexableRoutes
    .map((path) => {
      const loc = origin ? `${origin}${path === "/" ? "/" : path}` : path;
      return `  <url><loc>${loc}</loc></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function robotsTxt() {
  const origin = siteOrigin();
  const sitemap = origin ? `\nSitemap: ${origin}/sitemap.xml\n` : "\n";
  return `User-agent: *\nAllow: /\nDisallow: /dev/\nDisallow: /desk\n${sitemap.startsWith("\n") ? sitemap.slice(1) : sitemap}`;
}

/** Writes sitemap.xml and robots.txt when the production site is built. */
function siteFiles(): Plugin {
  return {
    name: "tcb-site-files",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml");
          res.end(sitemapXml());
          return;
        }
        if (req.url === "/robots.txt") {
          res.setHeader("Content-Type", "text/plain");
          res.end(robotsTxt());
          return;
        }
        next();
      });
    },
    closeBundle() {
      const outDir = resolve(fileURLToPath(new URL(".", import.meta.url)), "dist");
      writeFileSync(resolve(outDir, "sitemap.xml"), sitemapXml());
      writeFileSync(resolve(outDir, "robots.txt"), robotsTxt());
      // Same list the sitemap uses. The prerender script reads it, then deletes it.
      writeFileSync(resolve(outDir, ".prerender-routes.json"), JSON.stringify(publicRoutes));
    },
  };
}

// Vite is the build tool. In Docker we listen on 0.0.0.0 so the
// published port 3000 is reachable from your browser.
export default defineConfig({
  plugins: [react(), siteFiles()],
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
