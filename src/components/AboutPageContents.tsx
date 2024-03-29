import React from 'react';
import Layout from 'src/components/Layout';
import Link from 'next/link';
import siteUrlBarcode from 'public/site-url.jpg';
import Image from 'next/image';

const AboutPageContents = () => {
  return (
    <Layout>
      <main className='flex-col px-1'>
        <h1 className='flex justify-center text-4xl font-bold text-blue-600/80'>
          本アプリについて
        </h1>
        <article className='prose lg:prose-xl'>
          <h2>概要</h2>
          <p>これは会社のバスの時刻を調べるためのアプリです。</p>
          <p>2021年度の年末年始で新技術の学習を兼ねて作成したものです。</p>
          <h2>お願い</h2>
          <p>
            現在、データは更新されていません。 本Webアプリは
            <abbr title='Progressive Web App'>PWA</abbr>
            なのでWindows, Android,
            iOSにインストール可能です。ぜひ、インストールしてお使いください（
            <strong>iOS</strong>は<strong>Safari</strong>の
            <strong>[ホーム画面に追加]</strong>より）。
          </p>
          <p>
            同僚に本アプリを勧める場合は、以下のバーコードをお使いください。
          </p>
          <figure className='mb-8 flex flex-col'>
            <Image
              src={siteUrlBarcode}
              alt='https://j-bus-time-table.vercel.app/'
            />
            <figcaption>本サイト「バス時刻表」のURL</figcaption>
          </figure>
          <p>
            データの問題など不具合があったら
            <Link href='/contact' passHref legacyBehavior>
              お問い合わせフォーム
            </Link>
            よりお願いします。
          </p>
          <h2>関連アプリ</h2>
          <a
            href='https://todays-lunch.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'
          >
            今日のお弁当
            <span>
              <Image
                src='/obento.svg'
                alt='バス時刻表'
                width={128}
                height={128}
                className='animate-bounce'
              />
            </span>
          </a>
        </article>
      </main>
    </Layout>
  );
};

export default AboutPageContents;
