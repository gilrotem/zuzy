import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'
import type { BrandAssetMap } from './brand-assets'

type HomeArgs = {
  metaImage: Media
  brandAssets?: BrandAssetMap
}

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

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  metaImage,
  brandAssets,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'none',
    },
    layout: [
      // 1. HeroBlock — centered, Hebrew heading with 2 CTAs
      {
        blockType: 'heroBlock',
        blockName: 'Hero',
        heading: 'הכל במקום אחד, מלוטש כמו יהלום',
        subheading: 'פלטפורמת SEO, שיווק דיגיטלי וניהול לקוחות — בכלי אחד חכם',
        style: 'centered',
        ...(brandAssets?.heroes.home && { backgroundImage: brandAssets.heroes.home.id }),
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
      // 2. FeaturesBlock — 6 features, 3 columns, cards style
      {
        blockType: 'featuresBlock',
        blockName: 'Features',
        heading: 'הכלים שיעשו את ההבדל',
        subheading: 'כל מה שצריך כדי לשלוט בנוכחות הדיגיטלית שלך',
        columns: '3',
        style: 'cards',
        features: [
          {
            title: 'SEO מתקדם',
            description: richTextParagraph(
              'ניתוח מילות מפתח, מעקב דירוגים ואופטימיזציה טכנית — הכל אוטומטי',
            ),
            ...(brandAssets?.appIcons.rankTracker && { image: brandAssets.appIcons.rankTracker.id }),
          },
          {
            title: 'מעקב דירוגים',
            description: richTextParagraph(
              'מעקב יומי אחרי דירוגי מילות מפתח בגוגל — עם היסטוריה ומגמות',
            ),
            ...(brandAssets?.appIcons.geoStrategy && { image: brandAssets.appIcons.geoStrategy.id }),
          },
          {
            title: 'בדיקת אתר טכנית',
            description: richTextParagraph(
              'סריקת האתר לבעיות טכניות, מהירות ונגישות — עם המלצות תיקון',
            ),
            ...(brandAssets?.appIcons.bottleneck && { image: brandAssets.appIcons.bottleneck.id }),
          },
          {
            title: 'עורך תוכן',
            description: richTextParagraph(
              'כתיבת ועריכת תוכן אופטימלי ל-SEO עם ניקוד והמלצות בזמן אמת',
            ),
            ...(brandAssets?.appIcons.contentDomination && { image: brandAssets.appIcons.contentDomination.id }),
          },
          {
            title: 'אנליטיקס ודוחות',
            description: richTextParagraph(
              'דשבורדים מותאמים אישית ודוחות שעוזרים לקבל החלטות מבוססות דאטה',
            ),
            ...(brandAssets?.appIcons.businessStrategy && { image: brandAssets.appIcons.businessStrategy.id }),
          },
          {
            title: 'עוזר AI חכם',
            description: richTextParagraph(
              'המלצות SEO חכמות, מחקר מילות מפתח אוטומטי ותובנות שחוסכות שעות',
            ),
            ...(brandAssets?.appIcons.smartAgent && { image: brandAssets.appIcons.smartAgent.id }),
          },
        ],
      },
      // 3. ProcessStepsBlock — 3 numbered steps
      {
        blockType: 'processStepsBlock',
        blockName: 'Process Steps',
        heading: 'שלושה צעדים להצלחה',
        subheading: 'ככה פשוט להתחיל',
        style: 'numbered',
        steps: [
          {
            stepNumber: 1,
            title: 'הרשמה',
            description: richTextParagraph('פותחים חשבון בחינם תוך דקה'),
          },
          {
            stepNumber: 2,
            title: 'חיבור האתר',
            description: richTextParagraph('מקשרים את האתר ומקבלים ניתוח ראשוני מיידי'),
          },
          {
            stepNumber: 3,
            title: 'קבלת תובנות',
            description: richTextParagraph('מקבלים המלצות מותאמות אישית ומתחילים לצמוח'),
          },
        ],
      },
      // 4. TestimonialsBlock — 3 founder quotes, cards style
      {
        blockType: 'testimonialsBlock',
        blockName: 'Testimonials',
        heading: 'מה אומרים עלינו',
        style: 'cards',
        testimonials: [
          {
            quote:
              'בנינו את ZUZY כי התעייפנו מלקפוץ בין עשרה כלים שונים. עכשיו הכל במקום אחד.',
            authorName: 'גיל',
            authorTitle: 'מייסד',
            authorCompany: 'ZUZY',
          },
          {
            quote: 'הגישה שלנו היא פשטות — כלי אחד שעושה הכל, בלי מורכבות מיותרת.',
            authorName: 'תאיר',
            authorTitle: 'אסטרטגיה ושיווק',
            authorCompany: 'ZUZY',
          },
          {
            quote:
              'כל פיצ\'ר שהוספנו עבר את המבחן: האם זה באמת עוזר לבעל עסק? אם לא — החוצה.',
            authorName: 'גיל',
            authorTitle: 'מייסד',
            authorCompany: 'ZUZY',
          },
        ],
      },
      // 5. CTABlock — bold style, richText body, 1 pricing link
      {
        blockType: 'ctaBlock',
        blockName: 'CTA',
        heading: 'מוכנים להתחיל לצמוח?',
        ...(brandAssets?.heroes.home && { backgroundImage: brandAssets.heroes.home.id }),
        richText: richTextParagraph(
          'הצטרפו לאלפי בעלי עסקים שכבר משתמשים ב-ZUZY כדי לשלוט בנוכחות הדיגיטלית שלהם.',
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
      // 6. FAQBlock — 6 Q&A items, accordion style
      {
        blockType: 'faqBlock',
        blockName: 'FAQ',
        heading: 'שאלות נפוצות',
        style: 'accordion',
        items: [
          {
            question: 'מה זה ZUZY?',
            answer: richTextParagraph(
              'ZUZY היא פלטפורמה דיגיטלית שמאחדת SEO, שיווק דיגיטלי, ניהול תוכן ו-CRM בכלי אחד — במקום לעבוד עם עשרות כלים שונים.',
            ),
          },
          {
            question: 'למי ZUZY מתאימה?',
            answer: richTextParagraph(
              'לבעלי עסקים, משווקים דיגיטליים, סוכנויות ופרילנסרים שרוצים לנהל את כל הנוכחות הדיגיטלית שלהם ממקום אחד.',
            ),
          },
          {
            question: 'האם יש תקופת ניסיון חינם?',
            answer: richTextParagraph(
              'כן, ניתן להתחיל עם תקופת ניסיון חינם ללא צורך בכרטיס אשראי.',
            ),
          },
          {
            question: 'האם ZUZY מתאימה לאתרים בעברית?',
            answer: richTextParagraph(
              'בהחלט. ZUZY נבנתה מהיסוד עם תמיכה מלאה בעברית ו-RTL, כולל ניתוח SEO למילות מפתח בעברית.',
            ),
          },
          {
            question: 'איך ZUZY שונה מכלים כמו Semrush או Ahrefs?',
            answer: richTextParagraph(
              'ZUZY משלבת SEO עם CRM, ניהול תוכן ואוטומציות שיווק — כלומר אתה מקבל יותר ערך בכלי אחד, במקום לשלם על ארבעה כלים נפרדים.',
            ),
          },
          {
            question: 'האם יש תמיכה טכנית?',
            answer: richTextParagraph(
              'כן, אנחנו מספקים תמיכה מלאה בעברית ובאנגלית דרך צ\'אט, אימייל וטלפון.',
            ),
          },
        ],
      },
    ],
    meta: {
      description: 'פלטפורמת SEO, שיווק דיגיטלי וניהול לקוחות — בכלי אחד חכם',
      image: metaImage.id,
      title: 'ZUZY — הכל במקום אחד',
      jsonLdType: 'WebPage',
    },
    title: 'Home',
  }
}
