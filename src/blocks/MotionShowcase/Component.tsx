'use client'

import React from 'react'
import { motion } from 'motion/react'

import type { MotionShowcaseBlock as MotionShowcaseBlockType } from '@/payload-types'

const GlowFilter = () => (
  <defs>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComponentTransfer in="blur" result="fadedBlur">
        <feFuncA type="linear" slope="0.1" />
      </feComponentTransfer>
      <feComposite in="SourceGraphic" in2="fadedBlur" operator="over" />
    </filter>
    <filter id="glow-lg" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComponentTransfer in="blur" result="fadedBlur">
        <feFuncA type="linear" slope="0.08" />
      </feComponentTransfer>
      <feComposite in="SourceGraphic" in2="fadedBlur" operator="over" />
    </filter>
    <linearGradient id="purpleCyan" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="var(--color-zuzy-purple)" />
      <stop offset="100%" stopColor="var(--color-zuzy-cyan)" />
    </linearGradient>
    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="var(--color-zuzy-purple)" stopOpacity="0.1" />
      <stop offset="100%" stopColor="var(--color-zuzy-purple)" stopOpacity="0" />
    </linearGradient>
    <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.15" />
    </pattern>
  </defs>
)

const ContentEngineDualAgent = () => (
  <div className="w-full h-64 relative bg-card rounded-xl border border-border flex items-center justify-center overflow-hidden shadow-sm">
    <svg viewBox="0 0 400 300" className="w-full h-full absolute inset-0">
      <GlowFilter />
      <rect width="100%" height="100%" fill="url(#dotGrid)" />

      {/* 4 Data Layers (Inputs) */}
      <g>
        <rect x="30" y="50" width="40" height="24" rx="4" className="fill-card stroke-border" strokeWidth="1" />
        <text x="50" y="66" className="fill-muted-foreground" fontSize="10" textAnchor="middle" fontFamily="sans-serif">ID</text>
        <rect x="30" y="100" width="40" height="24" rx="4" className="fill-card stroke-border" strokeWidth="1" />
        <text x="50" y="116" className="fill-muted-foreground" fontSize="10" textAnchor="middle" fontFamily="sans-serif">AMMO</text>
        <rect x="30" y="150" width="40" height="24" rx="4" className="fill-card stroke-border" strokeWidth="1" />
        <text x="50" y="166" className="fill-muted-foreground" fontSize="10" textAnchor="middle" fontFamily="sans-serif">SEO</text>
        <rect x="30" y="200" width="40" height="24" rx="4" className="fill-card stroke-border" strokeWidth="1" />
        <text x="50" y="216" className="fill-muted-foreground" fontSize="10" textAnchor="middle" fontFamily="sans-serif">LINKS</text>
      </g>

      {/* Connection Paths */}
      <g className="stroke-border" fill="none" strokeWidth="1" strokeDasharray="4 4">
        <path d="M 70 62 C 120 62, 140 100, 180 100" />
        <path d="M 70 112 C 120 112, 140 100, 180 100" />
        <path d="M 70 162 C 120 162, 140 200, 180 200" />
        <path d="M 70 212 C 120 212, 140 200, 180 200" />
      </g>

      {/* Animated Data Packets */}
      <motion.circle r="2.5" fill="var(--color-zuzy-purple)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 8, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="8s" repeatCount="indefinite" path="M 70 62 C 120 62, 140 100, 180 100" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="2.5" fill="var(--color-zuzy-purple)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 8.5, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="8.5s" repeatCount="indefinite" path="M 70 112 C 120 112, 140 100, 180 100" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="2.5" fill="var(--color-zuzy-cyan)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 7.8, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="7.8s" repeatCount="indefinite" path="M 70 162 C 120 162, 140 200, 180 200" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="2.5" fill="var(--color-zuzy-cyan)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 8.2, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="8.2s" repeatCount="indefinite" path="M 70 212 C 120 212, 140 200, 180 200" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>

      {/* Dual Agents */}
      <motion.path d="M 200 120 L 200 180" fill="none" stroke="url(#purpleCyan)" strokeWidth="3" filter="url(#glow)" strokeDasharray="6 6"
        animate={{ strokeDashoffset: [0, -12] }} transition={{ duration: 5, ease: 'linear', repeat: Infinity }} />
      <motion.circle cx="200" cy="100" r="24" className="fill-card" stroke="var(--color-zuzy-purple)" strokeWidth="1.5" filter="url(#glow)"
        animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <circle cx="200" cy="100" r="10" fill="var(--color-zuzy-purple)" opacity="0.15" />
      <text x="200" y="104" className="fill-foreground" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">ID</text>
      <motion.circle cx="200" cy="200" r="24" className="fill-card" stroke="var(--color-zuzy-cyan)" strokeWidth="1.5" filter="url(#glow)"
        animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 8, delay: 4, repeat: Infinity, ease: 'easeInOut' }} />
      <circle cx="200" cy="200" r="10" fill="var(--color-zuzy-cyan)" opacity="0.15" />
      <text x="200" y="204" className="fill-foreground" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">SEO</text>

      {/* Output Paths */}
      <path d="M 224 100 C 280 100, 280 150, 320 150" fill="none" stroke="var(--color-zuzy-purple)" strokeWidth="1.5" opacity="0.2" />
      <path d="M 224 200 C 280 200, 280 150, 320 150" fill="none" stroke="var(--color-zuzy-cyan)" strokeWidth="1.5" opacity="0.2" />
      <motion.circle r="3" fill="var(--color-zuzy-purple)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 7.5, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="7.5s" repeatCount="indefinite" path="M 224 100 C 280 100, 280 150, 320 150" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="3" fill="var(--color-zuzy-cyan)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 7.5, delay: 3.75, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="7.5s" begin="3.75s" repeatCount="indefinite" path="M 224 200 C 280 200, 280 150, 320 150" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>

      {/* Final Output */}
      <motion.g transform="translate(320, 120)" animate={{ y: [0, -2, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
        <rect x="0" y="0" width="50" height="60" rx="6" className="fill-card" stroke="url(#purpleCyan)" strokeWidth="1" filter="url(#glow)" />
        <rect x="10" y="15" width="30" height="3" rx="1.5" fill="var(--color-zuzy-purple)" opacity="0.5" />
        <rect x="10" y="25" width="20" height="3" rx="1.5" fill="var(--color-zuzy-cyan)" opacity="0.5" />
        <rect x="10" y="35" width="25" height="3" rx="1.5" className="fill-muted" />
        <rect x="10" y="45" width="15" height="3" rx="1.5" className="fill-muted" />
        <motion.path d="M 40 -10 L 45 -20 L 50 -10 L 60 -5 L 50 0 L 45 10 L 40 0 L 30 -5 Z" fill="#F59E0B" filter="url(#glow)"
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.5, 0.8, 0.5], rotate: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      </motion.g>
    </svg>
  </div>
)

const CannibalizationCleanser = () => (
  <div className="w-full h-64 relative bg-card rounded-xl border border-border flex items-center justify-center overflow-hidden shadow-sm">
    <svg viewBox="0 0 400 300" className="w-full h-full absolute inset-0">
      <GlowFilter />
      <rect width="100%" height="100%" fill="url(#dotGrid)" />

      {/* Phase 1: Chaos */}
      <g>
        <text x="70" y="40" className="fill-muted-foreground" fontSize="10" fontWeight="600" textAnchor="middle" fontFamily="sans-serif" letterSpacing="1">GSC API</text>
        <motion.circle cx="50" cy="100" r="10" className="fill-card" stroke="#EF4444" strokeWidth="1.5" animate={{ x: [0, 1.5, -1.5, 0], y: [0, -1.5, 1.5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="90" cy="120" r="14" className="fill-card" stroke="#F59E0B" strokeWidth="1.5" animate={{ x: [0, -2, 2, 0], y: [0, 2, -2, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="60" cy="160" r="12" className="fill-card" stroke="#EF4444" strokeWidth="1.5" animate={{ x: [0, 2, -2, 0], y: [0, -2, 2, 0] }} transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="100" cy="180" r="8" className="fill-card" stroke="#3B82F6" strokeWidth="1.5" animate={{ x: [0, -1, 1, 0], y: [0, 1, -1, 0] }} transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.circle cx="40" cy="200" r="10" className="fill-card" stroke="#10B981" strokeWidth="1.5" animate={{ x: [0, 1.5, -1.5, 0], y: [0, -1.5, 1.5, 0] }} transition={{ duration: 8.2, repeat: Infinity, ease: 'easeInOut' }} />
        <path d="M 50 100 L 90 120 L 60 160 L 100 180 L 40 200 Z" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="2 2" opacity="0.2" />
      </g>

      {/* Phase 2: Triage Engine */}
      <path d="M 140 80 L 180 120 L 180 180 L 140 220 Z" className="fill-card" stroke="var(--color-zuzy-purple)" strokeWidth="1" filter="url(#glow)" />
      <text x="160" y="154" className="fill-muted-foreground" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="sans-serif" transform="rotate(-90 160 150)" letterSpacing="1">TRIAGE</text>
      <motion.circle r="2.5" fill="#EF4444" filter="url(#glow)">
        <animateMotion dur="7s" repeatCount="indefinite" path="M 90 120 L 140 150" />
      </motion.circle>
      <motion.circle r="2.5" fill="#F59E0B" filter="url(#glow)">
        <animateMotion dur="7.5s" repeatCount="indefinite" path="M 100 180 L 140 150" />
      </motion.circle>

      {/* Phase 3: Resolution */}
      <defs>
        <marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6" opacity="0.5" />
        </marker>
        <marker id="arrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" opacity="0.5" />
        </marker>
        <marker id="arrowRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444" opacity="0.5" />
        </marker>
      </defs>

      {/* Master */}
      <path d="M 180 120 C 220 120, 240 70, 280 70" fill="none" stroke="var(--color-zuzy-purple)" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <motion.circle cx="280" cy="70" r="16" className="fill-card" stroke="#F59E0B" strokeWidth="1.5" filter="url(#glow)"
        animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
      <path d="M 276 66 L 280 62 L 284 66 L 284 74 L 276 74 Z" fill="#F59E0B" opacity="0.8" />
      <text x="320" y="74" className="fill-foreground" fontSize="11" fontWeight="500" fontFamily="sans-serif">Master</text>

      {/* Merge */}
      <path d="M 180 140 C 220 140, 240 120, 280 120" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="280" cy="120" r="12" className="fill-card" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M 277 120 L 283 120 M 280 117 L 280 123" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="320" y="124" className="fill-muted-foreground" fontSize="11" fontFamily="sans-serif">Merge</text>
      <path d="M 280 108 L 280 90" fill="none" stroke="#3B82F6" strokeWidth="1" markerEnd="url(#arrowBlue)" opacity="0.4" />

      {/* Support */}
      <path d="M 180 160 C 220 160, 240 170, 280 170" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="280" cy="170" r="12" className="fill-card" stroke="#10B981" strokeWidth="1.5" />
      <circle cx="280" cy="170" r="3" fill="#10B981" opacity="0.8" />
      <text x="320" y="174" className="fill-muted-foreground" fontSize="11" fontFamily="sans-serif">Support</text>
      <path d="M 280 158 C 260 158, 260 86, 272 86" fill="none" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrowGreen)" opacity="0.4" />

      {/* Redirect */}
      <path d="M 180 180 C 220 180, 240 220, 280 220" fill="none" stroke="#EF4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="280" cy="220" r="12" className="fill-card" stroke="#EF4444" strokeWidth="1.5" />
      <path d="M 277 217 L 283 223 M 277 223 L 283 217" stroke="#EF4444" strokeWidth="1.5" />
      <text x="320" y="224" className="fill-muted-foreground" fontSize="11" fontFamily="sans-serif">Redirect</text>
      <path d="M 292 220 C 340 220, 340 70, 300 70" fill="none" stroke="#EF4444" strokeWidth="1" markerEnd="url(#arrowRed)" opacity="0.4" />

      {/* Animated Flow Packets */}
      <motion.circle r="2.5" fill="#F59E0B" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 8, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="8s" repeatCount="indefinite" path="M 180 120 C 220 120, 240 70, 280 70" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="2.5" fill="#3B82F6" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 8.2, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="8.2s" repeatCount="indefinite" path="M 180 140 C 220 140, 240 120, 280 120" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="2.5" fill="#10B981" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 7.8, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="7.8s" repeatCount="indefinite" path="M 180 160 C 220 160, 240 170, 280 170" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="2.5" fill="#EF4444" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 8.5, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="8.5s" repeatCount="indefinite" path="M 180 180 C 220 180, 240 220, 280 220" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
    </svg>
  </div>
)

const SiteAuditScanner = () => (
  <div className="w-full h-64 relative bg-card rounded-xl border border-border flex items-center justify-center overflow-hidden shadow-sm">
    <svg viewBox="0 0 400 300" className="w-full h-full absolute inset-0">
      <GlowFilter />
      <rect width="100%" height="100%" fill="url(#dotGrid)" />

      {/* Browser Window */}
      <rect x="50" y="40" width="300" height="220" rx="6" className="fill-card stroke-border" strokeWidth="1" />
      <path d="M 50 46 Q 50 40 56 40 L 344 40 Q 350 40 350 46 L 350 56 L 50 56 Z" className="fill-muted/50" />
      <circle cx="65" cy="48" r="2.5" fill="#FF5F56" opacity="0.8" />
      <circle cx="77" cy="48" r="2.5" fill="#FFBD2E" opacity="0.8" />
      <circle cx="89" cy="48" r="2.5" fill="#27C93F" opacity="0.8" />
      <rect x="110" y="45" width="180" height="6" rx="3" className="fill-background stroke-border" strokeWidth="0.5" />

      {/* Content Blocks */}
      <rect x="70" y="76" width="120" height="8" rx="2" className="fill-muted" />
      <rect x="70" y="100" width="260" height="4" rx="2" className="fill-muted/50" />
      <rect x="70" y="114" width="220" height="4" rx="2" className="fill-muted/50" />
      <rect x="70" y="128" width="240" height="4" rx="2" className="fill-muted/50" />
      <rect x="70" y="156" width="100" height="70" rx="4" className="fill-muted/30" />
      <path d="M 70 226 L 100 186 L 130 226 Z" className="fill-muted/50" />
      <circle cx="95" cy="181" r="5" className="fill-muted/50" />

      {/* Meta Tags Block */}
      <rect x="190" y="156" width="140" height="70" rx="4" className="fill-card stroke-border" strokeWidth="1" />
      <motion.rect x="200" y="168" width="60" height="3" rx="1.5" fill="var(--color-zuzy-purple)"
        animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
      <rect x="200" y="180" width="90" height="3" rx="1.5" fill="var(--color-zuzy-cyan)" opacity="0.5" />
      <rect x="200" y="192" width="110" height="3" rx="1.5" className="fill-muted" />
      <rect x="200" y="204" width="70" height="3" rx="1.5" className="fill-muted" />

      {/* Scanner Line */}
      <motion.g animate={{ y: [40, 260, 40] }} transition={{ duration: 10, ease: 'linear', repeat: Infinity }}>
        <line x1="40" y1="0" x2="360" y2="0" stroke="var(--color-zuzy-cyan)" strokeWidth="1" filter="url(#glow)" opacity="0.6" />
        <polygon points="40,0 360,0 350,-15 50,-15" fill="var(--color-zuzy-cyan)" opacity="0.02" />
      </motion.g>

      <motion.rect x="185" y="151" width="150" height="80" rx="6" fill="none" stroke="var(--color-zuzy-purple)" strokeWidth="1" strokeDasharray="4 4"
        initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 10, times: [0, 0.6, 1], repeat: Infinity, ease: 'easeInOut' }} />
    </svg>
  </div>
)

const BacklinkGraph = () => (
  <div className="w-full h-64 relative bg-card rounded-xl border border-border flex items-center justify-center overflow-hidden shadow-sm">
    <svg viewBox="0 0 400 300" className="w-full h-full absolute inset-0">
      <GlowFilter />
      <rect width="100%" height="100%" fill="url(#dotGrid)" />

      {/* Connections */}
      <g className="stroke-border" fill="none" strokeWidth="1">
        <path d="M 200 150 Q 120 70 80 100" />
        <path d="M 200 150 Q 280 60 320 90" />
        <path d="M 200 150 Q 100 230 70 200" />
        <path d="M 200 150 Q 300 260 330 210" />
        <path d="M 80 100 Q 50 150 70 200" strokeWidth="0.5" strokeDasharray="4 4" />
        <path d="M 320 90 Q 350 150 330 210" strokeWidth="0.5" strokeDasharray="4 4" />
      </g>

      {/* Animated Data Packets */}
      <motion.circle r="2.5" fill="var(--color-zuzy-cyan)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 8, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="8s" repeatCount="indefinite" path="M 80 100 Q 120 70 200 150" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="2.5" fill="var(--color-zuzy-purple)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 8.5, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="8.5s" repeatCount="indefinite" path="M 320 90 Q 280 60 200 150" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="2.5" fill="var(--color-zuzy-cyan)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 7.8, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="7.8s" repeatCount="indefinite" path="M 70 200 Q 100 230 200 150" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>
      <motion.circle r="2.5" fill="var(--color-zuzy-purple)" filter="url(#glow)" animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 8.2, repeat: Infinity, times: [0, 0.1, 0.9, 1], ease: 'linear' }}>
        <animateMotion dur="8.2s" repeatCount="indefinite" path="M 330 210 Q 300 260 200 150" calcMode="spline" keyTimes="0;1" keySplines="0.4 0 0.2 1" />
      </motion.circle>

      {/* Peripheral Nodes */}
      <circle cx="80" cy="100" r="10" className="fill-card stroke-border" strokeWidth="1" />
      <circle cx="80" cy="100" r="3" className="fill-muted" />
      <circle cx="320" cy="90" r="14" className="fill-card stroke-border" strokeWidth="1" />
      <circle cx="320" cy="90" r="4" className="fill-muted" />
      <circle cx="70" cy="200" r="8" className="fill-card stroke-border" strokeWidth="1" />
      <circle cx="70" cy="200" r="2" className="fill-muted" />
      <circle cx="330" cy="210" r="12" className="fill-card stroke-border" strokeWidth="1" />
      <circle cx="330" cy="210" r="3" className="fill-muted" />

      {/* Center Node */}
      <motion.circle cx="200" cy="150" r="20" className="fill-card" stroke="url(#purpleCyan)" strokeWidth="2" filter="url(#glow)"
        animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.circle cx="200" cy="150" r="8" fill="url(#purpleCyan)"
        animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />
    </svg>
  </div>
)

const RankingGrowth = () => (
  <div className="w-full h-64 relative bg-card rounded-xl border border-border flex items-center justify-center overflow-hidden shadow-sm">
    <svg viewBox="0 0 400 300" className="w-full h-full absolute inset-0">
      <GlowFilter />
      <rect width="100%" height="100%" fill="url(#dotGrid)" />

      {/* Axes */}
      <line x1="40" y1="250" x2="360" y2="250" className="stroke-border" strokeWidth="1" />
      <line x1="40" y1="50" x2="40" y2="250" className="stroke-border" strokeWidth="1" />

      {/* Animated Area */}
      <motion.path d="M 40 230 C 100 230, 120 180, 180 160 C 240 140, 280 90, 340 70 L 340 250 L 40 250 Z"
        fill="url(#growthGradient)" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 5, ease: 'easeOut' }} />

      {/* Animated Line */}
      <motion.path d="M 40 230 C 100 230, 120 180, 180 160 C 240 140, 280 90, 340 70"
        fill="none" stroke="var(--color-zuzy-purple)" strokeWidth="2" filter="url(#glow)"
        initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 12, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }} />

      {/* Data Points */}
      <motion.circle cx="180" cy="160" r="4" fill="var(--color-zuzy-cyan)" className="stroke-card" strokeWidth="1" filter="url(#glow)"
        initial={{ scale: 0 }} animate={{ scale: [0, 1, 1, 0] }} transition={{ duration: 12, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: 'easeInOut' }} />
      <motion.circle cx="340" cy="70" r="5" fill="var(--color-zuzy-cyan)" className="stroke-card" strokeWidth="1" filter="url(#glow)"
        initial={{ scale: 0 }} animate={{ scale: [0, 1, 1, 0] }} transition={{ duration: 12, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: 'easeInOut', delay: 1 }} />

      {/* Floating Tooltip */}
      <motion.g initial={{ opacity: 0, y: 5 }} animate={{ opacity: [0, 1, 1, 0], y: [5, 0, 0, 5] }} transition={{ duration: 12, times: [0, 0.4, 0.8, 1], repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
        <rect x="290" y="20" width="100" height="28" rx="4" className="fill-card" stroke="var(--color-zuzy-purple)" strokeWidth="0.5" filter="url(#glow)" />
        <text x="340" y="39" className="fill-foreground" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">Pos #1</text>
        <polygon points="336,48 344,48 340,53" className="fill-card" stroke="var(--color-zuzy-purple)" strokeWidth="0.5" />
        <line x1="336" y1="48" x2="344" y2="48" className="stroke-card" strokeWidth="1.5" />
      </motion.g>
    </svg>
  </div>
)

const DataIndexing = () => (
  <div className="w-full h-64 relative bg-card rounded-xl border border-border flex items-center justify-center overflow-hidden shadow-sm">
    <svg viewBox="0 0 400 300" className="w-full h-full absolute inset-0">
      <GlowFilter />
      <rect width="100%" height="100%" fill="url(#dotGrid)" />

      <g transform="translate(200, 150)">
        <motion.circle cx="0" cy="0" r="90" fill="none" className="stroke-border" strokeWidth="1" strokeDasharray="1 4" strokeLinecap="round" opacity="0.4"
          animate={{ rotate: 360 }} transition={{ duration: 90, ease: 'linear', repeat: Infinity }} />
        <motion.circle cx="0" cy="0" r="60" fill="none" stroke="url(#purpleCyan)" strokeWidth="2" strokeDasharray="40 30 10 30" filter="url(#glow)" opacity="0.8"
          animate={{ rotate: -360 }} transition={{ duration: 60, ease: 'linear', repeat: Infinity }} />
        <motion.circle cx="0" cy="0" r="35" fill="none" className="stroke-muted-foreground" strokeWidth="1" strokeDasharray="5 5"
          animate={{ rotate: 360 }} transition={{ duration: 45, ease: 'linear', repeat: Infinity }} />
        <motion.path d="M 0 -16 L 12 8 L -12 8 Z" fill="var(--color-zuzy-purple)" filter="url(#glow)" opacity="0.9"
          animate={{ rotate: [0, 180, 360], scale: [1, 1.02, 1] }} transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }} />
        <motion.path d="M 0 16 L 12 -8 L -12 -8 Z" fill="var(--color-zuzy-cyan)" filter="url(#glow)" opacity="0.6"
          animate={{ rotate: [0, -180, -360], scale: [1, 1.02, 1] }} transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }} />
        <circle cx="0" cy="0" r="3" className="fill-card" />
        <motion.circle cx="0" cy="0" r="1.5" className="fill-foreground"
          animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
      </g>
    </svg>
  </div>
)

const motionAssets = [
  { label: 'Content Engine — Dual Agent', Component: ContentEngineDualAgent },
  { label: 'Cannibalization Cleanser', Component: CannibalizationCleanser },
  { label: 'Site Audit Scanner', Component: SiteAuditScanner },
  { label: 'Backlink Graph', Component: BacklinkGraph },
  { label: 'Ranking Growth', Component: RankingGrowth },
  { label: 'Data Indexing', Component: DataIndexing },
]

export const MotionShowcaseComponent: React.FC<MotionShowcaseBlockType> = ({ heading }) => {
  return (
    <div className="container mx-auto px-4">
      {heading && (
        <h2 className="text-2xl font-bold text-center mb-8">{heading}</h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {motionAssets.map(({ label, Component }) => (
          <div key={label} className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              {label}
            </h3>
            <Component />
          </div>
        ))}
      </div>
    </div>
  )
}
