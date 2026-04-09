import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'style',
          type: 'select',
          defaultValue: 'link',
          options: [
            { label: 'Link', value: 'link' },
            { label: 'Dropdown', value: 'dropdown' },
          ],
          required: true,
        },
        link({
          appearances: false,
        }),
        {
          name: 'children',
          type: 'array',
          label: 'Dropdown Items',
          maxRows: 12,
          admin: {
            condition: (_, siblingData) => siblingData?.style === 'dropdown',
            initCollapsed: true,
          },
          fields: [
            link({
              appearances: false,
            }),
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Optional description shown below the link',
              },
            },
          ],
        },
      ],
      maxRows: 10,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
