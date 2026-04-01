import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import { generateWebPageJsonLd, JsonLd } from '@/lib/json-ld'
import { getServerSideURL } from '@/utilities/getURL'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages', draft: false, limit: 1000, overrideAccess: false, pagination: false,
    select: { slug: true }, where: { 'parent.slug': { equals: 'support' } },
  })
  return pages.docs.map(({ slug }) => ({ slug: slug! }))
}

type Args = { params: Promise<{ slug?: string }> }

export default async function SupportDetailPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/support/${decodedSlug}`

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({ slug: decodedSlug, parentSlug: 'support' })
  if (!page) return <PayloadRedirects url={url} />

  const { hero, layout } = page
  const siteUrl = getServerSideURL()
  const pageUrl = `${siteUrl}/support/${decodedSlug}`
  const jsonLdType = (page.meta as any)?.jsonLdType || 'WebPage'
  const breadcrumbLabel = (page.meta as any)?.breadcrumbLabel || page.title

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <JsonLd data={generateWebPageJsonLd({ title: page.title, description: (page.meta as any)?.description, url: pageUrl, datePublished: page.publishedAt || page.createdAt, dateModified: page.updatedAt, jsonLdType })} />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <div className="container mb-4">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'תמיכה', href: '/support' }, { label: breadcrumbLabel, href: `/support/${decodedSlug}` }]} />
      </div>
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout ?? []} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const page = await queryPageBySlug({ slug: decodeURIComponent(slug), parentSlug: 'support' })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug, parentSlug }: { slug: string; parentSlug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'pages', draft, limit: 1, pagination: false, overrideAccess: draft, where: { slug: { equals: slug }, 'parent.slug': { equals: parentSlug } } })
  return result.docs?.[0] || null
})
