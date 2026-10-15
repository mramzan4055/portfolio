const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, rejectUnauthorized: false }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let redirectUrl = res.headers.location;
          if (!redirectUrl.startsWith('http')) {
            const parsed = new URL(url);
            redirectUrl = new URL(redirectUrl, parsed.origin).href;
          }
          return downloadFile(redirectUrl, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Status ${res.statusCode} for ${url}`));
        }
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve(dest);
        });
      });
      req.on('error', reject);
    } catch (e) {
      reject(e);
    }
  });
}

async function scrapeAndDownload() {
  const sites = [
    {
      slug: 'paktalc',
      baseUrl: 'https://paktalc.com',
      og: 'https://paktalc.com/images/og/og-home.jpg',
      extras: [
        'https://paktalc.com/images/hero/hero-slide-01.jpg',
        'https://paktalc.com/images/hero/hero-slide-02.jpg',
        'https://paktalc.com/images/hero/hero-slide-03.jpg',
        'https://paktalc.com/images/products/talc-powder.jpg'
      ]
    },
    {
      slug: 'skz-mining',
      baseUrl: 'https://skzminingcompany.com',
      og: 'https://skzminingcompany.com/images/hero/hero-01-white-rock-cut.jpg',
      extras: [
        'https://skzminingcompany.com/images/hero/hero-02.jpg',
        'https://skzminingcompany.com/images/hero/hero-03.jpg',
        'https://skzminingcompany.com/images/products/himalayan-pink-salt.jpg'
      ]
    },
    {
      slug: 'hunza-minerals',
      baseUrl: 'https://hunzaminerals.com',
      og: 'https://hunzaminerals.com/opengraph-image',
      extras: []
    },
    {
      slug: 'silk-road-caravan-tours',
      baseUrl: 'https://silkroadcaravantours.com',
      og: 'https://silkroadcaravantours.com/wp-content/uploads/2025/02/ABOUT-US1.jpg',
      extras: []
    }
  ];

  for (const site of sites) {
    const dir = path.join(__dirname, '..', 'public', 'images', 'projects', site.slug);
    fs.mkdirSync(dir, { recursive: true });

    // Download OG as hero and thumbnail
    const heroDest = path.join(dir, 'hero.jpg');
    const thumbDest = path.join(dir, 'thumbnail.jpg');
    try {
      await downloadFile(site.og, heroDest);
      fs.copyFileSync(heroDest, thumbDest);
      console.log(`[${site.slug}] Downloaded OG image -> hero.jpg, thumbnail.jpg`);
    } catch (e) {
      console.log(`[${site.slug}] Failed to download OG:`, e.message);
    }

    // Try downloading page HTML to find more images
    try {
      const res = await fetch(site.baseUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      const html = await res.text();
      const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png|webp))["']/gi)]
        .map(m => m[1])
        .filter(src => !src.includes('data:image') && !src.includes('svg'));
      
      let count = 1;
      for (const imgUrl of imgMatches) {
        if (count > 3) break;
        let fullUrl = imgUrl;
        if (!fullUrl.startsWith('http')) {
          fullUrl = new URL(imgUrl, site.baseUrl).href;
        }
        const ext = path.extname(fullUrl.split('?')[0]) || '.jpg';
        const galDest = path.join(dir, `gallery-${count}${ext}`);
        try {
          await downloadFile(fullUrl, galDest);
          console.log(`[${site.slug}] Downloaded gallery-${count}${ext} from ${fullUrl}`);
          count++;
        } catch (err) {
          // ignore
        }
      }
    } catch (err) {
      console.log(`[${site.slug}] Error parsing page:`, err.message);
    }

    // If gallery files are missing, copy hero
    for (let i = 1; i <= 3; i++) {
      const gFiles = fs.readdirSync(dir).filter(f => f.startsWith(`gallery-${i}`));
      if (gFiles.length === 0 && fs.existsSync(heroDest)) {
        fs.copyFileSync(heroDest, path.join(dir, `gallery-${i}.jpg`));
        console.log(`[${site.slug}] Fallback: created gallery-${i}.jpg from hero`);
      }
    }
  }

  // Handle ABH Film Studio
  const abhDir = path.join(__dirname, '..', 'public', 'images', 'projects', 'abh-film-studio');
  fs.mkdirSync(abhDir, { recursive: true });
  const abhArtifact = 'C:\\Users\\M RAMZAN\\.gemini\\antigravity-ide\\brain\\d0d67ac8-abc0-4058-b72f-edf2f14ec686\\abh_film_studio_home_1792071783759.png';
  if (fs.existsSync(abhArtifact)) {
    fs.copyFileSync(abhArtifact, path.join(abhDir, 'hero.png'));
    fs.copyFileSync(abhArtifact, path.join(abhDir, 'thumbnail.png'));
    fs.copyFileSync(abhArtifact, path.join(abhDir, 'gallery-1.png'));
    fs.copyFileSync(abhArtifact, path.join(abhDir, 'gallery-2.png'));
    fs.copyFileSync(abhArtifact, path.join(abhDir, 'gallery-3.png'));
    console.log('[abh-film-studio] Copied screenshot artifact to project images');
  }

  // Also try fetching abhfilmstudio.com HTML for any assets
  try {
    const res = await fetch('https://abhfilmstudio.com/', { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await res.text();
    const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+\.(?:jpg|jpeg|png|webp))["']/gi)]
      .map(m => m[1])
      .filter(src => !src.includes('data:image') && !src.includes('svg'));
    let count = 1;
    for (const imgUrl of imgMatches) {
      if (count > 3) break;
      let fullUrl = imgUrl.startsWith('http') ? imgUrl : new URL(imgUrl, 'https://abhfilmstudio.com').href;
      try {
        const ext = path.extname(fullUrl.split('?')[0]) || '.png';
        await downloadFile(fullUrl, path.join(abhDir, `gallery-${count}${ext}`));
        console.log(`[abh-film-studio] Downloaded gallery-${count}${ext}`);
        count++;
      } catch(e) {}
    }
  } catch (e) {
    console.log('[abh-film-studio] fetch error:', e.message);
  }

  console.log('ALL DONE!');
}

scrapeAndDownload();
