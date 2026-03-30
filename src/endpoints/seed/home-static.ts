import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'ZUZY — הכל במקום אחד',
                version: 1,
              },
            ],
            direction: 'rtl',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'פלטפורמת SEO, שיווק דיגיטלי וניהול לקוחות — בכלי אחד חכם. ',
                version: 1,
              },
              {
                type: 'link',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'כניסה לממשק הניהול',
                    version: 1,
                  },
                ],
                direction: 'rtl',
                fields: {
                  linkType: 'custom',
                  newTab: false,
                  url: '/admin',
                },
                format: '',
                indent: 0,
                version: 2,
              },
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: ' כדי להתחיל לנהל את התוכן.',
                version: 1,
              },
            ],
            direction: 'rtl',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'rtl',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  meta: {
    description: 'פלטפורמת SEO, שיווק דיגיטלי וניהול לקוחות — בכלי אחד חכם',
    title: 'ZUZY — הכל במקום אחד',
  },
  title: 'Home',
  layout: [],
}
