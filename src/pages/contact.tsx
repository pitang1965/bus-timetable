import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import Layout from '../components/Layout';

const contact = withPageAuthRequired(() => {
  return (
    <Layout>
      <h1 className='flex text-4xl text-blue-600/80 font-bold justify-center'>
        お問い合わせ
      </h1>
      <article className=' pt-6 ml leading-loose'>
        <p>工事中です。</p>
      </article>
    </Layout>
  );
});

export default contact;
