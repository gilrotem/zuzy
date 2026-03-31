import { getPayload } from 'payload'
import { getAllBrandDocs, getAllBrandDocsPages } from '@/endpoints/seed/brand-docs-pages'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const updated: string[] = []

    // Seed BrandDocs
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
        updated.push(`brand-doc:${docData.slug}`)
      } else {
        await payload.create({
          collection: 'brand-docs',
          data: docData as any,
          context: { disableRevalidate: true },
        })
        updated.push(`brand-doc:${docData.slug}`)
      }
    }

    // Seed brand-docs pages
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
        updated.push(`page:${pageData.slug}`)
      } else {
        await payload.create({
          collection: 'pages',
          data: pageData as any,
          context: { disableRevalidate: true },
        })
        updated.push(`page:${pageData.slug}`)
      }
    }

    return Response.json({ success: true, updated })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding brand docs' })
    return new Response(`Error: ${e instanceof Error ? e.message : 'unknown'}`, { status: 500 })
  }
}
