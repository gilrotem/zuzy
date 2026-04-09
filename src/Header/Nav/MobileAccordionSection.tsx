'use client'

import React from 'react'
import { ChevronDown } from 'lucide-react'
import { CMSLink } from '@/components/Link'
import type { Header } from '@/payload-types'
import { cn } from '@/utilities/ui'

type ChildItem = NonNullable<NonNullable<Header['navItems']>[number]['children']>[number]

type MobileAccordionSectionProps = {
  label: string
  items: ChildItem[]
  isExpanded: boolean
  onToggle: () => void
}

export function MobileAccordionSection({
  label,
  items,
  isExpanded,
  onToggle,
}: MobileAccordionSectionProps) {
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 px-4 text-base font-medium text-foreground"
        aria-expanded={isExpanded}
      >
        {label}
        <ChevronDown
          className={cn(
            'w-4 h-4 shrink-0 transition-transform duration-200',
            isExpanded && 'rotate-180',
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isExpanded ? 'max-h-[600px] pb-3' : 'max-h-0',
        )}
      >
        <div className="flex flex-col gap-1 px-4">
          {items.map((child) => (
            <CMSLink
              key={child.id || child.link.label}
              {...child.link}
              appearance="link"
              className="py-2 px-3 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-accent/50 transition-colors"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
