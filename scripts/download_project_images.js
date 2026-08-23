const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

const projectsImages = {
  "alqadir-quran-academy": {
    hero: "https://alqadirquranacademy.com/assets/home-hero-C-MetprA.webp",
    thumbnail: "https://alqadirquranacademy.com/og-social-share.png",
    gallery: [
      "https://alqadirquranacademy.com/assets/about-story-Ys4cNoq8.webp",
      "https://alqadirquranacademy.com/assets/trusted-worldwide-C6mzamOi.webp",
      "https://alqadirquranacademy.com/assets/learning-path-vziq0JZd.webp"
    ]
  },
  "ahtsham-ul-haq": {
    hero: "https://ahtshamulhaq.co/assets/img/ui/og-image.jpg",
    thumbnail: "https://ahtshamulhaq.co/assets/img/ahtsham/portrait-hero.jpeg",
    gallery: [
      "https://ahtshamulhaq.co/assets/img/institutions/kirpa-campus.webp",
      "https://ahtshamulhaq.co/assets/img/ahtsham/abdul-qadir-malkani.jpeg",
      "https://ahtshamulhaq.co/assets/img/institutions/khanpur-construction.jpg"
    ]
  },
  "ziva-ideatech": {
    hero: "https://ziva2.ideatech.org.pk/images/conceptual/ziva-v2-home-hero.webp",
    thumbnail: "https://ziva2.ideatech.org.pk/images/conceptual/ziva-v2-hydrafacial.webp",
    gallery: [
      "https://ziva2.ideatech.org.pk/images/conceptual/ziva-v2-facial-laser.webp",
      "https://ziva2.ideatech.org.pk/images/conceptual/ziva-v2-waiting-area.webp",
      "https://ziva2.ideatech.org.pk/images/conceptual/ziva-v2-about-values-tools.webp"
    ]
  },
  "samad-brothers": {
    hero: "https://samadbrothers.pk/wp-content/uploads/2024/10/awards-1-1024x1024.png",
    thumbnail: "https://samadbrothers.pk/wp-content/uploads/2024/10/sheilds-1024x1024.png",
    gallery: [
      "https://samadbrothers.pk/wp-content/uploads/2024/10/signage-2-1024x1024.png",
      "https://samadbrothers.pk/wp-content/uploads/2024/10/Trophies-2-1024x1024.png",
      "https://samadbrothers.pk/wp-content/uploads/2024/10/logo-letters-1024x1024.png"
    ]
  },
  "abm-foundation": {
    hero: "https://abm.foundation/wp-content/uploads/2025/01/food-1-1-1024x683.jpg",
    thumbnail: "https://abm.foundation/wp-content/uploads/2025/01/food-1-2-1024x683.jpg",
    gallery: [
      "https://abm.foundation/wp-content/uploads/2025/01/food-1-3-1024x683.jpg",
      "https://abm.foundation/wp-content/uploads/2025/01/food-1-4-1024x683.jpg",
      "https://abm.foundation/wp-content/uploads/2025/01/food-1-5-1024x683.jpg"
    ]
  },
  "mico": {
    hero: "https://mico.pk/assets/img/photos/homepage-hero-banner.webp",
    thumbnail: "https://mico.pk/assets/img/photos/executive-boardroom-city-views.webp",
    gallery: [
      "https://mico.pk/assets/img/photos/financial-review-desk.webp",
      "https://mico.pk/assets/img/photos/focused-executive-charts.webp",
      "https://mico.pk/assets/img/photos/collab-data-charts.webp"
    ]
  },
  "anwarul-quran": {
    hero: "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-e1773489344640.jpeg",
    thumbnail: "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-57.jpeg",
    gallery: [
      "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-53.jpeg",
      "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-70-rotated.jpeg",
      "https://anwarulquran.org.pk/wp-content/uploads/2026/03/AUQ-51.jpeg"
    ]
  },
  "pscdc": {
    hero: "https://www.pscdc.pk/images/logo.jpeg",
    thumbnail: "https://www.pscdc.pk/images/logo.jpeg",
    gallery: [
      "https://www.pscdc.pk/images/logo.jpeg"
    ]
  }
};

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          "Referer": url
        },
        timeout: 15000
      },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let loc = res.headers.location;
          if (!loc.startsWith("http")) loc = new URL(loc, url).href;
          return downloadFile(loc, dest).then(resolve);
        }
        if (res.statusCode !== 200) {
          console.error(`Failed ${url}: HTTP ${res.statusCode}`);
          return resolve(false);
        }
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          resolve(true);
        });
      }
    );
    req.on("error", (e) => {
      console.error(`Error downloading ${url}:`, e.message);
      resolve(false);
    });
  });
}

(async () => {
  const baseDir = path.join(__dirname, "..", "public", "images", "projects");
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const downloadedMap = {};

  for (const [slug, item] of Object.entries(projectsImages)) {
    const projectDir = path.join(baseDir, slug);
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    console.log(`Downloading assets for ${slug}...`);
    downloadedMap[slug] = { gallery: [] };

    // Download hero
    const heroExt = path.extname(new URL(item.hero).pathname) || ".jpg";
    const heroDest = path.join(projectDir, `hero${heroExt}`);
    const heroSuccess = await downloadFile(item.hero, heroDest);
    downloadedMap[slug].hero = heroSuccess ? `/images/projects/${slug}/hero${heroExt}` : item.hero;

    // Download thumbnail
    const thumbExt = path.extname(new URL(item.thumbnail).pathname) || ".jpg";
    const thumbDest = path.join(projectDir, `thumbnail${thumbExt}`);
    const thumbSuccess = await downloadFile(item.thumbnail, thumbDest);
    downloadedMap[slug].thumbnail = thumbSuccess ? `/images/projects/${slug}/thumbnail${thumbExt}` : item.thumbnail;

    // Download gallery
    for (let i = 0; i < item.gallery.length; i++) {
      const gUrl = item.gallery[i];
      const gExt = path.extname(new URL(gUrl).pathname) || ".jpg";
      const gDest = path.join(projectDir, `gallery-${i + 1}${gExt}`);
      const gSuccess = await downloadFile(gUrl, gDest);
      downloadedMap[slug].gallery.push(gSuccess ? `/images/projects/${slug}/gallery-${i + 1}${gExt}` : gUrl);
    }
  }

  fs.writeFileSync(path.join(__dirname, "downloaded_images.json"), JSON.stringify(downloadedMap, null, 2));
  console.log("All project images downloaded successfully!");
})();
