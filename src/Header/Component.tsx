import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

export async function Header() {
  const headerData: any = await getCachedGlobal('header', 2)()
  const siteSettingsData: any = await getCachedGlobal('site-settings' as any, 1)()

  return <HeaderClient data={headerData} siteSettings={siteSettingsData} />
}
