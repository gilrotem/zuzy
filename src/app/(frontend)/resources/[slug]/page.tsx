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
    select: { slug: true }, where: { slug: { like: 'resources--%' } },
  })
  return pages.docs.map(({ slug }) => ({ slug: slug!.replace('resources--', '') }))
}

type Args = { params: Promise<{ slug?: string }> }

export default async function ResourceDetailPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const payloadSlug = `resources--${decodedSlug}`
  const url = `/resources/${decodedSlug}`

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({ slug: payloadSlug })
  if (!page) return <PayloadRedirects url={url} />

  const { hero, layout } = page
  const siteUrl = getServerSideURL()
  const pageUrl = `${siteUrl}/resources/${decodedSlug}`
  const jsonLdType = (page.meta as any)?.jsonLdType || 'WebPage'
  const breadcrumbLabel = (page.meta as any)?.breadcrumbLabel || page.title

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <JsonLd data={generateWebPageJsonLd({ title: page.title, description: (page.meta as any)?.description, url: pageUrl, datePublished: page.publishedAt || page.createdAt, dateModified: page.updatedAt, jsonLdType })} />
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <div className="container mb-4">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'משאבים', href: '/resources' }, { label: breadcrumbLabel, href: `/resources/${decodedSlug}` }]} />
      </div>
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout ?? []} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const page = await queryPageBySlug({ slug: `resources--${decodeURIComponent(slug)}` })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'pages', draft, limit: 1, pagination: false, overrideAccess: draft, where: { slug: { equals: slug } } })
  return result.docs?.[0] || null
})
