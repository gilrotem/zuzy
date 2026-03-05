import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  labels: {
    singular: { he: 'שאלות נפוצות', en: 'FAQ' },
    plural: { he: 'בלוקי שאלות נפוצות', en: 'FAQ Blocks' },
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
      name: 'items',
      type: 'array',
      label: { he: 'שאלות', en: 'Questions' },
      minRows: 1,
      maxRows: 20,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true,
          label: { he: 'שאלה', en: 'Question' },
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          localized: true,
          label: { he: 'תשובה', en: 'Answer' },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
        },
      ],
    },
    {
      name: 'style',
      type: 'select',
      label: { he: 'סגנון', en: 'Style' },
      defaultValue: 'accordion',
      options: [
        { label: { he: 'אקורדיון', en: 'Accordion' }, value: 'accordion' },
        { label: { he: 'רשימה', en: 'List' }, value: 'list' },
        { label: { he: 'שתי עמודות', en: 'Two Columns' }, value: 'twoColumns' },
      ],
    },
  ],
}
