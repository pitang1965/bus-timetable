// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { timeTableTable as table, minifyRecords } from './utils/Airtable';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const mergedRecords: any = [];
  table.select({ sort: [{ field: 'Id', direction: 'asc' }] }).eachPage(
    function page(records, fetchNextPage) {
      records.forEach(function (record) {
        mergedRecords.push(record);
      });
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        res.statusCode = 500;
        res.json({ msg: 'バス時刻表の取得で問題発生' });
        return res;
      }
      const minifiedRecords = minifyRecords(mergedRecords);
      res.statusCode = 200;
      res.json(minifiedRecords);
      return res;
    }
  );
}
