// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { busTable as table, minifyRecords } from 'src/pages/api/utils/Airtable';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const records = await table.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    await res.json(minifiedRecords);
    return (res);
  } catch (err) {
    res.statusCode = 500;
    await res.json({ msg: 'バス情報の取得で問題発生' });
    return (res);
  }
}