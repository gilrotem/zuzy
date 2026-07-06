/**
 * Canonical ZUZY business identity (NAP) — the single source of truth for
 * structured data (Schema.org). Sourced from the Google Business Profile.
 *
 * NAP = Name, Address, Phone. Keeping this file identical to the GBP listing is
 * what preserves NAP consistency across the web (the core local-SEO authority
 * signal). The SEO Settings global can OVERRIDE any of these at runtime, but the
 * values here are the guaranteed-correct baseline that renders even when the
 * global is empty.
 */

export type OpeningHours = {
  days: string[]
  opens: string
  closes: string
}

export const BUSINESS_INFO = {
  /** Brand name — matches the display name. */
  name: 'ZUZY',
  /** Full registered name exactly as it appears on the Google Business Profile. */
  legalName: 'ZUZY - שירותי דיגיטל ופיתוח לעסקים',
  description: 'ZUZY — פלטפורמת הפיתוח הישראלית',
  email: 'zuzy@zuzy.co.il',
  /** E.164 international format (required by Schema.org / Google). */
  telephone: '+972-55-922-9039',
  /** Human-readable local format for display use if ever needed. */
  telephoneLocal: '055-922-9039',
  address: {
    streetAddress: 'תפוצות ישראל 6',
    addressLocality: 'גבעתיים',
    postalCode: '5358325',
    addressCountry: 'IL',
  },
  geo: {
    latitude: 32.05984920309557,
    longitude: 34.81526845348097,
  },
  openingHours: [
    {
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      days: ['Friday'],
      opens: '09:00',
      closes: '14:00',
    },
    // Saturday: closed — omitted intentionally (Schema.org treats absent days as closed).
  ] as OpeningHours[],
  /** Social + authority profiles for Organization.sameAs. */
  sameAs: ['https://www.facebook.com/people/ZUZY/61575347844024/'],
  /**
   * Google Business Profile / Maps listing URL.
   * Empty until the GBP listing is VERIFIED by Google — do not reference an
   * unverified listing. Once approved, paste the Maps URL here and it is added
   * to sameAs + used as hasMap on the LocalBusiness node.
   */
  googleBusinessUrl: '',
} as const
