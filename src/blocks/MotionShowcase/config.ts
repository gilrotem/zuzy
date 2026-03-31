import type { Block } from 'payload'

export const MotionShowcase: Block = {
  slug: 'motionShowcase',
  interfaceName: 'MotionShowcaseBlock',
  labels: {
    singular: { he: 'תצוגת אנימציות', en: 'Motion Showcase' },
    plural: { he: 'תצוגות אנימציות', en: 'Motion Showcases' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
      defaultValue: 'Motion Assets',
    },
  ],
}
