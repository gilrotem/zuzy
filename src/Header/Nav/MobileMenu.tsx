'use client'

import React from 'react'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { MobileAccordionSection } from './MobileAccordionSection'
import type { Header } from '@/payload-types'
import { cn } from '@/utilities/ui'

type NavItem = NonNullable<Header['navItems']>[number]

type MobileMenuProps = {
  isOpen: boolean
  navItems: NavItem[]
  expandedSection: string | null
  onSectionToggle: (id: string) => void
}

export function MobileMenu({
  isOpen,
  navItems,
  expandedSection,
  onSectionToggle,
}: MobileMenuProps) {
  return (
    <div
      className={cn(
        'fixed inset-x-0 top-[72px] bottom-0 bg-background z-40 lg:hidden overflow-y-auto transition-all duration-300 ease-in-out',
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none',
      )}
    >
      <div className="flex flex-col">
        {navItems.map((item) => {
          const itemId = item.id || item.label

          if (item.style === 'dropdown' && item.children?.length) {
            return (
              <MobileAccordionSection
                key={itemId}
                label={item.label}
                items={item.children}
                isExpanded={expandedSection === itemId}
                onToggle={() => onSectionToggle(itemId!)}
              />
            )
          }

          if (item.style === 'link' && item.directLink) {
            return (
              <div key={itemId} className="border-b border-border">
                <CMSLink
                  {...item.directLink}
                  appearance="link"
                  className="block py-4 px-4 text-base font-medium text-foreground hover:bg-accent/50 transition-colors"
                />
              </div>
            )
          }

          return null
        })}

        {/* Search + Login */}
        <div className="p-4 mt-4 flex flex-col gap-3">
          <Link
            href="/search"
            className="flex items-center gap-2 py-3 px-4 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50 transition-colors"
          >
            <SearchIcon className="w-4 h-4" />
            חיפוש
          </Link>
          <a
            href="https://core.zuzy.co.il/login"
            className="block text-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            התחברות
          </a>
        </div>
      </div>
    </div>
  )
}
