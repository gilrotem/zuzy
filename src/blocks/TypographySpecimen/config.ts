import type { Block } from 'payload'

export const TypographySpecimen: Block = {
  slug: 'typographySpecimen',
  interfaceName: 'TypographySpecimenBlock',
  labels: {
    singular: { he: 'דגימת טיפוגרפיה', en: 'Typography Specimen' },
    plural: { he: 'דגימות טיפוגרפיה', en: 'Typography Specimens' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
      defaultValue: 'Typography',
    },
  ],
}
