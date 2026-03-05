import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { INDEXABLE_COLLECTIONS, COLLECTION_PATHS } from '@/lib/seo-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const siteUrl = getServerSideURL()
  const entries: MetadataRoute.Sitemap = []

  for (const collection of INDEXABLE_COLLECTIONS) {
    const prefix = COLLECTION_PATHS[collection] ?? ''

    try {
      const { docs } = await payload.find({
        collection,
        limit: 1000,
        select: {
          slug: true,
          updatedAt: true,
        },
        where: {
          _status: { equals: 'published' },
        },
      })

      for (const doc of docs) {
        const slug = (doc as { slug?: string }).slug
        if (!slug) continue

        const path = collection === 'pages' && slug === 'home' ? '' : `${prefix}/${slug}`

        entries.push({
          url: `${siteUrl}${path}`,
          lastModified: (doc as { updatedAt?: string }).updatedAt
            ? new Date((doc as { updatedAt?: string }).updatedAt!)
            : new Date(),
          changeFrequency: collection === 'pages' ? 'weekly' : 'monthly',
          priority: collection === 'pages' ? 1.0 : 0.8,
        })
      }
    } catch {
      // Collection might not have _status field, skip it
      continue
    }
  }

  return entries
}
