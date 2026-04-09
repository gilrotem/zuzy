'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

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
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setHeaderTheme(null)
    setIsMobileOpen(false)
    setActiveDropdown(null)
    setExpandedSection(null)
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
      if (e.key === 'Escape') {
        setIsMobileOpen(false)
        setActiveDropdown(null)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const onMobileToggle = useCallback(() => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  const onDropdownEnter = useCallback((id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setActiveDropdown(id), 100)
  }, [])

  const onDropdownLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150)
  }, [])

  const onSectionToggle = useCallback((id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id))
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
          activeDropdown={activeDropdown}
          onDropdownEnter={onDropdownEnter}
          onDropdownLeave={onDropdownLeave}
          expandedSection={expandedSection}
          onSectionToggle={onSectionToggle}
        />
      </div>
    </header>
  )
}
