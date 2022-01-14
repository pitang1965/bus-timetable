import React from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useForm, SubmitHandler } from 'react-hook-form';
import Layout from '../components/Layout';

type Inputs = {
  name: string;
  department: string;
  inquiry: string;
};

const contact = withPageAuthRequired(({ user }: { user: any }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <Layout>
      <h1 className='flex text-4xl text-blue-600/80 font-bold justify-center'>
        お問い合わせ
      </h1>
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
          <p className='text-[#ff0000] ml-20'>名前は必須です。</p>
        )}
        <fieldset className='flex gap-2 mt-4'>
          <label className='w-16 p-1'>職場</label>
          <input
            {...register('department', { minLength: 2, maxLength: 100 })}
            placeholder='部署名（任意）'
            className='grow p-1'
          />
        </fieldset>
        <fieldset className='flex gap-2 mt-4'>
          <label className='w-16 p-1'>内容</label>
          <textarea
            {...register('inquiry', {
              required: true,
              minLength: 5,
              maxLength: 500,
            })}
            placeholder='問い合わせ内容'
            className='grow p-1'
          />
        </fieldset>
        {errors.inquiry && (
          <p className='text-[#ff0000]  ml-20'>問い合わせ内容は必須です。</p>
        )}
        <input
          type='submit'
          className='block mx-auto  rounded bg-blue-600 hover:bg-blue-700 text-white mt-4 py-2 px-4'
        />
      </form>
    </Layout>
  );
});

export default contact;
