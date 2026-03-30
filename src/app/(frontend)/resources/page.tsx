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
import { Breadcrumbs, buildBreadcrumbs } from '@/components/Breadcrumbs'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export default async function ResourcesPage() {
  const { isEnabled: draft } = await draftMode()
  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({ slug: 'resources' })
  if (!page) return <PayloadRedirects url="/resources" />

  const { hero, layout } = page
  const siteUrl = getServerSideURL()
  const jsonLdType = (page.meta as any)?.jsonLdType || 'WebPage'

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <JsonLd data={generateWebPageJsonLd({ title: page.title, description: (page.meta as any)?.description, url: `${siteUrl}/resources`, datePublished: page.publishedAt || page.createdAt, dateModified: page.updatedAt, jsonLdType })} />
      <PayloadRedirects disableNotFound url="/resources" />
      {draft && <LivePreviewListener />}
      <div className="container mb-4">
        <Breadcrumbs items={buildBreadcrumbs({ collection: 'pages', collectionLabel: 'Pages', collectionPath: '', title: page.title, slug: 'resources', breadcrumbLabel: (page.meta as any)?.breadcrumbLabel })} />
      </div>
      <RenderHero {...hero} />
      <RenderBlocks blocks={layout ?? []} />
    </article>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({ slug: 'resources' })
  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({ collection: 'pages', draft, limit: 1, pagination: false, overrideAccess: draft, where: { slug: { equals: slug } } })
  return result.docs?.[0] || null
})
