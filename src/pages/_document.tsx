import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

type Props = {}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html>
        <Head />
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/icon.png' />
        <meta name="theme-color" content='#fff' />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document