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
import PageClient from '../page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

const PAYLOAD_SLUG = 'brand-docs--design-system'

export default async function DesignSystemPage() {
  const { isEnabled: draft } = await draftMode()
  const url = '/brand-docs/design-system'

  const page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({ slug: PAYLOAD_SLUG })

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const siteUrl = getServerSideURL()
  const pageUrl = `${siteUrl}/brand-docs/design-system`

  const webPageJsonLd = generateWebPageJsonLd({
    title: page.title,
    description: (page.meta as any)?.description || undefined,
    url: pageUrl,
    datePublished: page.publishedAt || page.createdAt,
    dateModified: page.updatedAt,
    jsonLdType: 'WebPage',
  })

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'מסמכי מותג', href: '/brand-docs' },
    { label: 'Design System', href: '/brand-docs/design-system' },
  ]

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <JsonLd data={webPageJsonLd} />
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

export async function generateMetadata(): Promise<Metadata> {
  const page = await queryPageBySlug({ slug: PAYLOAD_SLUG })
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
