const fs = require('fs');
const path = require('path');

/**
 * Robust Binary PDF-1.4 Generator with Exact Byte Offsets
 * Produces 100% standard-compliant PDFs that render flawlessly in Chrome, Firefox, Safari, Acrobat, and Mobile.
 */
function createStandardPdf(sections) {
  let objects = [];
  let buffer = Buffer.from('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n', 'binary');

  function addObject(content) {
    const offset = buffer.length;
    const objHeader = `${objects.length + 1} 0 obj\n`;
    const objFooter = '\nendobj\n';
    const fullObj = Buffer.concat([
      Buffer.from(objHeader, 'utf-8'),
      Buffer.isBuffer(content) ? content : Buffer.from(content, 'utf-8'),
      Buffer.from(objFooter, 'utf-8')
    ]);
    objects.push(offset);
    buffer = Buffer.concat([buffer, fullObj]);
    return objects.length;
  }

  // 1. Catalog Object (ID: 1)
  // 2. Pages Object (ID: 2)
  // 3. Page Object (ID: 3)
  // 4. Font Helvetica (ID: 4)
  // 5. Font Helvetica-Bold (ID: 5)
  // 6. Content Stream (ID: 6)

  // Construct text stream
  let streamParts = [];
  streamParts.push('BT');

  // Header: Name & Title
  streamParts.push('/F2 22 Tf');
  streamParts.push('50 740 Td');
  streamParts.push('(M RAMZAN) Tj');

  streamParts.push('/F2 12 Tf');
  streamParts.push('0 -22 Td');
  streamParts.push('(Web & Mobile Application Developer) Tj');

  streamParts.push('/F1 10 Tf');
  streamParts.push('0 -16 Td');
  streamParts.push('(Location: Pakistan | Email: contact@mramzan.dev | Portfolio: https://mramzan.dev) Tj');

  // Horizontal Rule line
  streamParts.push('0 -15 Td');
  streamParts.push('(_________________________________________________________________________________) Tj');

  // Professional Summary
  streamParts.push('/F2 12 Tf');
  streamParts.push('0 -24 Td');
  streamParts.push('(PROFESSIONAL SUMMARY) Tj');

  streamParts.push('/F1 10 Tf');
  streamParts.push('0 -15 Td');
  streamParts.push('(Practical, results-driven Web & Mobile Developer with 5+ years experience building) Tj');
  streamParts.push('0 -13 Td');
  streamParts.push('(responsive websites, custom WordPress CMS platforms, and cross-platform Flutter apps) Tj');
  streamParts.push('0 -13 Td');
  streamParts.push('(for Pakistani SMEs, startups, and international organizations.) Tj');

  // Core Technical Stack
  streamParts.push('/F2 12 Tf');
  streamParts.push('0 -24 Td');
  streamParts.push('(CORE TECHNICAL EXPERTISE) Tj');

  streamParts.push('/F2 10 Tf');
  streamParts.push('0 -15 Td');
  streamParts.push('(Frontend & Web:) Tj');
  streamParts.push('/F1 10 Tf');
  streamParts.push('100 0 Td');
  streamParts.push('(React.js, Next.js 15, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS) Tj');
  streamParts.push('-100 -14 Td');

  streamParts.push('/F2 10 Tf');
  streamParts.push('(CMS & Backend:) Tj');
  streamParts.push('/F1 10 Tf');
  streamParts.push('100 0 Td');
  streamParts.push('(WordPress (Custom Themes, WooCommerce, ACF), PHP, MySQL, REST APIs) Tj');
  streamParts.push('-100 -14 Td');

  streamParts.push('/F2 10 Tf');
  streamParts.push('(Mobile & Tools:) Tj');
  streamParts.push('/F1 10 Tf');
  streamParts.push('100 0 Td');
  streamParts.push('(Google Flutter, Dart (iOS & Android), Git, Figma, Rank Math SEO) Tj');
  streamParts.push('-100 -14 Td');

  // Flagship Real-World Projects
  streamParts.push('/F2 12 Tf');
  streamParts.push('0 -20 Td');
  streamParts.push('(KEY DELIVERED PROJECTS) Tj');

  // Project 1
  streamParts.push('/F2 10 Tf');
  streamParts.push('0 -15 Td');
  streamParts.push('(1. Livestock & Dairy Development Board (lddb.pk)) Tj');
  streamParts.push('/F1 9.5 Tf');
  streamParts.push('0 -13 Td');
  streamParts.push('(   Federal AgTech platform for Ministry of National Food Security. Built with WordPress & MySQL.) Tj');

  // Project 2
  streamParts.push('/F2 10 Tf');
  streamParts.push('0 -15 Td');
  streamParts.push('(2. Brites Security Solutions (britessecurity.co.uk)) Tj');
  streamParts.push('/F1 9.5 Tf');
  streamParts.push('0 -13 Td');
  streamParts.push('(   SIA ACS UK Security platform with live MI5 threat level integration & officer screening.) Tj');

  // Project 3
  streamParts.push('/F2 10 Tf');
  streamParts.push('0 -15 Td');
  streamParts.push('(3. Anwarul Quran Foundation (anwarulquran.org.pk)) Tj');
  streamParts.push('/F1 9.5 Tf');
  streamParts.push('0 -13 Td');
  streamParts.push('(   Islamic educational foundation portal with dual-campus management and welfare donation flows.) Tj');

  // Project 4
  streamParts.push('/F2 10 Tf');
  streamParts.push('0 -15 Td');
  streamParts.push('(4. Alqadir Quran Academy (alqadirquranacademy.com)) Tj');
  streamParts.push('/F1 9.5 Tf');
  streamParts.push('0 -13 Td');
  streamParts.push('(   Global distance learning platform across 24+ countries with multi-timezone scheduling.) Tj');

  // Project 5
  streamParts.push('/F2 10 Tf');
  streamParts.push('0 -15 Td');
  streamParts.push('(5. Samad Brothers (Islamabad)) Tj');
  streamParts.push('/F1 9.5 Tf');
  streamParts.push('0 -13 Td');
  streamParts.push('(   Commercial product catalog & quotation portal, significantly boosting client inquiries.) Tj');

  // Website Packages & Pricing
  streamParts.push('/F2 12 Tf');
  streamParts.push('0 -22 Td');
  streamParts.push('(WEBSITE PACKAGES & SERVICES) Tj');

  streamParts.push('/F1 9.5 Tf');
  streamParts.push('0 -14 Td');
  streamParts.push('( - Starter Business Website: From PKR 30,000 | 3-5 Pages, Mobile Responsive, WhatsApp, SEO) Tj');
  streamParts.push('0 -13 Td');
  streamParts.push('( - Business Growth Website: From PKR 60,000 | 5-10 Pages, WordPress CMS, Blog, Custom UI) Tj');
  streamParts.push('0 -13 Td');
  streamParts.push('( - Custom Projects & Apps: Custom Quote | E-Commerce, Portals, Flutter Mobile Applications) Tj');

  streamParts.push('ET');

  const streamContent = Buffer.from(streamParts.join('\n'), 'utf-8');
  const streamLength = streamContent.length;

  // 1. Catalog
  addObject('<< /Type /Catalog /Pages 2 0 R >>');

  // 2. Pages
  addObject('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');

  // 3. Page
  addObject(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 6 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> >>`);

  // 4. Font 1: Helvetica Regular
  addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');

  // 5. Font 2: Helvetica Bold
  addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');

  // 6. Content Stream
  const streamObj = Buffer.concat([
    Buffer.from(`<< /Length ${streamLength} >>\nstream\n`, 'utf-8'),
    streamContent,
    Buffer.from('\nendstream', 'utf-8')
  ]);
  addObject(streamObj);

  // Write Xref Table
  const startXref = buffer.length;
  let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 0; i < objects.length; i++) {
    xref += `${objects[i].toString().padStart(10, '0')} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${startXref}\n%%EOF\n`;

  buffer = Buffer.concat([buffer, Buffer.from(xref, 'utf-8')]);
  return buffer;
}

const targetPath = path.join(__dirname, '..', 'public', 'resume.pdf');
const pdfBuffer = createStandardPdf();
fs.writeFileSync(targetPath, pdfBuffer);

console.log(`✅ Generated 100% Valid Standard PDF at public/resume.pdf (${(pdfBuffer.length / 1024).toFixed(2)} KB)`);
