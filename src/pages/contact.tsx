import React from 'react';
import { withPageAuthRequired as withPageAuthRequiredCSR } from '@auth0/nextjs-auth0/client';
import { useForm, SubmitHandler } from 'react-hook-form';
import Layout from 'src/components/Layout';
import {
  NotifyContainer,
  notifySuccess,
  notifyError,
} from 'src/lib/notify';

type Inputs = {
  name: string;
  department: string;
  inquiry: string;
};

const contact = withPageAuthRequiredCSR(({ user }: { user: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('res: ', res);
      reset();
      notifySuccess('お問い合わせが送信されました。');
    } catch (error) {
      console.error('Fetch error : ', error);
      notifyError(JSON.stringify(error));
    }
  };

  return (
    <Layout>
      <main className='flex-col px-1'>
        <h1 className='flex justify-center text-4xl font-bold text-blue-600/80'>
          お問い合わせ
        </h1>
        <p className='mt-8'>牧野SのGmailに送られます。</p>
        <form onSubmit={handleSubmit(onSubmit)} className='my-4 mx-2'>
          <fieldset className='flex gap-2'>
            <label className='w-16 p-1'>名前</label>
            <input
              {...register('name', { required: true, maxLength: 100 })}
              defaultValue={user?.nickname || user?.name}
              placeholder='名前（必須）'
              className='grow p-1'
            />
          </fieldset>
          {errors.name && (
            <p className='ml-20 text-[#ff0000]'>名前は必須です。</p>
          )}
          <fieldset className='mt-4 flex gap-2'>
            <label className='w-16 p-1'>職場</label>
            <input
              {...register('department', { minLength: 2, maxLength: 100 })}
              placeholder='部署名（任意）'
              className='grow p-1'
            />
          </fieldset>
          <fieldset className='mt-4 flex gap-2'>
            <label className='w-16 p-1'>内容</label>
            <textarea
              {...register('inquiry', {
                required: true,
                minLength: 5,
                maxLength: 500,
              })}
              placeholder='問い合わせ内容'
              rows={10}
              className='grow p-1 leading-5'
            />
          </fieldset>
          {errors.inquiry && (
            <p className='ml-20 text-[#ff0000]'>問い合わせ内容は必須です。</p>
          )}
          <input
            type='submit'
            className='mx-auto mt-4 block rounded bg-blue-600 py-2 px-4 text-white hover:bg-blue-700'
          />
          <NotifyContainer />
        </form>
      </main>
    </Layout>
  );
});

export default contact;
