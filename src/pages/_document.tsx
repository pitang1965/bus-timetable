import { GA_TRACKING_ID } from '../lib/gtag';
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
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
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
