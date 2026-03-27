import type { Field } from 'payload'

/**
 * Advanced SEO fields added to the SEO tab of indexable collections.
 * These extend the basic @payloadcms/plugin-seo fields.
 */
export const seoAdvancedFields: Field[] = [
  {
    name: 'robotsOverride',
    label: 'Robots Override',
    type: 'select',
    hasMany: true,
    admin: {
      description: 'Override robots directives for this page. Leave empty to use defaults (index, follow).',
    },
    options: [
      { label: 'noindex', value: 'noindex' },
      { label: 'nofollow', value: 'nofollow' },
      { label: 'noarchive', value: 'noarchive' },
      { label: 'nosnippet', value: 'nosnippet' },
      { label: 'noimageindex', value: 'noimageindex' },
    ],
  },
  {
    name: 'canonicalOverride',
    label: 'Canonical URL Override',
    type: 'text',
    admin: {
      description: 'Override the auto-generated canonical URL. Use for duplicate content or cross-domain canonicals.',
    },
  },
  {
    name: 'jsonLdType',
    label: 'JSON-LD Schema Type',
    type: 'select',
    admin: {
      description: 'Override the auto-detected structured data type. Leave empty for automatic detection.',
    },
    options: [
      { label: 'WebPage (default)', value: 'WebPage' },
      { label: 'Article', value: 'Article' },
      { label: 'Product', value: 'Product' },
      { label: 'FAQPage', value: 'FAQPage' },
      { label: 'AboutPage', value: 'AboutPage' },
      { label: 'ContactPage', value: 'ContactPage' },
      { label: 'CollectionPage', value: 'CollectionPage' },
    ],
  },
  {
    name: 'breadcrumbLabel',
    label: 'Breadcrumb Label',
    type: 'text',
    admin: {
      description: 'Custom label shown in breadcrumbs. Falls back to page title.',
    },
  },
]
