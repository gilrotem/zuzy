import type { Payload, PayloadRequest } from 'payload'

import { home } from '../seed/home'
import { getAllPlatformPages } from '../seed/platform-pages'

/**
 * Seeds ZUZY homepage and platform pages with marketing content blocks.
 * Safe to call multiple times — updates existing pages or creates new ones.
 */
export const seedZuzy = async ({
  payload,
  req: _req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<{ updated: string[]; skipped: string[] }> => {
  const updated: string[] = []
  const skipped: string[] = []

  payload.logger.info('Seeding ZUZY pages...')

  // Get any existing media to use as OG image (optional)
  const existingMedia = await payload.find({
    collection: 'media',
    limit: 1,
    depth: 0,
  })

  const metaImage = existingMedia.docs[0] || null

  // --- Seed Homepage ---
  const existingHome = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 0,
  })

  const homeData = home({ metaImage: metaImage as any })

  if (existingHome.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existingHome.docs[0].id,
      data: {
        hero: homeData.hero,
        layout: homeData.layout,
        meta: metaImage ? homeData.meta : { ...homeData.meta, image: undefined },
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info('— Updated existing homepage with ZUZY content')
    updated.push('home')
  } else {
    await payload.create({
      collection: 'pages',
      data: metaImage ? homeData : { ...homeData, meta: { ...homeData.meta, image: undefined } },
      context: { disableRevalidate: true },
    })
    payload.logger.info('— Created homepage with ZUZY content')
    updated.push('home')
  }

  // --- Seed Platform Pages (index + 8 module pages) ---
  const platformPages = getAllPlatformPages()

  for (const pageData of platformPages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: pageData.slug } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data: {
          title: pageData.title,
          hero: pageData.hero,
          layout: pageData.layout,
          meta: pageData.meta,
        },
        context: { disableRevalidate: true },
      })
      payload.logger.info(`— Updated platform page: ${pageData.slug}`)
      updated.push(pageData.slug)
    } else {
      await payload.create({
        collection: 'pages',
        data: pageData,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`— Created platform page: ${pageData.slug}`)
      updated.push(pageData.slug)
    }
  }

  payload.logger.info(`ZUZY page seeding complete! Updated: ${updated.length}, Skipped: ${skipped.length}`)
  return { updated, skipped }
}
