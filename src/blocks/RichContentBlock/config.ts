import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const RichContentBlock: Block = {
  slug: 'richContentBlock',
  interfaceName: 'RichContentBlock',
  labels: {
    singular: { he: 'תוכן עשיר', en: 'Rich Content' },
    plural: { he: 'בלוקי תוכן עשיר', en: 'Rich Content Blocks' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: { he: 'תוכן', en: 'Content' },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: { he: 'תמונה', en: 'Image' },
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: { he: 'מיקום תמונה', en: 'Image Position' },
      defaultValue: 'right',
      options: [
        { label: { he: 'ימין', en: 'Right' }, value: 'right' },
        { label: { he: 'שמאל', en: 'Left' }, value: 'left' },
        { label: { he: 'למעלה', en: 'Top' }, value: 'top' },
        { label: { he: 'למטה', en: 'Bottom' }, value: 'bottom' },
      ],
      admin: {
        condition: (_data, siblingData) => Boolean(siblingData?.image),
      },
    },
  ],
}
