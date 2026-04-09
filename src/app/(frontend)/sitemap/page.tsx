import type { Metadata } from 'next/types'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Breadcrumbs, type BreadcrumbItem } from '@/components/Breadcrumbs'
import { getServerSideURL } from '@/utilities/getURL'
import { BLOG_CATEGORIES } from '@/lib/blog-categories'
import { stripHtml, type WPPost, type WPPaginatedResponse } from '@/lib/wp-api'

export const revalidate = 3600

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SitemapItem = { title: string; url: string }
type SitemapSection = { key: string; title: string; items: SitemapItem[] }

// ---------------------------------------------------------------------------
// Section config — ordered as they should appear on the page
// ---------------------------------------------------------------------------

const SECTION_ORDER: { key: string; pathPrefix: string | null; title: string }[] = [
  { key: 'main', pathPrefix: null, title: 'דפים ראשיים' },
  { key: 'platform', pathPrefix: '/platform', title: 'הפלטפורמה' },
  { key: 'services', pathPrefix: '/services', title: 'שירותים' },
  { key: 'solutions', pathPrefix: '/solutions', title: 'פתרונות' },
  { key: 'resources', pathPrefix: '/resources', title: 'משאבים' },
  { key: 'support', pathPrefix: '/support', title: 'תמיכה' },
  { key: 'legal', pathPrefix: '/legal', title: 'משפטי' },
  { key: 'blog', pathPrefix: '/blog', title: 'בלוג' },
  { key: 'products', pathPrefix: '/products', title: 'מוצרים' },
  { key: 'brand-docs', pathPrefix: '/brand-docs', title: 'מסמכי מותג' },
]

const KNOWN_PREFIXES = SECTION_ORDER.filter((s) => s.pathPrefix).map((s) => s.pathPrefix!)

// ---------------------------------------------------------------------------
// WP helper — lightweight fetch of post slugs + titles
// ---------------------------------------------------------------------------

const WP_API_URL = process.env.WP_API_URL || 'https://wp.zuzy.co.il/wp-json/wp/v2'

