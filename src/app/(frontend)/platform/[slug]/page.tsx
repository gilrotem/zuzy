import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { generateWebPageJsonLd, generateFAQJsonLd, JsonLd } from '@/lib/json-ld'
import { getServerSideURL } from '@/utilities/getURL'
import { lexicalToPlainText } from '@/lib/lexical-to-text'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
    where: {
      'parent.slug': {
        equals: 'platform',
      },
    },
  })

  const params = pages.docs.map(({ slug }) => ({
    slug: slug!,
  }))

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function PlatformModulePage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/platform/${decodedSlug}`

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({ slug: decodedSlug, parentSlug: 'platform' })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const siteUrl = getServerSideURL()
  const pageUrl = `${siteUrl}/platform/${decodedSlug}`

  const jsonLdType = (page.meta as any)?.jsonLdType || 'WebPage'

  const webPageJsonLd = generateWebPageJsonLd({
    title: page.title,
    description: (page.meta as any)?.description || undefined,
    url: pageUrl,
    datePublished: page.publishedAt || page.createdAt,
    dateModified: page.updatedAt,
    jsonLdType,
  })

  // Extract FAQ items from FAQ blocks for FAQPage schema
  const faqBlocks = (layout || []).filter(
    (block) => block.blockType === 'faqBlock',
  )
  const faqItems = faqBlocks.flatMap((block: any) =>
    (block.items || [])
      .filter((item: any) => item.question)
      .map((item: any) => ({
        question: item.question,
        answer: lexicalToPlainText(item.answer),
      })),
  )

  // Build breadcrumbs: Home > Platform > [Module Name]
  const breadcrumbLabel = (page.meta as any)?.breadcrumbLabel || page.title
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'הפלטפורמה', href: '/platform' },
    { label: breadcrumbLabel, href: `/platform/${decodedSlug}` },
  ]

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <JsonLd data={webPageJsonLd} />
      {faqItems.length > 0 && <JsonLd data={generateFAQJsonLd(faqItems)} />}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <div className="container mb-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout ?? []} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({ slug: decodedSlug, parentSlug: 'platform' })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, parentSlug }: { slug: string; parentSlug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
      'parent.slug': {
        equals: parentSlug,
      },
    },
  })

  return result.docs?.[0] || null
})
