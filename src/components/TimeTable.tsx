import React from 'react';
import type { VFC } from 'react';
import type { FieldSet, Record } from 'airtable';

type TimeTableProps = {
  from: FieldSet | undefined;
  to: FieldSet | undefined;
  data: FieldSet[] | undefined;
};

const TableBody = (props) => {
  console.log(props.data);
  return (
    <main>
      <ul>
        {props.data.map((record) => (
          <li key={record.id}><p>{`#${record.fields.Id} ${record.fields.From} --> ${record.fields.To} ${record.fields.Hour}:${record.fields.Minute} `}</p></li>
        ))}
      </ul>
    </main>
  );
};

export const TimeTable: VFC<TimeTableProps> = (props) => {
  return (
    <div className='mt-4'>
      {props.from === props.to ? (
        '出発地と行き先が同じです'
      ) : (
        <TableBody data={props.data} />
      )}
    </div>
  );
};
