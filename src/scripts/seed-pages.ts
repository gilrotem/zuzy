/**
 * Standalone page seeder — run with:
 *   pnpm seed:pages
 *
 * Seeds/updates all ZUZY marketing pages: homepage, platform, services,
 * solutions, pricing, legal, resources, support, brand-docs.
 *
 * Safe to run multiple times — updates existing pages or creates new ones.
 * Runs locally via `payload run` — no Vercel timeout constraints.
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { seedZuzy } from '../endpoints/seed-zuzy'

const run = async () => {
  const payload = await getPayload({ config })

  payload.logger.info('=== ZUZY Page Seeder (standalone) ===')

  const result = await seedZuzy({
    payload,
    req: {} as any, // Local API doesn't need a real request object
  })

  payload.logger.info(`Updated: ${result.updated.length} pages`)
  if (result.skipped.length > 0) {
    payload.logger.info(`Skipped: ${result.skipped.length} pages`)
  }

  payload.logger.info('=== Page seeding complete! ===')

  process.exit(0)
}

await run()
