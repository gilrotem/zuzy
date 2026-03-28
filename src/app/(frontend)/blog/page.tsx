import type { Metadata } from 'next/types'

import { BlogCard } from '@/components/BlogCard'
import { BlogPagination } from '@/components/BlogPagination'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { fetchPosts } from '@/lib/wp-api'
import { getServerSideURL } from '@/utilities/getURL'
import React from 'react'

export const revalidate = 3600

const POSTS_PER_PAGE = 12

export default async function BlogListingPage() {
  const { data: posts, totalPages, totalItems } = await fetchPosts({
    page: 1,
    perPage: POSTS_PER_PAGE,
  })

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
  ]

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Blog</h1>
          <p className="text-lg text-muted-foreground">
            Insights on SEO, digital marketing, design, and productivity.
          </p>
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
          <BlogPagination page={1} totalPages={totalPages} basePath="/blog" />
        </div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  const siteUrl = getServerSideURL()
  return {
    title: 'Blog | ZUZY',
    description: 'Insights on SEO, digital marketing, design, and productivity from the ZUZY team.',
    alternates: {
      canonical: `${siteUrl}/blog`,
    },
    openGraph: {
      title: 'Blog | ZUZY',
      description: 'Insights on SEO, digital marketing, design, and productivity from the ZUZY team.',
      url: `${siteUrl}/blog`,
      siteName: 'ZUZY',
      type: 'website',
    },
  }
}
