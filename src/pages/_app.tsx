import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

import Layout from '@/components/Layout'
import '@/styles/globals.css'

import { ServerError } from '@/services/error'

const fetcher = async (resource: string) => {
  const response = await fetch(resource)
  if (!response.ok) {
    const message = await response.text()
    throw new ServerError(message, response.status)
  }
  return response.json()
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default App
