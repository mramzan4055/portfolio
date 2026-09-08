/**
 * Submits the site's canonical URLs to the IndexNow API (used by Bing, and
 * consumed by Bing Copilot / Microsoft AI surfaces) so newly published or
 * updated pages get crawled faster than waiting for the next organic crawl.
 *
 * Run manually after a deploy that changes page content:
 *   node scripts/submit-indexnow.js
 *
 * Requires: the key file at public/<INDEXNOW_KEY>.txt must already be
 * deployed and publicly reachable at https://<host>/<INDEXNOW_KEY>.txt
 */
const https = require("https");

const SITE_URL = "https://mramzan.dev";
const INDEXNOW_KEY = "e4c57f840c8593c86e7d3e6735234c87";
const HOST = new URL(SITE_URL).host;

const STATIC_PATHS = [
  "/",
  "/work",
  "/services",
  "/packages",
  "/about",
  "/contact",
  "/sitemap",
  "/services/small-business-websites",
  "/services/modern-web-development",
  "/services/wordpress-cms-solutions",
  "/services/mobile-apps-flutter",
  "/services/seo-aeo-web-optimization",
  "/services/website-redesign",
];

async function getProjectPaths() {
  try {
    const db = require("../src/data/db.json");
    return (db.projects || [])
      .filter((p) => p.status === "published")
      .map((p) => `/projects/${p.slug}`);
  } catch {
    return [];
  }
}

async function main() {
  const projectPaths = await getProjectPaths();
  const urlList = [...STATIC_PATHS, ...projectPaths].map((p) => `${SITE_URL}${p}`);

  const payload = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList,
  });

  const req = https.request(
    {
      hostname: "api.indexnow.org",
      path: "/indexnow",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Length": Buffer.byteLength(payload),
      },
    },
    (res) => {
      console.log(`IndexNow submission status: ${res.statusCode} (${urlList.length} URLs)`);
      res.on("data", () => {});
    }
  );

  req.on("error", (err) => {
    console.error("IndexNow submission failed:", err.message);
    process.exitCode = 1;
  });

  req.write(payload);
  req.end();
}

main();
