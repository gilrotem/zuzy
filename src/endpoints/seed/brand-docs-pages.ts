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

// ─── BrandDocs Seed Data ──────────────────────────────────────

type BrandDocDef = {
  slug: string
  title: string
  summary: string
  docType: string
  icon: string
  sortOrder: number
  content: string[]
}

const brandDocs: BrandDocDef[] = [
  {
    slug: 'brand-philosophy',
    title: 'פילוסופיית המותג',
    summary: 'המהות של ZUZY — ערכי ליבה, מנטרה, והבטחת הברנד.',
    docType: 'essence',
    icon: 'dna',
    sortOrder: 1,
    content: [
      'מנטרה: "אל תתקע. תזוז."',
      'Brand DNA: "We build beautiful things and we don\'t play by the rules."',
      'הבטחת הברנד: מוצר מלוטש שעושה מעקף על כל מה שעוצר אותך.',
      'ערכי ליבה: זרימה, ביטחון, איכות אמיתית, פשטות שמסתירה עומק, מעקף.',
      'ZUZY הוא שותפות אמיתית — לא ספק חד-פעמי. אנחנו צומחים יחד עם הלקוח.',
    ],
  },
  {
    slug: 'brand-voice',
    title: 'טון הדיבור',
    summary: 'איך ZUZY מדבר — אישיות, טון, שפה ומסרים מרכזיים.',
    docType: 'brand-voice',
    icon: 'mic',
    sortOrder: 2,
    content: [
      'אישיות: כנות (4/5), התרגשות (4/5), מיומנות (5/5), תחכום (3/5).',
      'טון: 70% קז\'ואלי, 60% שובב, 60% חוצפן, 55% עניייני.',
      '"אח גדול שמבין בדיגיטל — עם ליטוש."',
      'שפה עברית: שפה יומיומית עם ליטוש. לא שפה גבוהה, לא סלנג כבד.',
      'ערבוב אנגלית: טבעי — מונחים טכניים באנגלית, השאר בעברית.',
    ],
  },
  {
    slug: 'products-overview',
    title: 'המוצרים שלנו',
    summary: 'סקירת כל המוצרים והשירותים של ZUZY — SaaS + DFY.',
    docType: 'solutions',
    icon: 'puzzle',
    sortOrder: 3,
    content: [
      'ZUZY מציע שני מסלולים: פלטפורמת SaaS לניהול עצמי ושירותי DFY (Done For You) מקצועיים.',
      'הפלטפורמה כוללת 8 מודולים: Rank Tracker, Site Audit, Content Editor, SEO Copilot, Keyword Research, Analytics, Reports, Page Manager.',
      'שירותי DFY: אסטרטגיית SEO, אופטימיזציית תוכן, ביקורת טכנית, SEO מקומי, בניית קישורים.',
      'תמחור: Free (₪0), Pro (₪199/חודש), Agency (₪499/חודש).',
      'כל השירותים עובדים יחד — הפלטפורמה והשירותים משלימים זה את זה.',
    ],
  },
  {
    slug: 'competitive-landscape',
    title: 'נוף תחרותי',
    summary: 'איך ZUZY שונה מהמתחרים — בידול, חוזקות וזווית ייחודית.',
    docType: 'differentiation',
    icon: 'target',
    sortOrder: 4,
    content: [
      'ZUZY היא האקוסיסטם הדיגיטלי היחיד בישראל שמשלב SaaS ושירותים מקצועיים.',
      'בידול מרכזי: מוצר מלוטש, בעברית, עם הבנה עמוקה של השוק הישראלי.',
      'מתחרים גלובליים (Semrush, Ahrefs) לא מציעים תמיכה מקומית ושירות אישי.',
      'מתחרים מקומיים לא מציעים פלטפורמה טכנולוגית בנוסף לשירות.',
      'ZUZY הוא הפתרון היחיד שמאפשר מעבר חלק בין ניהול עצמי לשירות מקצועי.',
    ],
  },
  {
    slug: 'customer-avatars',
    title: 'אווטארים',
    summary: 'הלקוחות שלנו — פרופילים, צרכים וקהלי יעד.',
    docType: 'sales',
    icon: 'chart',
    sortOrder: 5,
    content: [
      'אווטאר ראשי: "אבי הסוכנות" — בעל סוכנות דיגיטלית עם לקוחות רבים, נכנס דרך כלי ה-SEO.',
      'אווטאר משני: "שרון היזמית" — מנכ"לית סטארטאפ שצריכה SEO אבל אין לה זמן.',
      'אווטאר שלישי: "מיכאל מנהל השיווק" — מנהל שיווק בחברה בינונית שרוצה כלים מקצועיים.',
      'כולם חולקים צורך: פתרון מקצועי שחוסך זמן ונותן תוצאות מדידות.',
      'מסע הלקוח: גילוי דרך תוכן → רישום חינמי → שימוש בכלי → שדרוג ל-Pro → הוספת שירותי DFY.',
    ],
  },
  {
    slug: 'design-system-overview',
    title: 'מערכת עיצוב',
    summary: 'סקירת מערכת העיצוב של ZUZY — צבעים, טיפוגרפיה, לוגואים וטוקנים.',
    docType: 'design-tokens',
    icon: 'palette',
    sortOrder: 6,
    content: [
      'מערכת העיצוב של ZUZY מבוססת על עקרונות של פשטות, בהירות ומקצועיות.',
      'צבע ראשי: סגול #7C3AED — מייצג חדשנות, מקצועיות ואמינות.',
      'צבע משני: טורקיז #0D9488 — מייצג צמיחה, תנועה ורעננות.',
      'פונט: IBM Plex Sans Hebrew — תומך בעברית, לטינית וקירילית.',
      'עיצוב 15 וריאציות לוגו זמינות להורדה בפורמט SVG.',
    ],
  },
  {
    slug: 'logo-usage-guidelines',
    title: 'הנחיות שימוש בלוגו',
    summary: 'כללים לשימוש נכון בלוגו של ZUZY — גרסאות, רקעים ומרווחים.',
    docType: 'logo-usage',
    icon: 'frame',
    sortOrder: 7,
    content: [
      'לוגו ZUZY זמין ב-3 פורמטים: אופקי, אנכי ואייקון בלבד.',
      'וריאציות צבע: סגול (ברירת מחדל), לבן (רקע כהה), שחור, ציאן, גרדיאנט.',
      'השתמשו בגרסה הסגולה על רקע בהיר ובגרסה הלבנה על רקע כהה.',
      'מרווח מינימלי: גובה האייקון מכל צד.',
      'אין לעוות, לסובב, לשנות צבעים או להוסיף אפקטים ללוגו.',
    ],
  },
]

