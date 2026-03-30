import type { RequiredDataFromCollectionSlug } from 'payload'

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

type ServiceDef = {
  slug: string
  title: string
  heTitle: string
  heTagline: string
  heDescription: string
  icon: string
  features: Array<{ icon: string; title: string; description: string }>
  steps: Array<{ title: string; description: string }>
}

const services: ServiceDef[] = [
  {
    slug: 'seo-strategy',
    title: 'SEO Strategy',
    heTitle: 'אסטרטגיית SEO',
    heTagline: 'תוכנית פעולה מותאמת אישית לדירוג גבוה בגוגל',
    heDescription:
      'אנחנו בונים עבורך אסטרטגיית SEO מקיפה שמבוססת על ניתוח מעמיק של האתר, המתחרים והשוק שלך. כל תוכנית כוללת מחקר מילות מפתח, תעדוף משימות ולוח זמנים ליישום.',
    icon: '🎯',
    features: [
      { icon: '🔍', title: 'מחקר שוק מעמיק', description: 'ניתוח מתחרים, הזדמנויות ופערים בשוק' },
      { icon: '📋', title: 'תוכנית פעולה מפורטת', description: 'משימות מתועדפות עם לוח זמנים ברור' },
      { icon: '🎯', title: 'מילות מפתח אסטרטגיות', description: 'מיקוד במילים עם פוטנציאל תנועה והמרה' },
      { icon: '📊', title: 'מעקב ודיווח', description: 'דוחות חודשיים עם מדדי הצלחה ברורים' },
    ],
    steps: [
      { title: 'אבחון', description: 'ניתוח מצב האתר הנוכחי והזדמנויות שוק' },
      { title: 'אסטרטגיה', description: 'בניית תוכנית פעולה מותאמת ליעדים שלך' },
      { title: 'יישום', description: 'ליווי צמוד בביצוע המשימות' },
    ],
  },
  {
    slug: 'content-optimization',
    title: 'Content Optimization',
    heTitle: 'אופטימיזציית תוכן',
    heTagline: 'תוכן שמדורג גבוה ומושך לקוחות',
    heDescription:
      'שירות אופטימיזציית תוכן מקצועי שהופך את התוכן הקיים שלך למגנט תנועה. אנחנו משפרים מבנה, מילות מפתח וקריאות — כך שגוגל והקוראים אוהבים את התוכן שלך.',
    icon: '✍️',
    features: [
      { icon: '📝', title: 'שיפור תוכן קיים', description: 'אופטימיזציה של דפים קיימים לדירוג טוב יותר' },
      { icon: '🔤', title: 'מחקר מילות מפתח', description: 'שילוב מילות מפתח רלוונטיות בצורה טבעית' },
      { icon: '📖', title: 'שיפור קריאות', description: 'מבנה תוכן שקל לקרוא ולעכל' },
      { icon: '🏗️', title: 'מבנה SEO', description: 'כותרות, Meta tags ומבנה HTML אופטימלי' },
    ],
    steps: [
      { title: 'ביקורת תוכן', description: 'סקירת כל דפי האתר וזיהוי הזדמנויות' },
      { title: 'אופטימיזציה', description: 'שיפור תוכן, מבנה ומילות מפתח' },
      { title: 'מדידה', description: 'מעקב אחר שיפורים בדירוג ותנועה' },
    ],
  },
  {
    slug: 'technical-audit',
    title: 'Technical SEO Audit',
    heTitle: 'ביקורת טכנית',
    heTagline: 'מצא ותקן כל בעיה טכנית שפוגעת בדירוג',
    heDescription:
      'ביקורת טכנית מקיפה שמזהה את כל הבעיות שמונעות מהאתר שלך להגיע לדף הראשון בגוגל. מהירות, נגישות, מבנה אתר, קישורים ועוד — הכל נבדק ומתועדף.',
    icon: '🛠️',
    features: [
      { icon: '⚡', title: 'ביצועים ומהירות', description: 'ניתוח מהירות טעינה ו-Core Web Vitals' },
      { icon: '🔗', title: 'מבנה אתר וניתוב', description: 'בדיקת קישורים, redirects ומבנה URL' },
      { icon: '🤖', title: 'סריקה וזחילה', description: 'ודא שגוגל יכול לסרוק את כל דפי האתר' },
      { icon: '📱', title: 'מובייל ונגישות', description: 'בדיקת תאימות לניידים ותקני נגישות' },
    ],
    steps: [
      { title: 'סריקה', description: 'סריקה אוטומטית וידנית של כל האתר' },
      { title: 'דוח מפורט', description: 'רשימת בעיות ממוינת לפי חומרה עם הנחיות תיקון' },
      { title: 'תיקון וליווי', description: 'סיוע ביישום התיקונים ובדיקה חוזרת' },
    ],
  },
  {
    slug: 'local-seo',
    title: 'Local SEO',
    heTitle: 'SEO מקומי',
    heTagline: 'שלוט בתוצאות החיפוש באזור שלך',
    heDescription:
      'שירות SEO מקומי שמביא לקוחות מהאזור שלך ישירות לעסק. אופטימיזציה של Google Business Profile, ציטוטים מקומיים וחוות דעת — כדי שתופיע ראשון כשלקוחות מחפשים בסביבה.',
    icon: '📍',
    features: [
      { icon: '🗺️', title: 'Google Business Profile', description: 'אופטימיזציה מלאה של הפרופיל העסקי' },
      { icon: '⭐', title: 'ניהול חוות דעת', description: 'אסטרטגיה לקבלת ביקורות חיוביות' },
      { icon: '📋', title: 'ציטוטים מקומיים', description: 'רישום בספריות עסקיות ומפות' },
      { icon: '🎯', title: 'מילות מפתח מקומיות', description: 'מיקוד בחיפושים עם כוונה מקומית' },
    ],
    steps: [
      { title: 'אבחון מקומי', description: 'ניתוח הנוכחות המקומית הנוכחית שלך' },
      { title: 'אופטימיזציה', description: 'שיפור פרופיל עסקי, ציטוטים ותוכן מקומי' },
      { title: 'מעקב', description: 'דיווח על דירוגים מקומיים ותנועה מהאזור' },
    ],
  },
  {
    slug: 'link-building',
    title: 'Link Building',
    heTitle: 'בניית קישורים',
    heTagline: 'קישורים איכותיים שמחזקים את הסמכות שלך',
    heDescription:
      'שירות בניית קישורים (Link Building) מקצועי שמתמקד באיכות ולא בכמות. אנחנו משיגים קישורים מאתרים סמכותיים ורלוונטיים שמעלים את הדירוג ומביאים תנועה ישירה.',
    icon: '🔗',
    features: [
      { icon: '🏆', title: 'קישורים מאתרים סמכותיים', description: 'מיקוד באתרים עם DA גבוה ורלוונטיות' },
      { icon: '📝', title: 'תוכן אורח', description: 'כתיבה ופרסום של מאמרים באתרים מובילים' },
      { icon: '🔍', title: 'ניתוח מתחרים', description: 'זיהוי הזדמנויות קישורים מפרופיל המתחרים' },
      { icon: '📊', title: 'דיווח שקוף', description: 'דוח חודשי עם כל הקישורים שנבנו ומדדי איכות' },
    ],
    steps: [
      { title: 'מחקר', description: 'זיהוי הזדמנויות קישורים רלוונטיות לתחום שלך' },
      { title: 'יצירת קשר', description: 'פנייה מותאמת אישית לבעלי אתרים' },
      { title: 'פרסום', description: 'יצירת תוכן ופרסום עם קישורים לאתר שלך' },
    ],
  },
]

