import React, { useEffect, useState } from 'react';
import type { VFC } from 'react';
import type { FieldSet } from 'airtable';

type TimeTableProps = {
  from: FieldSet | undefined;
  to: FieldSet | undefined;
  timeTable: FieldSet[] | undefined;
};

const formatTimeString = (hour: number, minute: number): string => {
  let hourString = String(hour);
  if (hourString.length < 2) {
    hourString = '0' + hourString;
  }
  let minuteString = String(minute);
  if (minuteString.length < 2) {
    minuteString = '0' + minuteString;
  }

  return hourString + ':' + minuteString;
};

export const TimeTable: VFC<TimeTableProps> = ({ from, to, timeTable }) => {
  const [filteredTimeTable, setFilteredTimeTable] = useState([]);

  useEffect(() => {
    if (from === undefined || to === undefined)
      return <div>データ取得中...</div>;

    const filtered = timeTable?.filter(function (record, index) {
      if (record.fields?.From === undefined && record.fields?.From.length === 0)
        return false;
      return (
        from.id === record.fields.From[0] &&
        record.fields.To.find(function (id) {
          return id === to.id;
        })
      );
    });
    setFilteredTimeTable(filtered);
    console.log(filteredTimeTable);
  }, [from, timeTable, to]);

  if (from === to) {
    return <div className='mt-4'>出発地と行き先が同じです</div>;
  }

  return (
    <main>
      <ul>
        {filteredTimeTable.map((record) => (
          <li key={record.id}>
            <div>
              <p>
                {formatTimeString(record.fields.Hour, record.fields.Minute)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};
