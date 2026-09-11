import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { brevoAdapter } from '@/email/brevoAdapter'

/**
 * The Resend setup this replaced failed silently for months: no API key was set in
 * Vercel Production, the adapter fell back to `apiKey: ''`, and every send failed
 * without anyone noticing. These tests pin the two things that mattered — the payload
 * Brevo actually receives, and that a missing key throws instead of pretending to work.
 */

const ARGS = {
  apiKey: 'test-key',
  defaultFromAddress: 'noreply@zuzy.co.il',
  defaultFromName: 'ZUZY',
}

const send = (message: Record<string, unknown>, args = ARGS) =>
  // @ts-expect-error — the adapter only uses `payload` for typing, not at runtime
  brevoAdapter(args)({}).sendEmail(message)

const lastBody = (fetchMock: ReturnType<typeof vi.fn>) =>
  JSON.parse(fetchMock.mock.calls[0][1].body as string)

describe('brevoAdapter', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn(async () => ({
      ok: true,
      status: 201,
      json: async () => ({ messageId: '<abc@brevo>' }),
    }))
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => vi.unstubAllGlobals())

  it('posts to the Brevo transactional endpoint with the api-key header', async () => {
    await send({ to: 'a@b.com', subject: 'Hi', html: '<p>Hi</p>' })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('https://api.brevo.com/v3/smtp/email')
    expect(init.method).toBe('POST')
    expect(init.headers['api-key']).toBe('test-key')
  })

  it('maps subject and html/text to Brevo field names', async () => {
    await send({ to: 'a@b.com', subject: 'Hi', html: '<p>Hi</p>', text: 'Hi' })
    const body = lastBody(fetchMock)
    expect(body.subject).toBe('Hi')
    expect(body.htmlContent).toBe('<p>Hi</p>')
    expect(body.textContent).toBe('Hi')
  })

  it('falls back to the default sender when `from` is absent', async () => {
    await send({ to: 'a@b.com', subject: 'x', text: 'x' })
    expect(lastBody(fetchMock).sender).toEqual({
      email: 'noreply@zuzy.co.il',
      name: 'ZUZY',
    })
  })

  it('parses "Name <email>" into a Brevo contact', async () => {
    await send({ to: 'Gil Rotem <gil@zuzy.co.il>', subject: 'x', text: 'x' })
    expect(lastBody(fetchMock).to).toEqual([{ email: 'gil@zuzy.co.il', name: 'Gil Rotem' }])
  })

  it('splits a comma-separated recipient string', async () => {
    await send({ to: 'a@b.com, c@d.com', subject: 'x', text: 'x' })
    expect(lastBody(fetchMock).to).toEqual([{ email: 'a@b.com' }, { email: 'c@d.com' }])
  })

  it('accepts nodemailer {name, address} objects and arrays', async () => {
    await send({
      to: [{ name: 'A', address: 'a@b.com' }, 'c@d.com'],
      subject: 'x',
      text: 'x',
    })
    expect(lastBody(fetchMock).to).toEqual([{ email: 'a@b.com', name: 'A' }, { email: 'c@d.com' }])
  })

  it('maps cc, bcc and replyTo, and omits them when absent', async () => {
    await send({ to: 'a@b.com', cc: 'c@c.com', replyTo: 'r@r.com', subject: 'x', text: 'x' })
    const body = lastBody(fetchMock)
    expect(body.cc).toEqual([{ email: 'c@c.com' }])
    expect(body.replyTo).toEqual({ email: 'r@r.com' })
    expect(body).not.toHaveProperty('bcc')
  })

  it('always sends at least one content field, as Brevo requires', async () => {
    await send({ to: 'a@b.com', subject: 'x' })
    const body = lastBody(fetchMock)
    expect('htmlContent' in body || 'textContent' in body).toBe(true)
  })

  it('throws when the API key is missing instead of failing silently', async () => {
    await expect(send({ to: 'a@b.com', subject: 'x', text: 'x' }, { ...ARGS, apiKey: '' }))
      .rejects.toThrow(/BREVO_API_KEY is not set/)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('throws when no recipient can be resolved', async () => {
    await expect(send({ subject: 'x', text: 'x' })).rejects.toThrow(/no recipient/)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('surfaces a Brevo API error rather than resolving', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ code: 'unauthorized', message: 'Key not found' }),
    })
    await expect(send({ to: 'a@b.com', subject: 'x', text: 'x' })).rejects.toThrow(
      /401 unauthorized - Key not found/,
    )
  })

  it('returns the Brevo messageId on success', async () => {
    const res = await send({ to: 'a@b.com', subject: 'x', text: 'x' })
    expect(res).toEqual({ messageId: '<abc@brevo>' })
  })
})
