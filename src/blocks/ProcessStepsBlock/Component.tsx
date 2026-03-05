import React from 'react'
import type { ProcessStepsBlock as ProcessStepsBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const ProcessStepsBlockComponent: React.FC<
  ProcessStepsBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, subheading, steps, style = 'timeline' }) => {
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
        className={cn({
          'max-w-3xl mx-auto': style === 'timeline',
          'grid md:grid-cols-2 lg:grid-cols-3 gap-8': style === 'cards',
        })}
      >
        {steps?.map((step, i: number) => {
          const stepNum = step.stepNumber || i + 1

          if (style === 'cards') {
            return (
              <div key={i} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  {step.icon ? (
                    <span className="text-2xl">{step.icon}</span>
                  ) : (
                    <span className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {stepNum}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                {step.description && (
                  <RichText
                    data={step.description}
                    enableGutter={false}
                    className="text-muted-foreground"
                  />
                )}
                {step.image && typeof step.image === 'object' && (
                  <div className="mt-4 rounded-lg overflow-hidden">
                    <Media resource={step.image} imgClassName="w-full" />
                  </div>
                )}
              </div>
            )
          }

          // Timeline / Numbered styles
          return (
            <div key={i} className="flex gap-6 mb-8 last:mb-0">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-lg',
                    'bg-primary text-primary-foreground',
                  )}
                >
                  {step.icon || stepNum}
                </div>
                {i < (steps?.length || 0) - 1 && <div className="w-0.5 flex-1 bg-border mt-2" />}
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                {step.description && (
                  <RichText
                    data={step.description}
                    enableGutter={false}
                    className="text-muted-foreground"
                  />
                )}
                {step.image && typeof step.image === 'object' && (
                  <div className="mt-4 rounded-lg overflow-hidden max-w-md">
                    <Media resource={step.image} imgClassName="w-full" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
