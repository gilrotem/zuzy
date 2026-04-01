import type { RequiredDataFromCollectionSlug } from 'payload'

function richTextParagraph(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
          ],
          direction: 'rtl' as const,
          format: '' as const,
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'rtl' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

type SolutionDef = {
  slug: string
  title: string
  heTitle: string
  heTagline: string
  heDescription: string
  icon: string
  features: Array<{ icon: string; title: string; description: string }>
}

const solutions: SolutionDef[] = [
  {
    slug: 'ecommerce',
    title: 'E-commerce',
    heTitle: 'חנויות אונליין',
    heTagline: 'SEO שמביא קונים — לא רק מבקרים',
    heDescription:
      'פתרון SEO מותאם לחנויות אונליין. אופטימיזציה של דפי מוצר, קטגוריות וחיפוש פנימי — כדי שהלקוחות ימצאו בדיוק את מה שהם מחפשים ויקנו.',
    icon: '🛒',
    features: [
      { icon: '📦', title: 'אופטימיזציית דפי מוצר', description: 'Title, description ו-schema markup לכל מוצר' },
      { icon: '🏷️', title: 'מבנה קטגוריות', description: 'היררכיית קטגוריות שגוגל ולקוחות אוהבים' },
      { icon: '🔍', title: 'חיפוש פנימי', description: 'שיפור חוויית חיפוש באתר והמרות' },
      { icon: '📊', title: 'מעקב מכירות', description: 'קישור בין תנועה אורגנית לרכישות בפועל' },
    ],
  },
  {
    slug: 'startups',
    title: 'Startups',
    heTitle: 'סטארטאפים',
    heTagline: 'צמיחה אורגנית שחוסכת תקציב פרסום',
    heDescription:
      'סטארטאפים צריכים להגיע ללקוחות בלי לשרוף תקציב על פרסום. ZUZY עוזרת לבנות נוכחות אורגנית מהיום הראשון — עם אסטרטגיית תוכן, SEO טכני וכלים שצומחים איתכם.',
    icon: '🚀',
    features: [
      { icon: '📈', title: 'צמיחה אורגנית', description: 'בנה תנועה שלא תלויה בתקציב פרסום' },
      { icon: '⚡', title: 'תוצאות מהירות', description: 'אסטרטגיית Quick Wins למילות מפתח נגישות' },
      { icon: '💰', title: 'חסכון בעלויות', description: 'כלי אחד במקום חמישה — חסכון של אלפי שקלים בחודש' },
      { icon: '📊', title: 'דוחות למשקיעים', description: 'נתוני צמיחה ברורים למצגות ודוחות' },
    ],
  },
  {
    slug: 'agencies',
    title: 'Agencies',
    heTitle: 'סוכנויות',
    heTagline: 'נהל עשרות לקוחות בפלטפורמה אחת',
    heDescription:
      'סוכנויות שיווק דיגיטלי צריכות כלים שעובדים בקנה מידה. ZUZY מאפשרת ניהול מרובה לקוחות, דוחות White Label ותובנות מרכזיות — הכל ממקום אחד.',
    icon: '🏢',
    features: [
      { icon: '👥', title: 'ניהול מרובה לקוחות', description: 'דשבורד מרכזי עם הפרדה מלאה בין לקוחות' },
      { icon: '🎨', title: 'דוחות White Label', description: 'דוחות מותאמים עם לוגו וצבעים של הלקוח' },
      { icon: '⏰', title: 'חיסכון בזמן', description: 'אוטומציות שחוסכות שעות עבודה ידנית' },
      { icon: '📊', title: 'תובנות מרכזיות', description: 'ראה ביצועים של כל הלקוחות במבט אחד' },
    ],
  },
  {
    slug: 'enterprise',
    title: 'Enterprise',
    heTitle: 'ארגונים',
    heTagline: 'SEO ברמה ארגונית — עם שליטה ואבטחה',
    heDescription:
      'לארגונים גדולים עם מאות או אלפי דפים. ZUZY Enterprise מספקת כלי ניהול מתקדמים, אבטחת מידע, SSO ותמיכה ייעודית — כדי שצוות ה-SEO שלכם יעבוד ביעילות מקסימלית.',
    icon: '🏛️',
    features: [
      { icon: '🔒', title: 'אבטחה מתקדמת', description: 'SSO, אימות דו-שלבי והרשאות מדורגות' },
      { icon: '📊', title: 'ניתוח בקנה מידה', description: 'סריקה וניתוח של מאות אלפי דפים' },
      { icon: '🤝', title: 'מנהל חשבון ייעודי', description: 'ליווי אישי, הדרכות וסיוע טכני' },
      { icon: '🔌', title: 'אינטגרציות', description: 'חיבור למערכות הקיימות שלכם — CMS, CRM, BI' },
    ],
  },
]

