import type { Metadata } from 'next/types'

import { BlogCard } from '@/components/BlogCard'
import { BlogPagination } from '@/components/BlogPagination'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BLOG_CATEGORIES, getBlogCategoryConfig } from '@/lib/blog-categories'
import { JsonLd } from '@/lib/json-ld'
import { fetchCategory, fetchPosts } from '@/lib/wp-api'
import { getServerSideURL } from '@/utilities/getURL'
import { notFound } from 'next/navigation'
import React from 'react'

export const revalidate = 3600

const POSTS_PER_PAGE = 12

type Args = {
  params: Promise<{
    name: string
  }>
}

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((cat) => ({ name: cat.slug }))
}

export default async function BlogCategoryPage({ params: paramsPromise }: Args) {
  const { name } = await paramsPromise
  const categoryConfig = getBlogCategoryConfig(name)

  // Fetch the WP category to get its ID
  const wpCategory = await fetchCategory(name)
  if (!wpCategory) return notFound()

  const { data: posts, totalPages, totalItems } = await fetchPosts({
    page: 1,
    perPage: POSTS_PER_PAGE,
    categoryId: wpCategory.id,
  })

  const categoryName = categoryConfig?.name || wpCategory.name
  const categoryDescription = categoryConfig?.description || wpCategory.description

  const siteUrl = getServerSideURL()

  // CollectionPage JSON-LD
  const collectionPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categoryName} Articles`,
    description: categoryDescription,
    url: `${siteUrl}/blog/category/${name}`,
  }

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: categoryName, href: `/blog/category/${name}` },
  ]

  return (
    <div className="pt-24 pb-24">
      <JsonLd data={collectionPageJsonLd} />

      <div className="container mb-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{categoryName}</h1>
          {categoryDescription && (
            <p className="text-lg text-muted-foreground">{categoryDescription}</p>
          )}
        </div>
      </div>

      <div className="container mb-8">
        <p className="text-sm text-muted-foreground">
          Showing 1–{Math.min(POSTS_PER_PAGE, totalItems)} of {totalItems} posts
        </p>
      </div>

      <div className="container">
        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8">
          {posts.map((post) => (
            <div className="col-span-4" key={post.id}>
              <BlogCard post={post} className="h-full" />
            </div>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="container">
          <BlogPagination
            page={1}
            totalPages={totalPages}
            basePath={`/blog/category/${name}`}
          />
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { name } = await paramsPromise
  const categoryConfig = getBlogCategoryConfig(name)
  const siteUrl = getServerSideURL()

  const categoryName = categoryConfig?.name || name
  const description = categoryConfig?.description || `Articles about ${categoryName}`

  return {
    title: `${categoryName} Articles | ZUZY Blog`,
    description,
    alternates: {
      canonical: `${siteUrl}/blog/category/${name}`,
    },
    openGraph: {
      title: `${categoryName} Articles | ZUZY Blog`,
      description,
      url: `${siteUrl}/blog/category/${name}`,
      siteName: 'ZUZY',
      type: 'website',
    },
  }
}
