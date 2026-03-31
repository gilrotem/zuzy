import type { Payload, PayloadRequest } from 'payload'

import { home } from '../seed/home'
import { getAllPlatformPages } from '../seed/platform-pages'
import { getAllPricingLegalPages } from '../seed/pricing-legal-pages'
import { getAllServicesPages } from '../seed/services-pages'
import { getAllSolutionsPages } from '../seed/solutions-pages'
import { getAllResourcesPages, getAllSupportPages } from '../seed/resources-support-pages'
import { getAllBrandDocs, getAllBrandDocsPages } from '../seed/brand-docs-pages'

/**
 * Seeds ZUZY homepage, platform pages, pricing, and legal pages.
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

  // --- Seed all section pages (platform, pricing, legal) ---
  const allPages = [
    ...getAllPlatformPages(),
    ...getAllPricingLegalPages(),
    ...getAllServicesPages(),
    ...getAllSolutionsPages(),
    ...getAllResourcesPages(),
    ...getAllSupportPages(),
    ...getAllBrandDocsPages(),
  ]

  for (const pageData of allPages) {
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
      payload.logger.info(`— Updated page: ${pageData.slug}`)
      updated.push(pageData.slug)
    } else {
      await payload.create({
        collection: 'pages',
        data: pageData as any,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`— Created page: ${pageData.slug}`)
      updated.push(pageData.slug)
    }
  }

  // --- Seed BrandDocs ---
  const brandDocs = getAllBrandDocs()
  for (const docData of brandDocs) {
    const existing = await payload.find({
      collection: 'brand-docs',
      where: { slug: { equals: docData.slug } },
      limit: 1,
      depth: 0,
    })

    if (existing.docs.length > 0) {
      await payload.update({
        collection: 'brand-docs',
        id: existing.docs[0].id,
        data: {
          title: docData.title,
          summary: docData.summary,
          content: docData.content,
          docType: docData.docType,
          icon: docData.icon,
          sortOrder: docData.sortOrder,
          meta: docData.meta,
        },
        context: { disableRevalidate: true },
      })
      payload.logger.info(`— Updated brand doc: ${docData.slug}`)
      updated.push(`brand-doc:${docData.slug}`)
    } else {
      await payload.create({
        collection: 'brand-docs',
        data: docData as any,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`— Created brand doc: ${docData.slug}`)
      updated.push(`brand-doc:${docData.slug}`)
    }
  }

  // D17 Legal redirects are handled in redirects.js (next.config.js), not via Payload redirects collection

  payload.logger.info(`ZUZY seeding complete! Updated: ${updated.length}, Skipped: ${skipped.length}`)
  return { updated, skipped }
}
