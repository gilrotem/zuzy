/**
 * WordPress Gutenberg Block Mapper
 *
 * Renders WP REST API `content.rendered` HTML within the ZUZY design system.
 * Since WP returns fully rendered HTML, we use Tailwind prose classes for styling
 * and post-process images for Next.js optimization.
 */

import Image from 'next/image'
import React from 'react'

type WPContentProps = {
  html: string
  className?: string
}

/**
 * Extract image tags from WP HTML and replace with Next.js Image components.
 * Returns an array of React elements mixing HTML fragments and optimized images.
 */
function processContent(html: string): React.ReactNode[] {
  // Split HTML by img tags to replace them with Next.js Image
  const imgRegex = /<img\s+([^>]*)>/gi
  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = imgRegex.exec(html)) !== null) {
    // Add HTML before this image
    if (match.index > lastIndex) {
      parts.push(
        <span
          key={`html-${lastIndex}`}
          dangerouslySetInnerHTML={{ __html: html.slice(lastIndex, match.index) }}
        />,
      )
    }

    // Parse image attributes
    const attrs = match[1]
    const src = attrs.match(/src=["']([^"']*)["']/)?.[1]
    const alt = attrs.match(/alt=["']([^"']*)["']/)?.[1] || ''
    const width = attrs.match(/width=["'](\d+)["']/)?.[1]
    const height = attrs.match(/height=["'](\d+)["']/)?.[1]

    if (src) {
      parts.push(
        <Image
          key={`img-${match.index}`}
          src={src}
          alt={alt}
          width={width ? parseInt(width, 10) : 800}
          height={height ? parseInt(height, 10) : 450}
          className="rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 48rem"
          loading="lazy"
        />,
      )
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining HTML
  if (lastIndex < html.length) {
    parts.push(
      <span
        key={`html-${lastIndex}`}
        dangerouslySetInnerHTML={{ __html: html.slice(lastIndex) }}
      />,
    )
  }

  return parts
}

/**
 * Renders WordPress content.rendered HTML with ZUZY design system styling.
 * Images are replaced with Next.js Image components for optimization.
 */
export function WPContent({ html, className }: WPContentProps) {
  if (!html) return null

  const hasImages = /<img\s/.test(html)

  // If no images, use simple dangerouslySetInnerHTML for better performance
  if (!hasImages) {
    return (
      <div
        className={`prose prose-lg dark:prose-invert max-w-none ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  // With images, process content to replace img tags with Next.js Image
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className || ''}`}>
      {processContent(html)}
    </div>
  )
}
