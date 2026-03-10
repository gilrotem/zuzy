import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  logoObject?: {
    url?: string
    filename?: string
    alt?: string
  } | null
  siteName?: string
}

export const Logo = (props: Props) => {
  const { className, logoObject, siteName = 'ZUZY' } = props

  // If logo image exists, show it
  if (logoObject?.url) {
    return (
      <img
        src={logoObject.url}
        alt={logoObject.alt || siteName}
        className={clsx('h-8 object-contain', className)}
      />
    )
  }

  // Fallback to site name text
  return (
    <span
      className={clsx(
        'inline-flex items-center font-bold text-2xl tracking-tight select-none',
        className,
      )}
    >
      {siteName}
    </span>
  )
}
