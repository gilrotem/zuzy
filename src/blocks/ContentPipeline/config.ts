import type { Block } from 'payload'

export const ContentPipeline: Block = {
  slug: 'contentPipeline',
  interfaceName: 'ContentPipelineBlock',
  labels: {
    singular: { he: 'אינפוגרפיקת Pipeline', en: 'Content Pipeline' },
    plural: { he: 'אינפוגרפיקות Pipeline', en: 'Content Pipelines' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
      defaultValue: 'Content Pipeline',
    },
  ],
}
