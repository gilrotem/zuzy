import type { GlobalConfig } from 'payload'

import { revalidateSEOSettings } from './hooks/revalidateSEOSettings'

export const SEOSettings: GlobalConfig = {
  slug: 'seo-settings',
  label: 'SEO Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Organization',
          description: 'Organization details for JSON-LD structured data (Schema.org)',
          fields: [
            {
              name: 'orgName',
              label: 'Organization Name',
              type: 'text',
              defaultValue: 'ZUZY',
              admin: {
                description: 'Used in Organization schema and as default site name',
              },
            },
            {
              name: 'orgLegalName',
              label: 'Legal / Full Name',
              type: 'text',
              admin: {
                description:
                  'Full registered name exactly as on Google Business Profile (used as legalName + alternateName). Leave empty to use the canonical baseline.',
              },
            },
            {
              name: 'orgDescription',
              label: 'Organization Description',
              type: 'textarea',
              defaultValue: 'ZUZY — פלטפורמת הפיתוח הישראלית',
              admin: {
                description: 'Default meta description when none is set per-page',
              },
            },
            {
              name: 'orgLogo',
              label: 'Organization Logo',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                description: 'Logo used in Organization JSON-LD schema',
              },
            },
            {
              name: 'orgEmail',
              label: 'Contact Email',
              type: 'email',
            },
            {
              name: 'orgPhone',
              label: 'Contact Phone',
              type: 'text',
              admin: {
                description: 'International format, e.g. +972-3-1234567',
              },
            },
            {
              name: 'orgAddress',
              label: 'Address',
              type: 'group',
              fields: [
                {
                  name: 'streetAddress',
                  label: 'Street Address',
                  type: 'text',
                },
                {
                  name: 'city',
                  label: 'City',
                  type: 'text',
                },
                {
                  name: 'region',
                  label: 'Region / State',
                  type: 'text',
                },
                {
                  name: 'postalCode',
                  label: 'Postal Code',
                  type: 'text',
                },
                {
                  name: 'country',
                  label: 'Country',
                  type: 'text',
                  defaultValue: 'IL',
                  admin: {
                    description: 'ISO 3166-1 alpha-2 code (e.g. IL, US)',
                  },
                },
              ],
            },
            {
              name: 'orgGeo',
              label: 'Geo Coordinates',
              type: 'group',
              admin: {
                description:
                  'LocalBusiness map coordinates. Leave empty to use the canonical baseline.',
              },
              fields: [
                {
                  name: 'latitude',
                  label: 'Latitude',
                  type: 'number',
                },
                {
                  name: 'longitude',
                  label: 'Longitude',
                  type: 'number',
                },
              ],
            },
            {
              name: 'orgOpeningHours',
              label: 'Opening Hours',
              type: 'array',
              admin: {
                description:
                  'Opening hours for the LocalBusiness schema. Leave empty to use the canonical baseline (Sun–Thu 09:00–18:00, Fri 09:00–14:00).',
              },
              fields: [
                {
                  name: 'days',
                  label: 'Days',
                  type: 'select',
                  hasMany: true,
                  options: [
                    { label: 'Sunday', value: 'Sunday' },
                    { label: 'Monday', value: 'Monday' },
                    { label: 'Tuesday', value: 'Tuesday' },
                    { label: 'Wednesday', value: 'Wednesday' },
                    { label: 'Thursday', value: 'Thursday' },
                    { label: 'Friday', value: 'Friday' },
                    { label: 'Saturday', value: 'Saturday' },
                  ],
                },
                {
                  name: 'opens',
                  label: 'Opens (HH:MM)',
                  type: 'text',
                  admin: { description: '24h format, e.g. 09:00' },
                },
                {
                  name: 'closes',
                  label: 'Closes (HH:MM)',
                  type: 'text',
                  admin: { description: '24h format, e.g. 18:00' },
                },
              ],
            },
            {
              name: 'googleBusinessUrl',
              label: 'Google Business / Maps URL',
              type: 'text',
              admin: {
                description:
                  'Add ONLY once the Google Business Profile is verified. Added to sameAs + used as hasMap on the LocalBusiness node.',
              },
            },
          ],
        },
        {
          label: 'Social Profiles',
          description: 'Social media URLs — used in Organization JSON-LD sameAs',
          fields: [
            {
              name: 'socialProfiles',
              label: 'Social Profiles',
              type: 'array',
              labels: {
                singular: 'Profile',
                plural: 'Profiles',
              },
              fields: [
                {
                  name: 'platform',
                  label: 'Platform',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Twitter / X', value: 'twitter' },
                    { label: 'LinkedIn', value: 'linkedin' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'GitHub', value: 'github' },
                    { label: 'TikTok', value: 'tiktok' },
                  ],
                },
                {
                  name: 'url',
                  label: 'URL',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Defaults',
          description: 'Default SEO values inherited by all pages',
          fields: [
            {
              name: 'titleTemplate',
              label: 'Title Template',
              type: 'text',
              defaultValue: '%s | ZUZY',
              admin: {
                description: '%s is replaced with the page title. e.g. "My Page | ZUZY"',
              },
            },
            {
              name: 'titleSeparator',
              label: 'Title Separator',
              type: 'text',
              defaultValue: '|',
              admin: {
                description: 'Character between page title and site name',
              },
            },
            {
              name: 'defaultOgImage',
              label: 'Default OG Image',
              type: 'relationship',
              relationTo: 'media',
              admin: {
                description: 'Default Open Graph image when none is set per-page',
              },
            },
            {
              name: 'twitterHandle',
              label: 'Twitter / X Handle',
              type: 'text',
              defaultValue: '@zuzy',
              admin: {
                description: 'e.g. @zuzy — used in Twitter card tags',
              },
            },
          ],
        },
        {
          label: 'Robots & Sitemap',
          description: 'Control robots.txt and sitemap generation',
          fields: [
            {
              name: 'additionalDisallowPaths',
              label: 'Additional Disallow Paths',
              type: 'array',
              admin: {
                description: 'Extra paths to block in robots.txt (beyond /admin, /api, etc.)',
              },
              fields: [
                {
                  name: 'path',
                  label: 'Path',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'e.g. /private, /internal',
                  },
                },
              ],
            },
            {
              name: 'additionalBlockedBots',
              label: 'Additional Blocked Bots',
              type: 'array',
              admin: {
                description: 'Extra user agents to block entirely (beyond default malicious bots)',
              },
              fields: [
                {
                  name: 'userAgent',
                  label: 'User Agent',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'sitemapExcludePaths',
              label: 'Sitemap Excluded Paths',
              type: 'array',
              admin: {
                description: 'URL paths to exclude from sitemap.xml',
              },
              fields: [
                {
                  name: 'path',
                  label: 'Path',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Verification',
          description: 'Search engine verification codes',
          fields: [
            {
              name: 'googleVerification',
              label: 'Google Site Verification',
              type: 'text',
              admin: {
                description: 'Content value from Google Search Console meta tag',
              },
            },
            {
              name: 'bingVerification',
              label: 'Bing Site Verification',
              type: 'text',
              admin: {
                description: 'Content value from Bing Webmaster Tools meta tag',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSEOSettings],
  },
}
