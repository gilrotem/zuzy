import type { Metadata } from 'next'

import type { Media, Page, Post, Product, BrandDoc, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Product> | Partial<BrandDoc> | null
}): Promise<Metadata> => {
  const { doc } = args

  // BrandDoc doesn't have meta field, use title/summary directly
  const meta = doc && 'meta' in doc ? (doc as { meta?: { title?: string | null; description?: string | null; image?: unknown; robotsOverride?: string[] | null; canonicalOverride?: string | null } }).meta : null
  const fallbackTitle = doc && 'title' in doc ? (doc as { title?: string }).title : undefined

  const ogImage = getImageURL(meta?.image as Media | Config['db']['defaultIDType'] | null | undefined)

  const title = meta?.title
    ? meta.title + ' | ZUZY'
    : fallbackTitle
      ? fallbackTitle + ' | ZUZY'
      : 'ZUZY'

  // Build robots directive from override
  const robotsOverride = meta?.robotsOverride
  let robots: Metadata['robots'] = undefined
  if (robotsOverride && robotsOverride.length > 0) {
    robots = {
      index: !robotsOverride.includes('noindex'),
      follow: !robotsOverride.includes('nofollow'),
      ...(robotsOverride.includes('noarchive') && { noarchive: true }),
      ...(robotsOverride.includes('nosnippet') && { nosnippet: true }),
      ...(robotsOverride.includes('noimageindex') && { noimageindex: true }),
    }
  }

  // Canonical URL override
  const canonicalOverride = meta?.canonicalOverride

  return {
    description: meta?.description,
    openGraph: mergeOpenGraph({
      description: meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
    ...(robots && { robots }),
    ...(canonicalOverride && {
      alternates: {
        canonical: canonicalOverride,
      },
    }),
  }
}
