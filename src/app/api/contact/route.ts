import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, organization, service, budget, timeline, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, message" },
        { status: 400 }
      );
    }

    // Format email body for logging / future nodemailer integration
    const emailBody = `
NEW PROJECT INQUIRY — M Ramzan Portfolio
==========================================

From: ${name}
Email: ${email}
Organization: ${organization || "Not specified"}

Requested Service: ${service}
Budget Range: ${budget}
Target Timeline: ${timeline}

Project Vision:
${message}

--
Submitted via mramzan.dev Contact Form
Timestamp: ${new Date().toISOString()}
    `.trim();

    // Log to server console (visible in Wasmer/Vercel logs)
    console.log(emailBody);

    // If SMTP env vars are set, attempt to send via nodemailer
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.default.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
          replyTo: email,
          subject: `[Portfolio Inquiry] ${service} — ${name}`,
          text: emailBody,
          html: `
            <div style="font-family: monospace; background: #08080a; color: #f4f4f7; padding: 32px; border-radius: 12px; max-width: 600px;">
              <div style="border-bottom: 1px solid #222; padding-bottom: 16px; margin-bottom: 24px;">
                <h1 style="color: #dfb15b; font-size: 18px; margin: 0;">New Project Inquiry</h1>
                <p style="color: #888; font-size: 12px; margin: 4px 0 0;">M Ramzan Portfolio Contact Form</p>
              </div>

              <table style="width: 100%; font-size: 13px; color: #ccc;">
                <tr><td style="color: #888; padding: 4px 0;">From</td><td style="color: #fff; font-weight: bold;">${name}</td></tr>
                <tr><td style="color: #888; padding: 4px 0;">Email</td><td><a href="mailto:${email}" style="color: #dfb15b;">${email}</a></td></tr>
                <tr><td style="color: #888; padding: 4px 0;">Organization</td><td>${organization || "—"}</td></tr>
                <tr><td style="color: #888; padding: 4px 0;">Service</td><td style="color: #dfb15b;">${service}</td></tr>
                <tr><td style="color: #888; padding: 4px 0;">Budget</td><td>${budget}</td></tr>
                <tr><td style="color: #888; padding: 4px 0;">Timeline</td><td>${timeline}</td></tr>
              </table>

              <div style="margin-top: 24px; padding: 16px; background: #111; border-radius: 8px; border-left: 3px solid #dfb15b;">
                <p style="color: #888; font-size: 11px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">Project Vision</p>
                <p style="color: #f4f4f7; font-size: 14px; line-height: 1.6; margin: 0;">${message.replace(/\n/g, "<br>")}</p>
              </div>

              <p style="color: #555; font-size: 11px; margin-top: 24px; text-align: center;">
                Submitted ${new Date().toLocaleString()}
              </p>
            </div>
          `,
        });
      } catch (smtpErr) {
        console.error("SMTP send failed (non-blocking):", smtpErr);
        // Don't fail the request — we still captured the inquiry in logs
      }
    }

    // Store inquiry in MySQL if available
    try {
      const { getDbPool } = await import("@/lib/db/mysql");
      const pool = getDbPool();
      await pool.query(
        `CREATE TABLE IF NOT EXISTS contact_inquiries (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          organization VARCHAR(255),
          service VARCHAR(255),
          budget VARCHAR(100),
          timeline VARCHAR(100),
          message TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
      );
      await pool.query(
        `INSERT INTO contact_inquiries (name, email, organization, service, budget, timeline, message)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, email, organization || "", service, budget, timeline, message]
      );
    } catch (dbErr) {
      console.error("DB insert failed (non-blocking):", dbErr);
    }

    return NextResponse.json(
      { success: true, message: "Inquiry received successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
