/**
 * WordPress REST API Client
 *
 * Fetches blog content from wp.zuzy.co.il headless WordPress.
 * All blog SEO meta is controlled by Next.js (D10), not Yoast/RankMath.
 */

const WP_API_URL =
  process.env.WP_API_URL || 'https://wp.zuzy.co.il/wp-json/wp/v2'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WPRendered = {
  rendered: string
  protected?: boolean
}

export type WPMedia = {
  id: number
  source_url: string
  alt_text: string
  media_details?: {
    width: number
    height: number
    sizes?: Record<
      string,
      {
        source_url: string
        width: number
        height: number
      }
    >
  }
}

export type WPAuthor = {
  id: number
  name: string
  slug: string
  avatar_urls?: Record<string, string>
}

export type WPCategory = {
  id: number
  count: number
  description: string
  name: string
  slug: string
  parent: number
}

export type WPPost = {
  id: number
  date: string
  date_gmt: string
  modified: string
  modified_gmt: string
  slug: string
  status: string
  type: string
  link: string
  title: WPRendered
  content: WPRendered
  excerpt: WPRendered
  featured_media: number
  categories: number[]
  tags: number[]
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[]
    author?: WPAuthor[]
    'wp:term'?: WPCategory[][]
  }
}

export type WPPaginatedResponse<T> = {
  data: T[]
  totalPages: number
  totalItems: number
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function wpFetch<T>(
  endpoint: string,
  params?: Record<string, string | number>,
  options?: { revalidate?: number; tags?: string[] },
): Promise<T> {
  const url = new URL(`${WP_API_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value))
    })
  }

  const res = await fetch(url.toString(), {
    next: {
      revalidate: options?.revalidate ?? 3600,
      tags: options?.tags ?? ['wp-posts'],
    },
  })

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText} — ${url.pathname}`)
  }

  return res.json()
}

async function wpFetchPaginated<T>(
  endpoint: string,
  params?: Record<string, string | number>,
  options?: { revalidate?: number; tags?: string[] },
): Promise<WPPaginatedResponse<T>> {
  const url = new URL(`${WP_API_URL}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value))
    })
  }

  const res = await fetch(url.toString(), {
    next: {
      revalidate: options?.revalidate ?? 3600,
      tags: options?.tags ?? ['wp-posts'],
    },
  })

  if (!res.ok) {
    throw new Error(`WP API error: ${res.status} ${res.statusText} — ${url.pathname}`)
  }

  const data: T[] = await res.json()
  const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10)
  const totalItems = parseInt(res.headers.get('X-WP-Total') || '0', 10)

  return { data, totalPages, totalItems }
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export async function fetchPosts(options?: {
  page?: number
  perPage?: number
  categoryId?: number
  search?: string
}): Promise<WPPaginatedResponse<WPPost>> {
  const { page = 1, perPage = 12, categoryId, search } = options || {}

  const params: Record<string, string | number> = {
    _embed: 'wp:featuredmedia,author,wp:term',
    page,
    per_page: perPage,
    status: 'publish',
    orderby: 'date',
    order: 'desc',
  }

  if (categoryId) params.categories = categoryId
  if (search) params.search = search

  return wpFetchPaginated<WPPost>('/posts', params)
}

export async function fetchAllPostSlugs(): Promise<{ slug: string; modified: string }[]> {
  const slugs: { slug: string; modified: string }[] = []
  let page = 1
  let totalPages = 1

  while (page <= totalPages) {
    const res = await wpFetchPaginated<WPPost>('/posts', {
      page,
      per_page: 100,
      status: 'publish',
      _fields: 'slug,modified',
    })

    slugs.push(...res.data.map((p) => ({ slug: p.slug, modified: p.modified })))
    totalPages = res.totalPages
    page++
  }

  return slugs
}

export async function fetchPost(slug: string): Promise<WPPost | null> {
  try {
    const posts = await wpFetch<WPPost[]>('/posts', {
      slug,
      _embed: 'wp:featuredmedia,author,wp:term',
      status: 'publish',
    })
    return posts[0] || null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export async function fetchCategories(): Promise<WPCategory[]> {
  return wpFetch<WPCategory[]>(
    '/categories',
    { per_page: '100', hide_empty: 'true' },
    { revalidate: 86400, tags: ['wp-categories'] },
  )
}

export async function fetchCategory(slug: string): Promise<WPCategory | null> {
  try {
    const categories = await wpFetch<WPCategory[]>(
      '/categories',
      { slug },
      { revalidate: 86400, tags: ['wp-categories'] },
    )
    return categories[0] || null
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Utility: extract clean text from WP HTML excerpt
// ---------------------------------------------------------------------------

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\n+/g, ' ')
    .trim()
}

/**
 * Get the featured image URL from a WP post (with _embed).
 */
export function getPostFeaturedImage(post: WPPost): string | undefined {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  return media?.source_url
}

/**
 * Get the featured image alt text from a WP post (with _embed).
 */
export function getPostFeaturedImageAlt(post: WPPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  return media?.alt_text || post.title.rendered
}

/**
 * Get the author name from a WP post (with _embed).
 */
export function getPostAuthor(post: WPPost): { name: string; slug: string } | null {
  const author = post._embedded?.author?.[0]
  if (!author) return null
  return { name: author.name, slug: author.slug }
}

/**
 * Get embedded categories from a WP post (with _embed).
 */
export function getPostCategories(post: WPPost): WPCategory[] {
  return post._embedded?.['wp:term']?.[0] || []
}

/**
 * Get the primary (first) category from a WP post.
 */
export function getPostPrimaryCategory(post: WPPost): WPCategory | null {
  const cats = getPostCategories(post)
  // Filter out "Uncategorized" (WP default, id=1)
  const filtered = cats.filter((c) => c.slug !== 'uncategorized')
  return filtered[0] || cats[0] || null
}
