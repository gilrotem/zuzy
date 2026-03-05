'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Product } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardProductData = Pick<
  Product,
  'slug' | 'title' | 'price' | 'currency' | 'featuredImage' | 'productCategories'
>

const currencySymbols: Record<string, string> = {
  ILS: '₪',
  USD: '$',
  EUR: '€',
}

export const ProductCard: React.FC<{
  className?: string
  doc?: CardProductData
  showCategories?: boolean
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, showCategories } = props

  const { slug, title, price, currency, featuredImage, productCategories } = doc || {}

  const hasCategories =
    productCategories && Array.isArray(productCategories) && productCategories.length > 0

  const href = `/products/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full">
        {!featuredImage && <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground text-sm">No image</div>}
        {featuredImage && typeof featuredImage !== 'string' && (
          <Media resource={featuredImage} size="33vw" />
        )}
      </div>
      <div className="p-4">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-2 text-muted-foreground">
            {productCategories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: catTitle } = category
                const isLast = index === productCategories.length - 1
                return (
                  <React.Fragment key={index}>
                    {catTitle || 'Untitled'}
                    {!isLast && <>, &nbsp;</>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>
        )}

        {title && (
          <div className="prose">
            <h3>
              <Link className="not-prose" href={href} ref={link.ref}>
                {title}
              </Link>
            </h3>
          </div>
        )}

        {price != null && (
          <div className="mt-2 text-lg font-semibold">
            {currencySymbols[currency || 'ILS'] || currency} {price.toLocaleString()}
          </div>
        )}
      </div>
    </article>
  )
}
