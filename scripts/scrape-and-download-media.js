const fs = require("fs");
const path = require("path");
const https = require("https");

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on("finish", () => {
        fileStream.close();
        resolve(dest);
      });
    }).on("error", reject);
  });
}

async function scrapeSites() {
  // 1. Brites Security
  const britesDir = path.join(__dirname, "..", "public", "images", "projects", "brites-security");
  fs.mkdirSync(britesDir, { recursive: true });

  const britesRes = await fetch("https://britessecurity.co.uk/");
  const britesHtml = await britesRes.text();
  fs.writeFileSync(path.join(__dirname, "brites_raw.html"), britesHtml, "utf-8");
  console.log("Fetched Brites HTML length:", britesHtml.length);

  // Extract images from Brites
  const britesImgMatches = [...britesHtml.matchAll(/src=["']([^"']+\.(?:png|jpg|jpeg|webp|svg))["']/gi)];
  console.log("Brites images:", britesImgMatches.map(m => m[1]));

  // Download key assets if available
  const britesUrls = [
    "https://britessecurity.co.uk/assets/img/brites-logo-full.png",
    "https://britessecurity.co.uk/assets/img/og-image.png"
  ];
  for (const u of britesUrls) {
    try {
      const filename = path.basename(u);
      await downloadFile(u, path.join(britesDir, filename));
      console.log("Downloaded:", filename);
    } catch (e) {
      console.log("Failed downloading", u, e.message);
    }
  }

  // 2. Anwarul Quran
  const anwarDir = path.join(__dirname, "..", "public", "images", "projects", "anwarul-quran");
  fs.mkdirSync(anwarDir, { recursive: true });

  const anwarRes = await fetch("https://anwarulquran.org.pk/");
  const anwarHtml = await anwarRes.text();
  fs.writeFileSync(path.join(__dirname, "anwar_raw.html"), anwarHtml, "utf-8");
  console.log("Fetched Anwarul Quran HTML length:", anwarHtml.length);

  const anwarImgMatches = [...anwarHtml.matchAll(/src=["']([^"']+\.(?:png|jpg|jpeg|webp|svg))["']/gi)];
  console.log("Anwar images found:", anwarImgMatches.slice(0, 10).map(m => m[1]));
}

scrapeSites();
