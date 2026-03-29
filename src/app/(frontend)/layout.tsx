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
import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
  JsonLd,
} from '@/lib/json-ld'

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
  let siteSettingsData: any = {}
  let seoSettingsData: any = {}
  try {
    siteSettingsData = (await getCachedGlobal('site-settings' as any, 0)()) || {}
  } catch {
    /* global may not exist yet */
  }
  try {
    seoSettingsData = (await getCachedGlobal('seo-settings' as any, 1)()) || {}
  } catch {
    /* global may not exist yet */
  }

  const defaultTheme = siteSettingsData?.defaultTheme || 'light'
  const primaryColor = siteSettingsData?.primaryColor || '#6750A4'
  const accentColor = siteSettingsData?.accentColor || '#4CA3C7'
  const customCSS = siteSettingsData?.customCSS
  const customJS = siteSettingsData?.customJS

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
        {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        {seoSettingsData?.googleVerification && (
          <meta name="google-site-verification" content={seoSettingsData.googleVerification} />
        )}
        {seoSettingsData?.bingVerification && (
          <meta name="msvalidate.01" content={seoSettingsData.bingVerification} />
        )}
        <JsonLd data={generateOrganizationJsonLd(seoSettingsData || {})} />
        <JsonLd data={generateWebSiteJsonLd(seoSettingsData || {})} />
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
        {customJS && (
          <script dangerouslySetInnerHTML={{ __html: customJS }} />
        )}
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
