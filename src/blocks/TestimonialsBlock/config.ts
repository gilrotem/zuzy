import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: { he: 'המלצות', en: 'Testimonials' },
    plural: { he: 'בלוקי המלצות', en: 'Testimonials Blocks' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
    },
    {
      name: 'testimonials',
      type: 'array',
      label: { he: 'המלצות', en: 'Testimonials' },
      minRows: 1,
      maxRows: 12,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          localized: true,
          label: { he: 'ציטוט', en: 'Quote' },
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
          localized: true,
          label: { he: 'שם', en: 'Author Name' },
        },
        {
          name: 'authorTitle',
          type: 'text',
          localized: true,
          label: { he: 'תפקיד', en: 'Author Title' },
        },
        {
          name: 'authorCompany',
          type: 'text',
          localized: true,
          label: { he: 'חברה', en: 'Company' },
        },
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
          label: { he: 'תמונה', en: 'Author Image' },
        },
        {
          name: 'rating',
          type: 'number',
          label: { he: 'דירוג', en: 'Rating' },
          min: 1,
          max: 5,
        },
      ],
    },
    {
      name: 'style',
      type: 'select',
      label: { he: 'סגנון', en: 'Style' },
      defaultValue: 'cards',
      options: [
        { label: { he: 'כרטיסים', en: 'Cards' }, value: 'cards' },
        { label: { he: 'קרוסלה', en: 'Carousel' }, value: 'carousel' },
        { label: { he: 'רשת', en: 'Grid' }, value: 'grid' },
      ],
    },
  ],
}
