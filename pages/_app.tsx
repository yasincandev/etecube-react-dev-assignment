import '@/styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import { ConfigProvider } from 'antd'
import { theme } from '@/theme'
import Layout from '@/components/Layout/Layout'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
  title: string
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  return (
    <>
      <Head>
        <link
          rel="icon"
          href="/favicon.png"
        />
      </Head>
      <SessionProvider session={session}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: theme.colors.primary,
              colorLink: theme.colors.primary,
              colorLinkHover: theme.colors.linkHoverColor,
            },
          }}
        >
          <Layout title={Component.title}>
            <Component {...pageProps} />
          </Layout>
        </ConfigProvider>
      </SessionProvider>
    </>
  )
}
