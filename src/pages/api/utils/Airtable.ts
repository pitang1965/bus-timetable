import type { NextApiRequest, NextApiResponse } from 'next';
import Airtable from 'airtable';
import type { FieldSet, Records } from 'airtable';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID as string);

const stationTable = base('Station');

const getMinifiedRecord = (record:any) => {
  return {
    id: record.id,
    fields: record.fields
  }
}

const minifyRecords = (records:Records<FieldSet>) => {
  return records.map(record => getMinifiedRecord(record));
}

export { stationTable, minifyRecords };