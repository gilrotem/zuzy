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
          required: true,
          defaultValue: 'dropdown',
          options: [
            { label: 'Dropdown (mega menu)', value: 'dropdown' },
            { label: 'Direct link', value: 'link' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'The visible label in the navigation bar',
          },
        },
        link({
          appearances: false,
          overrides: {
            name: 'directLink',
            admin: {
              hideGutter: true,
              condition: (_, siblingData) => siblingData?.style === 'link',
            },
          },
        }),
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData?.style === 'dropdown',
            description: 'Optional description shown at the top of the dropdown panel',
          },
        },
        {
          name: 'children',
          type: 'array',
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
                description: 'Short description below the link label',
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
