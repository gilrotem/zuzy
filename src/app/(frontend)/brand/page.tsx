import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'מסמכי מותג | ZUZY',
  description: 'מסמכי מותג וידע של ZUZY',
}

export default async function BrandDocsPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: brandDocs } = await payload.find({
    collection: 'brand-docs',
    limit: 50,
    sort: 'sortOrder',
    where: {
      _status: { equals: 'published' },
    },
  })

  const iconMap: Record<string, string> = {
    dna: '🧬',
    mic: '🎙️',
    briefcase: '💼',
    target: '🎯',
    gear: '⚙️',
    chart: '📈',
    puzzle: '🧩',
    question: '❓',
    clipboard: '📋',
  }

  return (
    <div className="container py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">מסמכי מותג</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandDocs.map((doc) => (
          <Link
            key={doc.id}
            href={`/brand/${doc.slug}`}
            className="bg-card rounded-xl border border-border p-6 hover:border-primary transition-colors group"
          >
            <div className="flex items-center gap-3 mb-3">
              {doc.icon && <span className="text-3xl">{iconMap[doc.icon] || doc.icon}</span>}
              <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
                {doc.title}
              </h2>
            </div>
            {doc.summary && (
              <p className="text-muted-foreground line-clamp-2">{doc.summary}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
