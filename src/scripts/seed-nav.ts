/**
 * Navigation seeder — run with:
 *   pnpm seed:nav
 *
 * Seeds the Header global (mega menu with dropdowns) and
 * Footer global (columnar layout with bottom links).
 *
 * Safe to run multiple times — overwrites existing nav data.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const makeLink = (label: string, url: string) => ({
  link: {
    type: 'custom' as const,
    url,
    label,
    newTab: false,
  },
})

const makeChild = (label: string, url: string, description?: string) => ({
  ...makeLink(label, url),
  description: description || undefined,
})

const run = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('=== ZUZY Navigation Seeder ===')

  // --- Header ---
  const headerData = {
    navItems: [
      {
        style: 'dropdown' as const,
        ...makeLink('הפלטפורמה', '/platform'),
        children: [
          makeChild('מעקב דירוגים', '/platform/rank-tracker', 'מעקב אחר מיקומים בגוגל בזמן אמת'),
          makeChild('ביקורת אתר', '/platform/site-audit', 'סריקה טכנית מקיפה של האתר'),
          makeChild('קופיילוט SEO', '/platform/copilot', 'עוזר AI חכם לאופטימיזציה'),
          makeChild('עורך תוכן', '/platform/content-editor', 'כתיבה ואופטימיזציה בזמן אמת'),
          makeChild('מחקר מילות מפתח', '/platform/keyword-research', 'גילוי הזדמנויות חיפוש'),
          makeChild('אנליטיקס', '/platform/analytics', 'דשבורד ביצועים מרכזי'),
          makeChild('דוחות', '/platform/reports', 'דוחות מותאמים ללקוחות'),
          makeChild('ניהול דפים', '/platform/pages', 'אופטימיזציה ברמת הדף'),
        ],
      },
      {
        style: 'dropdown' as const,
        ...makeLink('שירותים', '/services'),
        children: [
          makeChild('אסטרטגיית SEO', '/services/seo-strategy', 'תכנית פעולה מותאמת אישית'),
          makeChild('אופטימיזציית תוכן', '/services/content-optimization', 'תוכן שמדורג גבוה'),
          makeChild('ביקורת טכנית', '/services/technical-audit', 'זיהוי ותיקון בעיות טכניות'),
          makeChild('SEO מקומי', '/services/local-seo', 'נוכחות מקומית חזקה'),
          makeChild('בניית קישורים', '/services/link-building', 'קישורים איכותיים וסמכותיים'),
        ],
      },
      {
        style: 'dropdown' as const,
        ...makeLink('פתרונות', '/solutions'),
        children: [
          makeChild('חנויות אונליין', '/solutions/ecommerce', 'SEO לאתרי מסחר'),
          makeChild('סטארטאפים', '/solutions/startups', 'צמיחה אורגנית מהירה'),
          makeChild('סוכנויות', '/solutions/agencies', 'כלים לניהול לקוחות'),
          makeChild('ארגונים', '/solutions/enterprise', 'פתרון לצוותי SEO גדולים'),
        ],
      },
      {
        style: 'link' as const,
        ...makeLink('תמחור', '/pricing'),
      },
      {
        style: 'link' as const,
        ...makeLink('בלוג', '/blog'),
      },
      {
        style: 'dropdown' as const,
        ...makeLink('משאבים', '/resources'),
        children: [
          makeChild('מדריכים', '/resources/guides'),
          makeChild('מילון מונחים', '/resources/glossary'),
          makeChild('וובינרים', '/resources/webinars'),
          makeChild('תיעוד API', '/resources/api-docs'),
          makeChild('יומן שינויים', '/resources/changelog'),
        ],
      },
      {
        style: 'dropdown' as const,
        ...makeLink('תמיכה', '/support'),
        children: [
          makeChild('מרכז עזרה', '/support/help-center'),
          makeChild('תיעוד', '/support/docs'),
          makeChild('סטטוס מערכת', '/support/status'),
          makeChild('יצירת קשר', '/support/contact'),
        ],
      },
    ],
  }

  await payload.updateGlobal({
    slug: 'header',
    data: headerData,
    context: { disableRevalidate: true },
  })

  payload.logger.info('Header navigation seeded successfully')

  payload.logger.info('=== Navigation seeding complete ===')
  process.exit(0)
}

run()
