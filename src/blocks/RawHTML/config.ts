import type { Block } from 'payload'

export const RawHTML: Block = {
  slug: 'rawHtml',
  interfaceName: 'RawHTMLBlock',
  labels: {
    singular: { he: 'HTML חופשי', en: 'Raw HTML' },
    plural: { he: 'בלוקי HTML חופשי', en: 'Raw HTML Blocks' },
  },
  fields: [
    {
      name: 'html',
      type: 'code',
      required: true,
      admin: {
        language: 'html',
        description: {
          he: 'הדבק כאן קוד HTML מלא. הקוד ירונדר ישירות בדף.',
          en: 'Paste full HTML code here. It will be rendered directly on the page.',
        },
      },
    },
  ],
}
