import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const siteSettingsData: any = await getCachedGlobal('site-settings' as any, 1)()

  return <HeaderClient data={headerData} siteSettings={siteSettingsData} />
}
