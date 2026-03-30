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

// Multi-paragraph richText for longer legal content
function richTextMultiParagraph(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
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
      })),
      direction: 'rtl' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

// ─── Pricing Page (D14) ───────────────────────────────────────────

export function buildPricingPage(): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: 'pricing',
    _status: 'published',
    title: 'תמחור',
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: 'Hero - Pricing',
        heading: 'תמחור פשוט ושקוף',
        subheading: 'בחר את התוכנית שמתאימה לעסק שלך. שדרג או בטל בכל זמן.',
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
        blockType: 'pricingBlock',
        blockName: 'Pricing Plans',
        heading: 'התוכניות שלנו',
        subheading: 'כל התוכניות כוללות תקופת ניסיון של 14 יום בחינם',
        plans: [
          {
            name: 'Free',
            price: '₪0/חודש',
            description: richTextParagraph('מושלם להתחלה — גלה את הפוטנציאל של האתר שלך'),
            highlighted: false,
            features: [
              { feature: 'מעקב עד 10 מילות מפתח', included: true },
              { feature: 'בדיקת אתר בסיסית', included: true },
              { feature: 'דוח חודשי אחד', included: true },
              { feature: 'עוזר AI', included: false },
              { feature: 'דוחות ללקוחות', included: false },
              { feature: 'תמיכה בצ\'אט', included: false },
            ],
            links: [
              {
                link: {
                  type: 'custom',
                  url: 'https://core.zuzy.co.il/signup',
                  label: 'התחל בחינם',
                  appearance: 'outline',
                },
              },
            ],
          },
          {
            name: 'Pro',
            price: '₪199/חודש',
            description: richTextParagraph('לבעלי עסקים ומשווקים שרוצים לצמוח'),
            highlighted: true,
            features: [
              { feature: 'מעקב עד 500 מילות מפתח', included: true },
              { feature: 'בדיקת אתר מלאה', included: true },
              { feature: 'דוחות ללא הגבלה', included: true },
              { feature: 'עוזר AI חכם', included: true },
              { feature: 'דוחות ללקוחות', included: true },
              { feature: 'תמיכה בצ\'אט ואימייל', included: true },
            ],
            links: [
              {
                link: {
                  type: 'custom',
                  url: 'https://core.zuzy.co.il/signup?plan=pro',
                  label: 'התחל ניסיון חינם',
                  appearance: 'default',
                },
              },
            ],
          },
          {
            name: 'Agency',
            price: '₪499/חודש',
            description: richTextParagraph('לסוכנויות שמנהלות מספר לקוחות'),
            highlighted: false,
            features: [
              { feature: 'מעקב עד 5,000 מילות מפתח', included: true },
              { feature: 'בדיקת אתר ללא הגבלה', included: true },
              { feature: 'דוחות White Label', included: true },
              { feature: 'עוזר AI מתקדם', included: true },
              { feature: 'ניהול עד 20 לקוחות', included: true },
              { feature: 'תמיכה טלפונית + מנהל חשבון', included: true },
            ],
            links: [
              {
                link: {
                  type: 'custom',
                  url: 'https://core.zuzy.co.il/signup?plan=agency',
                  label: 'התחל ניסיון חינם',
                  appearance: 'outline',
                },
              },
            ],
          },
        ],
      },
      {
        blockType: 'faqBlock',
        blockName: 'Pricing FAQ',
        heading: 'שאלות נפוצות על תמחור',
        style: 'accordion',
        items: [
          {
            question: 'האם יש תקופת ניסיון חינם?',
            answer: richTextParagraph(
              'כן, כל התוכניות בתשלום כוללות 14 יום ניסיון חינם. לא נדרש כרטיס אשראי להתחלה.',
            ),
          },
          {
            question: 'האם אפשר לשדרג או לשנמך תוכנית?',
            answer: richTextParagraph(
              'בהחלט. אפשר לשדרג או לשנמך בכל זמן מהגדרות החשבון. השינוי ייכנס לתוקף מיידית.',
            ),
          },
          {
            question: 'מהם אמצעי התשלום?',
            answer: richTextParagraph(
              'אנחנו מקבלים כרטיסי אשראי (ויזה, מאסטרקארד, אמריקן אקספרס) וחיוב בנקאי ישיר. חשבוניות מופקות אוטומטית.',
            ),
          },
          {
            question: 'האם יש מחויבות לתקופה?',
            answer: richTextParagraph(
              'לא. כל התוכניות הן חודשיות וניתן לבטל בכל זמן. אין עמלת ביטול.',
            ),
          },
          {
            question: 'מה ההבדל בין Pro ל-Agency?',
            answer: richTextParagraph(
              'תוכנית Agency מיועדת לסוכנויות שמנהלות מספר לקוחות. היא כוללת ניהול מרובה לקוחות, דוחות White Label ותמיכה טלפונית עם מנהל חשבון ייעודי.',
            ),
          },
          {
            question: 'האם יש הנחה לתשלום שנתי?',
            answer: richTextParagraph(
              'כן, תשלום שנתי מעניק הנחה של 20% לעומת תשלום חודשי. פנה אלינו לפרטים.',
            ),
          },
        ],
      },
      {
        blockType: 'ctaBlock',
        blockName: 'CTA - Pricing',
        heading: 'עדיין לא בטוחים?',
        richText: richTextParagraph(
          'דברו איתנו. נשמח לעזור לכם לבחור את התוכנית המתאימה ביותר לעסק שלכם.',
        ),
        style: 'default',
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
              url: '/contact',
              label: 'צור קשר',
              appearance: 'outline',
            },
          },
        ],
      },
    ],
    meta: {
      title: 'תמחור — ZUZY',
      description:
        'תמחור פשוט ושקוף. תוכניות Free, Pro ו-Agency לכל גודל עסק. התחל תקופת ניסיון חינם של 14 יום.',
      jsonLdType: 'WebPage',
    },
  }
}

