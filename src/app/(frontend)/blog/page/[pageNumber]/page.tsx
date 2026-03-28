import type { Metadata } from 'next/types'

import { BlogCard } from '@/components/BlogCard'
import { BlogPagination } from '@/components/BlogPagination'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { fetchPosts } from '@/lib/wp-api'
import { getServerSideURL } from '@/utilities/getURL'
import { notFound, redirect } from 'next/navigation'
import React from 'react'

export const revalidate = 3600

const POSTS_PER_PAGE = 12

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function BlogPaginationPage({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const page = parseInt(pageNumber, 10)

  if (isNaN(page) || page < 1) return notFound()
  if (page === 1) redirect('/blog')

  const { data: posts, totalPages, totalItems } = await fetchPosts({
    page,
    perPage: POSTS_PER_PAGE,
  })

  if (posts.length === 0) return notFound()

  const start = (page - 1) * POSTS_PER_PAGE + 1
  const end = Math.min(page * POSTS_PER_PAGE, totalItems)

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: `Page ${page}`, href: `/blog/page/${page}` },
  ]

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Blog — Page {page}</h1>
        </div>
      </div>

      <div className="container mb-8">
        <p className="text-sm text-muted-foreground">
          Showing {start}–{end} of {totalItems} posts
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
          <BlogPagination page={page} totalPages={totalPages} basePath="/blog" />
        </div>
      )}
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  const siteUrl = getServerSideURL()
  return {
    title: `Blog — Page ${pageNumber} | ZUZY`,
    alternates: {
      canonical: `${siteUrl}/blog/page/${pageNumber}`,
    },
    robots: {
      index: false,
      follow: true,
    },
  }
}
