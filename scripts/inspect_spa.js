const https = require("https");

function get(url) {
  return new Promise((resolve) => {
    https.get(
      url,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          "Accept":
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          "Sec-Ch-Ua": '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
          "Sec-Ch-Ua-Mobile": "?0",
          "Sec-Ch-Ua-Platform": '"Windows"',
          "Sec-Fetch-Dest": "document",
          "Sec-Fetch-Mode": "navigate",
          "Sec-Fetch-Site": "none",
          "Sec-Fetch-User": "?1",
          "Upgrade-Insecure-Requests": "1"
        },
      },
      (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => resolve(d));
      }
    );
  });
}

(async () => {
  const alqadirHtml = await get("https://alqadirquranacademy.com/");
  console.log("ALQADIR HTML:\n", alqadirHtml);

  // find script tags in alqadir
  const alqadirScripts = [...alqadirHtml.matchAll(/src=["']([^"']+\.js)["']/gi)].map(m => m[1]);
  console.log("Alqadir scripts:", alqadirScripts);

  for (const s of alqadirScripts) {
    const fullUrl = s.startsWith("http") ? s : "https://alqadirquranacademy.com" + (s.startsWith("/") ? s : "/" + s);
    const js = await get(fullUrl);
    const imgs = js.match(/(?:assets\/[^"'\s]+\.(?:png|jpg|jpeg|webp|svg)|\/[^"'\s]+\.(?:png|jpg|jpeg|webp|svg)|https:\/\/[^"'\s]+\.(?:png|jpg|jpeg|webp))/gi);
    console.log("Images in " + fullUrl + ":", imgs ? Array.from(new Set(imgs)).slice(0, 20) : "none");
  }

  const pscdcHtml = await get("https://pscdc.pk/");
  console.log("\nPSCDC HTML:\n", pscdcHtml);
  const pscdcScripts = [...pscdcHtml.matchAll(/src=["']([^"']+\.js)["']/gi)].map(m => m[1]);
  console.log("PSCDC scripts:", pscdcScripts);

  for (const s of pscdcScripts) {
    const fullUrl = s.startsWith("http") ? s : "https://pscdc.pk" + (s.startsWith("/") ? s : "/" + s);
    const js = await get(fullUrl);
    const imgs = js.match(/(?:assets\/[^"'\s]+\.(?:png|jpg|jpeg|webp|svg)|\/[^"'\s]+\.(?:png|jpg|jpeg|webp|svg)|https:\/\/[^"'\s]+\.(?:png|jpg|jpeg|webp))/gi);
    console.log("Images in " + fullUrl + ":", imgs ? Array.from(new Set(imgs)).slice(0, 20) : "none");
  }
})();
