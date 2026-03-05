import type { Payload, PayloadRequest } from 'payload'

/**
 * Zuzy seed — creates the 4 core pages if they don't already exist.
 * Safe to call multiple times (idempotent).
 */
export const seedZuzy = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<{ created: string[]; skipped: string[] }> => {
  const created: string[] = []
  const skipped: string[] = []

  const pages = [
    {
      slug: 'home',
      titles: { he: 'דף הבית', en: 'Home', ru: 'Главная', ar: 'الرئيسية', fr: 'Accueil', es: 'Inicio' },
    },
    {
      slug: 'services',
      titles: { he: 'שירותים', en: 'Services', ru: 'Услуги', ar: 'الخدمات', fr: 'Services', es: 'Servicios' },
    },
    {
      slug: 'about',
      titles: { he: 'אודות', en: 'About', ru: 'О нас', ar: 'من نحن', fr: 'À propos', es: 'Acerca de' },
    },
    {
      slug: 'contact',
      titles: { he: 'צור קשר', en: 'Contact', ru: 'Контакты', ar: 'اتصل بنا', fr: 'Contact', es: 'Contacto' },
    },
  ]

  for (const page of pages) {
    // Check if it already exists
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      depth: 0,
    })

    if (existing.totalDocs > 0) {
      skipped.push(page.slug)
      payload.logger.info(`  — Page "${page.slug}" already exists, skipping`)
      continue
    }

    // Create with default (he) locale first
    const created_page = await payload.create({
      collection: 'pages',
      locale: 'he',
      data: {
        title: page.titles.he,
        slug: page.slug,
        hero: { type: 'none' },
        layout: [],
        _status: 'published',
      },
      req,
    })

    // title is NOT localized — no need to update per locale

    created.push(page.slug)
    payload.logger.info(`  — Page "${page.slug}" created (id: ${created_page.id})`)
  }

  return { created, skipped }
}
