/**
 * Standalone brand docs seeder — run with:
 *   pnpm seed:brand-docs
 *
 * Seeds/updates brand documentation (BrandDocs collection) and
 * brand-docs pages from Brand Hub content.
 *
 * Safe to run multiple times — updates existing docs or creates new ones.
 * Runs locally via `payload run` — no Vercel timeout constraints.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { getAllBrandDocs, getAllBrandDocsPages } from '../endpoints/seed/brand-docs-pages'

const run = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('=== Brand Docs Seeder (standalone) ===')

  const updated: string[] = []

  // Seed BrandDocs collection
  payload.logger.info('Phase 1: Seeding BrandDocs collection...')
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
      payload.logger.info(`  Updated: ${docData.slug}`)
      updated.push(`brand-doc:${docData.slug}`)
    } else {
      await payload.create({
        collection: 'brand-docs',
        data: docData as any,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`  Created: ${docData.slug}`)
      updated.push(`brand-doc:${docData.slug}`)
    }
  }

  // Seed brand-docs pages
  payload.logger.info('Phase 2: Seeding brand-docs pages...')
  const pages = getAllBrandDocsPages()
  for (const pageData of pages) {
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
      payload.logger.info(`  Updated page: ${pageData.slug}`)
      updated.push(`page:${pageData.slug}`)
    } else {
      await payload.create({
        collection: 'pages',
        data: pageData as any,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`  Created page: ${pageData.slug}`)
      updated.push(`page:${pageData.slug}`)
    }
  }

  payload.logger.info(`Total updated: ${updated.length}`)
  payload.logger.info('=== Brand docs seeding complete! ===')

  process.exit(0)
}

await run()
