// pages/_app.js
import { ChakraProvider, Flex } from '@chakra-ui/react'
import { AppProps } from 'next/app';
import { JetBrains_Mono } from 'next/font/google'
export const jetbrains = JetBrains_Mono({ subsets: ['latin'] })


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
        <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp;