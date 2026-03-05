import type { GlobalConfig } from 'payload'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          fields: [
            {
              name: 'logo',
              label: 'Logo',
              type: 'relationship',
              relationTo: 'media',
            },
            {
              name: 'favicon',
              label: 'Favicon',
              type: 'relationship',
              relationTo: 'media',
            },
            {
              name: 'siteName',
              label: 'Site Name',
              type: 'text',
              defaultValue: 'ZUZY',
            },
          ],
        },
        {
          label: 'Theme & Colors',
          fields: [],
        },
        {
          label: 'Custom Code',
          fields: [],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
