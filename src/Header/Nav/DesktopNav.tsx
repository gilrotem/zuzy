'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import { DropdownPanel } from './DropdownPanel'
import type { Header } from '@/payload-types'
import { cn } from '@/utilities/ui'

type NavItem = NonNullable<Header['navItems']>[number]

type DesktopNavProps = {
  navItems: NavItem[]
  activeDropdown: string | null
  onDropdownEnter: (id: string) => void
  onDropdownLeave: () => void
}

export function DesktopNav({
  navItems,
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
}: DesktopNavProps) {
  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => {
        const itemId = item.id || item.label

        if (item.style === 'link' && item.directLink) {
          return (
            <CMSLink
              key={itemId}
              {...item.directLink}
              className="px-3 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors rounded-md"
              appearance="link"
            />
          )
        }

        if (item.style === 'dropdown' && item.children?.length) {
          const isOpen = activeDropdown === itemId
          return (
            <div
              key={itemId}
              className="relative"
              onMouseEnter={() => onDropdownEnter(itemId!)}
              onMouseLeave={onDropdownLeave}
            >
              <button
                type="button"
                className={cn(
                  'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isOpen
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5',
                )}
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                {item.label}
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
              <DropdownPanel
                isOpen={isOpen}
                items={item.children}
                description={item.description}
              />
            </div>
          )
        }

        return null
      })}
    </nav>
  )
}
