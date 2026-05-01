import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { COLLECTION_PATHS } from '@/lib/seo-config'
import type { Search as SearchDoc } from '@/payload-types'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

function buildHref(doc: SearchDoc['doc'], slug?: string | null): string {
  if (!slug) return '/'
  const prefix = COLLECTION_PATHS[doc.relationTo] ?? ''
  return `${prefix}/${slug}`
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const results = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              { title: { like: query } },
              { 'meta.description': { like: query } },
              { 'meta.title': { like: query } },
              { slug: { like: query } },
            ],
          },
        }
      : {}),
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-4">
        <Breadcrumbs items={[
          { label: 'Home', href: '/' },
          { label: 'חיפוש', href: '/search' },
        ]} />
      </div>
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1 className="mb-8 lg:mb-16">Search</h1>
          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {results.totalDocs > 0 ? (
        <div className="container">
          <ul className="max-w-[50rem] mx-auto space-y-6">
            {results.docs.map((result) => {
              const r = result as SearchDoc
              const title = r.meta?.title || r.title || r.slug || 'Untitled'
              const description = r.meta?.description
              const href = buildHref(r.doc, r.slug)
              return (
                <li key={r.id} className="border-b border-border pb-4">
                  <Link href={href} className="block group">
                    <h3 className="text-lg font-semibold group-hover:underline">{title}</h3>
                    {description && (
                      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                    )}
                    <span className="mt-1 block text-xs text-muted-foreground">{href}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Search | ZUZY',
    robots: { index: false, follow: false },
  }
}
