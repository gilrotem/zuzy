import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { BrandDoc } from '../../../payload-types'

export const revalidateBrandDoc: CollectionAfterChangeHook<BrandDoc> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/brand-docs/${doc.slug}`

      payload.logger.info(`Revalidating brand doc at path: ${path}`)

      revalidatePath(path)
      revalidateTag('brand-docs-sitemap')
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/brand-docs/${previousDoc.slug}`

      payload.logger.info(`Revalidating old brand doc at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('brand-docs-sitemap')
    }
  }
  return doc
}

export const revalidateDeleteBrandDoc: CollectionAfterDeleteHook<BrandDoc> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/brand-docs/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('brand-docs-sitemap')
  }

  return doc
}
