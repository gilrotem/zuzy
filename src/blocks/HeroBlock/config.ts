import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '../../fields/linkGroup'

export const HeroBlock: Block = {
  slug: 'heroBlock',
  interfaceName: 'HeroBlock',
  labels: {
    singular: { he: 'גיבור', en: 'Hero' },
    plural: { he: 'גיבורים', en: 'Heroes' },
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
      name: 'subheading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת משנה', en: 'Subheading' },
    },
    {
      name: 'richText',
      type: 'richText',
      localized: true,
      label: { he: 'תוכן', en: 'Content' },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: { he: 'תמונת רקע', en: 'Background Image' },
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 3,
        label: { he: 'כפתורים', en: 'Buttons' },
      },
    }),
    {
      name: 'style',
      type: 'select',
      label: { he: 'סגנון', en: 'Style' },
      defaultValue: 'default',
      options: [
        { label: { he: 'ברירת מחדל', en: 'Default' }, value: 'default' },
        { label: { he: 'מרכזי', en: 'Centered' }, value: 'centered' },
        { label: { he: 'עם תמונה', en: 'With Image' }, value: 'withImage' },
        { label: { he: 'מלא', en: 'Full Screen' }, value: 'fullScreen' },
      ],
    },
  ],
}
