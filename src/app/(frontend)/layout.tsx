import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import localFont from 'next/font/local'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { getCachedGlobal } from '@/utilities/getGlobals'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const zuzyFont = localFont({
  src: [
    { path: '../../fonts/subset-FbCoherentiSans-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../fonts/FbCoherentiSans-Regular.woff', weight: '400', style: 'normal' },
  ],
  variable: '--font-zuzy',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  const siteSettingsData: any = await getCachedGlobal('site-settings' as any, 0)()

  const defaultTheme = siteSettingsData?.defaultTheme || 'light'
  const primaryColor = siteSettingsData?.primaryColor || '#6750A4'
  const accentColor = siteSettingsData?.accentColor || '#4CA3C7'

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable, zuzyFont.variable)}
      lang="he"
      dir="rtl"
      suppressHydrationWarning
    >
      <head>
        <InitTheme
          serverDefaultTheme={defaultTheme}
          primaryColor={primaryColor}
          accentColor={accentColor}
        />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@zuzy',
  },
}
