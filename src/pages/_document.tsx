import { GA_TRACKING_ID } from 'src/lib/gtag';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

type Props = {};

const gtag = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html lang='ja'>
        <Head>
          {GA_TRACKING_ID && process.env.NODE_ENV === 'production' && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                `,
                }}
              />
            </>
          )}
        </Head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <meta name='application-name' content='バス時刻表' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='バス時刻表' />
        <meta name='description' content='武蔵村山製作所勤務者のためのバス時刻表' />
        <meta name='theme-color' content='#fff' />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
