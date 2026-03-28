import type { MetadataRoute } from 'next'

import { BLOG_CATEGORIES } from '@/lib/blog-categories'
import { fetchAllPostSlugs, fetchCategories } from '@/lib/wp-api'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * Blog-specific sitemap at /blog/sitemap.xml
 * Separate from main sitemap for faster blog content discovery.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getServerSideURL()
  const entries: MetadataRoute.Sitemap = []

  // Blog listing page
  entries.push({
    url: `${siteUrl}/blog`,
    changeFrequency: 'daily',
    priority: 0.7,
  })

  // Category pages
  for (const cat of BLOG_CATEGORIES) {
    entries.push({
      url: `${siteUrl}/blog/category/${cat.slug}`,
      changeFrequency: 'weekly',
      priority: 0.5,
    })
  }

  // All blog posts
  try {
    const slugs = await fetchAllPostSlugs()
    for (const { slug, modified } of slugs) {
      entries.push({
        url: `${siteUrl}/blog/${slug}`,
        lastModified: modified ? new Date(modified) : undefined,
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  } catch {
    // If WP API is down, return what we have (listing + categories)
  }

  return entries
}
