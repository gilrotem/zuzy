import React from 'react'
import Link from 'next/link'
import { getServerSideURL } from '@/utilities/getURL'
import { generateBreadcrumbJsonLd, JsonLd } from '@/lib/json-ld'

export type BreadcrumbItem = {
  label: string
  href: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Breadcrumbs component with JSON-LD structured data.
 * Renders both visible breadcrumb navigation and BreadcrumbList schema.
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null

  const siteUrl = getServerSideURL()

  // Build full URL items for JSON-LD
  const jsonLdItems = items.map((item) => ({
    name: item.label,
    url: item.href.startsWith('http') ? item.href : `${siteUrl}${item.href}`,
  }))

  return (
    <>
      <JsonLd data={generateBreadcrumbJsonLd(jsonLdItems)} />
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <span aria-hidden="true" className="text-muted-foreground/50">
                    /
                  </span>
                )}
                {isLast ? (
                  <span aria-current="page" className="text-foreground font-medium">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}

/**
 * Build breadcrumb items for a given collection and document.
 */
export function buildBreadcrumbs(args: {
  collection: string
  collectionLabel: string
  collectionPath: string
  title: string
  slug: string
  breadcrumbLabel?: string | null
}): BreadcrumbItem[] {
  const { collection, collectionLabel, collectionPath, title, slug, breadcrumbLabel } = args

  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
  ]

  // Add collection index page (except for top-level pages)
  if (collection !== 'pages') {
    items.push({
      label: collectionLabel,
      href: collectionPath,
    })
  }

  // Add current page
  const currentPath = collection === 'pages' && slug === 'home'
    ? '/'
    : collection === 'pages'
      ? `/${slug}`
      : `${collectionPath}/${slug}`

  // Only add current page if it's not home
  if (currentPath !== '/') {
    items.push({
      label: breadcrumbLabel || title,
      href: currentPath,
    })
  }

  return items
}
