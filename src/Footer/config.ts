import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Column heading',
          },
        },
        {
          name: 'navItems',
          type: 'array',
          maxRows: 10,
          admin: {
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
          ],
        },
      ],
    },
    {
      name: 'bottomLinks',
      type: 'array',
      maxRows: 8,
      admin: {
        initCollapsed: true,
        description: 'Links shown in the bottom bar (legal, etc.)',
      },
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: 'copyright',
      type: 'text',
      localized: true,
      admin: {
        description: 'Copyright text shown at the bottom of the footer',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
