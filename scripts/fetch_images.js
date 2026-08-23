const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const urls = [
  "https://alqadirquranacademy.com/",
  "https://ahtshamulhaq.co/",
  "https://pscdc.pk/",
  "https://mico.pk/",
  "https://abm.foundation/",
  "https://ziva2.ideatech.org.pk/",
  "https://samadbrothers.pk/",
  "https://anwarulquran.org.pk/"
];

function fetchUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        timeout: 12000,
      },
      (res) => {
        // Handle redirect
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let loc = res.headers.location;
          if (!loc.startsWith("http")) {
            loc = new URL(loc, url).href;
          }
          return fetchUrl(loc).then(resolve);
        }

        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const ogImage =
            data.match(
              /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i
            )?.[1] ||
            data.match(
              /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i
            )?.[1];

          const twitterImage = data.match(
            /<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["']/i
          )?.[1];

          const imgMatches = [
            ...data.matchAll(/<img[^>]+src=["']([^"']+)["']/gi),
          ].map((m) => {
            let src = m[1];
            if (src.startsWith("//")) src = "https:" + src;
            else if (src.startsWith("/")) src = new URL(src, url).href;
            return src;
          });

          // Background images in CSS / style tags
          const bgMatches = [
            ...data.matchAll(/url\(['"]?([^'"()]+?\.(?:png|jpg|jpeg|webp))['"]?\)/gi),
          ].map((m) => {
            let src = m[1];
            if (src.startsWith("//")) src = "https:" + src;
            else if (src.startsWith("/")) src = new URL(src, url).href;
            return src;
          });

          resolve({
            url,
            ogImage: ogImage ? (ogImage.startsWith("//") ? "https:" + ogImage : (ogImage.startsWith("/") ? new URL(ogImage, url).href : ogImage)) : null,
            twitterImage: twitterImage ? (twitterImage.startsWith("//") ? "https:" + twitterImage : (twitterImage.startsWith("/") ? new URL(twitterImage, url).href : twitterImage)) : null,
            images: Array.from(new Set([...imgMatches, ...bgMatches])).filter(
              (img) => !img.includes("data:image") && !img.includes("gravatar") && (img.endsWith(".jpg") || img.endsWith(".jpeg") || img.endsWith(".png") || img.endsWith(".webp") || img.includes("/uploads/"))
            ).slice(0, 15),
          });
        });
      }
    );
    req.on("error", (e) => resolve({ url, error: e.message }));
    req.on("timeout", () => {
      req.destroy();
      resolve({ url, error: "timeout" });
    });
  });
}

(async () => {
  const results = [];
  for (const u of urls) {
    console.log(`Fetching ${u}...`);
    const r = await fetchUrl(u);
    results.push(r);
  }
  fs.writeFileSync("scraped_images.json", JSON.stringify(results, null, 2));
  console.log("Finished scraping images!");
})();