export function getAllBrandDocs(): Array<
  RequiredDataFromCollectionSlug<'brand-docs'> & { slug: string }
> {
  return brandDocs.map((doc) => ({
    title: doc.title,
    slug: doc.slug,
    summary: doc.summary,
    content: richTextMultiParagraph(doc.content) as any,
    docType: doc.docType as any,
    icon: doc.icon as any,
    sortOrder: doc.sortOrder,
    publishedAt: new Date().toISOString(),
    _status: 'published' as const,
    meta: {
      title: `${doc.title} | ZUZY Brand`,
      description: doc.summary,
    },
  }))
}

// ─── Brand Portal Pages (Payload Pages collection) ──────────────────────

function buildBrandDocsIndexPage(): RequiredDataFromCollectionSlug<'pages'> {
  return {
    title: 'Brand Docs',
    slug: 'brand-docs',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: richTextParagraph('מסמכי מותג ומערכת עיצוב') as any,
    },
    layout: [
      {
        blockType: 'heroBlock',
        heading: 'מסמכי המותג של ZUZY',
        subheading:
          'כל מה שצריך לדעת על המותג — פילוסופיה, טון דיבור, מוצרים, בידול ומערכת עיצוב.',
        ctaLabel: 'מערכת עיצוב',
        ctaLink: '/brand-docs/design-system',
        style: 'centered',
      },
      {
        blockType: 'featuresBlock',
        heading: 'אסטרטגיית מותג',
        features: [
          {
            icon: '🧬',
            title: 'פילוסופיית המותג',
            description: 'ערכי ליבה, מנטרה והבטחת הברנד',
            link: '/brand-docs/brand-philosophy',
          },
          {
            icon: '🎙️',
            title: 'טון הדיבור',
            description: 'אישיות, שפה ומסרים מרכזיים',
            link: '/brand-docs/brand-voice',
          },
          {
            icon: '🧩',
            title: 'המוצרים שלנו',
            description: 'סקירת כל המוצרים והשירותים',
            link: '/brand-docs/products-overview',
          },
          {
            icon: '🎯',
            title: 'נוף תחרותי',
            description: 'בידול וזווית ייחודית',
            link: '/brand-docs/competitive-landscape',
          },
          {
            icon: '📈',
            title: 'אווטארים',
            description: 'קהלי יעד ופרופילי לקוחות',
            link: '/brand-docs/customer-avatars',
          },
        ],
        columns: 3,
      },
      {
        blockType: 'featuresBlock',
        heading: 'מערכת עיצוב',
        features: [
          {
            icon: '🎨',
            title: 'סקירת עיצוב',
            description: 'צבעים, טיפוגרפיה וטוקנים',
            link: '/brand-docs/design-system-overview',
          },
          {
            icon: '🖼️',
            title: 'הנחיות לוגו',
            description: 'שימוש נכון בלוגו',
            link: '/brand-docs/logo-usage-guidelines',
          },
          {
            icon: '✨',
            title: 'Design System Live',
            description: 'לוגואים, צבעים וטיפוגרפיה — אינטראקטיבי',
            link: '/brand-docs/design-system',
          },
        ],
        columns: 3,
      },
    ] as any,
    meta: {
      title: 'מסמכי מותג | ZUZY',
      description:
        'מסמכי המותג ומערכת העיצוב של ZUZY — פילוסופיה, טון דיבור, מוצרים, לוגואים וצבעים.',
    },
  }
}

