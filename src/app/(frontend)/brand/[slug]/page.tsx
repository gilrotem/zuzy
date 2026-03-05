import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { generateMeta } from '@/utilities/generateMeta'
import RichText from '@/components/RichText'
import PageClient from './page.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const brandDocs = await payload.find({
    collection: 'brand-docs',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return brandDocs.docs?.map(({ slug }) => ({ slug: slug || '' })) || []
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function BrandDocPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const _draft = await draftMode()

  const brandDoc = await queryBrandDocBySlug({ slug: decodedSlug })

  if (!brandDoc) {
    return <div className="container py-16">Not found</div>
  }

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <div className="container">
        <div className="flex items-center gap-3 mb-6">
          {brandDoc.icon && <span className="text-4xl">{getIconEmoji(brandDoc.icon)}</span>}
          <h1 className="text-4xl md:text-5xl font-bold">{brandDoc.title}</h1>
        </div>
        {brandDoc.summary && (
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">{brandDoc.summary}</p>
        )}
        {brandDoc.content && (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <RichText data={brandDoc.content} enableGutter={false} />
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const brandDoc = await queryBrandDocBySlug({ slug })
  return generateMeta({ doc: brandDoc })
}

const queryBrandDocBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'brand-docs',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: { equals: slug },
    },
  })
  return result.docs?.[0] || null
})

function getIconEmoji(icon: string): string {
  const iconMap: Record<string, string> = {
    dna: '🧬',
    mic: '🎙️',
    briefcase: '💼',
    target: '🎯',
    gear: '⚙️',
    chart: '📈',
    puzzle: '🧩',
    question: '❓',
    clipboard: '📋',
  }
  return iconMap[icon] || icon
}
