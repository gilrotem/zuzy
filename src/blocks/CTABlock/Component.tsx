import React from 'react'
import type { CTABlock as CTABlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const CTABlockComponent: React.FC<CTABlockProps & { disableInnerContainer?: boolean }> = ({
  heading,
  richText,
  links,
  backgroundImage,
  style = 'default',
}) => {
  return (
    <section
      className={cn('relative py-16 md:py-24', {
        'bg-primary text-primary-foreground': style === 'bold',
        'bg-card': style === 'withBackground',
      })}
    >
      {backgroundImage && typeof backgroundImage === 'object' && style === 'withBackground' && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Media
            resource={backgroundImage}
            imgClassName="w-full h-full object-cover opacity-10"
          />
        </div>
      )}
      <div className="container text-center max-w-3xl mx-auto">
        {heading && (
          <h2 className={cn('text-3xl md:text-4xl font-bold mb-6', {
            'text-2xl': style === 'minimal',
          })}>{heading}</h2>
        )}
        {richText && (
          <RichText data={richText} enableGutter={false} className="mb-8" />
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center">
            {links.map(({ link }, i) => (
              <CMSLink key={i} size="lg" {...link} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
