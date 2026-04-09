'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
  siteSettings?: any
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, siteSettings }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  // Dropdown state
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Mobile state
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  // Close everything on route change
  useEffect(() => {
    setHeaderTheme(null)
    setActiveDropdown(null)
    setIsMobileOpen(false)
    setExpandedSection(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setIsMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Body scroll lock for mobile
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

  // Dropdown hover handlers with debounce
  const onDropdownEnter = useCallback((id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(id)
    }, 100)
  }, [])

  const onDropdownLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }, [])

  const onMobileToggle = useCallback(() => {
    setIsMobileOpen((prev) => !prev)
    setExpandedSection(null)
  }, [])

  const onSectionToggle = useCallback((id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id))
  }, [])

  const navItems = data?.navItems || []

  return (
    <header
      className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container py-4 flex items-center justify-between">
        <Link href="/">
          <Logo
            className="text-white dark:text-white"
            logoObject={siteSettings?.logo}
            siteName={siteSettings?.siteName}
          />
        </Link>

        <HeaderNav
          navItems={navItems}
          activeDropdown={activeDropdown}
          onDropdownEnter={onDropdownEnter}
          onDropdownLeave={onDropdownLeave}
          isMobileOpen={isMobileOpen}
          onMobileToggle={onMobileToggle}
          expandedSection={expandedSection}
          onSectionToggle={onSectionToggle}
        />
      </div>
    </header>
  )
}
