import type { RequiredDataFromCollectionSlug } from 'payload'

// Helper to create a Lexical richText node with a single paragraph
function richTextParagraph(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
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

type PlatformModule = {
  slug: string
  title: string
  heTitle: string
  heDescription: string
  heTagline: string
  appPath: string
  icon: string
  features: Array<{ icon: string; title: string; description: string }>
}

const platformModules: PlatformModule[] = [
  {
    slug: 'rank-tracker',
    title: 'Rank Tracker',
    heTitle: 'מעקב דירוגים',
    heDescription:
      'מעקב יומי אחרי מילות המפתח שלך בגוגל. ראה בדיוק איפה אתה מדורג, איך המתחרים שלך מתקדמים, ואילו הזדמנויות מחכות לך.',
    heTagline: 'דע בדיוק איפה אתה עומד בגוגל — כל יום',
    appPath: '/rank-tracker',
    icon: '📊',
    features: [
      { icon: '📍', title: 'מעקב יומי אוטומטי', description: 'עדכון דירוגים אוטומטי כל יום — בלי לחיצה' },
      { icon: '🏆', title: 'ניתוח מתחרים', description: 'ראה מי מדורג מעליך ומה הם עושים נכון' },
      { icon: '📈', title: 'גרפי מגמות', description: 'היסטוריית דירוגים ויזואלית עם זיהוי מגמות' },
      { icon: '🌍', title: 'מעקב לפי מיקום', description: 'דירוגים לפי עיר, אזור או מדינה' },
    ],
  },
  {
    slug: 'site-audit',
    title: 'Site Audit',
    heTitle: 'בדיקת אתר טכנית',
    heDescription:
      'סריקה מקיפה של האתר שלך לאיתור בעיות טכניות, שגיאות SEO ובעיות ביצועים. קבל דוח מפורט עם המלצות תיקון מתועדפות.',
    heTagline: 'מצא ותקן כל בעיה טכנית באתר שלך',
    appPath: '/site-audit',
    icon: '🛠️',
    features: [
      { icon: '🔍', title: 'סריקה מלאה', description: 'סריקת כל דפי האתר לבעיות טכניות ו-SEO' },
      { icon: '⚡', title: 'בדיקת מהירות', description: 'ניתוח ביצועים ומהירות טעינה עם המלצות שיפור' },
      { icon: '🔗', title: 'בדיקת קישורים', description: 'איתור קישורים שבורים, redirects ובעיות ניתוב' },
      { icon: '📋', title: 'דוח מתועדף', description: 'רשימת בעיות ממוינת לפי חומרה עם הנחיות תיקון' },
    ],
  },
  {
    slug: 'copilot',
    title: 'SEO Copilot',
    heTitle: 'עוזר SEO חכם',
    heDescription:
      'עוזר AI שמנתח את האתר שלך ומספק המלצות SEO מותאמות אישית. קבל הנחיות ברורות לשיפור הדירוגים שלך — בלי ללמוד SEO.',
    heTagline: 'קבל המלצות SEO חכמות מבוססות AI',
    appPath: '/copilot',
    icon: '🤖',
    features: [
      { icon: '💡', title: 'המלצות מותאמות', description: 'ניתוח אוטומטי של האתר שלך עם המלצות אישיות' },
      { icon: '📝', title: 'הנחיות ברורות', description: 'כל המלצה מגיעה עם הסבר פשוט ושלבי ביצוע' },
      { icon: '🎯', title: 'תעדוף חכם', description: 'ה-AI מדרג את המשימות לפי השפעה פוטנציאלית' },
      { icon: '📊', title: 'מעקב התקדמות', description: 'ראה כמה המלצות יישמת ומה ההשפעה על הדירוגים' },
    ],
  },
  {
    slug: 'content-editor',
    title: 'Content Editor',
    heTitle: 'עורך תוכן',
    heDescription:
      'כתוב תוכן שמדורג גבוה בגוגל. עורך התוכן שלנו מנחה אותך בזמן אמת עם ניקוד SEO, הצעות למילות מפתח ובדיקת קריאות.',
    heTagline: 'כתוב תוכן שמדורג — עם הנחיה בזמן אמת',
    appPath: '/content-editor',
    icon: '✍️',
    features: [
      { icon: '🎯', title: 'ניקוד SEO בזמן אמת', description: 'ציון SEO שמתעדכן תוך כדי כתיבה' },
      { icon: '🔤', title: 'הצעות מילות מפתח', description: 'מילות מפתח רלוונטיות שכדאי לשלב בתוכן' },
      { icon: '📖', title: 'בדיקת קריאות', description: 'ניתוח רמת קריאות והמלצות לשיפור' },
      { icon: '🏗️', title: 'מבנה תוכן מומלץ', description: 'כותרות, פסקאות ומבנה מומלץ לדירוג מיטבי' },
    ],
  },
  {
    slug: 'keyword-research',
    title: 'Keyword Research',
    heTitle: 'מחקר מילות מפתח',
    heDescription:
      'גלה מילות מפתח רווחיות עם נתוני חיפוש מדויקים. מצא הזדמנויות שהמתחרים פיספסו ובנה אסטרטגיית תוכן מנצחת.',
    heTagline: 'מצא את מילות המפתח שיביאו תנועה לאתר',
    appPath: '/keyword-research',
    icon: '🔍',
    features: [
      { icon: '📊', title: 'נפח חיפוש מדויק', description: 'נתוני חיפוש חודשיים מעודכנים לשוק הישראלי' },
      { icon: '💰', title: 'ניתוח קושי', description: 'ציון קושי דירוג שעוזר לבחור קרבות שאפשר לנצח' },
      { icon: '🔗', title: 'מילות מפתח קשורות', description: 'הצעות למילים נוספות שכדאי למקד' },
      { icon: '📋', title: 'ניתוח SERP', description: 'ראה מי מדורג על כל מילת מפתח ולמה' },
    ],
  },
  {
    slug: 'analytics',
    title: 'Analytics',
    heTitle: 'אנליטיקס',
    heDescription:
      'דשבורדים מותאמים אישית שמציגים את הנתונים שחשובים לך. ראה ביצועים, מגמות והשוואות — הכל במקום אחד ובעברית.',
    heTagline: 'כל הנתונים שלך — מסודרים ונגישים',
    appPath: '/analytics',
    icon: '📈',
    features: [
      { icon: '📊', title: 'דשבורדים מותאמים', description: 'בנה דשבורדים עם הנתונים שחשובים לך' },
      { icon: '📅', title: 'השוואת תקופות', description: 'השווה ביצועים בין חודשים, רבעונים ושנים' },
      { icon: '🎯', title: 'מעקב יעדים', description: 'הגדר יעדים ועקוב אחרי ההתקדמות שלך' },
      { icon: '📤', title: 'ייצוא דוחות', description: 'ייצא נתונים ל-PDF, Excel או שלח ללקוחות' },
    ],
  },
  {
    slug: 'reports',
    title: 'Reports',
    heTitle: 'דוחות',
    heDescription:
      'דוחות מקצועיים ומותאמים ללקוחות שנבנים אוטומטית. חסוך שעות עבודה עם דוחות לבנים שנראים מרשימים ומכילים נתונים אמיתיים.',
    heTagline: 'דוחות מקצועיים שנבנים לבד',
    appPath: '/reports',
    icon: '📄',
    features: [
      { icon: '🎨', title: 'עיצוב מותאם ללקוח', description: 'לוגו, צבעים וברנדינג של הלקוח בלחיצה' },
      { icon: '⏰', title: 'שליחה אוטומטית', description: 'תזמון שליחת דוחות שבועיים או חודשיים' },
      { icon: '📊', title: 'נתונים חיים', description: 'הדוחות נשלפים מנתונים אמיתיים — לא סטטיים' },
      { icon: '📋', title: 'תבניות מוכנות', description: 'בחר מתבניות מוכנות או צור תבנית מותאמת' },
    ],
  },
  {
    slug: 'pages',
    title: 'Page Manager',
    heTitle: 'מנהל דפים',
    heDescription:
      'ניהול מרוכז של כל דפי האתר שלך. ראה סטטוס SEO, ביצועים ובעיות טכניות לכל דף — וטפל בהכל ממקום אחד.',
    heTagline: 'נהל את כל דפי האתר ממקום אחד',
    appPath: '/pages',
    icon: '📑',
    features: [
      { icon: '📋', title: 'סטטוס SEO לכל דף', description: 'ראה ציון SEO, meta tags ובעיות לכל דף' },
      { icon: '🔄', title: 'עדכון בכמות', description: 'עדכן title, description ו-tags למספר דפים בבת אחת' },
      { icon: '📊', title: 'ביצועי דף', description: 'תנועה, דירוגים וקליקים לכל דף' },
      { icon: '🚨', title: 'התראות שינויים', description: 'קבל התראה כשדף נופל בדירוג או יש שגיאה' },
    ],
  },
]

function buildPlatformModulePage(
  mod: PlatformModule,
): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: `platform--${mod.slug}`,
    _status: 'published',
    title: mod.heTitle,
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: `Hero - ${mod.title}`,
        heading: mod.heTitle,
        subheading: mod.heTagline,
        richText: richTextParagraph(mod.heDescription),
        style: 'centered',
        links: [
          {
            link: {
              type: 'custom',
              url: `https://core.zuzy.co.il/signup?redirect=${mod.appPath}`,
              label: 'התחל בחינם',
              appearance: 'default',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/platform',
              label: 'כל הכלים',
              appearance: 'outline',
            },
          },
        ],
      },
      {
        blockType: 'featuresBlock',
        blockName: `Features - ${mod.title}`,
        heading: 'יכולות מרכזיות',
        columns: '2',
        style: 'cards',
        features: mod.features.map((f) => ({
          icon: f.icon,
          title: f.title,
          description: richTextParagraph(f.description),
        })),
      },
      {
        blockType: 'ctaBlock',
        blockName: `CTA - ${mod.title}`,
        heading: `נסה את ה${mod.heTitle} בחינם`,
        richText: richTextParagraph(
          'התחל תקופת ניסיון חינם ללא צורך בכרטיס אשראי. ראה תוצאות תוך דקות.',
        ),
        style: 'bold',
        links: [
          {
            link: {
              type: 'custom',
              url: `https://core.zuzy.co.il/signup?redirect=${mod.appPath}`,
              label: 'התחל עכשיו',
              appearance: 'default',
            },
          },
        ],
      },
    ],
    meta: {
      title: `${mod.heTitle} — ZUZY`,
      description: mod.heDescription,
      jsonLdType: 'WebPage',
      breadcrumbLabel: mod.heTitle,
    },
  }
}

