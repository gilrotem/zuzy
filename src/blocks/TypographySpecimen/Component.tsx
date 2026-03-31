import React from 'react'

const weights = [
  { weight: 300, name: 'Light', nameHe: 'דק' },
  { weight: 400, name: 'Regular', nameHe: 'רגיל' },
  { weight: 500, name: 'Medium', nameHe: 'בינוני' },
  { weight: 600, name: 'SemiBold', nameHe: 'חצי-עבה' },
  { weight: 700, name: 'Bold', nameHe: 'עבה' },
]

const sizeScale = [
  { size: '3rem', label: 'Display / 48px', sample: 'אל תתקע. תזוז.' },
  { size: '2.25rem', label: 'H1 / 36px', sample: 'הכלי שעובד בשבילך' },
  { size: '1.875rem', label: 'H2 / 30px', sample: 'מערכת SEO מתקדמת' },
  { size: '1.5rem', label: 'H3 / 24px', sample: 'ניהול קמפיינים חכם' },
  { size: '1.25rem', label: 'H4 / 20px', sample: 'תוצאות מדידות' },
  { size: '1rem', label: 'Body / 16px', sample: 'טקסט גוף רגיל — IBM Plex Sans Hebrew' },
  { size: '0.875rem', label: 'Small / 14px', sample: 'טקסט משני וכיתובים' },
]

export const TypographySpecimenComponent: React.FC<{
  heading?: string | null
  disableInnerContainer?: boolean
}> = ({ heading }) => {
  return (
    <section className="container py-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl font-bold mb-12">{heading}</h2>
      )}

      {/* Font Family */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold mb-2 text-muted-foreground">Font Family</h3>
        <p className="text-5xl font-bold mb-2">IBM Plex Sans Hebrew</p>
        <p className="text-muted-foreground">
          Primary typeface for all ZUZY products. Supports Hebrew, Latin, and Cyrillic.
        </p>
      </div>

      {/* Weights */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold mb-6 text-muted-foreground">
          משקלים / Weights
        </h3>
        <div className="space-y-4">
          {weights.map((w) => (
            <div
              key={w.weight}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 border-b border-border pb-4"
            >
              <div className="w-40 shrink-0">
                <span className="text-sm font-mono text-muted-foreground">
                  {w.weight} — {w.name}
                </span>
              </div>
              <p
                className="text-2xl"
                style={{ fontWeight: w.weight }}
                dir="rtl"
              >
                אל תתקע. תזוז. — Don&apos;t get stuck. Move.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Size Scale */}
      <div>
        <h3 className="text-xl font-semibold mb-6 text-muted-foreground">
          סולם גדלים / Size Scale
        </h3>
        <div className="space-y-6">
          {sizeScale.map((s) => (
            <div key={s.label} className="border-b border-border pb-4">
              <span className="text-xs font-mono text-muted-foreground block mb-1">
                {s.label}
              </span>
              <p style={{ fontSize: s.size, lineHeight: 1.3 }} dir="rtl">
                {s.sample}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
