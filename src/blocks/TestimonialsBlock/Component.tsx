import React from 'react'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const TestimonialsBlockComponent: React.FC<
  TestimonialsBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, testimonials, style = 'cards' }) => {
  return (
    <section className="container py-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{heading}</h2>
      )}
      <div
        className={cn('grid gap-8', {
          'md:grid-cols-2 lg:grid-cols-3': style === 'cards' || style === 'grid',
          'max-w-3xl mx-auto': style === 'carousel',
        })}
      >
        {testimonials?.map((testimonial, i: number) => (
          <div
            key={i}
            className="bg-card rounded-xl border border-border p-6 flex flex-col"
          >
            {testimonial.rating && (
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-500">★</span>
                ))}
              </div>
            )}
            <blockquote className="text-lg mb-6 flex-1">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3 mt-auto">
              {testimonial.authorImage && typeof testimonial.authorImage === 'object' && (
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Media
                    resource={testimonial.authorImage}
                    imgClassName="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold">{testimonial.authorName}</p>
                {(testimonial.authorTitle || testimonial.authorCompany) && (
                  <p className="text-sm text-muted-foreground">
                    {testimonial.authorTitle}
                    {testimonial.authorTitle && testimonial.authorCompany && ' · '}
                    {testimonial.authorCompany}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
