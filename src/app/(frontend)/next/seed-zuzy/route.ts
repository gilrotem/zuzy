import { createLocalReq, getPayload } from 'payload'
import { seedZuzy } from '@/endpoints/seed-zuzy'
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
    const req = await createLocalReq({ user }, payload)
    const result = await seedZuzy({ payload, req })
    return Response.json({ success: true, ...result })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding zuzy pages' })
    return new Response(`Error: ${e instanceof Error ? e.message : 'unknown'}`, { status: 500 })
  }
}
