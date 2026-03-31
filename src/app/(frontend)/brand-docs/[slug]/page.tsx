import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import RichText from '@/components/RichText'
import { generateMeta } from '@/utilities/generateMeta'
import { generateWebPageJsonLd, JsonLd } from '@/lib/json-ld'
import { getServerSideURL } from '@/utilities/getURL'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const docs = await payload.find({
    collection: 'brand-docs',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return docs.docs
    .filter((doc) => doc.slug)
    .map(({ slug }) => ({ slug: slug! }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function BrandDocDetailPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/brand-docs/${decodedSlug}`

  const doc = await queryDocBySlug({ slug: decodedSlug })

  if (!doc) {
    return <PayloadRedirects url={url} />
  }

  const siteUrl = getServerSideURL()
  const pageUrl = `${siteUrl}/brand-docs/${decodedSlug}`

  const webPageJsonLd = generateWebPageJsonLd({
    title: doc.title,
    description: (doc.meta as any)?.description || doc.summary || undefined,
    url: pageUrl,
    datePublished: doc.publishedAt || doc.createdAt,
    dateModified: doc.updatedAt,
    jsonLdType: 'WebPage',
  })

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'מסמכי מותג', href: '/brand-docs' },
    { label: (doc.meta as any)?.breadcrumbLabel || doc.title, href: url },
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

      <div className="container max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{doc.title}</h1>
          {doc.summary && (
            <p className="text-xl text-muted-foreground">{doc.summary}</p>
          )}
        </header>

        {doc.content && (
          <div className="prose prose-lg max-w-none">
            <RichText data={doc.content} enableGutter={false} />
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const doc = await queryDocBySlug({ slug: decodedSlug })

  return generateMeta({ doc: doc as any })
}

const queryDocBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'brand-docs',
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
