import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { WPPost } from '@/lib/wp-api'
import {
  getPostFeaturedImage,
  getPostFeaturedImageAlt,
  getPostPrimaryCategory,
  stripHtml,
} from '@/lib/wp-api'
import { formatDateTime } from '@/utilities/formatDateTime'

type BlogCardProps = {
  post: WPPost
  className?: string
}

export function BlogCard({ post, className }: BlogCardProps) {
  const featuredImage = getPostFeaturedImage(post)
  const imageAlt = getPostFeaturedImageAlt(post)
  const category = getPostPrimaryCategory(post)
  const excerpt = stripHtml(post.excerpt.rendered).slice(0, 160)
  const title = stripHtml(post.title.rendered)

  return (
    <article
      className={`border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer group ${className || ''}`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={imageAlt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>
        <div className="p-4">
          {category && (
            <div className="uppercase text-sm mb-2 text-muted-foreground">{category.name}</div>
          )}
          <h3 className="text-lg font-semibold mb-2 group-hover:underline">{title}</h3>
          {excerpt && <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>}
          {post.date && (
            <time
              dateTime={post.date}
              className="block mt-3 text-xs text-muted-foreground"
            >
              {formatDateTime(post.date)}
            </time>
          )}
        </div>
      </Link>
    </article>
  )
}