export function buildPlatformIndexPage(): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: 'platform',
    _status: 'published',
    title: 'הפלטפורמה',
    hero: {
      type: 'none',
    },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: 'Hero - Platform',
        heading: 'פלטפורמת SEO מקצה לקצה',
        subheading: 'כל הכלים שצריך כדי לשלוט בנוכחות הדיגיטלית — במקום אחד',
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
        ],
      },
      {
        blockType: 'featuresBlock',
        blockName: 'Platform Modules Grid',
        heading: 'הכלים שלנו',
        subheading: 'כל כלי בנוי לתת לך יתרון תחרותי',
        columns: '4',
        style: 'cards',
        features: platformModules.map((mod) => ({
          icon: mod.icon,
          title: mod.heTitle,
          description: richTextParagraph(mod.heTagline),
        })),
      },
      {
        blockType: 'comparisonTableBlock',
        blockName: 'Comparison - ZUZY vs Competitors',
        heading: 'למה ZUZY?',
        subheading: 'השוואה לכלים מובילים בשוק',
        columns: [
          { label: 'יכולת' },
          { label: 'ZUZY', highlighted: true },
          { label: 'Semrush' },
          { label: 'Ahrefs' },
        ],
        rows: [
          { feature: 'SEO', isCategory: true, values: [] },
          {
            feature: 'מעקב דירוגים',
            values: [{ value: '✓' }, { value: '✓' }, { value: '✓' }],
          },
          {
            feature: 'בדיקת אתר טכנית',
            values: [{ value: '✓' }, { value: '✓' }, { value: '✓' }],
          },
          {
            feature: 'מחקר מילות מפתח',
            values: [{ value: '✓' }, { value: '✓' }, { value: '✓' }],
          },
          {
            feature: 'עורך תוכן SEO',
            values: [{ value: '✓' }, { value: '✓' }, { value: '✗' }],
          },
          { feature: 'AI ואוטומציה', isCategory: true, values: [] },
          {
            feature: 'עוזר AI מובנה',
            values: [{ value: '✓' }, { value: '✗' }, { value: '✗' }],
          },
          {
            feature: 'המלצות אוטומטיות',
            values: [{ value: '✓' }, { value: 'חלקי' }, { value: '✗' }],
          },
          { feature: 'חוויה', isCategory: true, values: [] },
          {
            feature: 'ממשק בעברית',
            values: [{ value: '✓' }, { value: '✗' }, { value: '✗' }],
          },
          {
            feature: 'דוחות ללקוחות',
            values: [{ value: '✓' }, { value: '✓' }, { value: '✗' }],
          },
          {
            feature: 'ניהול דפים מרוכז',
            values: [{ value: '✓' }, { value: '✗' }, { value: '✗' }],
          },
        ],
      },
      {
        blockType: 'ctaBlock',
        blockName: 'CTA - Platform',
        heading: 'מוכנים לשדרג את ה-SEO?',
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
              url: '/pricing',
              label: 'ראה תמחור',
              appearance: 'outline',
            },
          },
        ],
      },
    ],
    meta: {
      title: 'הפלטפורמה — ZUZY',
      description:
        'פלטפורמת SEO מקצה לקצה: מעקב דירוגים, בדיקת אתר, מחקר מילות מפתח, עורך תוכן, אנליטיקס ודוחות — הכל במקום אחד.',
      jsonLdType: 'WebPage',
    },
  }
}

export function getAllPlatformPages(): RequiredDataFromCollectionSlug<'pages'>[] {
  return [
    buildPlatformIndexPage(),
    ...platformModules.map(buildPlatformModulePage),
  ]
}

export { platformModules }
