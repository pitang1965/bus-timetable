import Layout from '../components/Layout';

const about = () => {
  return (
    <Layout>
      <main className='min-h-screen flex-column px-1'>
        <h1 className='flex text-4xl text-blue-600/80 font-bold justify-center'>
          本アプリについて
        </h1>
        <article className=' pt-6 leading-loose'>
          <h1 className='text-2xl font-bold mb-2'>概要</h1>
          <p>品証のまきのSです。</p>
          <p>これは会社のバスの時刻を調べるためのアプリです。</p>
          <p>
            2021年度の年末年始で新技術の学習を兼ねて作成したもので、まだ一部作成中です。
          </p>
          <p>しばらく改良しますので、よろしければ使ってみてください。</p>
        </article>

        <article className=' pt-6 leading-loose'>
          <h1 className='text-2xl font-bold mb-2'>今後の予定</h1>
          <p>次の改良を考えています。</p>
          <ol className='list-decimal list-inside ml-2'>
            <li>公共のバス情報の登録</li>
            <li>
              PWA化してスマホのネィティブアプリのようにインストール可能にする
            </li>
            <li>ログイン機能</li>
            <li>掲示板機能</li>
            <li>見た目の改良</li>
            <li>その他内部的な改良</li>
          </ol>
        </article>
      </main>
    </Layout>
  );
};

export default about;
