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
      label: 'Footer Columns',
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
        },
        {
          name: 'navItems',
          type: 'array',
          label: 'Links',
          maxRows: 10,
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
      label: 'Bottom Bar Links',
      maxRows: 8,
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
        description: 'Copyright text for footer bottom bar',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