function buildServicePage(svc: ServiceDef): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: `services--${svc.slug}`,
    _status: 'published',
    title: svc.heTitle,
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: `Hero - ${svc.title}`,
        heading: svc.heTitle,
        subheading: svc.heTagline,
        richText: richTextParagraph(svc.heDescription),
        style: 'centered',
        links: [
          {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'בקש הצעת מחיר',
              appearance: 'default',
            },
          },
          {
            link: {
              type: 'custom',
              url: '/services',
              label: 'כל השירותים',
              appearance: 'outline',
            },
          },
        ],
      },
      {
        blockType: 'featuresBlock',
        blockName: `Features - ${svc.title}`,
        heading: 'מה כולל השירות',
        columns: '2',
        style: 'cards',
        features: svc.features.map((f) => ({
          icon: f.icon,
          title: f.title,
          description: richTextParagraph(f.description),
        })),
      },
      {
        blockType: 'processStepsBlock',
        blockName: `Process - ${svc.title}`,
        heading: 'איך זה עובד',
        style: 'numbered',
        steps: svc.steps.map((s, i) => ({
          stepNumber: i + 1,
          title: s.title,
          description: richTextParagraph(s.description),
        })),
      },
      {
        blockType: 'ctaBlock',
        blockName: `CTA - ${svc.title}`,
        heading: `מעוניינים ב${svc.heTitle}?`,
        richText: richTextParagraph(
          'דברו איתנו לגבי הצרכים שלכם ונבנה תוכנית מותאמת אישית.',
        ),
        style: 'bold',
        links: [
          {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'צור קשר',
              appearance: 'default',
            },
          },
        ],
      },
    ],
    meta: {
      title: `${svc.heTitle} — ZUZY`,
      description: svc.heDescription,
      jsonLdType: 'WebPage',
      breadcrumbLabel: svc.heTitle,
    },
  }
}

function buildServicesIndexPage(): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: 'services',
    _status: 'published',
    title: 'שירותים',
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: 'Hero - Services',
        heading: 'שירותי SEO מקצועיים',
        subheading: 'תנו למומחים שלנו לעשות את העבודה — אתם מתמקדים בעסק',
        style: 'centered',
        links: [
          {
            link: {
              type: 'custom',
              url: '/contact',
              label: 'בקש הצעת מחיר',
              appearance: 'default',
            },
          },
        ],
      },
      {
        blockType: 'featuresBlock',
        blockName: 'Services Grid',
        heading: 'השירותים שלנו',
        subheading: 'פתרונות SEO מקצועיים שמביאים תוצאות',
        columns: '3',
        style: 'cards',
        features: services.map((svc) => ({
          icon: svc.icon,
          title: svc.heTitle,
          description: richTextParagraph(svc.heTagline),
        })),
      },
      {
        blockType: 'ctaBlock',
        blockName: 'CTA - Services',
        heading: 'לא בטוחים מה מתאים לכם?',
        richText: richTextParagraph(
          'נשמח לשמוע על האתגרים שלכם ולהמליץ על הפתרון המתאים ביותר. ייעוץ ראשוני ללא עלות.',
        ),
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
              url: '/platform',
              label: 'או נסו את הפלטפורמה',
              appearance: 'outline',
            },
          },
        ],
      },
    ],
    meta: {
      title: 'שירותי SEO — ZUZY',
      description:
        'שירותי SEO מקצועיים: אסטרטגיה, אופטימיזציית תוכן, ביקורת טכנית, SEO מקומי ובניית קישורים. תוצאות מוכחות.',
      jsonLdType: 'WebPage',
    },
  }
}

export function getAllServicesPages(): RequiredDataFromCollectionSlug<'pages'>[] {
  return [
    buildServicesIndexPage(),
    ...services.map(buildServicePage),
  ]
}
