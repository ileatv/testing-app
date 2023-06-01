import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {

  return (
    <Html lang="ru">
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        {/* <link rel="icon" sizes="32x32" href="/logo.ico" /> */}

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
