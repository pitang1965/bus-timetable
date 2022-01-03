import React, { useEffect, useState } from 'react';
import type { VFC } from 'react';
import type { FieldSet } from 'airtable';

type TimeTableProps = {
  busTable: FieldSet[];
  timeTableTable: FieldSet[];
  from: FieldSet | undefined;
  to: FieldSet | undefined;
};

const formatTimeString = (
  hour: number,
  minute: number,
  arriveBeforeOpeningTime: boolean
): string => {
  let hourString = String(hour);
  if (hourString.length < 2) {
    hourString = '0' + hourString;
  }
  let minuteString = String(minute);
  if (minuteString.length < 2) {
    minuteString = '0' + minuteString;
  }

  let finalString = hourString + ':' + minuteString;
  if (arriveBeforeOpeningTime) {
    finalString += ' *';
  }

  return finalString;
};

export const TimeTable: VFC<TimeTableProps> = ({
  busTable,
  timeTableTable,
  from,
  to,
}) => {
  const [filteredTimeTable, setFilteredTimeTable] = useState([]);

  useEffect(() => {
    if (from === undefined || to === undefined)
      return <div>データ取得中...</div>;

    const filtered = timeTableTable.filter(function (record, index) {
      if (record.fields?.From === undefined && record.fields?.From.length === 0)
        return false;
      return (
        from.id === record.fields?.From[0] &&
        record.fields?.To.find(function (id) {
          return id === to.id;
        })
      );
    });
    setFilteredTimeTable(filtered);
    console.log(busTable);
  }, [busTable, from, timeTableTable, to]);

  const busId2BusName = (id: string): string => {
    const theBus = busTable.find(function (bus) {
      return bus.id === id;
    });

    return theBus?.fields?.Name;
  };

  if (from === to) {
    return <div className='mt-4'>出発地と行き先が同じです</div>;
  }

  const borderClassName = 'border-2 border-current';

  return (
    <main className='pt-4'>
      <table className={`table-fixed w-full ${borderClassName}`}>
        <thead>
          <tr>
            <th className={borderClassName}>時刻</th>
            <th className={borderClassName}>バス名称</th>
            <th className={borderClassName}>備考</th>
          </tr>
        </thead>
        <tbody>
          {filteredTimeTable.map((record) => (
            <tr key={record.id}>
              <td className={borderClassName}>
                {formatTimeString(
                  record.fields.Hour,
                  record.fields.Minute,
                  record.fields['Arrive-before-opening-time']
                )}
              </td>
              <td className={borderClassName}>
                {busId2BusName(record.fields.Bus[0])}
              </td>
              <td className={borderClassName}>{record.fields.Note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><mark>*:</mark> 8:30に武蔵村山製作所に間に合うバス</p>
    </main>
  );
};
