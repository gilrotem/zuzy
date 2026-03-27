import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { generateWebPageJsonLd, generateFAQJsonLd, JsonLd } from '@/lib/json-ld'
import { getServerSideURL } from '@/utilities/getURL'
import { lexicalToPlainText } from '@/lib/lexical-to-text'
import { Breadcrumbs, buildBreadcrumbs } from '@/components/Breadcrumbs'
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
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const siteUrl = getServerSideURL()
  const pageUrl = slug === 'home' ? siteUrl : `${siteUrl}/${decodedSlug}`

  // Detect JSON-LD type from advanced SEO field or auto-detect
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

  const breadcrumbItems = buildBreadcrumbs({
    collection: 'pages',
    collectionLabel: 'Pages',
    collectionPath: '',
    title: page.title,
    slug: decodedSlug,
    breadcrumbLabel: (page.meta as any)?.breadcrumbLabel,
  })

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <JsonLd data={webPageJsonLd} />
      {faqItems.length > 0 && <JsonLd data={generateFAQJsonLd(faqItems)} />}
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      {decodedSlug !== 'home' && (
        <div className="container mb-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      )}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout ?? []} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
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
    },
  })

  return result.docs?.[0] || null
})
