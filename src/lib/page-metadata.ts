import type { Metadata } from 'next'
import type { CollectionSlug } from 'payload'
import type { Locale } from '@/utilities/i18n'
import { getServerSideURL } from '@/utilities/getURL'
import { getHreflangLinks } from './hreflang'
import { COLLECTION_PATHS } from './seo-config'

type PageMetadataArgs = {
  title: string
  description?: string
  image?: string | null
  collection: CollectionSlug
  slug: string
  locale: Locale
}

/**
 * Unified page metadata generator.
 * Adds hreflang, canonical, and Open Graph tags.
 */
export function getPageMetadata(args: PageMetadataArgs): Metadata {
  const { title, description, image, collection, slug, locale } = args
  const siteUrl = getServerSideURL()

  const prefix = COLLECTION_PATHS[collection] ?? ''
  const path = collection === 'pages' && slug === 'home' ? '' : `${prefix}/${slug}`
  const canonicalUrl = `${siteUrl}${path}`

  const hreflangLinks = getHreflangLinks({ collection, slug, locale })

  const alternates: Metadata['alternates'] = {
    canonical: canonicalUrl,
    languages: Object.fromEntries(
      hreflangLinks.map((link) => [link.hrefLang, link.href]),
    ),
  }

  return {
    title: title ? `${title} | ZUZY` : 'ZUZY',
    description,
    alternates,
    openGraph: {
      title: title ? `${title} | ZUZY` : 'ZUZY',
      description: description || '',
      url: canonicalUrl,
      siteName: 'ZUZY',
      locale,
      type: 'website',
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      site: '@zuzy',
      title: title ? `${title} | ZUZY` : 'ZUZY',
      description: description || '',
      ...(image ? { images: [image] } : {}),
    },
  }
}
