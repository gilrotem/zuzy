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
          fields: [
            {
              name: 'defaultTheme',
              label: 'Default Theme',
              type: 'select',
              defaultValue: 'light',
              options: [
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
                { label: 'Auto', value: 'auto' },
              ],
            },
            {
              name: 'primaryColor',
              label: 'Primary Color',
              type: 'text',
              defaultValue: '#6750A4',
              admin: {
                description: 'Hex color code (e.g., #6750A4)',
              },
            },
            {
              name: 'accentColor',
              label: 'Accent Color',
              type: 'text',
              defaultValue: '#4CA3C7',
              admin: {
                description: 'Hex color code (e.g., #4CA3C7)',
              },
            },
          ],
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
