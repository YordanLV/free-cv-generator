import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

const saveAsPdf = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("http://localhost:3000/", {
    waitUntil: 'networkidle0',
  });

  await page.evaluate(() => {
    const selectedElement = document.querySelector("#resume")?.outerHTML;
    // @ts-ignore
    document.querySelector("#resume").outerHTML = selectedElement;
  });               

  const result = await page.pdf({
    format: 'a4',
    printBackground: true,
    margin: {
      top: '5cm',
      right: '5cm',
      bottom: '5cm',
      left: '5cm',
    },
  });

  await browser.close();

  return result;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { url } = req.query as { url: string };

  res.setHeader('Content-Disposition', `attachment; filename="file.pdf"`);
  res.setHeader('Content-Type', 'application/pdf');

  const pdf = await saveAsPdf(url);

  return res.send(pdf);
};
