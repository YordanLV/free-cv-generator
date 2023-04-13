import pdf from 'html-pdf';
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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
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

  // Define the options for html-pdf
  const options = {
    format: 'A4',
    base: `file://${process.cwd()}/`,
    header: {
      height: '1cm'
    },
    footer: {
      height: '1cm'
    },
  };

  // Convert the HTML output into a PDF using html-pdf
  pdf.create(inlinedHtml, options).toBuffer((err, buffer) => {
    if (err) {
      console.error(err);
      res.status(500).end();
      return;
    }

    // Send the PDF back as a response
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    res.send(buffer);
  });
}
