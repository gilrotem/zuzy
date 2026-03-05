import React from 'react'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const HeroBlockComponent: React.FC<HeroBlockProps & { disableInnerContainer?: boolean }> = ({
  heading,
  subheading,
  richText,
  backgroundImage,
  links,
  style = 'default',
}) => {
  return (
    <section
      className={cn('relative py-20 md:py-32', {
        'text-center': style === 'centered' || style === 'fullScreen',
        'min-h-screen flex items-center': style === 'fullScreen',
      })}
    >
      {backgroundImage && typeof backgroundImage === 'object' && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <Media resource={backgroundImage} imgClassName="w-full h-full object-cover opacity-20" />
        </div>
      )}
      <div
        className={cn('container', {
          'grid md:grid-cols-2 gap-12 items-center': style === 'withImage',
        })}
      >
        <div className="max-w-3xl">
          {heading && <h1 className="text-4xl md:text-6xl font-bold mb-6">{heading}</h1>}
          {subheading && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">{subheading}</p>
          )}
          {richText && <RichText data={richText} enableGutter={false} className="mb-8" />}
          {links && links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {links.map(({ link }: any, i: number) => (
                <CMSLink key={i} size="lg" {...link} />
              ))}
            </div>
          )}
        </div>
        {style === 'withImage' && backgroundImage && typeof backgroundImage === 'object' && (
          <div className="relative">
            <Media resource={backgroundImage} imgClassName="rounded-xl border border-border" />
          </div>
        )}
      </div>
    </section>
  )
}
