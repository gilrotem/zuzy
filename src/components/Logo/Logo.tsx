import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span
      className={clsx(
        'inline-flex items-center font-bold text-2xl tracking-tight select-none',
        className,
      )}
      style={{ fontFamily: 'var(--font-zuzy), sans-serif' }}
    >
      ZUZY
    </span>
  )
}
