'use client'

import React from 'react'

import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X, ChevronDown } from 'lucide-react'

interface HeaderNavProps {
  data: any
  isMobileOpen: boolean
  onMobileToggle: () => void
  activeDropdown: string | null
  onDropdownEnter: (id: string) => void
  onDropdownLeave: () => void
  expandedSection: string | null
  onSectionToggle: (id: string) => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  data,
  isMobileOpen,
  onMobileToggle,
  activeDropdown,
  onDropdownEnter,
  onDropdownLeave,
  expandedSection,
  onSectionToggle,
}) => {
  const navItems = data?.navItems || []

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden lg:flex gap-1 items-center">
        {navItems.map((item: any, i: number) => {
          const isDropdown =
            item.style === 'dropdown' &&
            Array.isArray(item.children) &&
            item.children.length > 0
          const itemId = item.id || `nav-${i}`

          if (isDropdown) {
            const isOpen = activeDropdown === itemId
            return (
              <div
                key={i}
                className="relative"
                onMouseEnter={() => onDropdownEnter(itemId)}
                onMouseLeave={onDropdownLeave}
              >
                <button
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-sm text-white/80 hover:text-white transition-colors rounded-md hover:bg-white/5',
                    isOpen && 'text-white bg-white/5',
                  )}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  {item.link?.label}
                  <ChevronDown
                    className={cn(
                      'w-3.5 h-3.5 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className={cn(
                    'absolute top-full start-0 pt-2 transition-all duration-200',
                    isOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-1 pointer-events-none',
                  )}
                >
                  <div
                    className={cn(
                      'min-w-[280px] rounded-lg border border-white/10 bg-black/95 backdrop-blur-sm p-3 shadow-xl',
                      item.children.length > 4 && 'grid grid-cols-2 gap-1 min-w-[480px]',
                    )}
                  >
                    {item.children.map((child: any, ci: number) => (
                      <CMSLink
                        key={ci}
                        {...child.link}
                        appearance="link"
                        className="block px-3 py-2.5 rounded-md text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        <span className="font-medium text-white/90">
                          {child.link?.label}
                        </span>
                        {child.description && (
                          <span className="block text-xs text-white/50 mt-0.5">
                            {child.description}
                          </span>
                        )}
                      </CMSLink>
                    ))}
                  </div>
                </div>
              </div>
            )
          }

          return <CMSLink key={i} {...item.link} appearance="link" className="px-3 py-2 text-sm" />
        })}

        <Link href="/search" className="p-2 text-white/80 hover:text-white transition-colors">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5" />
        </Link>
        <a
          href="https://core.zuzy.co.il/login"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Login
        </a>
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
        onClick={onMobileToggle}
        aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileOpen}
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile nav panel */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 top-[57px] z-40 bg-black/95 backdrop-blur-sm transition-all duration-300 lg:hidden',
          isMobileOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none',
        )}
      >
        <nav className="container flex flex-col gap-1 py-6 overflow-y-auto max-h-full">
          {navItems.map((item: any, i: number) => {
            const isDropdown =
              item.style === 'dropdown' &&
              Array.isArray(item.children) &&
              item.children.length > 0
            const itemId = item.id || `nav-${i}`

            if (isDropdown) {
              const isExpanded = expandedSection === itemId
              return (
                <div key={i}>
                  <button
                    className="flex items-center justify-between w-full py-3 px-2 text-base text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                    onClick={() => onSectionToggle(itemId)}
                    aria-expanded={isExpanded}
                  >
                    <span>{item.link?.label}</span>
                    <ChevronDown
                      className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        isExpanded && 'rotate-180',
                      )}
                    />
                  </button>
                  {isExpanded && (
                    <div className="ps-4 pb-2 flex flex-col gap-0.5">
                      {item.children.map((child: any, ci: number) => (
                        <CMSLink
                          key={ci}
                          {...child.link}
                          appearance="link"
                          className="block py-2.5 px-3 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <CMSLink
                key={i}
                {...item.link}
                appearance="link"
                className="block py-3 px-2 text-base text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              />
            )
          })}

          <Link
            href="/search"
            className="flex items-center gap-2 py-3 px-2 text-base text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          >
            <SearchIcon className="w-5" />
            <span>Search</span>
          </Link>

          <a
            href="https://core.zuzy.co.il/login"
            className="mt-4 block rounded-md bg-primary px-4 py-3 text-center text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Login
          </a>
        </nav>
      </div>
    </>
  )
}
