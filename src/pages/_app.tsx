import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.scss';

/**
 *
 *
 * Chakra UI
 */
import { ChakraProvider } from '@chakra-ui/react';

/**
 *
 *
 * Chakra theme
 */
import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
  colors: {
    brand: {
      100: '#9B5DE5',
      200: '#F15BB5',
      300: '#FEE440',
      400: '#00BBF9',
      500: '#00F5D4',
      600: '#1a202c',
    },
    base: {
      100: '#e4c2b2',
      200: '#dbb4a3',
      300: '#c79d8b',
      400: '#b38977',
    },
  },
});

/**
 *
 * React Query
 */
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Hydrate } from 'react-query/hydration';
import { useState } from 'react';
import { Header } from '../components/Header';
import { AnimatePresence } from 'framer-motion';
import { Docker } from '../components/Docker';
import { RecruitersContextProvider } from '../contexts/RecruitersContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <RecruitersContextProvider>
            <Header isVisible={router.asPath !== '/'} />
            <Docker />

            <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
              <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>

            <ReactQueryDevtools />
          </RecruitersContextProvider>
        </Hydrate>
      </QueryClientProvider>
    </ChakraProvider>
  );
}
export default MyApp;
