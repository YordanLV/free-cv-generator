// pages/api/exportToPdf.js
import puppeteer from 'puppeteer';

export default async (req, res) => {
  // Render the PDF with Puppeteer
  const pdfBuffer = await renderPdf();

  // Set the appropriate headers
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=export.pdf');

  // Send the PDF buffer as a response
  res.send(pdfBuffer);
};

async function renderPdf() {
  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load the HTML file from the public folder
  const htmlFilePath = 'file://' + process.cwd() + '/public/export.html';
  await page.goto(htmlFilePath, { waitUntil: 'networkidle0' });

  // Convert the page to a PDF buffer
  const pdfBuffer = await page.pdf({ format: 'A4' });

  // Close the browser and return the PDF buffer
  await browser.close();
  return pdfBuffer;
}
