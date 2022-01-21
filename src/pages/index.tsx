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

const Home: NextPage<{
  stationData: FieldSet[] | undefined;
  timeTableData: FieldSet[] | undefined;
  busData: FieldSet[] | undefined;
}> = ({ stationData, timeTableData, busData }) => {
  const [selectedStationFrom, setSelectedStationFrom] = useState<
    FieldSet | undefined
  >();
  const [selectedStationTo, setSelectedStationTo] = useState<
    FieldSet | undefined
  >();

  // localStorageからデータを呼んで出発地と行き先を設定
  useEffect(() => {
    const fromJson = localStorage.getItem('stationFrom');
    if (fromJson === null) {
      setSelectedStationFrom(stationData && stationData[0]);
    } else {
      const fromString = JSON.parse(fromJson);
      setSelectedStationFrom(
        stationData &&
          stationData.find(function (record) {
            return (record.fields as any).Name === fromString;
          })
      );
    }

    const toJson = localStorage.getItem('stationTo');
    if (toJson === null) {
      setSelectedStationTo(stationData && stationData[1]);
    } else {
      const toString = JSON.parse(toJson);
      setSelectedStationTo(
        stationData &&
          stationData.find(function (record) {
            return (record.fields as any).Name === toString;
          })
      );
    }
  }, []);

  const transposeStations = () => {
    const work = selectedStationFrom;
    setSelectedStationFrom(selectedStationTo);
    setSelectedStationTo(work);
  };

  useEffect(() => {
    let json;

    // 出発地をローカルストレージに保存
    if (selectedStationFrom) {
      json = JSON.stringify((selectedStationFrom?.fields as any).Name);
      localStorage.setItem('stationFrom', json);
    }

    // 行き先をローカルストレージに保存
    if (selectedStationTo) {
      json = JSON.stringify((selectedStationTo?.fields as any).Name);
      localStorage.setItem('stationTo', json);
    }
  }, [selectedStationFrom, selectedStationTo]);

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
        <main className='min-h-screen flex-column p-2'>
          <h1 className='flex text-4xl text-blue-600/80 font-bold justify-center mb-4'>
            時刻表
          </h1>
          <StationListBox
            label='出発地：'
            stations={stationData}
            selected={selectedStationFrom}
            setSelected={setSelectedStationFrom}
          />
          <div className='flex justify-center'>
            <button
              aria-label='出発時と行き先を入れ替え'
              onClick={transposeStations}
            >
              <SwitchHorizontalIcon className='rounded bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 mt-6 mb-0' />
            </button>
          </div>
          <StationListBox
            label='行き先：'
            stations={stationData}
            selected={selectedStationTo}
            setSelected={setSelectedStationTo}
          />
          <TimeTable
            busTable={busData}
            timeTableTable={timeTableData}
            from={selectedStationFrom}
            to={selectedStationTo}
          />
        </main>
      </Layout>
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