// ─── Legal Pages (D17) ────────────────────────────────────────────

type LegalPageDef = {
  slug: string
  title: string
  heading: string
  paragraphs: string[]
}

const legalPages: LegalPageDef[] = [
  {
    slug: 'terms',
    title: 'תנאי שימוש',
    heading: 'תנאי שימוש',
    paragraphs: [
      'ברוכים הבאים ל-ZUZY. תנאי שימוש אלה מסדירים את השימוש שלך באתר ובשירותים שלנו. בשימוש באתר אתה מסכים לתנאים אלה.',
      'ZUZY מספקת פלטפורמת SEO ושיווק דיגיטלי ("השירות"). השירות מיועד לשימוש עסקי ואישי כאחד.',
      'אנו שומרים לעצמנו את הזכות לעדכן תנאים אלה מעת לעת. שינויים מהותיים יפורסמו באתר ויישלחו בהתראה.',
      'לשאלות בנוגע לתנאי השימוש, ניתן לפנות אלינו בכתובת legal@zuzy.co.il.',
    ],
  },
  {
    slug: 'privacy',
    title: 'מדיניות פרטיות',
    heading: 'מדיניות פרטיות',
    paragraphs: [
      'ב-ZUZY אנחנו מחויבים להגנה על הפרטיות שלך. מדיניות זו מסבירה כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך.',
      'אנו אוספים מידע שאתה מספק לנו ישירות: שם, כתובת אימייל, פרטי חיוב ונתוני שימוש בשירות.',
      'אנו משתמשים במידע כדי לספק את השירות, לשפר את חוויית המשתמש, ולשלוח עדכונים רלוונטיים.',
      'אנו לא מוכרים או משתפים מידע אישי עם צדדים שלישיים, למעט כנדרש על פי חוק או לצורך אספקת השירות.',
      'לשאלות בנוגע לפרטיות, ניתן לפנות אלינו בכתובת privacy@zuzy.co.il.',
    ],
  },
  {
    slug: 'cookies',
    title: 'מדיניות עוגיות',
    heading: 'מדיניות עוגיות',
    paragraphs: [
      'אתר ZUZY משתמש בעוגיות (Cookies) כדי לשפר את חוויית הגלישה שלך ולספק שירות מותאם אישית.',
      'עוגיות הכרחיות: נדרשות לפעולת האתר, כגון שמירת מצב התחברות והעדפות שפה.',
      'עוגיות אנליטיות: עוזרות לנו להבין כיצד מבקרים משתמשים באתר, באמצעות Google Analytics.',
      'עוגיות שיווקיות: מאפשרות הצגת תוכן ופרסום מותאם אישית.',
      'באפשרותך לנהל את העדפות העוגיות שלך דרך הגדרות הדפדפן או דרך באנר ההסכמה באתר.',
    ],
  },
  {
    slug: 'security',
    title: 'אבטחה',
    heading: 'אבטחת מידע',
    paragraphs: [
      'ב-ZUZY אנחנו לוקחים את אבטחת המידע ברצינות רבה. אנחנו מיישמים אמצעי אבטחה מתקדמים כדי להגן על הנתונים שלך.',
      'כל התקשורת עם השרתים שלנו מוצפנת באמצעות TLS 1.3. נתונים רגישים מאוחסנים בהצפנה מלאה.',
      'אנו מבצעים בדיקות אבטחה סדירות, כולל סריקות חולשות ובדיקות חדירה.',
      'הגישה למערכות הפנימיות מוגבלת ומבוקרת באמצעות הרשאות מדורגות ואימות דו-שלבי.',
      'לדיווח על בעיות אבטחה, ניתן לפנות אלינו בכתובת security@zuzy.co.il.',
    ],
  },
]

