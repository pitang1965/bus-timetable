import '../../styles/globals.css';
import { GA_TRACKING_ID, pageview } from '../lib/gtag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  useEffect(() => {
    if (!GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      pageview(url);
    };
    
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
