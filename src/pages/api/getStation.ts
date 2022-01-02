// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next'
import { stationTable as table, minifyRecords } from './utils/Airtable';

export default async function handler(req, res): NextApiHandler {
  try {
    const records = await table.select({}).firstPage();
    const minifiedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(minifiedRecords);
    return (res);
  } catch (err) {
    res.statusCode = 500;
    res.json({ msg: 'バス停取得で問題発生' });
    return (res);
  }
}
