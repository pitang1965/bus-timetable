/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { FieldSet } from 'airtable';
import Head from 'next/head';
import Image from 'next/image';
import { StationListBox } from '../components/StationListBox';
import { TimeTable } from '../components/TimeTable';
import Navbar from '../components/Navbar';
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

  return (
    <div className='container p-4'>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Navbar />
      <main className='min-h-screen flex-column px-1'>
        <h1 className='flex text-4xl text-blue-600/80 font-bold justify-center'>
          時刻表
        </h1>
        <StationListBox
          label='出発地：'
          stations={stationData}
          selected={selectedStationFrom}
          setSelected={setSelectedStationFrom}
        />
        <button onClick={transposeStations}>
          <SwitchHorizontalIcon className='rounded bg-blue-500 hover:bg-blue-600 text-white w-6 h-6 mt-4' />
        </button>
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
      <footer className='flex px-8 justify-center border-t border-solid border-gray-400 leading-8'>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const origin = process.env.SERVER_URL ?? 'http://localhost:3000';
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
