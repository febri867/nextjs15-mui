import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import createEmotionCache from '@/lib/createEmotionCache'
import { Provider as ReduxProvider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react'
import { store } from '../src/core/redux/store';
import theme from '@/lib/theme'
import { useStore } from 'react-redux'
import {
    CacheProvider,
    EmotionCache,
    ThemeProvider as EmotionThemeProvider,
} from '@emotion/react'

interface CustomAppProps extends AppProps {
    emotionCache?: EmotionCache
}
const clientSideEmotionCache = createEmotionCache()

export default function App({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: CustomAppProps) {
    // const store = useStore()
    const isServer = typeof window === 'undefined'
    return (
        <ReduxProvider store={store}>
        {/*<PersistGate persistor={isServer ? store : store.__persistor} loading={null}>*/}
        <CacheProvider value={emotionCache} >
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width"/>
                <title>Workflow</title>
            </Head>
            <ThemeProvider theme={theme}>
                <EmotionThemeProvider theme={theme}>
                    <Component {...pageProps} />
                </EmotionThemeProvider>
            </ThemeProvider>
        </CacheProvider>
            {/*</PersistGate>*/}
        </ReduxProvider>
    );
}
