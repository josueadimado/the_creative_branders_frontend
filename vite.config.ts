import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
// Public URLs, including each published case study.
// /dev/styleguide stays off this list, so it is left out of the sitemap and prerender.
import { cookies } from "./src/content/cookies";
import { privacy } from "./src/content/privacy";
import { terms } from "./src/content/terms";
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

/** These are not pages. Sending the homepage here makes an agent check fail. */
function rejectMissingCatalog(req: { url?: string }, res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body: string) => void }, next: () => void) {
  const path = req.url?.split("?")[0];
  if (path === "/.well-known/ai-catalog.json" || path === "/ai-catalog.json") {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not found");
    return;
  }
  next();
}

/**
 * During a production build, warn if a legal page still shows [placeholder] text.
 * The warning names each missing field so it is not shipped unnoticed.
 */
function legalPlaceholderWarning(): Plugin {
  return {
    name: "tcb-legal-placeholders",
    apply: "build",
    buildStart() {
      const pages = [
        ["Privacy", privacy],
        ["Terms", terms],
        ["Cookies", cookies],
      ] as const;
      for (const [name, page] of pages) {
        const fields: string[] = [];
        collectPlaceholders(page, fields);
        if (fields.length === 0) continue;
        const lines = fields.map((field) => `- ${field}`).join("\n");
        console.warn(`[legal] ${name} still has placeholder text:\n${lines}`);
      }
    },
  };
}

/** Walk the page content and keep each [placeholder] once, in the order it appears. */
function collectPlaceholders(value: unknown, found: string[]) {
  if (typeof value === "string") {
    for (const match of value.matchAll(/\[([^\]]+)\]/g)) {
      const label = `[${match[1]}]`;
      if (!found.includes(label)) found.push(label);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectPlaceholders(item, found));
    return;
  }
  if (value && typeof value === "object") {
    Object.values(value).forEach((item) => collectPlaceholders(item, found));
  }
}

/** Writes sitemap.xml and robots.txt when the production site is built. */
function siteFiles(): Plugin {
  return {
    name: "tcb-site-files",
    configureServer(server) {
      server.middlewares.use(rejectMissingCatalog);
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
    configurePreviewServer(server) {
      server.middlewares.use(rejectMissingCatalog);
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

/**
 * Puts Google's tag on the page when a measurement id was provided at build time.
 * The id is public. Cookies stay off until the visitor clicks Accept.
 */
function googleTag(): Plugin {
  return {
    name: "tcb-google-tag",
    transformIndexHtml(html) {
      const id = process.env.VITE_GA_ID || "";
      if (!/^G-[A-Z0-9]+$/.test(id)) return html;
      const tags = [
        `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}" data-tcb-gtag></script>`,
        `<script src="/gtag-boot.js" defer></script>`,
      ].join("\n    ");
      return html.replace(
        '<script src="/consent-defaults.js"></script>',
        `<script src="/consent-defaults.js"></script>\n    ${tags}`,
      );
    },
  };
}

// Vite is the build tool. In Docker we listen on 0.0.0.0 so the
// published port 3000 is reachable from your browser.
export default defineConfig({
  plugins: [react(), siteFiles(), googleTag(), legalPlaceholderWarning()],
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
