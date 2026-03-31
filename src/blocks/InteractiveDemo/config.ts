import type { Block } from 'payload'

export const InteractiveDemo: Block = {
  slug: 'interactiveDemo',
  interfaceName: 'InteractiveDemoBlock',
  labels: {
    singular: { he: 'דמו אינטראקטיבי', en: 'Interactive Demo' },
    plural: { he: 'דמואים אינטראקטיביים', en: 'Interactive Demos' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
      defaultValue: 'Interactive Demos',
    },
  ],
}