function buildSolutionPage(sol: SolutionDef): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: sol.slug,
    _status: 'published',
    title: sol.heTitle,
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: `Hero - ${sol.title}`,
        heading: sol.heTitle,
        subheading: sol.heTagline,
        richText: richTextParagraph(sol.heDescription),
        style: 'centered',
        links: [
          {
            link: {
              type: 'custom',
              url: 'https://core.zuzy.co.il/signup',
              label: 'התחל בחינם',
              appearance: 'default',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/platform',
              label: 'גלה את הפלטפורמה',
              appearance: 'outline',
            },
          },
        ],
      },
      {
        blockType: 'featuresBlock',
        blockName: `Features - ${sol.title}`,
        heading: 'למה ZUZY מתאימה לכם',
        columns: '2',
        style: 'cards',
        features: sol.features.map((f) => ({
          icon: f.icon,
          title: f.title,
          description: richTextParagraph(f.description),
        })),
      },
      {
        blockType: 'ctaBlock',
        blockName: `CTA - ${sol.title}`,
        heading: 'מוכנים להתחיל?',
        richText: richTextParagraph(
          'הצטרפו ל-ZUZY והתחילו לראות תוצאות. תקופת ניסיון חינם, בלי כרטיס אשראי.',
        ),
        style: 'bold',
        links: [
          {
            link: {
              type: 'custom',
              url: 'https://core.zuzy.co.il/signup',
              label: 'התחל בחינם',
              appearance: 'default',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/services',
              label: 'או בחר שירות מקצועי',
              appearance: 'outline',
            },
          },
        ],
      },
    ],
    meta: {
      title: `${sol.heTitle} — ZUZY`,
      description: sol.heDescription,
      jsonLdType: 'WebPage',
      breadcrumbLabel: sol.heTitle,
    },
  }
}

function buildSolutionsIndexPage(): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: 'solutions',
    _status: 'published',
    title: 'פתרונות',
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: 'Hero - Solutions',
        heading: 'פתרונות לכל סוג עסק',
        subheading: 'לא משנה באיזה שלב אתם — יש לנו את הכלים והשירותים שיעזרו לכם לצמוח',
        style: 'centered',
      },
      {
        blockType: 'featuresBlock',
        blockName: 'Solutions Grid',
        heading: 'למי ZUZY מתאימה?',
        columns: '2',
        style: 'cards',
        features: solutions.map((sol) => ({
          icon: sol.icon,
          title: sol.heTitle,
          description: richTextParagraph(sol.heTagline),
        })),
      },
      {
        blockType: 'ctaBlock',
        blockName: 'CTA - Solutions',
        heading: 'לא בטוחים מה מתאים לכם?',
        richText: richTextParagraph('דברו איתנו ונעזור לכם לבחור את הפתרון המדויק.'),
        style: 'default',
        links: [
          {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'דברו איתנו',
              appearance: 'default',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/pricing',
              label: 'ראה תמחור',
              appearance: 'outline',
            },
          },
        ],
      },
    ],
    meta: {
      title: 'פתרונות — ZUZY',
      description: 'פתרונות SEO מותאמים לחנויות אונליין, סטארטאפים, סוכנויות וארגונים. מצא את הפתרון שמתאים לך.',
      jsonLdType: 'WebPage',
    },
  }
}

export function getAllSolutionsPages(): RequiredDataFromCollectionSlug<'pages'>[] {
  return [
    buildSolutionsIndexPage(),
    ...solutions.map(buildSolutionPage),
  ]
}
