import type { Block } from 'payload'

export const ComparisonTableBlock: Block = {
  slug: 'comparisonTableBlock',
  interfaceName: 'ComparisonTableBlock',
  labels: {
    singular: { he: 'טבלת השוואה', en: 'Comparison Table' },
    plural: { he: 'טבלאות השוואה', en: 'Comparison Tables' },
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
      name: 'columns',
      type: 'array',
      label: { he: 'עמודות', en: 'Columns' },
      minRows: 2,
      maxRows: 5,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: { he: 'שם עמודה', en: 'Column Label' },
        },
        {
          name: 'highlighted',
          type: 'checkbox',
          defaultValue: false,
          label: { he: 'מודגש', en: 'Highlighted' },
          admin: {
            description: { he: 'הדגש עמודה זו כמומלצת', en: 'Highlight this column as recommended' },
          },
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: { he: 'שורות', en: 'Rows' },
      minRows: 1,
      maxRows: 30,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
          localized: true,
          label: { he: 'תכונה', en: 'Feature' },
        },
        {
          name: 'isCategory',
          type: 'checkbox',
          defaultValue: false,
          label: { he: 'כותרת קטגוריה', en: 'Category Header' },
          admin: {
            description: { he: 'הצג כשורת כותרת', en: 'Display as a category header row' },
          },
        },
        {
          name: 'values',
          type: 'array',
          label: { he: 'ערכים', en: 'Values' },
          admin: {
            description: { he: 'ערך לכל עמודה בסדר', en: 'One value per column, in order' },
          },
          fields: [
            {
              name: 'value',
              type: 'text',
              localized: true,
              label: { he: 'ערך', en: 'Value' },
              admin: {
                description: { he: 'טקסט, ✓, ✗, או ריק', en: 'Text, ✓, ✗, or empty' },
              },
            },
          ],
        },
      ],
    },
  ],
}
