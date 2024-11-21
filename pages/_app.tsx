import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';
import createEmotionCache from 'lib/createEmotionCache'
import theme from 'lib/theme'
import {
    CacheProvider,
    EmotionCache,
    ThemeProvider as EmotionThemeProvider,
} from '@emotion/react'

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',
});

interface CustomAppProps extends AppProps {
    emotionCache?: EmotionCache
}
const clientSideEmotionCache = createEmotionCache()

export default function App({
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps,
}: CustomAppProps) {
    return (
        <CacheProvider value={emotionCache}>
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
    );
}
