import React from 'react'
import type { AppGridBlock as AppGridBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

const defaultApps = [
  {
    title: 'SEO Rank Tracker',
    icon: '/media/app-icons/01_seo_rank_tracker.png',
    link: '#',
  },
  {
    title: 'Content Domination',
    icon: '/media/app-icons/02_content_domination.png',
    link: '#',
  },
  {
    title: 'Geo Strategy Maker',
    icon: '/media/app-icons/03_geo_strategy_maker.png',
    link: '#',
  },
  {
    title: 'CRM',
    icon: '/media/app-icons/04_crm.png',
    link: '#',
  },
  {
    title: 'Smart Agent Bot',
    icon: '/media/app-icons/05_smart_agent_bot.png',
    link: '#',
  },
  {
    title: 'Social Lead Generator',
    icon: '/media/app-icons/06_social_lead_generator.png',
    link: '#',
  },
  {
    title: 'Business Strategy Planner',
    icon: '/media/app-icons/07_business_strategy_planner.png',
    link: '#',
  },
  {
    title: 'Bottleneck Identifier',
    icon: '/media/app-icons/08_bottleneck_identifier.png',
    link: '#',
  },
]

export const AppGridBlockComponent: React.FC<
  AppGridBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, apps }) => {
  const hasApps = apps && apps.length > 0

  return (
    <section className="container py-16">
      {heading && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {hasApps
          ? apps.map((app, i) => {
              const iconIsMedia = typeof app.icon === 'object' && app.icon !== null
              return (
                <a
                  key={app.id || i}
                  href={app.link}
                  className={cn(
                    'group flex flex-col items-center gap-3 p-4 rounded-xl',
                    'bg-card border border-border',
                    'transition-all duration-200',
                    'hover:shadow-lg hover:border-primary/30 hover:-translate-y-1',
                  )}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                    {iconIsMedia ? (
                      <Media
                        resource={app.icon}
                        imgClassName="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <img
                        src={typeof app.icon === 'string' ? app.icon : ''}
                        alt={app.title}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    )}
                  </div>
                  <span className="text-sm font-medium text-center leading-tight group-hover:text-primary transition-colors">
                    {app.title}
                  </span>
                </a>
              )
            })
          : defaultApps.map((app, i) => (
              <a
                key={i}
                href={app.link}
                className={cn(
                  'group flex flex-col items-center gap-3 p-4 rounded-xl',
                  'bg-card border border-border',
                  'transition-all duration-200',
                  'hover:shadow-lg hover:border-primary/30 hover:-translate-y-1',
                )}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                  <img
                    src={app.icon}
                    alt={app.title}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <span className="text-sm font-medium text-center leading-tight group-hover:text-primary transition-colors">
                  {app.title}
                </span>
              </a>
            ))}
      </div>
    </section>
  )
}
