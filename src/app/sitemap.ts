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
          parent: true,
        },
        where: {
          _status: { equals: 'published' },
        },
      })

      // Resolve a doc's parent to a slug. `parent` arrives either populated (an object)
      // or as a bare id depending on depth, so map ids from the same result set rather
      // than depending on population.
      const slugById = new Map<number | string, string>()
      for (const d of docs) {
        const id = (d as { id?: number | string }).id
        const s = (d as { slug?: string }).slug
        if (id !== undefined && s) slugById.set(id, s)
      }
      const parentSlugOf = (doc: unknown): string | null => {
        const parent = (doc as { parent?: unknown }).parent
        if (parent == null) return null
        if (typeof parent === 'object') {
          const p = parent as { id?: number | string; slug?: string }
          return p.slug ?? (p.id !== undefined ? (slugById.get(p.id) ?? null) : null)
        }
        return slugById.get(parent as number | string) ?? null
      }

      for (const doc of docs) {
        const slug = (doc as { slug?: string }).slug
        if (!slug) continue

        // Skip pages with noindex robots override
        const meta = (doc as any).meta
        const robotsOverride: string[] | undefined = meta?.robotsOverride
        if (robotsOverride && robotsOverride.includes('noindex')) continue

        // URL shape must match how the routes actually resolve a page.
        //
        // Every section route (/platform, /services, /solutions, /legal, /support,
        // /resources) queries `where: { 'parent.slug': { equals: '<section>' } }` — so a
        // child page lives at /<parent.slug>/<slug>. `parent` is therefore authoritative.
        //
        // Breadcrumbs are only a fallback: nested-docs regenerates them on save, so pages
        // re-parented without a re-save still carry empty breadcrumbs. Trusting them first
        // is what published /contact, /docs, /help-center and 9 others as bare slugs — all
        // 404s, advertised to Google in the sitemap (found 2026-09-10).
        const breadcrumbs = (doc as any).breadcrumbs as Array<{ url?: string }> | undefined
        const breadcrumbUrl = breadcrumbs?.length ? breadcrumbs[breadcrumbs.length - 1]?.url : null
        const parentSlug = collection === 'pages' ? parentSlugOf(doc) : null

        let path: string
        if (collection === 'pages' && slug === 'home') path = ''
        else if (parentSlug) path = `/${parentSlug}/${slug}`
        else path = breadcrumbUrl || `${prefix}/${slug}`

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
