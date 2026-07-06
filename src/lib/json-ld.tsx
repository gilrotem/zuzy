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
import { BUSINESS_INFO, type OpeningHours } from '@/lib/business-info'
import type { Media } from '@/payload-types'

type SEOSettingsData = {
  orgName?: string | null
  orgLegalName?: string | null
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
  orgGeo?: {
    latitude?: number | null
    longitude?: number | null
  } | null
  orgOpeningHours?: Array<{
    days?: string[] | null
    opens?: string | null
    closes?: string | null
  }> | null
  googleBusinessUrl?: string | null
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
 * Stable Schema.org node identifiers — everything references these @ids so
 * search engines resolve one consistent entity (the NAP-consistency lever).
 */
export const ORG_ID = (siteUrl: string) => `${siteUrl}/#organization`
export const LOCALBUSINESS_ID = (siteUrl: string) => `${siteUrl}/#localbusiness`
export const WEBSITE_ID = (siteUrl: string) => `${siteUrl}/#website`

function buildPostalAddress(seoSettings: SEOSettingsData) {
  const addr = seoSettings.orgAddress
  return {
    '@type': 'PostalAddress',
    streetAddress: addr?.streetAddress || BUSINESS_INFO.address.streetAddress,
    addressLocality: addr?.city || BUSINESS_INFO.address.addressLocality,
    ...(addr?.region && { addressRegion: addr.region }),
    postalCode: addr?.postalCode || BUSINESS_INFO.address.postalCode,
    addressCountry: addr?.country || BUSINESS_INFO.address.addressCountry,
  }
}

function buildOpeningHours(seoSettings: SEOSettingsData) {
  const source: OpeningHours[] =
    seoSettings.orgOpeningHours && seoSettings.orgOpeningHours.length > 0
      ? seoSettings.orgOpeningHours.map((h) => ({
          days: h.days || [],
          opens: h.opens || '',
          closes: h.closes || '',
        }))
      : (BUSINESS_INFO.openingHours as unknown as OpeningHours[])

  return source
    .filter((h) => h.days.length > 0 && h.opens && h.closes)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }))
}

/**
 * Unified entity @graph — rendered once in the root layout.
 *
 * Emits a single connected graph instead of disconnected islands:
 *   Organization  ← the brand entity (NAP, sameAs, contactPoint)
 *   ProfessionalService (LocalBusiness) ← the physical presence (address, geo, hours)
 *   WebSite       ← the site + SearchAction, published by the Organization
 *
 * Values come from the SEO Settings global when present, otherwise fall back to
 * the canonical BUSINESS_INFO baseline so the NAP always renders correctly.
 */
export function generateEntityGraph(seoSettings: SEOSettingsData) {
  const siteUrl = getServerSideURL()
  const logoUrl = getMediaUrl(seoSettings.orgLogo)
  const name = seoSettings.orgName || BUSINESS_INFO.name
  const legalName = seoSettings.orgLegalName || BUSINESS_INFO.legalName
  const description = seoSettings.orgDescription || BUSINESS_INFO.description
  const email = seoSettings.orgEmail || BUSINESS_INFO.email
  const telephone = seoSettings.orgPhone || BUSINESS_INFO.telephone
  const address = buildPostalAddress(seoSettings)
  const openingHours = buildOpeningHours(seoSettings)

  const logo = logoUrl
    ? {
        '@type': 'ImageObject',
        url: logoUrl.startsWith('http') ? logoUrl : `${siteUrl}${logoUrl}`,
      }
    : undefined

  const lat = seoSettings.orgGeo?.latitude ?? BUSINESS_INFO.geo.latitude
  const lng = seoSettings.orgGeo?.longitude ?? BUSINESS_INFO.geo.longitude

  const socialSameAs = (seoSettings.socialProfiles || [])
    .map((p) => p.url)
    .filter(Boolean) as string[]
  const gbUrl = seoSettings.googleBusinessUrl || BUSINESS_INFO.googleBusinessUrl
  const sameAs = Array.from(
    new Set([
      ...(socialSameAs.length > 0 ? socialSameAs : [...BUSINESS_INFO.sameAs]),
      ...(gbUrl ? [gbUrl] : []),
    ]),
  )

  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': ORG_ID(siteUrl),
    name,
    legalName,
    alternateName: legalName,
    url: siteUrl,
    description,
    email,
    telephone,
    address,
    ...(logo && { logo }),
    ...(sameAs.length > 0 && { sameAs }),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone,
        email,
        contactType: 'customer service',
        areaServed: 'IL',
        availableLanguage: ['he', 'en'],
      },
    ],
  }

  const localBusiness: Record<string, unknown> = {
    '@type': 'ProfessionalService',
    '@id': LOCALBUSINESS_ID(siteUrl),
    name,
    url: siteUrl,
    ...(logo && { image: logo }),
    email,
    telephone,
    address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    },
    ...(openingHours.length > 0 && { openingHoursSpecification: openingHours }),
    parentOrganization: { '@id': ORG_ID(siteUrl) },
    ...(gbUrl && { hasMap: gbUrl }),
  }

  const website = {
    '@type': 'WebSite',
    '@id': WEBSITE_ID(siteUrl),
    name,
    url: siteUrl,
    inLanguage: 'he-IL',
    publisher: { '@id': ORG_ID(siteUrl) },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, localBusiness, website],
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
