import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ProcessStepsBlock: Block = {
  slug: 'processStepsBlock',
  interfaceName: 'ProcessStepsBlock',
  labels: {
    singular: { he: 'שלבי תהליך', en: 'Process Steps' },
    plural: { he: 'בלוקי שלבי תהליך', en: 'Process Steps Blocks' },
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
      name: 'steps',
      type: 'array',
      label: { he: 'שלבים', en: 'Steps' },
      minRows: 2,
      maxRows: 10,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'stepNumber',
          type: 'number',
          label: { he: 'מספר שלב', en: 'Step Number' },
          admin: {
            description: { he: 'ימולא אוטומטית אם ריק', en: 'Auto-filled if empty' },
          },
        },
        {
          name: 'icon',
          type: 'text',
          label: { he: 'אייקון', en: 'Icon' },
          admin: {
            description: { he: 'אימוג׳י או שם אייקון', en: 'Emoji or icon name' },
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: { he: 'כותרת', en: 'Title' },
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
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: { he: 'תמונה', en: 'Image' },
        },
      ],
    },
    {
      name: 'style',
      type: 'select',
      label: { he: 'סגנון', en: 'Style' },
      defaultValue: 'timeline',
      options: [
        { label: { he: 'ציר זמן', en: 'Timeline' }, value: 'timeline' },
        { label: { he: 'מספרים', en: 'Numbered' }, value: 'numbered' },
        { label: { he: 'כרטיסים', en: 'Cards' }, value: 'cards' },
      ],
    },
  ],
}
