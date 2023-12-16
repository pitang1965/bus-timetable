import Airtable from 'airtable';
import type { FieldSet, Records } from 'airtable';

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_TOKEN
});
var base = Airtable.base(process.env.AIRTABLE_BASE_ID as string);

const busTable = base('Bus')
const stationTable = base('Station');
const timeTableTable = base('TimeTable');

const getMinifiedRecord = (record:any) => {
  return {
    id: record.id,
    fields: record.fields
  }
}

const minifyRecords = (records:Records<FieldSet>) => {
  return records.map(record => getMinifiedRecord(record));
}

export { busTable, stationTable, timeTableTable, minifyRecords };