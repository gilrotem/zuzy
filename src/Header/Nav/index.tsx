'use client'

import React from 'react'

import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon, Menu, X } from 'lucide-react'

interface HeaderNavProps {
  data: any
  isMobileOpen: boolean
  onMobileToggle: () => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  data,
  isMobileOpen,
  onMobileToggle,
}) => {
  const navItems = data?.navItems || []

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden lg:flex gap-3 items-center">
        {navItems.map(({ link }: any, i: number) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="w-5 text-primary" />
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
          {navItems.map(({ link }: any, i: number) => (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="block py-3 px-2 text-base text-white/80 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            />
          ))}

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
