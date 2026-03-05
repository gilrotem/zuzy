import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'

type OrganizationSchemaProps = {
  name?: string
  url?: string
  logo?: string
  description?: string
}

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name = 'ZUZY',
  url,
  logo,
  description = 'מערכת הפעלה עסקית חכמה',
}) => {
  const siteUrl = url || getServerSideURL()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url: siteUrl,
    ...(logo ? { logo } : {}),
    description,
    sameAs: [],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

type FAQSchemaProps = {
  items: Array<{
    question: string
    answer: string
  }>
}

export const FAQSchema: React.FC<FAQSchemaProps> = ({ items }) => {
  if (!items || items.length === 0) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

type ServiceSchemaProps = {
  name: string
  description: string
  provider?: string
  url?: string
}

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  name,
  description,
  provider = 'ZUZY',
  url,
}) => {
  const siteUrl = url || getServerSideURL()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
    },
    url: siteUrl,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

type ProductSchemaProps = {
  name: string
  description: string
  price?: string
  currency?: string
  url?: string
  image?: string
}

export const ProductSchema: React.FC<ProductSchemaProps> = ({
  name,
  description,
  price,
  currency = 'ILS',
  url,
  image,
}) => {
  const siteUrl = url || getServerSideURL()

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url: siteUrl,
    ...(image ? { image } : {}),
  }

  if (price) {
    schema.offers = {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
