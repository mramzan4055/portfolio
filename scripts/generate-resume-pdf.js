const fs = require('fs');
const path = require('path');

function generateMinimalPdf(authorName, title, email, summary) {
  const content = `BT
/F1 18 Tf
50 750 Td
(${authorName} - Curriculum Vitae) Tj
/F1 12 Tf
0 -30 Td
(${title}) Tj
0 -20 Td
(Email: ${email} | Portfolio: https://mramzan.dev) Tj
0 -40 Td
(Summary: ${summary}) Tj
0 -30 Td
(Core Competencies: Next.js 15, TypeScript, MySQL, Headless CMS, GEO Optimization) Tj
0 -30 Td
(Flagship Projects:) Tj
0 -20 Td
(- Brites Security Solutions: SIA ACS Manned Guarding Platform) Tj
0 -20 Td
(- Anwarul Quran Foundation: 2002 Legacy Islamic EdTech & Welfare) Tj
0 -20 Td
(- Livestock & Dairy Development Board: National AgTech Infrastructure) Tj
0 -20 Td
(- Alqadir Quran Academy: Global LMS in 24+ Countries) Tj
ET`;

  const streamLength = Buffer.byteLength(content, 'utf-8');

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLength} >>
stream
${content}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000234 00000 n 
0000000${(280 + streamLength).toString().padStart(3, '0')} 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${360 + streamLength}
%%EOF`;

  return Buffer.from(pdf, 'utf-8');
}

const targetPath = path.join(__dirname, '..', 'public', 'resume.pdf');
const pdfBuffer = generateMinimalPdf(
  "M RAMZAN",
  "Lead Full-Stack Architect & Creative Technologist",
  "mramzan4055@gmail.com",
  "Specializing in Next.js 15, Wasmer MySQL, Headless CMS, and Luxury UI Architecture."
);

fs.writeFileSync(targetPath, pdfBuffer);
console.log("Successfully generated public/resume.pdf!");
