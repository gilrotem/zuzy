'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: any
  siteSettings?: any
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, siteSettings }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setIsMobileOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Body scroll lock
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const onMobileToggle = useCallback(() => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm',
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-4 flex justify-between items-center">
        <Link href="/">
          <Logo
            className="text-white dark:text-white"
            logoObject={siteSettings?.logo}
            siteName={siteSettings?.siteName}
          />
        </Link>
        <HeaderNav
          data={data}
          isMobileOpen={isMobileOpen}
          onMobileToggle={onMobileToggle}
        />
      </div>
    </header>
  )
}
