import type { Block } from 'payload'

export const ColorPalette: Block = {
  slug: 'colorPalette',
  interfaceName: 'ColorPaletteBlock',
  labels: {
    singular: { he: 'פלטת צבעים', en: 'Color Palette' },
    plural: { he: 'פלטות צבעים', en: 'Color Palettes' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
      defaultValue: 'Color Palette',
    },
  ],
}
