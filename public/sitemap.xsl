<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap | M Ramzan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            background-color: #08080a;
            color: #f4f4f7;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            padding: 40px 24px 80px 24px;
            line-height: 1.6;
          }
          .container {
            max-width: 1100px;
            margin: 0 auto;
          }
          .header {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 28px;
            margin-bottom: 32px;
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 4px 12px;
            background: rgba(223, 177, 91, 0.1);
            border: 1px solid rgba(223, 177, 91, 0.3);
            border-radius: 9999px;
            color: #dfb15b;
            font-size: 12px;
            font-family: monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 16px;
          }
          .badge-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #dfb15b;
          }
          h1 {
            font-size: 32px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: -0.5px;
            margin-bottom: 10px;
          }
          h1 span {
            color: #dfb15b;
          }
          .description {
            color: #a1a1aa;
            font-size: 15px;
            max-width: 750px;
            margin-bottom: 20px;
          }
          .stats {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;
          }
          .stat-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 12px;
            padding: 10px 18px;
            font-size: 13px;
            font-family: monospace;
            color: #d4d4d8;
          }
          .stat-card strong {
            color: #dfb15b;
          }
          .table-wrapper {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 14px;
          }
          thead {
            background: rgba(255, 255, 255, 0.04);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          th {
            padding: 14px 18px;
            color: #dfb15b;
            font-family: monospace;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
          }
          tbody tr {
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
            transition: background-color 0.15s ease;
          }
          tbody tr:hover {
            background: rgba(223, 177, 91, 0.04);
          }
          td {
            padding: 14px 18px;
            color: #d4d4d8;
          }
          .col-index {
            width: 50px;
            color: #71717a;
            font-family: monospace;
            font-size: 12px;
          }
          .col-url a {
            color: #ffffff;
            text-decoration: none;
            word-break: break-all;
            transition: color 0.15s ease;
          }
          .col-url a:hover {
            color: #dfb15b;
            text-decoration: underline;
          }
          .priority-pill {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 11px;
            font-weight: 600;
            background: rgba(223, 177, 91, 0.15);
            color: #dfb15b;
            border: 1px solid rgba(223, 177, 91, 0.3);
          }
          .changefreq-tag {
            font-family: monospace;
            font-size: 12px;
            color: #a1a1aa;
            text-transform: capitalize;
          }
          .date-tag {
            font-family: monospace;
            font-size: 12px;
            color: #71717a;
          }
          .footer {
            margin-top: 32px;
            text-align: center;
            font-size: 12px;
            color: #71717a;
            font-family: monospace;
          }
          .footer a {
            color: #dfb15b;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <div class="badge">
              <span class="badge-dot"></span>
              <span>Search Engine Index</span>
            </div>
            <h1>XML Sitemap · <span>mramzan.dev</span></h1>
            <p class="description">
              This XML Sitemap is generated for search engine indexing (Google, Bing, Yahoo, Yandex) 
              and generative AI crawlers. It lists all active canonical URLs, update frequencies, and priority weights.
            </p>
            <div class="stats">
              <div class="stat-card">
                Total URLs: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></strong>
              </div>
              <div class="stat-card">
                Format: <strong>Sitemaps.org 0.9 XML</strong>
              </div>
              <div class="stat-card">
                Human Index: <a href="/sitemap" style="color:#dfb15b;text-decoration:none;margin-left:4px;">View HTML Sitemap →</a>
              </div>
            </div>
          </header>

          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th class="col-index">#</th>
                  <th>URL</th>
                  <th style="width: 100px;">Priority</th>
                  <th style="width: 130px;">Changefreq</th>
                  <th style="width: 130px;">Last Modified</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <tr>
                    <td class="col-index"><xsl:value-of select="position()"/></td>
                    <td class="col-url">
                      <a href="{sitemap:loc}" target="_blank">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td>
                      <span class="priority-pill">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </td>
                    <td>
                      <span class="changefreq-tag">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <span class="date-tag">
                        <xsl:value-of select="substring(sitemap:lastmod, 0, 11)"/>
                      </span>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <footer class="footer">
            <p>
              Official Portfolio of <a href="https://mramzan.dev">M Ramzan</a> — Web &amp; Mobile App Developer (Pakistan).
            </p>
          </footer>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
