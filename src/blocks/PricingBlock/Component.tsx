import React from 'react'
import type { PricingBlock as PricingBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const PricingBlockComponent: React.FC<
  PricingBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, subheading, plans }) => {
  return (
    <section className="container py-16">
      {(heading || subheading) && (
        <div className="text-center mb-12">
          {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {subheading && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subheading}</p>
          )}
        </div>
      )}
      <div
        className={cn('grid gap-8 items-stretch', {
          'md:grid-cols-2': plans && plans.length === 2,
          'md:grid-cols-3': plans && plans.length >= 3,
        })}
      >
        {plans?.map((plan, i: number) => (
          <div
            key={i}
            className={cn(
              'bg-card rounded-xl border p-8 flex flex-col',
              plan.highlighted
                ? 'border-primary ring-2 ring-primary/20 scale-105'
                : 'border-border',
            )}
          >
            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
            <p className="text-3xl font-bold mb-4">{plan.price}</p>
            {plan.description && (
              <RichText data={plan.description} enableGutter={false} className="text-muted-foreground mb-6" />
            )}
            {plan.features && plan.features.length > 0 && (
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <span className={f.included ? 'text-green-500' : 'text-muted-foreground line-through'}>
                      {f.included ? '✓' : '✗'}
                    </span>
                    <span className={cn({ 'text-muted-foreground line-through': !f.included })}>
                      {f.feature}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {plan.links && plan.links.length > 0 && (
              <div className="mt-auto">
                {plan.links.map(({ link }, j) => (
                  <CMSLink key={j} size="lg" className="w-full" {...link} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
