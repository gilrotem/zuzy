/**
 * SEO Configuration — Controls which collections are indexable by search engines
 * and maps collections to their public URL paths.
 */

import type { CollectionSlug } from 'payload'

/** Collections that should be included in sitemap and indexed by search engines */
export const INDEXABLE_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'products',
  'brand-docs',
]

/** Maps collection slugs to their public URL path prefix */
export const COLLECTION_PATHS: Partial<Record<CollectionSlug, string>> = {
  pages: '',
  products: '/products',
  'brand-docs': '/brand-docs',
}

/** Paths that should always be blocked from indexing */
export const BLOCKED_PATHS = [
  '/admin',
  '/api',
  '/_next',
  '/_vercel',
  '/next/preview',
  '/next/seed',
  '/posts',
  '/search',
]

/** Check if a collection should be indexed */
export function isIndexable(collectionSlug: CollectionSlug): boolean {
  return INDEXABLE_COLLECTIONS.includes(collectionSlug)
}

/** Check if a path should be blocked from indexing */
export function isBlockedPath(pathname: string): boolean {
  return BLOCKED_PATHS.some((blocked) => pathname.startsWith(blocked))
}
