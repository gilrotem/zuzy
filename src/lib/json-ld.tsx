/**
 * JSON-LD Structured Data Generators
 *
 * Generates Schema.org structured data for:
 * - Organization (site-wide)
 * - WebSite with SearchAction (site-wide)
 * - WebPage (per-page)
 * - Article (blog posts)
 * - Product (products)
 * - BreadcrumbList (per-page)
 * - FAQPage (pages with FAQ blocks)
 */

import { getServerSideURL } from '@/utilities/getURL'
import type { Media } from '@/payload-types'

type SEOSettingsData = {
  orgName?: string | null
  orgDescription?: string | null
  orgLogo?: Media | string | null
  orgEmail?: string | null
  orgPhone?: string | null
  orgAddress?: {
    streetAddress?: string | null
    city?: string | null
    region?: string | null
    postalCode?: string | null
    country?: string | null
  } | null
  socialProfiles?: Array<{
    platform?: string | null
    url?: string | null
  }> | null
  twitterHandle?: string | null
}

function getMediaUrl(media: Media | string | null | undefined): string | undefined {
  if (!media) return undefined
  if (typeof media === 'string') return media
  if (media.url) return media.url
  return undefined
}

/**
 * Organization schema — rendered once in root layout
 */
export function generateOrganizationJsonLd(seoSettings: SEOSettingsData) {
  const siteUrl = getServerSideURL()
  const logoUrl = getMediaUrl(seoSettings.orgLogo)

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seoSettings.orgName || 'ZUZY',
    url: siteUrl,
  }

  if (seoSettings.orgDescription) {
    schema.description = seoSettings.orgDescription
  }

  if (logoUrl) {
    schema.logo = {
      '@type': 'ImageObject',
      url: logoUrl,
    }
  }

  if (seoSettings.orgEmail) {
    schema.email = seoSettings.orgEmail
  }

  if (seoSettings.orgPhone) {
    schema.telephone = seoSettings.orgPhone
  }

  if (seoSettings.orgAddress) {
    const addr = seoSettings.orgAddress
    if (addr.streetAddress || addr.city || addr.country) {
      schema.address = {
        '@type': 'PostalAddress',
        ...(addr.streetAddress && { streetAddress: addr.streetAddress }),
        ...(addr.city && { addressLocality: addr.city }),
        ...(addr.region && { addressRegion: addr.region }),
        ...(addr.postalCode && { postalCode: addr.postalCode }),
        ...(addr.country && { addressCountry: addr.country }),
      }
    }
  }

  const sameAs = seoSettings.socialProfiles
    ?.map((p) => p.url)
    .filter(Boolean) as string[] | undefined

  if (sameAs && sameAs.length > 0) {
    schema.sameAs = sameAs
  }

  return schema
}

/**
 * WebSite schema with SearchAction — rendered once in root layout
 */
export function generateWebSiteJsonLd(seoSettings: SEOSettingsData) {
  const siteUrl = getServerSideURL()

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seoSettings.orgName || 'ZUZY',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * WebPage schema — per-page
 */
export function generateWebPageJsonLd(args: {
  title: string
  description?: string
  url: string
  datePublished?: string
  dateModified?: string
  jsonLdType?: string
}) {
  const { title, description, url, datePublished, dateModified, jsonLdType } = args

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': jsonLdType || 'WebPage',
    name: title,
    url,
  }

  if (description) schema.description = description
  if (datePublished) schema.datePublished = datePublished
  if (dateModified) schema.dateModified = dateModified

  return schema
}

/**
 * Article schema — for blog posts
 */
export function generateArticleJsonLd(args: {
  title: string
  description?: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
  authors?: Array<{ name?: string | null }>
  orgName?: string
}) {
  const { title, description, url, image, datePublished, dateModified, authors, orgName } = args
  const siteUrl = getServerSideURL()

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    url,
    publisher: {
      '@type': 'Organization',
      name: orgName || 'ZUZY',
      url: siteUrl,
    },
  }

  if (description) schema.description = description
  if (image) schema.image = image
  if (datePublished) schema.datePublished = datePublished
  if (dateModified) schema.dateModified = dateModified

  if (authors && authors.length > 0) {
    schema.author = authors
      .filter((a) => a.name)
      .map((a) => ({
        '@type': 'Person',
        name: a.name,
      }))
  }

  return schema
}

/**
 * Product schema — for product pages
 */
export function generateProductJsonLd(args: {
  name: string
  description?: string
  url: string
  image?: string
  price?: number
  currency?: string
  orgName?: string
}) {
  const { name, description, url, image, price, currency, orgName } = args

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    url,
  }

  if (description) schema.description = description
  if (image) schema.image = image

  if (price != null) {
    schema.offers = {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: currency || 'ILS',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: orgName || 'ZUZY',
      },
    }
  }

  return schema
}

/**
 * BreadcrumbList schema
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * FAQPage schema — for pages with FAQ blocks
 */
export function generateFAQJsonLd(
  questions: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }
}

/**
 * Renders a JSON-LD script tag
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