function buildLegalPage(def: LegalPageDef): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: `legal--${def.slug}`,
    _status: 'published',
    title: def.title,
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'richContentBlock',
        blockName: `Content - ${def.title}`,
        heading: def.heading,
        content: richTextMultiParagraph(def.paragraphs),
      },
    ],
    meta: {
      title: `${def.title} — ZUZY`,
      description: def.paragraphs[0],
      jsonLdType: 'WebPage',
      robotsOverride: ['noarchive'],
    },
  }
}

function buildLegalIndexPage(): RequiredDataFromCollectionSlug<'pages'> {
  return {
    slug: 'legal',
    _status: 'published',
    title: 'מידע משפטי',
    hero: { type: 'none' },
    layout: [
      {
        blockType: 'heroBlock',
        blockName: 'Hero - Legal',
        heading: 'מידע משפטי',
        subheading: 'תנאי שימוש, פרטיות ואבטחה',
        style: 'centered',
      },
      {
        blockType: 'featuresBlock',
        blockName: 'Legal Pages',
        columns: '2',
        style: 'cards',
        features: legalPages.map((p) => ({
          icon: p.slug === 'terms' ? '📜' : p.slug === 'privacy' ? '🔒' : p.slug === 'cookies' ? '🍪' : '🛡️',
          title: p.title,
          description: richTextParagraph(p.paragraphs[0]),
        })),
      },
    ],
    meta: {
      title: 'מידע משפטי — ZUZY',
      description: 'תנאי שימוש, מדיניות פרטיות, מדיניות עוגיות ואבטחת מידע של ZUZY.',
      jsonLdType: 'WebPage',
    },
  }
}

export function getAllPricingLegalPages(): RequiredDataFromCollectionSlug<'pages'>[] {
  return [
    buildPricingPage(),
    buildLegalIndexPage(),
    ...legalPages.map(buildLegalPage),
  ]
}

// D17 redirect definitions
export const legalRedirects = [
  { from: '/privacy', to: '/legal/privacy' },
  { from: '/terms', to: '/legal/terms' },
  { from: '/accessibility', to: '/legal/security' },
]
