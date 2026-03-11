import type { Block } from 'payload'

export const AppGridBlock: Block = {
  slug: 'appGridBlock',
  interfaceName: 'AppGridBlock',
  labels: {
    singular: { he: 'גריד אפליקציות', en: 'App Grid' },
    plural: { he: 'גרידי אפליקציות', en: 'App Grids' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
    },
    {
      name: 'apps',
      type: 'array',
      label: { he: 'אפליקציות', en: 'Apps' },
      minRows: 1,
      maxRows: 24,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: { he: 'שם האפליקציה', en: 'App Name' },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: { he: 'אייקון', en: 'Icon' },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: { he: 'קישור', en: 'Link' },
          admin: {
            description: {
              he: 'כתובת URL של האפליקציה',
              en: 'App URL',
            },
          },
        },
      ],
    },
  ],
}
