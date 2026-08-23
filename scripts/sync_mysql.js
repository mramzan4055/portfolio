const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");

// Load .env.local
const envFile = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf-8");
envFile.split("\n").forEach((line) => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    process.env[match[1].trim()] = match[2].trim();
  }
});

async function syncDb() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });

  console.log("Connected to MySQL database.");

  // We can read downloaded_images.json to update project records in MySQL if needed
  const downloadedMap = JSON.parse(fs.readFileSync(path.join(__dirname, "downloaded_images.json"), "utf-8"));

  // Check existing projects
  const [rows] = await connection.query("SELECT id, slug, title FROM projects");
  console.log(`Found ${rows.length} projects in MySQL.`);

  // Update hero_image, thumbnail_image, and gallery in MySQL for each project
  for (const [slug, imgData] of Object.entries(downloadedMap)) {
    console.log(`Updating MySQL project with slug ${slug}...`);
    await connection.query(
      "UPDATE projects SET hero_image = ?, thumbnail_image = ?, gallery = ? WHERE slug = ?",
      [imgData.hero, imgData.thumbnail, JSON.stringify(imgData.gallery), slug]
    );
  }

  console.log("MySQL projects updated with authentic image assets!");
  await connection.end();
}

syncDb().catch((err) => {
  console.error("Error syncing DB:", err.message);
  process.exit(0); // non-fatal
});
