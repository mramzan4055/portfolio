const https = require("https");

async function checkSite(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let html = "";
      res.on("data", (c) => (html += c));
      res.on("end", () => {
        console.log("=== " + url + " ===");
        const matches = html.match(/(?:src|href|content)=["']([^"']+\.(?:png|jpg|jpeg|webp|svg))["']/gi);
        console.log(matches ? Array.from(new Set(matches)).slice(0, 15) : "none");
        resolve();
      });
    }).on("error", (e) => {
      console.log(url, e.message);
      resolve();
    });
  });
}

(async () => {
  await checkSite("https://alqadirquranacademy.com/");
  await checkSite("https://pscdc.pk/");
})();
