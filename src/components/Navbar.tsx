import React, { useState, useEffect } from 'react';
import TopMenu from 'src/components/TopMenu';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
  const { user, error, isLoading } = useUser();
  const [message, setMessage] = useState('');

  // ログアウトボタンを押してログアウトするまでの間
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (error) {
      setMessage(`エラー：${error}`);
      setIsLoggingOut(false);
    } else if (isLoading) {
      setIsLoggingOut(true);
      setMessage(`読み込み中...`);
    } else if (user) {
      setMessage(`こんにちは、${user?.nickname || user?.name}さん。`);
      setIsLoggingOut(false);
    } else {
      setMessage(`未ログイン`);
      setIsLoggingOut(false);
    }
  }, [user, error, isLoading]);

  return (
    <div className='flex flex-col'>
      <nav className='flex items-center justify-between'>
        <div className='basis-1/3'>
          <TopMenu />
        </div>
        <div className='basis-1/3 text-center'>
          <Link href='/' passHref>
            <p className='text-2xl font-bold text-gray-800'>バス時刻表</p>
          </Link>
        </div>
        <div className='basis-1/3 text-right'>
          <Link href='/api/auth/logout' legacyBehavior>
            <a
              onClick={() => {
                setIsLoggingOut(true);
                setMessage('ログアウト中です。お待ちください...');
              }}
              className={`rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 ${
                !user || isLoggingOut ? 'hidden' : ''
              }`}
            >
              ログアウト
            </a>
          </Link>
          <Link href='/api/auth/login' legacyBehavior>
            <a
              className={`rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-700 ${
                user || isLoggingOut ? 'hidden' : ''
              }`}
            >
              ログイン
            </a>
          </Link>
        </div>
      </nav>
      {user && <p className='mx-2 mt-2 self-center'>{message}</p>}
    </div>
  );
}
