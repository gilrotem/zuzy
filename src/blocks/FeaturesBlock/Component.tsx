import React from 'react'
import type { FeaturesBlock as FeaturesBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const FeaturesBlockComponent: React.FC<
  FeaturesBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, subheading, features, columns = '3', style = 'cards' }) => {
  const gridCols = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="container py-16">
      {(heading || subheading) && (
        <div className="text-center mb-12">
          {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {subheading && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subheading}</p>}
        </div>
      )}
      <div className={cn('grid gap-8', gridCols[columns as keyof typeof gridCols] || 'md:grid-cols-3')}>
        {features?.map((feature, i: number) => (
          <div
            key={i}
            className={cn('flex flex-col', {
              'bg-card rounded-xl border border-border p-6': style === 'cards',
              'flex-row gap-4 items-start': style === 'list',
              'text-center items-center': style === 'grid',
            })}
          >
            {feature.icon && (
              <span className="text-3xl mb-4 block">{feature.icon}</span>
            )}
            {feature.image && typeof feature.image === 'object' && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <Media resource={feature.image} imgClassName="w-full h-48 object-cover" />
              </div>
            )}
            {feature.title && (
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            )}
            {feature.description && (
              <RichText data={feature.description} enableGutter={false} className="text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