function buildDesignSystemPage(): RequiredDataFromCollectionSlug<'pages'> {
  return {
    title: 'Design System',
    slug: 'design-system',
    _status: 'published',
    hero: {
      type: 'lowImpact',
      richText: richTextParagraph('מערכת העיצוב של ZUZY') as any,
    },
    layout: [
      {
        blockType: 'heroBlock',
        heading: 'מערכת העיצוב של ZUZY',
        subheading:
          'לוגואים, צבעים וטיפוגרפיה — כל הנכסים הוויזואליים במקום אחד.',
        style: 'centered',
      },
      {
        blockType: 'logoGrid',
        heading: 'ערכת לוגואים',
        description: '15 וריאציות SVG — אופקי, אנכי ואייקון. לחצו להורדה.',
      },
      {
        blockType: 'colorPalette',
        heading: 'פלטת הצבעים',
      },
      {
        blockType: 'typographySpecimen',
        heading: 'טיפוגרפיה',
      },
      {
        blockType: 'contentPipeline',
        heading: 'Content Pipeline',
      },
      {
        blockType: 'motionShowcase',
        heading: 'Motion Assets',
      },
      {
        blockType: 'interactiveDemo',
        heading: 'Interactive Demos',
      },
    ] as any,
    meta: {
      title: 'מערכת עיצוב | ZUZY Brand',
      description:
        'מערכת העיצוב של ZUZY — לוגואים להורדה, פלטת צבעים (סגול #7C3AED, טורקיז #0D9488), וטיפוגרפיה IBM Plex Sans Hebrew.',
    },
  }
}

export function getAllBrandDocsPages(): RequiredDataFromCollectionSlug<'pages'>[] {
  return [buildBrandDocsIndexPage(), buildDesignSystemPage()]
}
