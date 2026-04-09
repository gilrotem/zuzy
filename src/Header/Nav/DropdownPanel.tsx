'use client'

import React from 'react'
import { CMSLink } from '@/components/Link'
import type { Header } from '@/payload-types'
import { cn } from '@/utilities/ui'

type ChildItem = NonNullable<NonNullable<Header['navItems']>[number]['children']>[number]

type DropdownPanelProps = {
  isOpen: boolean
  items: ChildItem[]
  description?: string | null
}

export function DropdownPanel({ isOpen, items, description }: DropdownPanelProps) {
  return (
    <div
      className={cn(
        'absolute start-1/2 -translate-x-1/2 top-full pt-2 z-50 transition-all duration-200 ease-out',
        isOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none',
      )}
    >
      <div className="w-max min-w-[280px] max-w-[500px] rounded-xl bg-popover/95 backdrop-blur-md border border-border shadow-2xl p-3">
        {description && (
          <p className="px-3 pb-3 text-xs text-muted-foreground border-b border-border mb-2">
            {description}
          </p>
        )}
        <div
          className={cn(
            'grid gap-1',
            items.length > 4 ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          {items.map((child) => (
            <CMSLink
              key={child.id || child.link.label}
              {...child.link}
              appearance="link"
              className="flex flex-col gap-0.5 p-3 rounded-lg text-sm hover:bg-accent/50 transition-colors group"
            >
              <span className="font-medium text-foreground group-hover:text-foreground">
                {child.link.label}
              </span>
              {child.description && (
                <span className="text-xs text-muted-foreground line-clamp-2">
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