async function fetchBlogPostsForSitemap(): Promise<SitemapItem[]> {
  const items: SitemapItem[] = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const url = new URL(`${WP_API_URL}/posts`)
    url.searchParams.set('page', String(page))
    url.searchParams.set('per_page', '100')
    url.searchParams.set('status', 'publish')
    url.searchParams.set('orderby', 'date')
    url.searchParams.set('order', 'desc')
    url.searchParams.set('_fields', 'slug,title')

    const res = await fetch(url.toString(), {
      next: { revalidate: 3600, tags: ['wp-posts'] },
    })

    if (!res.ok) break

    const data: WPPost[] = await res.json()
    totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10)

    for (const post of data) {
      items.push({
        title: stripHtml(post.title.rendered),
        url: `/blog/${post.slug}`,
      })
    }
    page++
  }

  return items
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getSitemapData(): Promise<SitemapSection[]> {
  const payload = await getPayload({ config: configPromise })

  // Fetch excluded paths from SEO Settings
  let excludedPaths: string[] = []
  try {
    const seoSettings = (await payload.findGlobal({ slug: 'seo-settings' as any })) as any
    excludedPaths = (seoSettings?.sitemapExcludePaths || [])
      .map((item: any) => item.path)
      .filter(Boolean)
  } catch {
    /* continue */
  }

  // Parallel fetch
  const [pagesResult, productsResult, brandDocsResult, blogPosts] = await Promise.all([
    payload
      .find({
        collection: 'pages',
        limit: 1000,
        depth: 1,
        pagination: false,
        where: { _status: { equals: 'published' } },
        select: {
          title: true,
          slug: true,
          parent: true,
          breadcrumbs: true,
          meta: true,
        },
      })
      .catch(() => ({ docs: [] as any[] })),

    payload
      .find({
        collection: 'products',
        limit: 1000,
        pagination: false,
        where: { _status: { equals: 'published' } },
        select: { title: true, slug: true, meta: true },
      })
      .catch(() => ({ docs: [] as any[] })),

    payload
      .find({
        collection: 'brand-docs',
        limit: 1000,
        pagination: false,
        where: { _status: { equals: 'published' } },
        select: { title: true, slug: true, meta: true },
      })
      .catch(() => ({ docs: [] as any[] })),

    fetchBlogPostsForSitemap().catch(() => [] as SitemapItem[]),
  ])

  // Helper: check if a page should be excluded
  const shouldExclude = (path: string, meta: any): boolean => {
    if (path === '/sitemap') return true
    const robotsOverride: string[] | undefined = meta?.robotsOverride
    if (robotsOverride && robotsOverride.includes('noindex')) return true
    if (excludedPaths.some((ex) => path === ex || path.startsWith(ex + '/'))) return true
    return false
  }

  // Build section map
  const sectionMap: Record<string, SitemapItem[]> = {}
  for (const s of SECTION_ORDER) {
    sectionMap[s.key] = []
  }

  // Build a slug→sectionKey map from known section parents
  const parentSlugToSection: Record<string, string> = {}
  for (const s of SECTION_ORDER) {
    if (s.pathPrefix) {
      // e.g. '/platform' → key 'platform', parent slug 'platform'
      parentSlugToSection[s.pathPrefix.slice(1)] = s.key
    }
  }

  // Group Payload pages by breadcrumb path or parent relationship
  for (const doc of pagesResult.docs) {
    const slug = (doc as any).slug as string | undefined
    if (!slug) continue

    const meta = (doc as any).meta
    const breadcrumbs = (doc as any).breadcrumbs as Array<{ label?: string; url?: string }> | undefined
    const breadcrumbUrl = breadcrumbs?.length ? breadcrumbs[breadcrumbs.length - 1]?.url : null
    const parent = (doc as any).parent as { slug?: string } | number | null | undefined
    const parentSlug = parent && typeof parent === 'object' ? parent.slug : null
    const title = (doc as any).title as string || slug

    // Determine the correct URL path
    // If breadcrumbs contain a nested path (e.g. /platform/rank-tracker), use that.
    // Otherwise, if we know the parent, construct the nested path.
    let path: string
    if (slug === 'home') {
      path = '/'
    } else if (breadcrumbUrl) {
      path = breadcrumbUrl
    } else if (parentSlug && parentSlugToSection[parentSlug]) {
      path = `/${parentSlug}/${slug}`
    } else {
      path = `/${slug}`
    }

    if (shouldExclude(path, meta)) continue

    // Determine which section this page belongs to
    // First: check breadcrumb path prefix
    let sectionKey: string | null = null
    const matchedPrefix = KNOWN_PREFIXES.find(
      (prefix) => path === prefix || path.startsWith(prefix + '/'),
    )
    if (matchedPrefix) {
      sectionKey = SECTION_ORDER.find((s) => s.pathPrefix === matchedPrefix)!.key
    }

    // Fallback: check parent slug (handles cases where breadcrumbs have flat URLs)
    if (!sectionKey && parentSlug && parentSlugToSection[parentSlug]) {
      sectionKey = parentSlugToSection[parentSlug]
      // Also fix the URL to use the nested path
      if (!path.startsWith(`/${parentSlug}/`)) {
        path = `/${parentSlug}/${slug}`
      }
    }

    sectionMap[sectionKey || 'main'].push({ title, url: path })
  }

  // Products
  for (const doc of productsResult.docs) {
    const slug = (doc as any).slug as string | undefined
    if (!slug) continue
    const meta = (doc as any).meta
    const path = `/products/${slug}`
    if (shouldExclude(path, meta)) continue
    sectionMap['products'].push({ title: (doc as any).title || slug, url: path })
  }

  // Brand docs
  for (const doc of brandDocsResult.docs) {
    const slug = (doc as any).slug as string | undefined
    if (!slug) continue
    const meta = (doc as any).meta
    const path = `/brand-docs/${slug}`
    if (shouldExclude(path, meta)) continue
    sectionMap['brand-docs'].push({ title: (doc as any).title || slug, url: path })
  }

  // Blog section: listing + categories + posts
  sectionMap['blog'].push({ title: 'כל הפוסטים', url: '/blog' })
  for (const cat of BLOG_CATEGORIES) {
    sectionMap['blog'].push({ title: cat.nameHe, url: `/blog/category/${cat.slug}` })
  }
  sectionMap['blog'].push(...blogPosts)

  // Sort main pages: homepage first
  sectionMap['main'].sort((a, b) => {
    if (a.url === '/') return -1
    if (b.url === '/') return 1
    return a.title.localeCompare(b.title, 'he')
  })

  // Build final ordered sections, skip empty ones
  return SECTION_ORDER.filter((s) => sectionMap[s.key].length > 0).map((s) => ({
    key: s.key,
    title: s.title,
    items: sectionMap[s.key],
  }))
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = getServerSideURL()
  const title = 'מפת האתר | ZUZY'
  const description = 'מפת האתר של ZUZY — כל הדפים, השירותים, הפתרונות והמשאבים במקום אחד.'

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/sitemap` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/sitemap`,
      siteName: 'ZUZY',
      type: 'website',
    },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function HtmlSitemapPage() {
  const sections = await getSitemapData()

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'דף הבית', href: '/' },
    { label: 'מפת האתר', href: '/sitemap' },
  ]

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="container mb-16">
        <h1 className="text-3xl font-bold mb-2">מפת האתר</h1>
        <p className="text-muted-foreground">
          כל הדפים באתר ZUZY, מסודרים לפי קטגוריה
        </p>
      </div>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {sections.map((section) => (
            <section key={section.key}>
              <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className="text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
