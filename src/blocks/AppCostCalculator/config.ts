import type { Block } from 'payload'

export const AppCostCalculator: Block = {
  slug: 'appCostCalculator',
  interfaceName: 'AppCostCalculatorBlock',
  labels: {
    singular: { he: 'מחשבון עלות פיתוח', en: 'App Cost Calculator' },
    plural: { he: 'מחשבוני עלות פיתוח', en: 'App Cost Calculators' },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'כמה יעלה לפתח את האפליקציה שלך?',
      localized: true,
      label: { he: 'כותרת', en: 'Title' },
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'קבל הערכת עלות מיידית על בסיס הדרישות שלך',
      localized: true,
      label: { he: 'כותרת משנה', en: 'Subtitle' },
    },
    {
      name: 'ctaText',
      type: 'text',
      defaultValue: 'רוצה הצעת מחיר מדויקת? דבר איתנו',
      localized: true,
      label: { he: 'טקסט CTA', en: 'CTA Text' },
    },
    {
      name: 'ctaLink',
      type: 'text',
      defaultValue: '/contact',
      label: { he: 'קישור CTA', en: 'CTA Link' },
    },
  ],
}
