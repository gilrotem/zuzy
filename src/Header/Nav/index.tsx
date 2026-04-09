'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

import { DesktopNav } from './DesktopNav'
import { MobileMenu } from './MobileMenu'
import { MobileMenuToggle } from './MobileMenuToggle'
import type { Header } from '@/payload-types'

type NavItem = NonNullable<Header['navItems']>[number]

type HeaderNavProps = {
  navItems: NavItem[]
  activeDropdown: string | null
  onDropdownEnter: (id: string) => void
  onDropdownLeave: () => void
  isMobileOpen: boolean
  onMobileToggle: () => void
  expandedSection: string | null
  onSectionToggle: (id: string) => void
}

export function HeaderNav({
  navItems,
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
  isMobileOpen,
  onMobileToggle,
  expandedSection,
  onSectionToggle,
}: HeaderNavProps) {
  return (
    <>
      {/* Desktop nav */}
      <DesktopNav
        navItems={navItems}
        activeDropdown={activeDropdown}
        onDropdownEnter={onDropdownEnter}
        onDropdownLeave={onDropdownLeave}
      />

      {/* Desktop actions */}
      <div className="hidden lg:flex items-center gap-2">
        <Link href="/search" className="p-2 text-white/80 hover:text-white transition-colors">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 h-5" />
        </Link>
        <a
          href="https://core.zuzy.co.il/login"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          התחברות
        </a>
      </div>

      {/* Mobile toggle */}
      <MobileMenuToggle isOpen={isMobileOpen} onToggle={onMobileToggle} />

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileOpen}
        navItems={navItems}
        expandedSection={expandedSection}
        onSectionToggle={onSectionToggle}
      />
    </>
  )
}
