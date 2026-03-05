import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { Media } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const currencySymbols: Record<string, string> = {
  ILS: '₪',
  USD: '$',
  EUR: '€',
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = products.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/products/' + decodedSlug
  const product = await queryProductBySlug({ slug: decodedSlug })

  if (!product) return <PayloadRedirects url={url} />

  const { title, featuredImage, description, price, currency, productCategories } = product

  const hasCategories =
    productCategories && Array.isArray(productCategories) && productCategories.length > 0

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {/* Hero section */}
      <div className="container">
        <div className="max-w-[48rem] mx-auto">
          {hasCategories && (
            <div className="uppercase text-sm mb-4 text-muted-foreground">
              {productCategories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const isLast = index === productCategories.length - 1
                  return (
                    <React.Fragment key={index}>
                      {category.title || 'Untitled'}
                      {!isLast && <>, &nbsp;</>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </div>
          )}

          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>

          {price != null && (
            <div className="text-2xl font-semibold mb-8">
              {currencySymbols[currency || 'ILS'] || currency} {price.toLocaleString()}
            </div>
          )}

          {featuredImage && typeof featuredImage !== 'string' && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <Media resource={featuredImage} />
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="flex flex-col items-center gap-4 pt-8">
          <div className="container">
            <RichText
              className="max-w-[48rem] mx-auto"
              data={description}
              enableGutter={false}
            />
          </div>
        </div>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const product = await queryProductBySlug({ slug: decodedSlug })

  return generateMeta({ doc: product })
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
