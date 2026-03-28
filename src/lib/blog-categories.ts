/**
 * Blog Category Configuration (D13 — Topic-Based Categories)
 *
 * 7 topic categories that scale to unlimited products.
 * Slugs must match WordPress category slugs exactly.
 */

export type BlogCategoryConfig = {
  slug: string
  name: string
  nameHe: string
  description: string
  descriptionHe: string
  relatedPlatformLinks: string[]
}

export const BLOG_CATEGORIES: BlogCategoryConfig[] = [
  {
    slug: 'seo',
    name: 'SEO',
    nameHe: 'קידום אתרים',
    description: 'Expert guides on search engine optimization, technical SEO, content strategy, and ranking improvements.',
    descriptionHe: 'מדריכים מומחים לקידום אתרים, SEO טכני, אסטרטגיית תוכן ושיפור דירוגים.',
    relatedPlatformLinks: ['/platform/seo-hub/'],
  },
  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    nameHe: 'שיווק דיגיטלי',
    description: 'Strategies and insights on PPC, social media marketing, and digital advertising.',
    descriptionHe: 'אסטרטגיות ותובנות על PPC, שיווק ברשתות חברתיות ופרסום דיגיטלי.',
    relatedPlatformLinks: ['/platform/ppc/', '/platform/smm/'],
  },
  {
    slug: 'design-ux',
    name: 'Design & UX',
    nameHe: 'עיצוב וחוויית משתמש',
    description: 'Explore UI/UX design principles, web design trends, and user experience best practices.',
    descriptionHe: 'עקרונות עיצוב UI/UX, מגמות בעיצוב אתרים ושיטות עבודה מומלצות לחוויית משתמש.',
    relatedPlatformLinks: ['/platform/design/'],
  },
  {
    slug: 'productivity',
    name: 'Productivity & Sales',
    nameHe: 'פרודוקטיביות ומכירות',
    description: 'Tips on workflow optimization, CRM usage, sales processes, and business productivity.',
    descriptionHe: 'טיפים לאופטימיזציית תהליכי עבודה, שימוש ב-CRM, תהליכי מכירות ופרודוקטיביות עסקית.',
    relatedPlatformLinks: ['/platform/crm/', '/platform/neck-bottle/'],
  },
  {
    slug: 'ai',
    name: 'AI in Marketing',
    nameHe: 'AI בשיווק',
    description: 'How artificial intelligence is transforming marketing, content creation, and business automation.',
    descriptionHe: 'איך בינה מלאכותית משנה שיווק, יצירת תוכן ואוטומציה עסקית.',
    relatedPlatformLinks: [],
  },
  {
    slug: 'case-studies',
    name: 'Case Studies',
    nameHe: 'מקרי בוחן',
    description: 'Real-world success stories and results from businesses using the ZUZY platform.',
    descriptionHe: 'סיפורי הצלחה ותוצאות מעסקים שמשתמשים בפלטפורמת ZUZY.',
    relatedPlatformLinks: [],
  },
  {
    slug: 'news',
    name: 'Company News',
    nameHe: 'חדשות החברה',
    description: 'Product updates, feature launches, and company announcements from ZUZY.',
    descriptionHe: 'עדכוני מוצר, השקות פיצ׳רים והודעות חברה מ-ZUZY.',
    relatedPlatformLinks: [],
  },
]

export function getBlogCategoryConfig(slug: string): BlogCategoryConfig | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)
}
