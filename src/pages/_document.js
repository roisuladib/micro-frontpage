import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head />
        <link rel="shortcut icon" href={`${process.env.NEXT_PUBLIC_BASE_URL}/images/logo.png`} type="image/x-icon" />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document;