import React, { useEffect, useState } from 'react';
import type { VFC } from 'react';
import type { FieldSet } from 'airtable';

type TimeTableProps = {
  busTable: FieldSet[] | undefined;
  timeTableTable: FieldSet[] | undefined;
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
  const [filteredTimeTable, setFilteredTimeTable] = useState<
    FieldSet[] | undefined
  >([]);

  useEffect(() => {
    const filtered =
      timeTableTable &&
      timeTableTable.filter(function (record) {
        if (
          (record.fields as any).From === undefined &&
          (record.fields as any).From.length === 0
        )
          return false;
        return (
          from?.id === (record.fields as any).From[0] &&
          (record.fields as any).To.find(function (id: string) {
            return id === to?.id;
          })
        );
      });
    setFilteredTimeTable(filtered);
  }, [busTable, from, timeTableTable, to]);

  if (from === undefined || to === undefined) return <div>データ取得中...</div>;
  const busId2BusName = (id: string): string => {
    const theBus =
      busTable &&
      busTable.find(function (bus) {
        return bus.id === id;
      });

    return (theBus?.fields as any).Name;
  };

  if (from === to) {
    return <div className='mt-4'>出発地と行き先が同じです</div>;
  }

  const cellClassName = 'border-2 border-slate-400 px-1';

  return (
    <main className='mt-4 pt-4'>
      <table className={`table-auto w-full ${cellClassName}`}>
        <thead>
          <tr>
            <th className={cellClassName}>時刻</th>
            <th className={cellClassName}>バス名称</th>
            <th className={cellClassName}>備考</th>
          </tr>
        </thead>
        <tbody>
          {filteredTimeTable &&
            filteredTimeTable.map((record) => (
              <tr key={record.id as string}>
                <td className={`w-1/6 text-center ${cellClassName}`}>
                  {formatTimeString(
                    (record.fields as any).Hour,
                    (record.fields as any).Minute,
                    (record.fields as any)['Arrive-before-opening-time']
                  )}
                </td>
                <td className={`w-1/4 ${cellClassName}`}>
                  {busId2BusName((record.fields as any).Bus[0])}
                </td>
                <td className={cellClassName}>
                  {(record.fields as any).Note}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <p className='mt-2'>
        <mark>*:</mark> 8:30に武蔵村山製作所に間に合うバス
      </p>
    </main>
  );
};
