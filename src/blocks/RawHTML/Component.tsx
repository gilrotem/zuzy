import React from 'react'

import type { RawHTMLBlock as RawHTMLBlockType } from '@/payload-types'

export const RawHTMLBlock: React.FC<RawHTMLBlockType> = ({ html }) => {
  if (!html) return null

  return (
    <div className="container my-16">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
