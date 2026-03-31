import type { Block } from 'payload'

export const LogoGrid: Block = {
  slug: 'logoGrid',
  interfaceName: 'LogoGridBlock',
  labels: {
    singular: { he: 'גריד לוגואים', en: 'Logo Grid' },
    plural: { he: 'גרידי לוגואים', en: 'Logo Grids' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
      defaultValue: 'Logo Kit',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: { he: 'תיאור', en: 'Description' },
    },
  ],
}
