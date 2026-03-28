import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand revalidation webhook for WordPress.
 *
 * WordPress calls this endpoint on post publish/update/delete:
 * POST /api/revalidate?secret=xxx&slug=my-post&type=post
 *
 * Query params:
 * - secret (required): Shared secret for authentication
 * - slug (optional): Post slug to revalidate specific post page
 * - type (optional): "post" | "category" (default: "post")
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const slug = request.nextUrl.searchParams.get('slug')
  const type = request.nextUrl.searchParams.get('type') || 'post'

  // Validate secret
  if (!process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { error: 'REVALIDATION_SECRET not configured' },
      { status: 500 },
    )
  }

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json(
      { error: 'Invalid secret' },
      { status: 401 },
    )
  }

  try {
    // Always revalidate the wp-posts cache tag (affects all WP API fetches)
    revalidateTag('wp-posts')

    // Revalidate blog listing
    revalidatePath('/blog')

    // Revalidate blog sitemap
    revalidatePath('/blog/sitemap.xml')

    // Revalidate specific post or category page
    if (slug) {
      if (type === 'category') {
        revalidatePath(`/blog/category/${slug}`)
        revalidateTag('wp-categories')
      } else {
        revalidatePath(`/blog/${slug}`)
      }
    }

    return NextResponse.json({
      revalidated: true,
      slug: slug || null,
      type,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Revalidation failed', details: String(error) },
      { status: 500 },
    )
  }
}

// Also support GET for testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  return NextResponse.json({
    status: 'ok',
    message: 'Revalidation endpoint is working. Use POST to trigger revalidation.',
  })
}
