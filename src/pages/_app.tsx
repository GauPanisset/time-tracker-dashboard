import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import Layout from '@/components/Layout'
import '@/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher: (resource: string) =>
          fetch(resource).then((res) => res.json()),
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default App
