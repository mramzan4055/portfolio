const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Starting Optimized cPanel Production Package Build...');

// 1. Ensure public/resume.pdf is updated with valid PDF-1.4 binary specs
console.log('1️⃣ Generating valid binary resume.pdf...');
execSync('node scripts/generate-resume-pdf.js', { stdio: 'inherit' });

// 2. Clear .next/cache to keep package lightweight and fast
const cacheDir = path.join(__dirname, '..', '.next', 'cache');
if (fs.existsSync(cacheDir)) {
  try {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('2️⃣ Cleaned .next/cache for ultra-fast cPanel upload.');
  } catch (e) {
    // ignore
  }
}

// 3. Create zip file
console.log('3️⃣ Creating cpanel-deployment-ready.zip...');
const zipPath = path.join(__dirname, '..', 'cpanel-deployment-ready.zip');
if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

const filesToInclude = [
  '.next',
  'public',
  'src',
  'scripts',
  'package.json',
  'package-lock.json',
  'next.config.ts',
  'server.js',
  '.htaccess',
  '.env.production',
  'mail-config.php',
  'tsconfig.json',
  'postcss.config.mjs',
  'tailwind.config.ts'
];

const psCommand = `powershell -Command "Compress-Archive -Path ${filesToInclude.join(',')} -DestinationPath '${zipPath}' -Force"`;

try {
  execSync(psCommand, { stdio: 'inherit' });
  const stats = fs.statSync(zipPath);
  const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
  console.log(`\n🎉 SUCCESS! cPanel Ready Package Created:`);
  console.log(`📁 File: cpanel-deployment-ready.zip (${sizeMB} MB)`);
  console.log(`📍 Path: ${zipPath}`);
} catch (err) {
  console.error('Archive error:', err);
}
