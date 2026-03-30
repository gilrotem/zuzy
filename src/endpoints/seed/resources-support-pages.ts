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

function richTextMultiParagraph(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [
          { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
        ],
        direction: 'rtl' as const,
        format: '' as const,
        indent: 0,
        textFormat: 0,
        version: 1,
      })),
      direction: 'rtl' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

// ─── Resources Pages (W1-8) ──────────────────────────────────────

type PageDef = {
  slug: string
  title: string
  heTitle: string
  heDescription: string
  icon: string
  content: string[]
}

const resourcePages: PageDef[] = [
  {
    slug: 'guides',
    title: 'Guides',
    heTitle: 'מדריכים',
    heDescription: 'מדריכים מקצועיים ומעמיקים על SEO, שיווק דיגיטלי ואופטימיזציה — מתחילים עד מתקדמים.',
    icon: '📚',
    content: [
      'המדריכים שלנו נכתבים על ידי מומחי SEO עם ניסיון של שנים בשטח.',
      'כל מדריך כולל דוגמאות מעשיות, צילומי מסך ושלבים ברורים ליישום.',
      'מדריכים חדשים מתפרסמים כל שבוע — עקבו אחרי הבלוג שלנו לעדכונים.',
    ],
  },
  {
    slug: 'glossary',
    title: 'Glossary',
    heTitle: 'מילון מונחים',
    heDescription: 'מילון מונחים מקיף של SEO ושיווק דיגיטלי — הסברים פשוטים בעברית לכל מושג.',
    icon: '📖',
    content: [
      'מילון המונחים שלנו מכסה מאות מושגים מעולם ה-SEO והשיווק הדיגיטלי.',
      'כל מושג מוסבר בשפה פשוטה וברורה, עם דוגמאות מעשיות.',
      'המילון מתעדכן באופן שוטף עם מושגים חדשים מהתעשייה.',
    ],
  },
  {
    slug: 'webinars',
    title: 'Webinars',
    heTitle: 'וובינרים',
    heDescription: 'וובינרים חינמיים על SEO, שיווק דיגיטלי וטכנולוגיה — בהנחיית מומחים מהתעשייה.',
    icon: '🎥',
    content: [
      'הצטרפו לוובינרים החינמיים שלנו וללמדו מהמומחים המובילים בתחום.',
      'כל וובינר כולל הדגמה חיה, שאלות ותשובות וחומרים להורדה.',
      'הקלטות של וובינרים קודמים זמינות לצפייה בכל זמן.',
    ],
  },
  {
    slug: 'api-docs',
    title: 'API Documentation',
    heTitle: 'תיעוד API',
    heDescription: 'תיעוד טכני מלא של ה-API של ZUZY — אינטגרציות, endpoints ודוגמאות קוד.',
    icon: '💻',
    content: [
      'ה-API של ZUZY מאפשר אינטגרציה מלאה עם המערכות שלכם.',
      'תיעוד מפורט עם דוגמאות קוד ב-JavaScript, Python ו-PHP.',
      'סביבת Sandbox לבדיקות ללא השפעה על נתונים אמיתיים.',
    ],
  },
  {
    slug: 'changelog',
    title: 'Changelog',
    heTitle: 'יומן שינויים',
    heDescription: 'כל העדכונים, השיפורים והתיקונים בפלטפורמת ZUZY — מסודרים לפי תאריך.',
    icon: '📋',
    content: [
      'אנחנו מפרסמים עדכונים באופן קבוע — יכולות חדשות, שיפורי ביצועים ותיקוני באגים.',
      'כל עדכון מתועד כאן עם תאריך, תיאור ורמת השפעה.',
      'עקבו אחרי העדכונים כדי להישאר מעודכנים ביכולות החדשות של הפלטפורמה.',
    ],
  },
]

// ─── Support Pages (W1-9, D18) ───────────────────────────────────

