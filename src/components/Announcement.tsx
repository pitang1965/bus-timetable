import React from 'react';

export const Announcement = () => {
  return (
    <div className='py-3 px-4 mb-2 text-white bg-purple-600'>
      <p className='text-sm font-medium text-center'>
        <a
          href='https://todays-lunch.vercel.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='underline'
        >
          平田のお弁当注文アプリ
        </a>
        もぜひご利用ください。2022-07-01の時刻表改定に対応済です。
      </p>
    </div>
  );
};
