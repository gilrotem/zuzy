import type { Block } from 'payload'

export const AppGridBlock: Block = {
  slug: 'appGridBlock',
  interfaceName: 'AppGridBlock',
  labels: {
    singular: { he: 'גריד אפליקציות', en: 'App Grid' },
    plural: { he: 'גרידי אפליקציות', en: 'App Grids' },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: { he: 'כותרת', en: 'Heading' },
    },
    {
      name: 'apps',
      type: 'array',
      label: { he: 'אפליקציות', en: 'Apps' },
      minRows: 1,
      maxRows: 24,
      admin: {
        initCollapsed: true,
      },
      defaultValue: [
        { title: 'SEO Rank Tracker', icon: '/media/app-icons/01_seo_rank_tracker.png', link: '#' },
        { title: 'Content Domination', icon: '/media/app-icons/02_content_domination.png', link: '#' },
        { title: 'Geo Strategy Maker', icon: '/media/app-icons/03_geo_strategy_maker.png', link: '#' },
        { title: 'CRM', icon: '/media/app-icons/04_crm.png', link: '#' },
        { title: 'Smart Agent Bot', icon: '/media/app-icons/05_smart_agent_bot.png', link: '#' },
        { title: 'Social Lead Generator', icon: '/media/app-icons/06_social_lead_generator.png', link: '#' },
        { title: 'Business Strategy Planner', icon: '/media/app-icons/07_business_strategy_planner.png', link: '#' },
        { title: 'Bottleneck Identifier', icon: '/media/app-icons/08_bottleneck_identifier.png', link: '#' },
      ],
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: { he: 'שם האפליקציה', en: 'App Name' },
        },
        {
          name: 'icon',
          type: 'text',
          required: true,
          label: { he: 'אייקון (נתיב תמונה)', en: 'Icon (image path)' },
          admin: {
            description: {
              he: 'נתיב לתמונת האייקון, למשל: /media/app-icons/01_seo_rank_tracker.png',
              en: 'Path to icon image, e.g. /media/app-icons/01_seo_rank_tracker.png',
            },
          },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: { he: 'קישור', en: 'Link' },
          admin: {
            description: {
              he: 'כתובת URL של האפליקציה',
              en: 'App URL',
            },
          },
        },
      ],
    },
  ],
}
