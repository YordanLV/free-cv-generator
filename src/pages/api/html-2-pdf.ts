import pdf from 'html-pdf';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'public', 'savedHtml.html');

  try {
    const html = await fs.readFile(filePath, 'utf8');

    const options = {
      format: 'A4',
      base: `file://${process.cwd()}/`,
      header: {
        height: '1cm',
      },
      footer: {
        height: '1cm',
      },
    };

    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        console.error(err);
        res.status(500).end();
        return;
      }

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
      res.send(buffer);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error reading HTML file');
  }
}
