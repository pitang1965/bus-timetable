// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { timeTableTable as table, minifyRecords } from './utils/Airtable';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const records = await table.select({ sort: [{ field: "Id", direction: "asc" }]}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
    return (res);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'バス時刻表の取得で問題発生' });
    return (res);
  }
}
