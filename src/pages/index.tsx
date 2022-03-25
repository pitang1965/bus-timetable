/* eslint-disable @next/next/inline-script-id */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Script from 'next/script';
import type { GetStaticProps, NextPage } from 'next';
import { FieldSet } from 'airtable';
import Head from 'next/head';
import { StationListBox } from '../components/StationListBox';
import { TimeTable } from '../components/TimeTable';
import { SwitchHorizontalIcon } from '@heroicons/react/solid';
import { useLocalStorage } from '../lib/hooks/useLocalStorage';
import { NotifyContainer, notifyInfo } from '../lib/notify';

const Home: NextPage<{
  stationData: FieldSet[] | undefined;
  timeTableData: FieldSet[] | undefined;
  busData: FieldSet[] | undefined;
}> = ({ stationData, timeTableData, busData }) => {
  const [stationNameFrom, setStationNameFrom] =
    useLocalStorage('stationNameFrom');
  const [stationNameTo, setStationNameTo] = useLocalStorage('stationNameTo');
  const [stationDataFrom, setStationDataFrom] = useState<
    FieldSet | undefined
  >();
  const [stationDataTo, setStationDataTo] = useState<FieldSet | undefined>();

  // お知らせ
  useEffect(() => {
    notifyInfo('4月ダイヤを反映済');
    notifyInfo('平田お弁当注文アプリもどうぞ!');
  }, []);

  // localStorageからデータを呼んで出発地と行き先を設定
  useEffect(() => {
    if (stationNameFrom === '') {
      setStationDataFrom(stationData && stationData[0]);
    } else {
      setStationDataFrom(
        stationData &&
          stationData.find(function (record) {
            return (record.fields as any).Name === stationNameFrom;
          })
      );
    }

    if (stationNameTo === '') {
      setStationDataTo(stationData && stationData[1]);
    } else {
      setStationDataTo(
        stationData &&
          stationData.find(function (record) {
            return (record.fields as any).Name === stationNameTo;
          })
      );
    }
  }, []);

  const transposeStations = () => {
    const work = stationDataFrom;
    setStationDataFrom(stationDataTo);
    setStationDataTo(work);
    window.navigator.vibrate([200]);
  };

  useEffect(() => {
    // 出発地と行き先のバス停名をローカルストレージに保存
    if (stationDataFrom) {
      setStationNameFrom((stationDataFrom?.fields as any).Name);
    }
    if (stationDataTo) {
      setStationNameTo((stationDataTo?.fields as any).Name);
    }
  }, [stationDataFrom, stationDataTo]);

  const gtag = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?${gtag}`}
        strategy='lazyOnload'
      />
      <Script strategy='lazyOnload'>
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gtag);
      `}
      </Script>
      <Layout>
        <Head>
          <title>バス時刻表</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/bus.svg' />
        </Head>
        <main className='flex-col p-2 min-h-screen'>
          <h1 className='flex justify-center mb-4 text-4xl font-bold text-blue-600/80'>
            時刻表
          </h1>
          <StationListBox
            label='出発地：'
            stations={stationData}
            selected={stationDataFrom}
            setSelected={setStationDataFrom}
          />
          <div className='flex justify-center mt-6'>
            <button
              aria-label='出発時と行き先を入れ替え'
              onClick={transposeStations}
            >
              <SwitchHorizontalIcon className='w-10 h-10 text-white bg-blue-600 hover:bg-blue-700 rounded' />
            </button>
          </div>
          <StationListBox
            label='行き先：'
            stations={stationData}
            selected={stationDataTo}
            setSelected={setStationDataTo}
          />
          <TimeTable
            busTable={busData}
            timeTableTable={timeTableData}
            from={stationDataFrom}
            to={stationDataTo}
          />
        </main>
      </Layout>
      <NotifyContainer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const origin = process.env.AUTH0_BASE_URL ?? 'http://localhost:3000';
    const res_station = await fetch(`${origin}/api/getStation`);
    const res_time_table = await fetch(`${origin}/api/getTimeTable`);
    const res_bus = await fetch(`${origin}/api/getBus`);
    return {
      props: {
        stationData: await res_station.json(),
        timeTableData: await res_time_table.json(),
        busData: await res_bus.json(),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: 'データ取得で問題が発生しました。',
      },
    };
  }
};

export default Home;
