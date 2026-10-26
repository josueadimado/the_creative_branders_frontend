/**
 * Saves a real HTML file for every public page after `vite build`.
 *
 * The route list is the same one the sitemap uses. It is written to
 * dist/.prerender-routes.json and deleted here so it is not published.
 *
 * Each page starts with window.prerenderReady = false. Seo sets it to true
 * only after that page's own title is in the document and the project list
 * has finished loading. We refuse the generic shell title, and we fail the
 * build if any page does not become ready.
 */
import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const dist = join(fileURLToPath(new URL("..", import.meta.url)), "dist");
const routesFile = join(dist, ".prerender-routes.json");
const shellHtml = readFileSync(join(dist, "index.html"), "utf8");
const shellTitle = shellHtml.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";

const types = {
  ".css": "text/css",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
};

function fail(message) {
  throw new Error(message);
}

if (!shellTitle) fail("the built index.html has no title.");
if (!existsSync(routesFile)) fail("the shared route list is missing.");

const routes = JSON.parse(readFileSync(routesFile, "utf8"));
if (!Array.isArray(routes) || routes.length === 0) fail("the shared route list is empty.");

/** A file inside dist, or null if the path tries to escape the folder. */
function fileInDist(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const full = resolve(dist, `.${normalize(decoded)}`);
  if (full !== dist && !full.startsWith(`${dist}/`)) return null;
  return full;
}

const server = createServer((req, res) => {
  const urlPath = (req.url || "/").split("?")[0];
  const file = fileInDist(urlPath);
  if (file && existsSync(file) && statSync(file).isFile() && extname(file) && extname(file) !== ".html") {
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(readFileSync(file));
    return;
  }
  // Always the original shell, even after the homepage file has been replaced.
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(shellHtml);
});

await new Promise((resolveListen) => server.listen(0, "127.0.0.1", resolveListen));
const { port } = server.address();
// Use the browser Playwright downloaded. If that copy is missing, use the Chrome app on this Mac.
let browser;
try {
  browser = await chromium.launch();
} catch {
  browser = await chromium.launch({ channel: "chrome" });
}
const page = await browser.newPage();

try {
  for (const route of routes) {
    if (typeof route !== "string" || !route.startsWith("/")) fail(`bad route ${route}`);
    const url = `http://127.0.0.1:${port}${route}`;
    const isHome = route === "/";
    await page.goto(url, { waitUntil: "load", timeout: 30000 });
    try {
      await page.waitForFunction(
        ({ genericTitle, home }) => {
          if (window.prerenderReady !== true || document.title.length === 0) return false;
          // The homepage title is already in index.html, so it does not change.
          // Every other page must replace that title before we save it.
          if (!home && document.title === genericTitle) return false;
          return true;
        },
        { genericTitle: shellTitle, home: isHome },
        { timeout: 20000 },
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      fail(`${route} did not become ready. ${message}`);
    }
    const html = await page.content();
    const savedTitle = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    if (!savedTitle || (!isHome && savedTitle === shellTitle)) {
      fail(`${route} kept the generic title.`);
    }
    const outFile =
      route === "/" ? join(dist, "index.html") : route === "/404" ? join(dist, "404.html") : join(dist, route, "index.html");
    mkdirSync(dirname(outFile), { recursive: true });
    writeFileSync(outFile, html);
    console.log(`prerendered ${route} — ${savedTitle}`);
  }
} catch (error) {
  console.error(`Prerender: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
} finally {
  await browser.close();
  server.close();
  rmSync(routesFile, { force: true });
}

if (process.exitCode) process.exit(process.exitCode);
