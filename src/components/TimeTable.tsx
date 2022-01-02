import React from 'react';
import type { VFC } from 'react';
import type { FieldSet } from 'airtable';

type TimeTableProps = {
  from: FieldSet | undefined;
  to: FieldSet | undefined;
  data: FieldSet[] | undefined;
};

export const TimeTable: VFC<TimeTableProps> = (props) => {
  return <div className='mt-4'>
    {props.from === props.to ? '出発地と行き先が同じです':'タイムテーブル'}
  </div>;
};
