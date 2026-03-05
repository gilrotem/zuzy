import { getServerSideURL } from '@/utilities/getURL'
import { locales as allLocales, defaultLocale, type Locale } from '@/utilities/i18n'
import { INDEXABLE_COLLECTIONS, COLLECTION_PATHS } from '@/lib/seo-config'
import type { CollectionSlug } from 'payload'

type HreflangLink = {
  rel: string
  hrefLang: string
  href: string
}

/**
 * Generate hreflang link tags for a given page.
 * Only generates links for indexable collections.
 */
export function getHreflangLinks(args: {
  collection: CollectionSlug
  slug: string
  locale: Locale
}): HreflangLink[] {
  const { collection, slug } = args
  const siteUrl = getServerSideURL()

  if (!INDEXABLE_COLLECTIONS.includes(collection)) {
    return []
  }

  const prefix = COLLECTION_PATHS[collection] ?? ''
  const path = collection === 'pages' && slug === 'home' ? '' : `${prefix}/${slug}`

  const links: HreflangLink[] = allLocales.map((locale) => ({
    rel: 'alternate',
    hrefLang: locale,
    href: `${siteUrl}${path}`,
  }))

  // x-default points to the canonical URL
  links.push({
    rel: 'alternate',
    hrefLang: 'x-default',
    href: `${siteUrl}${path}`,
  })

  return links
}
