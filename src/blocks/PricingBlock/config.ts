import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const PricingBlock: Block = {
  slug: 'pricingBlock',
  interfaceName: 'PricingBlock',
  labels: {
    singular: { he: 'תמחור', en: 'Pricing' },
    plural: { he: 'בלוקי תמחור', en: 'Pricing Blocks' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת משנה', en: 'Subheading' },
    },
    {
      name: 'plans',
      type: 'array',
      label: { he: 'מסלולים', en: 'Plans' },
      minRows: 1,
      maxRows: 6,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
          label: { he: 'שם מסלול', en: 'Plan Name' },
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          label: { he: 'מחיר', en: 'Price' },
          admin: {
            description: { he: 'לדוגמה: ₪599/חודש', en: 'e.g. $99/month' },
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          label: { he: 'תיאור', en: 'Description' },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
        {
          name: 'features',
          type: 'array',
          label: { he: 'תכונות', en: 'Features' },
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
              localized: true,
              label: { he: 'תכונה', en: 'Feature' },
            },
            {
              name: 'included',
              type: 'checkbox',
              defaultValue: true,
              label: { he: 'כלול', en: 'Included' },
            },
          ],
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
          label: { he: 'מודגש', en: 'Highlighted' },
          admin: {
            description: { he: 'הדגש מסלול זה כמומלץ', en: 'Highlight this plan as recommended' },
          },
        },
        linkGroup({
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 1,
            label: { he: 'כפתור', en: 'Button' },
          },
        }),
      ],
    },
  ],
}
