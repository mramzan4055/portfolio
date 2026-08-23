const fs = require("fs");
const path = require("path");
const https = require("https");

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { rejectUnauthorized: false }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`Saved: ${dest}`);
        resolve();
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function run() {
  // Brites Security
  const britesDir = path.join(__dirname, "..", "public", "images", "projects", "brites-security");
  fs.mkdirSync(britesDir, { recursive: true });

  const britesFiles = [
    { url: "https://britessecurity.co.uk/assets/img/brites-logo-full.png", name: "logo.png" },
    { url: "https://britessecurity.co.uk/assets/img/og-image.png", name: "hero.png" },
    { url: "https://britessecurity.co.uk/assets/img/og-image.png", name: "thumbnail.png" },
    { url: "https://britessecurity.co.uk/assets/img/vetting-screening.jpg", name: "gallery-1.jpg" },
    { url: "https://britessecurity.co.uk/assets/img/company-policies.jpg", name: "gallery-2.jpg" },
    { url: "https://britessecurity.co.uk/assets/img/resource-scan-training.jpg", name: "gallery-3.jpg" },
    { url: "https://britessecurity.co.uk/assets/img/resource-protectuk-martyns-law.jpg", name: "gallery-4.jpg" },
    { url: "https://britessecurity.co.uk/assets/img/badge-sia.png", name: "badge-sia.png" },
    { url: "https://britessecurity.co.uk/assets/img/badge-ico.png", name: "badge-ico.png" },
  ];

  for (const item of britesFiles) {
    try {
      await download(item.url, path.join(britesDir, item.name));
    } catch (e) {
      console.error(`Error downloading ${item.url}:`, e.message);
    }
  }

  // Anwarul Quran
  const anwarDir = path.join(__dirname, "..", "public", "images", "projects", "anwarul-quran");
  fs.mkdirSync(anwarDir, { recursive: true });

  const anwarFiles = [
    { url: "https://anwarulquran.org.pk/wp-content/uploads/2026/03/logo-w.png", name: "logo.png" },
    { url: "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-e1773489344640.jpeg", name: "hero.jpeg" },
    { url: "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-57.jpeg", name: "thumbnail.jpeg" },
    { url: "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-53.jpeg", name: "gallery-1.jpeg" },
    { url: "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-49-e1774442326185.jpeg", name: "gallery-2.jpeg" },
    { url: "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-70-rotated.jpeg", name: "gallery-3.jpeg" },
    { url: "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-71-e1774441272423.jpeg", name: "gallery-4.jpeg" },
  ];

  for (const item of anwarFiles) {
    try {
      await download(item.url, path.join(anwarDir, item.name));
    } catch (e) {
      console.error(`Error downloading ${item.url}:`, e.message);
    }
  }

  console.log("All project media downloaded successfully!");
}

run();
