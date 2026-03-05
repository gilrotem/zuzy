import React from 'react'
import type { RichContentBlock as RichContentBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const RichContentBlockComponent: React.FC<
  RichContentBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, content, image, imagePosition = 'right' }) => {
  const hasImage = image && typeof image === 'object'
  const isHorizontal = imagePosition === 'right' || imagePosition === 'left'

  return (
    <section className="container py-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{heading}</h2>
      )}
      <div
        className={cn({
          'grid md:grid-cols-2 gap-12 items-start': hasImage && isHorizontal,
        })}
      >
        {hasImage && imagePosition === 'top' && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <Media resource={image} imgClassName="w-full rounded-xl border border-border" />
          </div>
        )}
        {hasImage && imagePosition === 'left' && (
          <div className="rounded-xl overflow-hidden">
            <Media resource={image} imgClassName="w-full rounded-xl border border-border" />
          </div>
        )}
        <div>
          {content && <RichText data={content} enableGutter={false} />}
        </div>
        {hasImage && imagePosition === 'right' && (
          <div className="rounded-xl overflow-hidden">
            <Media resource={image} imgClassName="w-full rounded-xl border border-border" />
          </div>
        )}
        {hasImage && imagePosition === 'bottom' && (
          <div className="mt-8 rounded-xl overflow-hidden">
            <Media resource={image} imgClassName="w-full rounded-xl border border-border" />
          </div>
        )}
      </div>
    </section>
  )
}
