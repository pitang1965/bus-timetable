import Layout from '../components/Layout';
import Image from 'next/image';
import siteUrlBarcode from '../../public/site-url.jpg';

const about = () => {
  return (
    <Layout>
      <main className='flex-column px-1'>
        <h1 className='flex text-4xl text-blue-600/80 font-bold justify-center'>
          本アプリについて
        </h1>
        <article className=' pt-6 ml leading-loose'>
          <h1 className='text-2xl font-bold mb-2'>概要</h1>
          <p>品証のまきのSです。</p>
          <p>これは会社のバスの時刻を調べるためのアプリです。</p>
          <p>2021年度の年末年始で新技術の学習を兼ねて作成したものです。</p>
          <p>データの問題など不具合があったら問い合わせフォームよりお願いします。</p>
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
