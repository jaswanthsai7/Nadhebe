<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap | Nadhebe</title>
        <meta charset="utf-8"/>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #FAFAFA;
            color: #0A0A0A;
            margin: 0;
            padding: 40px 20px;
          }
          .container {
            max-width: 960px;
            margin: 0 auto;
            background: #FFFFFF;
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.05);
            border: 1px solid #E5E5E5;
          }
          h1 {
            font-size: 24px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 8px;
            color: #0A0A0A;
          }
          p.desc {
            color: #525252;
            font-size: 14px;
            margin-bottom: 24px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }
          th {
            background-color: #F5F5F5;
            text-align: left;
            padding: 12px 16px;
            font-weight: 600;
            border-bottom: 1px solid #E5E5E5;
          }
          td {
            padding: 12px 16px;
            border-bottom: 1px solid #F0F0F0;
            word-break: break-all;
          }
          tr:hover td {
            background-color: #FAFAFA;
          }
          a {
            color: #D97706;
            text-decoration: none;
            font-weight: 500;
          }
          a:hover {
            text-decoration: underline;
          }
          .badge {
            display: inline-block;
            background: #F5F5F5;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-family: monospace;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>XML Sitemap</h1>
          <p class="desc">Generated automatically for search engine indexing. Total URLs: <xsl:value-of select="count(sitemap:urlset/sitemap:url | sitemap:sitemapindex/sitemap:sitemap)"/></p>
          <table>
            <thead>
              <tr>
                <th width="75%">URL</th>
                <th width="25%">Type</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td><span class="badge">Page</span></td>
                </tr>
              </xsl:for-each>
              <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                  </td>
                  <td><span class="badge">Sitemap</span></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
