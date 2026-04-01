import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getServerSideURL } from '@/utilities/getURL'
import { INDEXABLE_COLLECTIONS, COLLECTION_PATHS } from '@/lib/seo-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config: configPromise })
  const siteUrl = getServerSideURL()
  const entries: MetadataRoute.Sitemap = []

  // Fetch excluded paths from SEO Settings
  let excludedPaths: string[] = []
  try {
    const seoSettings = await payload.findGlobal({ slug: 'seo-settings' as any }) as any
    excludedPaths = (seoSettings?.sitemapExcludePaths || [])
      .map((item: any) => item.path)
      .filter(Boolean)
  } catch {
    // Continue with empty excludes
  }

  for (const collection of INDEXABLE_COLLECTIONS) {
    const prefix = COLLECTION_PATHS[collection] ?? ''

    try {
      const { docs } = await payload.find({
        collection,
        limit: 1000,
        select: {
          slug: true,
          updatedAt: true,
          meta: true,
          breadcrumbs: true,
        },
        where: {
          _status: { equals: 'published' },
        },
      })

      for (const doc of docs) {
        const slug = (doc as { slug?: string }).slug
        if (!slug) continue

        // Skip pages with noindex robots override
        const meta = (doc as any).meta
        const robotsOverride: string[] | undefined = meta?.robotsOverride
        if (robotsOverride && robotsOverride.includes('noindex')) continue

        // Use breadcrumbs URL if available (nested-docs), otherwise fall back to prefix/slug
        const breadcrumbs = (doc as any).breadcrumbs as Array<{ url?: string }> | undefined
        const breadcrumbUrl = breadcrumbs?.length ? breadcrumbs[breadcrumbs.length - 1]?.url : null
        const path = collection === 'pages' && slug === 'home' ? '' : (breadcrumbUrl || `${prefix}/${slug}`)

        // Skip excluded paths
        if (excludedPaths.some((excluded) => path === excluded || path.startsWith(excluded + '/'))) {
          continue
        }

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
