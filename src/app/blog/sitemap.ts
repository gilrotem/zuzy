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

  // Category pages — only those that actually exist in WordPress AND have posts.
  //
  // BLOG_CATEGORIES (D13) is an aspirational config of 7 topic categories. None of them
  // has ever been created in WordPress: the blog currently holds 3 posts in a single
  // category called "blog". The category route calls fetchCategory() and 404s when the
  // slug is unknown, so advertising the config unconditionally published 7 dead URLs to
  // Google — 7 of the 11 URLs in this sitemap (found 2026-09-10).
  //
  // fetchCategories() already passes hide_empty=true, so this list self-heals: create a
  // topic category in WP and add a post to it, and it appears here on the next revalidate.
  try {
    const wpCategories = await fetchCategories()
    const liveSlugs = new Set(wpCategories.map((c) => c.slug))
    for (const cat of BLOG_CATEGORIES) {
      if (!liveSlugs.has(cat.slug)) continue
      entries.push({
        url: `${siteUrl}/blog/category/${cat.slug}`,
        changeFrequency: 'weekly',
        priority: 0.5,
      })
    }
  } catch {
    // WP unreachable — publish no category URLs rather than guess and risk 404s.
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
