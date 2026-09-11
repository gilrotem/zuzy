import type { EmailAdapter, SendEmailOptions } from 'payload'
import { APIError } from 'payload'

/**
 * Email adapter for Brevo's transactional API.
 *
 * Why Brevo and not Resend: `zuzy.co.il` is already authenticated for Brevo in DNS —
 * DKIM (`brevo1`/`brevo2._domainkey`), the `brevo-code` apex TXT, and a DMARC `rua`
 * pointing at Brevo. Resend had none of that, no SPF include, and no API key set in
 * Vercel Production, so `@payloadcms/email-resend` was initialising with `apiKey: ''`
 * and every send failed silently. Contact-form notifications were not reaching anyone.
 *
 * Brevo docs: https://developers.brevo.com/reference/sendtransacemail
 */

type BrevoAdapterArgs = {
  apiKey: string
  defaultFromAddress: string
  defaultFromName: string
}

type BrevoContact = { email: string; name?: string }

type BrevoSuccess = { messageId: string }
type BrevoError = { code?: string; message?: string }
type BrevoResponse = BrevoError | BrevoSuccess

const BREVO_ENDPOINT = 'https://api.brevo.com/v3/smtp/email'

/**
 * Accepts every shape nodemailer allows — `"a@b.com"`, `"Name <a@b.com>"`,
 * `"a@b.com, c@d.com"`, `{ name, address }`, or an array of any of those — and
 * returns Brevo's `{ email, name }` contacts.
 */
const toContacts = (
  input: SendEmailOptions['to'] | SendEmailOptions['cc'],
): BrevoContact[] => {
  if (!input) return []

  const items = Array.isArray(input) ? input : [input]
  const contacts: BrevoContact[] = []

  for (const item of items) {
    if (!item) continue

    if (typeof item === 'object' && 'address' in item) {
      contacts.push({ email: item.address, ...(item.name ? { name: item.name } : {}) })
      continue
    }

    // A string may itself hold several comma-separated addresses.
    for (const part of String(item).split(',')) {
      const raw = part.trim()
      if (!raw) continue

      const angled = raw.match(/^(.*?)\s*<([^>]+)>$/)
      if (angled) {
        const name = angled[1].trim().replace(/^["']|["']$/g, '')
        contacts.push({ email: angled[2].trim(), ...(name ? { name } : {}) })
      } else {
        contacts.push({ email: raw })
      }
    }
  }

  return contacts
}

const toSender = (
  from: SendEmailOptions['from'],
  defaultFromAddress: string,
  defaultFromName: string,
): BrevoContact => {
  const [parsed] = toContacts(from as SendEmailOptions['to'])
  if (!parsed?.email) return { email: defaultFromAddress, name: defaultFromName }
  return { email: parsed.email, name: parsed.name ?? defaultFromName }
}

/** Minimal structural shape — avoids depending on nodemailer's types resolving. */
type LooseAttachment = { filename?: unknown; content?: unknown }

const toAttachments = (attachments: SendEmailOptions['attachments']) => {
  if (!attachments?.length) return undefined

  const mapped = (attachments as LooseAttachment[])
    .map((a: LooseAttachment) => {
      const name = a.filename
      const content = a.content
      if (typeof name !== 'string' || content == null) return null
      const base64 = Buffer.isBuffer(content)
        ? content.toString('base64')
        : typeof content === 'string'
          ? Buffer.from(content).toString('base64')
          : null
      return base64 ? { name, content: base64 } : null
    })
    .filter((a): a is { name: string; content: string } => a !== null)

  return mapped.length ? mapped : undefined
}

export const brevoAdapter = (args: BrevoAdapterArgs): EmailAdapter<BrevoResponse> => {
  const { apiKey, defaultFromAddress, defaultFromName } = args

  return () => ({
    name: 'brevo-rest',
    defaultFromAddress,
    defaultFromName,
    sendEmail: async (message: SendEmailOptions): Promise<BrevoResponse> => {
      if (!apiKey) {
        // Fail loudly. The Resend setup this replaced failed silently for months
        // precisely because an empty key still produced a working-looking adapter.
        throw new APIError('BREVO_API_KEY is not set — cannot send email', 500)
      }

      const to = toContacts(message.to)
      if (!to.length) {
        throw new APIError('Cannot send email: no recipient resolved from `to`', 400)
      }

      const html = message.html?.toString()
      const text = message.text?.toString()
      const [replyTo] = toContacts(message.replyTo as SendEmailOptions['to'])
      const cc = toContacts(message.cc)
      const bcc = toContacts(message.bcc)
      const attachment = toAttachments(message.attachments)

      const body = {
        sender: toSender(message.from, defaultFromAddress, defaultFromName),
        to,
        subject: message.subject ?? '',
        // Brevo requires at least one of htmlContent / textContent.
        ...(html ? { htmlContent: html } : {}),
        ...(text ? { textContent: text } : {}),
        ...(!html && !text ? { textContent: '' } : {}),
        ...(cc.length ? { cc } : {}),
        ...(bcc.length ? { bcc } : {}),
        ...(replyTo ? { replyTo } : {}),
        ...(attachment ? { attachment } : {}),
      }

      const res = await fetch(BREVO_ENDPOINT, {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'content-type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = (await res.json().catch(() => ({}))) as BrevoResponse

      if (res.ok && 'messageId' in data) return data

      const err = data as BrevoError
      const detail = [err.code, err.message].filter(Boolean).join(' - ')
      throw new APIError(
        `Error sending email via Brevo: ${res.status}${detail ? ` ${detail}` : ''}`,
        res.status,
      )
    },
  })
}
