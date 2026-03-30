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
              defaultValue: '#7354C4',
              admin: {
                description: 'Hex color code (e.g., #7354C4)',
              },
            },
            {
              name: 'accentColor',
              label: 'Accent Color',
              type: 'text',
              defaultValue: '#06B6D4',
              admin: {
                description: 'Hex color code (e.g., #06B6D4)',
              },
            },
          ],
        },
        {
          label: 'Custom Code',
          fields: [
            {
              name: 'customCSS',
              label: 'Custom CSS',
              type: 'textarea',
              admin: {
                description: 'CSS code to inject into <head>',
                rows: 8,
              },
            },
            {
              name: 'customJS',
              label: 'Custom JavaScript',
              type: 'textarea',
              admin: {
                description: 'JavaScript code to inject before </body>',
                rows: 8,
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
