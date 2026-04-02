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
              defaultValue: '#7C3AED',
              admin: {
                description: 'Hex color code (e.g., #7C3AED)',
              },
            },
            {
              name: 'accentColor',
              label: 'Accent Color',
              type: 'text',
              defaultValue: '#0D9488',
              admin: {
                description: 'Hex color code (e.g., #0D9488)',
              },
            },
          ],
        },
        {
          label: 'Analytics & Tracking',
          fields: [
            {
              name: 'ga4MeasurementId',
              label: 'GA4 Measurement ID',
              type: 'text',
              admin: {
                description: 'Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)',
                placeholder: 'G-XXXXXXXXXX',
              },
            },
            {
              name: 'gtmContainerId',
              label: 'GTM Container ID',
              type: 'text',
              admin: {
                description: 'Google Tag Manager Container ID (e.g., GTM-XXXXXXX)',
                placeholder: 'GTM-XXXXXXX',
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
