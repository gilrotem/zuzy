import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FeaturesBlock: Block = {
  slug: 'featuresBlock',
  interfaceName: 'FeaturesBlock',
  labels: {
    singular: { he: 'תכונות', en: 'Features' },
    plural: { he: 'בלוקי תכונות', en: 'Features Blocks' },
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
      name: 'features',
      type: 'array',
      label: { he: 'תכונות', en: 'Features' },
      minRows: 1,
      maxRows: 12,
      admin: {
        initCollapsed: true,
      },
      fields: [
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
      name: 'columns',
      type: 'select',
      label: { he: 'עמודות', en: 'Columns' },
      defaultValue: '3',
      options: [
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
      ],
    },
    {
      name: 'style',
      type: 'select',
      label: { he: 'סגנון', en: 'Style' },
      defaultValue: 'cards',
      options: [
        { label: { he: 'כרטיסים', en: 'Cards' }, value: 'cards' },
        { label: { he: 'רשימה', en: 'List' }, value: 'list' },
        { label: { he: 'רשת', en: 'Grid' }, value: 'grid' },
      ],
    },
  ],
}
