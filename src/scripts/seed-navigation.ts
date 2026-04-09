/**
 * Navigation seeder — run with:
 *   pnpm seed:nav
 *
 * Seeds the Header (mega menu) and Footer (columns) globals with
 * all ZUZY site navigation items.
 *
 * Safe to run multiple times — overwrites the global data.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

// ---------------------------------------------------------------------------
// Link helper
// ---------------------------------------------------------------------------

function customLink(label: string, url: string) {
  return {
    type: 'custom' as const,
    url,
    label,
    newTab: false,
  }
}

// ---------------------------------------------------------------------------
// Header nav items
// ---------------------------------------------------------------------------

const headerNavItems = [
  {
    style: 'dropdown' as const,
    label: 'הפלטפורמה',
    children: [
      { link: customLink('מעקב דירוגים', '/platform/rank-tracker'), description: 'מעקב יומי אחרי דירוגי מילות מפתח בגוגל' },
      { link: customLink('בדיקת אתר טכנית', '/platform/site-audit'), description: 'סריקת האתר לבעיות טכניות ומהירות' },
      { link: customLink('עוזר SEO חכם', '/platform/copilot'), description: 'המלצות SEO חכמות ותובנות אוטומטיות' },
      { link: customLink('עורך תוכן', '/platform/content-editor'), description: 'כתיבת תוכן אופטימלי ל-SEO בזמן אמת' },
      { link: customLink('מחקר מילות מפתח', '/platform/keyword-research'), description: 'גלה מילות מפתח רלוונטיות עם פוטנציאל' },
      { link: customLink('אנליטיקס', '/platform/analytics'), description: 'דשבורדים מותאמים אישית' },
      { link: customLink('דוחות', '/platform/reports'), description: 'דוחות מפורטים ללקוחות ולצוות' },
      { link: customLink('מנהל דפים', '/platform/pages'), description: 'ניהול וניטור כל הדפים באתר' },
    ],
  },
  {
    style: 'dropdown' as const,
    label: 'שירותים',
    children: [
      { link: customLink('אסטרטגיית SEO', '/services/seo-strategy'), description: 'תוכנית SEO מקיפה מותאמת לעסק שלך' },
      { link: customLink('אופטימיזציית תוכן', '/services/content-optimization'), description: 'שיפור תוכן קיים לביצועי SEO מקסימליים' },
      { link: customLink('ביקורת טכנית', '/services/technical-audit'), description: 'ניתוח טכני מקיף של האתר' },
      { link: customLink('SEO מקומי', '/services/local-seo'), description: 'חיזוק הנוכחות בחיפוש מקומי' },
      { link: customLink('בניית קישורים', '/services/link-building'), description: 'קישורים איכותיים שמחזקים את הסמכות' },
    ],
  },
  {
    style: 'dropdown' as const,
    label: 'פתרונות',
    children: [
      { link: customLink('חנויות אונליין', '/solutions/ecommerce'), description: 'SEO למסחר אלקטרוני' },
      { link: customLink('סטארטאפים', '/solutions/startups'), description: 'צמיחה מהירה עם SEO חכם' },
      { link: customLink('סוכנויות', '/solutions/agencies'), description: 'כלים לניהול לקוחות מרובים' },
      { link: customLink('ארגונים', '/solutions/enterprise'), description: 'פתרון ארגוני מותאם' },
    ],
  },
  {
    style: 'dropdown' as const,
    label: 'משאבים',
    children: [
      { link: customLink('מדריכים', '/resources/guides'), description: 'מדריכים מקיפים לקידום אתרים' },
      { link: customLink('מילון מונחים', '/resources/glossary'), description: 'מונחי SEO ושיווק דיגיטלי' },
      { link: customLink('וובינרים', '/resources/webinars'), description: 'הרצאות וסדנאות בנושא SEO' },
      { link: customLink('תיעוד API', '/resources/api-docs'), description: 'תיעוד טכני לאינטגרציות' },
      { link: customLink('יומן שינויים', '/resources/changelog'), description: 'עדכונים ושיפורים בפלטפורמה' },
    ],
  },
  {
    style: 'dropdown' as const,
    label: 'תמיכה',
    children: [
      { link: customLink('מרכז עזרה', '/support/help-center'), description: 'תשובות לשאלות נפוצות' },
      { link: customLink('תיעוד', '/support/docs'), description: 'מדריכי שימוש מפורטים' },
      { link: customLink('סטטוס מערכת', '/support/status'), description: 'מצב השירותים בזמן אמת' },
      { link: customLink('יצירת קשר', '/support/contact'), description: 'דברו איתנו' },
    ],
  },
  {
    style: 'link' as const,
    label: 'תמחור',
    directLink: customLink('תמחור', '/pricing'),
  },
  {
    style: 'link' as const,
    label: 'בלוג',
    directLink: customLink('בלוג', '/blog'),
  },
]

// ---------------------------------------------------------------------------
// Footer columns
// ---------------------------------------------------------------------------

const footerColumns = [
  {
    label: 'הפלטפורמה',
    navItems: [
      { link: customLink('מעקב דירוגים', '/platform/rank-tracker') },
      { link: customLink('בדיקת אתר', '/platform/site-audit') },
      { link: customLink('עוזר SEO', '/platform/copilot') },
      { link: customLink('עורך תוכן', '/platform/content-editor') },
      { link: customLink('מחקר מילות מפתח', '/platform/keyword-research') },
      { link: customLink('אנליטיקס', '/platform/analytics') },
    ],
  },
  {
    label: 'שירותים',
    navItems: [
      { link: customLink('אסטרטגיית SEO', '/services/seo-strategy') },
      { link: customLink('אופטימיזציית תוכן', '/services/content-optimization') },
      { link: customLink('ביקורת טכנית', '/services/technical-audit') },
      { link: customLink('SEO מקומי', '/services/local-seo') },
      { link: customLink('בניית קישורים', '/services/link-building') },
    ],
  },
  {
    label: 'פתרונות',
    navItems: [
      { link: customLink('חנויות אונליין', '/solutions/ecommerce') },
      { link: customLink('סטארטאפים', '/solutions/startups') },
      { link: customLink('סוכנויות', '/solutions/agencies') },
      { link: customLink('ארגונים', '/solutions/enterprise') },
    ],
  },
  {
    label: 'תמיכה',
    navItems: [
      { link: customLink('מרכז עזרה', '/support/help-center') },
      { link: customLink('תיעוד', '/support/docs') },
      { link: customLink('יצירת קשר', '/support/contact') },
      { link: customLink('בלוג', '/blog') },
    ],
  },
]

const footerBottomLinks = [
  { link: customLink('תנאי שימוש', '/legal/terms') },
  { link: customLink('מדיניות פרטיות', '/legal/privacy') },
  { link: customLink('מדיניות עוגיות', '/legal/cookies') },
  { link: customLink('אבטחה', '/legal/security') },
]

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const run = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('=== Navigation Seeder ===')

  // Seed header
  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: headerNavItems,
    } as any,
  })
  payload.logger.info('Header mega menu seeded')

  // Seed footer
  await payload.updateGlobal({
    slug: 'footer',
    data: {
      columns: footerColumns,
      bottomLinks: footerBottomLinks,
      copyright: `© ${new Date().getFullYear()} ZUZY. כל הזכויות שמורות.`,
    } as any,
  })
  payload.logger.info('Footer columns seeded')

  payload.logger.info('=== Navigation seeding complete! ===')
  process.exit(0)
}

run().catch((err) => {
  console.error('Navigation seed error:', err)
  process.exit(1)
})
