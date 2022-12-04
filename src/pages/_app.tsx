import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { staticPath } from '~/utils/$path'
import { RecoilRoot } from 'recoil'
import ThemeWrapper from '~/components/ThemeWrapper'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <RecoilRoot>
        <Head>
          <link rel="icon" href={staticPath.favicon_png} />
        </Head>
        <ThemeWrapper>
          <Component {...pageProps} />
        </ThemeWrapper>
      </RecoilRoot>
    </>
  )
}

export default MyApp
