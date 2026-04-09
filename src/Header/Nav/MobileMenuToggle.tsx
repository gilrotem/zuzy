'use client'

import React from 'react'
import { Menu, X } from 'lucide-react'

type MobileMenuToggleProps = {
  isOpen: boolean
  onToggle: () => void
}

export function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  return (
    <button
      type="button"
      className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
    </button>
  )
}
