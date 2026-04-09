import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import type { Footer as FooterType } from '@/payload-types'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as FooterType
  const siteSettingsData: any = await getCachedGlobal('site-settings' as any, 1)()

  const columns = footerData?.columns || []
  const bottomLinks = footerData?.bottomLinks || []
  const copyright = footerData?.copyright || `© ${new Date().getFullYear()} ZUZY`

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      {/* Main footer with columns */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link className="inline-flex items-center mb-4" href="/">
              <Logo logoObject={siteSettingsData?.logo} siteName={siteSettingsData?.siteName} />
            </Link>
            <p className="text-sm text-white/60 max-w-xs">
              פלטפורמת SEO, שיווק דיגיטלי וניהול לקוחות — הכל במקום אחד.
            </p>
          </div>

          {/* Dynamic columns */}
          {columns.map((column) => (
            <div key={column.id || column.label}>
              <h3 className="text-sm font-semibold text-white/90 mb-4">{column.label}</h3>
              <ul className="flex flex-col gap-2.5">
                {column.navItems?.map((item) => (
                  <li key={item.id || item.link.label}>
                    <CMSLink
                      {...item.link}
                      appearance="link"
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-white/40">{copyright}</span>
          <div className="flex items-center gap-4">
            {bottomLinks.map((item) => (
              <CMSLink
                key={item.id || item.link.label}
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
