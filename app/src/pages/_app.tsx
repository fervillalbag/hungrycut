import React from 'react'
import { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'

import client from '@/config/apollo'
import { UserContextProvider } from '@/context/UserContext'

import '../styles/globals.css'
import '../styles/index.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </ApolloProvider>
  )
}

export default MyApp
