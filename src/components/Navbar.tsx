import React from 'react';
import TopMenu from '../components/TopMenu';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-4">
      <TopMenu />
      <p className='text-2xl font-bold text-grey-800'>バス時刻表</p>
      <div className='flex'>
        <a
          href='/api/logout'
          className='rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 hidden'
        >
          ログアウト
        </a>
        <a
          href='/api/login'
          className='rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4'
        >
          ログイン
        </a>
      </div>
    </nav>
  );
}
