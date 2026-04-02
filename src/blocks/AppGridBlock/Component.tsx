import React from 'react'
import type { AppGridBlock as AppGridBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const AppGridBlockComponent: React.FC<
  AppGridBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, apps }) => {
  return (
    <section className="container py-16">
      {heading && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{heading}</h2>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {apps?.map((app, i) => (
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
              {app.icon && typeof app.icon === 'object' ? (
                <Media
                  resource={app.icon}
                  imgClassName="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-muted rounded-lg" />
              )}
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
