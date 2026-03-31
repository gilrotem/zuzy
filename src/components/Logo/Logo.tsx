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

  // If CMS logo image exists, use it as override
  if (logoObject?.url) {
    return (
      <img
        src={logoObject.url}
        alt={logoObject.alt || siteName}
        className={clsx('h-8 object-contain', className)}
      />
    )
  }

  // Default: use brand SVG kit (purple for light, white for dark)
  return (
    <span className={clsx('inline-flex items-center h-8', className)}>
      <img
        src="/brand/logo-horizontal-purple.svg"
        alt={siteName}
        className="h-full object-contain dark:hidden"
      />
      <img
        src="/brand/logo-horizontal-white.svg"
        alt={siteName}
        className="h-full object-contain hidden dark:block"
      />
    </span>
  )
}
