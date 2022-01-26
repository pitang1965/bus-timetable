import Layout from '../components/Layout';
import Image from 'next/image';
import siteUrlBarcode from '../../public/site-url.jpg';

const about = () => {
  return (
    <Layout>
      <main className='flex-col px-1'>
        <h1 className='flex justify-center text-4xl font-bold text-blue-600/80'>
          本アプリについて
        </h1>
        <article className='pt-6 leading-loose'>
          <h2 className='text-2xl font-bold'>概要</h2>
          <p>ME品証のまきのSです。</p>
          <p>これは会社のバスの時刻を調べるためのアプリです。</p>
          <p>2021年度の年末年始で新技術の学習を兼ねて作成したものです。</p>

          <h2 className='mt-2 text-2xl font-bold'>お願い</h2>
          <p>
            本WebアプリはPWAなのでWindows, Android,
            iOSにインストール可能です。ぜひ、インストールしてお使いください（iOSはSafariの[ホーム画面に追加]より）。
          </p>
          <p>
            データの問題など不具合があったら問い合わせフォームよりお願いします。
          </p>
        </article>

        <figure className='m-4'>
          <Image
            src={siteUrlBarcode}
            alt='https://j-bus-time-table.vercel.app/'
          />
          <figcaption className='text-center'>サイトURL</figcaption>
        </figure>
      </main>
    </Layout>
  );
};

export default about;
