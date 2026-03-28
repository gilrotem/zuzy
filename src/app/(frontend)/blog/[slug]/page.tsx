import type { Metadata } from 'next'

import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BlogCard } from '@/components/BlogCard'
import { WPContent } from '@/lib/wp-block-mapper'
import {
  generateArticleJsonLd,
  JsonLd,
} from '@/lib/json-ld'
import type { WPPost } from '@/lib/wp-api'
import {
  fetchPost,
  fetchPosts,
  fetchAllPostSlugs,
  getPostAuthor,
  getPostCategories,
  getPostFeaturedImage,
  getPostFeaturedImageAlt,
  getPostPrimaryCategory,
  stripHtml,
} from '@/lib/wp-api'
import { getServerSideURL } from '@/utilities/getURL'
import { formatDateTime } from '@/utilities/formatDateTime'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import React from 'react'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  try {
    const slugs = await fetchAllPostSlugs()
    return slugs.map(({ slug }) => ({ slug }))
  } catch {
    return []
  }
}

export default async function BlogPostPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await fetchPost(decodedSlug)

  if (!post) return notFound()

  const siteUrl = getServerSideURL()
  const title = stripHtml(post.title.rendered)
  const featuredImage = getPostFeaturedImage(post)
  const imageAlt = getPostFeaturedImageAlt(post)
  const author = getPostAuthor(post)
  const categories = getPostCategories(post)
  const primaryCategory = getPostPrimaryCategory(post)

  // Article JSON-LD
  const articleJsonLd = generateArticleJsonLd({
    title,
    description: stripHtml(post.excerpt.rendered).slice(0, 160),
    url: `${siteUrl}/blog/${decodedSlug}`,
    image: featuredImage,
    datePublished: post.date_gmt,
    dateModified: post.modified_gmt,
    authors: author ? [{ name: author.name }] : [],
  })

  // Breadcrumbs: Home > Blog > [Category] > Post Title
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
  ]
  if (primaryCategory) {
    breadcrumbItems.push({
      label: primaryCategory.name,
      href: `/blog/category/${primaryCategory.slug}`,
    })
  }
  breadcrumbItems.push({
    label: title,
    href: `/blog/${decodedSlug}`,
  })

  // Fetch related posts from same category
  let relatedPosts: WPPost[] = []
  if (primaryCategory) {
    try {
      const { data } = await fetchPosts({
        categoryId: primaryCategory.id,
        perPage: 4,
      })
      relatedPosts = data.filter((p) => p.id !== post.id).slice(0, 3)
    } catch {
      // Silently fail — related posts are non-critical
    }
  }

  return (
    <article className="pt-16 pb-16">
      <JsonLd data={articleJsonLd} />

      {/* Hero */}
      <div className="relative -mt-[10.4rem] flex items-end">
        <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
          <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
            {/* Categories */}
            <div className="uppercase text-sm mb-6">
              {categories.map((cat, index) => (
                <React.Fragment key={cat.id}>
                  {cat.name}
                  {index < categories.length - 1 && <>, &nbsp;</>}
                </React.Fragment>
              ))}
            </div>

            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>

            <div className="flex flex-col md:flex-row gap-4 md:gap-16">
              {author && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>
                  <p>{author.name}</p>
                </div>
              )}
              {post.date && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Date Published</p>
                  <time dateTime={post.date}>{formatDateTime(post.date)}</time>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="min-h-[80vh] select-none">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={imageAlt}
              fill
              priority
              className="-z-10 object-cover"
              sizes="100vw"
            />
          ) : (
            <div className="-z-10 absolute inset-0 bg-muted" />
          )}
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-linear-to-t from-black to-transparent" />
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container mt-8 mb-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <WPContent
            html={post.content.rendered}
            className="max-w-[48rem] mx-auto"
          />
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="container mt-16">
          <h2 className="text-2xl font-semibold mb-8">Related Posts</h2>
          <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8">
            {relatedPosts.map((relPost) => (
              <div className="col-span-4" key={relPost.id}>
                <BlogCard post={relPost} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await fetchPost(decodedSlug)

  if (!post) {
    return {
      title: 'Post Not Found | ZUZY',
    }
  }

  const siteUrl = getServerSideURL()
  const title = stripHtml(post.title.rendered)
  const description = stripHtml(post.excerpt.rendered).slice(0, 160)
  const featuredImage = getPostFeaturedImage(post)

  return {
    title: `${title} | ZUZY`,
    description,
    alternates: {
      canonical: `${siteUrl}/blog/${decodedSlug}`,
    },
    openGraph: mergeOpenGraph({
      title: `${title} | ZUZY`,
      description,
      url: `${siteUrl}/blog/${decodedSlug}`,
      type: 'article',
      ...(featuredImage && {
        images: [{ url: featuredImage }],
      }),
    }),
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ZUZY`,
      description,
      ...(featuredImage && {
        images: [featuredImage],
      }),
    },
  }
}
