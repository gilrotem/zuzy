import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const CTABlock: Block = {
  slug: 'ctaBlock',
  interfaceName: 'CTABlock',
  labels: {
    singular: { he: 'קריאה לפעולה', en: 'CTA' },
    plural: { he: 'קריאות לפעולה', en: 'CTAs' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
    },
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      label: { he: 'תוכן', en: 'Content' },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 3,
        label: { he: 'כפתורים', en: 'Buttons' },
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: { he: 'תמונת רקע', en: 'Background Image' },
    },
    {
      name: 'style',
      type: 'select',
      label: { he: 'סגנון', en: 'Style' },
      defaultValue: 'default',
      options: [
        { label: { he: 'ברירת מחדל', en: 'Default' }, value: 'default' },
        { label: { he: 'מודגש', en: 'Bold' }, value: 'bold' },
        { label: { he: 'מינימלי', en: 'Minimal' }, value: 'minimal' },
        { label: { he: 'עם רקע', en: 'With Background' }, value: 'withBackground' },
      ],
    },
  ],
}
