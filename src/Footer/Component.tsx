import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType
  const siteSettingsData: any = await getCachedGlobal('site-settings' as any, 1)()

  const columns = footerData?.columns || []
  const bottomLinks = footerData?.bottomLinks || []
  const copyright = footerData?.copyright || `© ${new Date().getFullYear()} ZUZY`

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-12">
        {/* Columns grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link className="flex items-center" href="/">
              <Logo logoObject={siteSettingsData?.logo} siteName={siteSettingsData?.siteName} />
            </Link>
          </div>

          {/* CMS columns */}
          {columns.map((column: any, i: number) => (
            <div key={i}>
              <h3 className="text-sm font-semibold text-white mb-4">{column.label}</h3>
              <ul className="flex flex-col gap-2">
                {(column.navItems || []).map((item: any, li: number) => (
                  <li key={li}>
                    <CMSLink
                      {...item.link}
                      appearance="link"
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">{copyright}</p>

          <div className="flex items-center gap-4">
            {bottomLinks.map((item: any, i: number) => (
              <CMSLink
                key={i}
                {...item.link}
                appearance="link"
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              />
            ))}
            <ThemeSelector />
          </div>
        </div>
      </div>
    </footer>
  )
}
