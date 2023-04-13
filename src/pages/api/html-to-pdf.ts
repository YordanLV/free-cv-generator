import juice from 'juice';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// Function to save HTML to the public folder
async function saveHtmlToPublicFolder(html) {
  const filePath = path.join(process.cwd(), 'public', 'savedHtml.html');
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, html, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { html } = req.body; // Get the stringified HTML document and CSS file from the request body

  // Save the HTML to the public folder
  try {
    await saveHtmlToPublicFolder(html);
  } catch (err) {
    console.error(err);
    res.status(500).end();
    return;
  }

  // Inline CSS styles into the HTML using the Juice library
  const inlinedHtml = juice(html);

  // Launch Puppeteer and create a new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content of the page to the inlined HTML
  await page.setContent(inlinedHtml, { waitUntil: 'networkidle0' });

  // Emulate printer settings
  await page.emulateMediaType('print');

  // Generate a PDF from the page content
  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  // Close the browser
  await browser.close();

  // Send the PDF back as a response
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
  res.send(pdfBuffer);
}
