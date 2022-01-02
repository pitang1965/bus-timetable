/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import type { FieldSet } from 'airtable';
import { StationListBox } from '../components/StationListBox';
import { TimeTable } from '../components/TimeTable';
import Navbar from '../components/Navbar';

const Home: NextPage = ({ stationRecords }) => {
  const [stations, setStations] = useState<FieldSet[]>([]);
  const [selectedStationFrom, setSelectedStationFrom] = useState<
    FieldSet | undefined
  >();
  const [selectedStationTo, setSelectedStationTo] = useState<
    FieldSet | undefined
  >();

  useEffect(() => {
    setStations(stationRecords);
    console.log(stationRecords[0]);
    setSelectedStationFrom(stationRecords[0]);
    setSelectedStationTo(stationRecords[0]);
  });

  return (
    <div className={styles.container}>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.svg' />
      </Head>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>バス時刻表</h1>
        <StationListBox
          label='出発地：'
          stations={stations}
          selected={selectedStationFrom}
          setSelected={setSelectedStationFrom}
        />
        <StationListBox
          label='行き先：'
          stations={stations}
          selected={selectedStationTo}
          setSelected={setSelectedStationTo}
        />
        <TimeTable from={selectedStationFrom} to={selectedStationTo} />
      </main>
      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/getStation');
    return {
      props: {
        stationRecords: await res.json(),
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: 'バス停取得で問題が発生しました。',
      },
    };
  }
};

export default Home;