const supportPages: PageDef[] = [
  {
    slug: 'help-center',
    title: 'Help Center',
    heTitle: 'מרכז עזרה',
    heDescription: 'מרכז העזרה של ZUZY — מצא תשובות לשאלות נפוצות, מדריכי שימוש וטיפים.',
    icon: '❓',
    content: [
      'מרכז העזרה מכיל תשובות לשאלות הנפוצות ביותר על השימוש ב-ZUZY.',
      'חפשו לפי נושא או השתמשו בחיפוש החופשי כדי למצוא את מה שאתם מחפשים.',
      'לא מצאתם תשובה? צרו קשר עם צוות התמיכה שלנו — אנחנו כאן בשבילכם.',
    ],
  },
  {
    slug: 'docs',
    title: 'Documentation',
    heTitle: 'תיעוד',
    heDescription: 'תיעוד מלא של פלטפורמת ZUZY — הגדרות, תכונות ומדריכי שימוש מפורטים.',
    icon: '📄',
    content: [
      'התיעוד המלא של ZUZY מכסה את כל התכונות והכלים של הפלטפורמה.',
      'כל מדריך כולל צילומי מסך, דוגמאות ושלבי הפעלה ברורים.',
      'התיעוד מתעדכן עם כל שחרור גרסה חדשה.',
    ],
  },
  {
    slug: 'status',
    title: 'System Status',
    heTitle: 'סטטוס מערכת',
    heDescription: 'בדקו את סטטוס השרתים והשירותים של ZUZY בזמן אמת.',
    icon: '🟢',
    content: [
      'דף הסטטוס מציג את מצב כל שירותי ZUZY בזמן אמת.',
      'במקרה של תקלה, מידע על הבעיה וזמן צפוי לתיקון יפורסמו כאן.',
      'ניתן להירשם להתראות אימייל כדי לקבל עדכונים אוטומטיים על תקלות.',
    ],
  },
  {
    slug: 'contact',
    title: 'Contact Support',
    heTitle: 'יצירת קשר',
    heDescription: 'צרו קשר עם צוות התמיכה של ZUZY — צ\'אט, אימייל או טלפון.',
    icon: '💬',
    content: [
      'צוות התמיכה שלנו זמין בימים א\'-ה\' בין 9:00-18:00.',
      'אימייל: support@zuzy.co.il | טלפון: 03-XXX-XXXX',
      'זמן מענה ממוצע: עד 4 שעות באימייל, מיידי בצ\'אט.',
    ],
  },
]

function buildSectionPage(
  section: 'resources' | 'support',
  def: PageDef,
): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: `${section}--${def.slug}`,
    _status: 'published',
    title: def.heTitle,
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: `Hero - ${def.title}`,
        heading: def.heTitle,
        subheading: def.heDescription,
        style: 'centered',
      },
      {
        blockType: 'richContentBlock',
        blockName: `Content - ${def.title}`,
        content: richTextMultiParagraph(def.content),
      },
      {
        blockType: 'ctaBlock',
        blockName: `CTA - ${def.title}`,
        heading: 'צריכים עזרה נוספת?',
        richText: richTextParagraph('צוות ZUZY כאן בשביל לעזור. פנו אלינו בכל שאלה.'),
        style: 'default',
        links: [
          {
            link: {
              type: 'custom',
              url: '/support/contact',
              label: 'צור קשר',
              appearance: 'default',
            },
          },
        ],
      },
    ],
    meta: {
      title: `${def.heTitle} — ZUZY`,
      description: def.heDescription,
      jsonLdType: 'WebPage',
      breadcrumbLabel: def.heTitle,
    },
  }
}

function buildSectionIndexPage(
  section: 'resources' | 'support',
  heTitle: string,
  heSubtitle: string,
  heDescription: string,
  pages: PageDef[],
): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: section,
    _status: 'published',
    title: heTitle,
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: `Hero - ${section}`,
        heading: heTitle,
        subheading: heSubtitle,
        style: 'centered',
      },
      {
        blockType: 'featuresBlock',
        blockName: `${section} Grid`,
        columns: pages.length <= 4 ? '2' : '3',
        style: 'cards',
        features: pages.map((p) => ({
          icon: p.icon,
          title: p.heTitle,
          description: richTextParagraph(p.heDescription),
        })),
      },
    ],
    meta: {
      title: `${heTitle} — ZUZY`,
      description: heDescription,
      jsonLdType: 'WebPage',
    },
  }
}

export function getAllResourcesPages(): RequiredDataFromCollectionSlug<'pages'>[] {
  return [
    buildSectionIndexPage(
      'resources',
      'משאבים',
      'מדריכים, כלים ותוכן שיעזרו לכם להצליח',
      'מדריכים מקצועיים, מילון מונחים, וובינרים, תיעוד API ויומן שינויים — הכל במקום אחד.',
      resourcePages,
    ),
    ...resourcePages.map((p) => buildSectionPage('resources', p)),
  ]
}

export function getAllSupportPages(): RequiredDataFromCollectionSlug<'pages'>[] {
  return [
    buildSectionIndexPage(
      'support',
      'תמיכה',
      'אנחנו כאן בשביל לעזור',
      'מרכז עזרה, תיעוד, סטטוס מערכת ויצירת קשר — כל מה שצריך כדי לקבל תמיכה.',
      supportPages,
    ),
    ...supportPages.map((p) => buildSectionPage('support', p)),
  ]
}
