// pages/api/export-pdf.js
import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function exportPdf(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Only POST requests are allowed' });
    return;
  }

  const { html } = req.body;

  if (!html) {
    res.status(400).json({ message: 'htmlContent is required' });
    return;
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Export PDF</title>
      </head>
      <style>
      #resume {
        border-radius: 0!important;
        box-shadow: none!important;
      }
      </style>
      <body>
        ${html}
      </body>
      </html>
    `;

    await page.setContent(htmlTemplate, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' },
    });

    await browser.close();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=exported.pdf');
    res.status(200).send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
