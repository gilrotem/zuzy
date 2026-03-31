'use client'

import React from 'react'
import { motion } from 'motion/react'
import {
  Database,
  LayoutDashboard,
  PenTool,
  Search,
  Activity,
} from 'lucide-react'

import type { ContentPipelineBlock as ContentPipelineBlockType } from '@/payload-types'

export const ContentPipelineComponent: React.FC<ContentPipelineBlockType> = ({ heading }) => {
  return (
    <div className="container mx-auto px-4">
      {heading && (
        <h2 className="text-2xl font-bold text-center mb-8">{heading}</h2>
      )}
      <div className="rounded-2xl border border-border/50 p-8 bg-card flex flex-col overflow-hidden relative">
        <div className="mb-8 text-center">
          <h3 className="text-xl font-bold mb-2">The Content Pipeline</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            A seamless, orchestrated workflow from discovery to performance monitoring. Data flows
            naturally from one step to the next, eliminating guesswork.
          </p>
        </div>

        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[1000px] h-[380px] relative mx-auto">
            <svg
              width="1000"
              height="380"
              viewBox="0 0 1000 380"
              className="absolute inset-0 pointer-events-none"
            >
              {/* Base Connection Lines */}
              <path
                d="M 140 80 L 140 140"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 380 80 L 380 140"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 620 80 L 620 140"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <path
                d="M 860 80 L 860 140"
                stroke="hsl(var(--border))"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              <path d="M 240 230 L 280 230" stroke="hsl(var(--border))" strokeWidth="2" />
              <path d="M 480 230 L 520 230" stroke="hsl(var(--border))" strokeWidth="2" />
              <path d="M 720 230 L 760 230" stroke="hsl(var(--border))" strokeWidth="2" />

              {/* Animated Data Flow (Horizontal) */}
              <motion.path
                d="M 240 230 L 280 230"
                stroke="var(--color-zuzy-purple)"
                strokeWidth="2"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.path
                d="M 480 230 L 520 230"
                stroke="var(--color-zuzy-purple)"
                strokeWidth="2"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
              />
              <motion.path
                d="M 720 230 L 760 230"
                stroke="var(--color-zuzy-purple)"
                strokeWidth="2"
                strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, -8] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Glowing Orbs traveling the pipeline */}
              <motion.circle
                r="4"
                fill="var(--color-zuzy-cyan)"
                animate={{ cx: [240, 280], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
                cy="230"
              />
              <motion.circle
                r="4"
                fill="var(--color-zuzy-cyan)"
                animate={{ cx: [480, 520], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                cy="230"
              />
              <motion.circle
                r="4"
                fill="var(--color-zuzy-cyan)"
                animate={{ cx: [720, 760], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 1.0 }}
                cy="230"
              />

              {/* Dashboard Drops */}
              <motion.circle
                r="3"
                fill="var(--color-zuzy-purple)"
                animate={{ cy: [80, 140], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeIn', delay: 0.2 }}
                cx="140"
              />
              <motion.circle
                r="3"
                fill="var(--color-zuzy-purple)"
                animate={{ cy: [80, 140], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeIn', delay: 0.7 }}
                cx="380"
              />
              <motion.circle
                r="3"
                fill="var(--color-zuzy-purple)"
                animate={{ cy: [80, 140], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeIn', delay: 1.2 }}
                cx="620"
              />
              <motion.circle
                r="3"
                fill="var(--color-zuzy-purple)"
                animate={{ cy: [80, 140], opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeIn', delay: 1.7 }}
                cx="860"
              />
            </svg>

            {/* HTML Overlay for Cards */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Core Dashboard */}
              <div className="absolute top-[20px] left-[40px] w-[920px] h-[60px] bg-[var(--color-zuzy-purple)]/5 border border-[var(--color-zuzy-purple)]/30 rounded-xl flex items-center justify-center shadow-sm backdrop-blur-sm">
                <LayoutDashboard className="w-5 h-5 text-[var(--color-zuzy-purple)] mr-3" />
                <span className="font-semibold text-[var(--color-zuzy-purple)] tracking-wide">
                  The Core: Dashboard (Pipeline Card View)
                </span>
              </div>

              {/* Zone 1 */}
              <div className="absolute top-[140px] left-[40px] w-[200px] bg-card border border-border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="w-4 h-4 text-[var(--color-zuzy-cyan)]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Zone 1: Discover</h4>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium text-muted-foreground">
                    Research (AI Keywords)
                  </div>
                  <div className="p-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium text-muted-foreground">
                    Strategy (Kanban)
                  </div>
                </div>
              </div>

              {/* Zone 2 */}
              <div className="absolute top-[140px] left-[280px] w-[200px] bg-card border border-border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <PenTool className="w-4 h-4 text-[var(--color-zuzy-purple)]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Zone 2: Create</h4>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-[var(--color-zuzy-purple)]/5 border border-[var(--color-zuzy-purple)]/30 rounded-lg text-sm font-medium text-[var(--color-zuzy-purple)]">
                    Content Engine (TipTap)
                  </div>
                  <div className="p-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium text-muted-foreground">
                    Content Hub
                  </div>
                  <div className="p-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium text-muted-foreground">
                    WordPress CMS
                  </div>
                </div>
              </div>

              {/* Zone 3 */}
              <div className="absolute top-[140px] left-[520px] w-[200px] bg-card border border-border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Database className="w-4 h-4 text-orange-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Zone 3: Assets</h4>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium text-muted-foreground">
                    Pages (Entity Map)
                  </div>
                  <div className="p-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium text-muted-foreground">
                    Site Audit
                  </div>
                </div>
              </div>

              {/* Zone 4 */}
              <div className="absolute top-[140px] left-[760px] w-[200px] bg-card border border-border rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">Zone 4: Monitor</h4>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium text-muted-foreground">
                    Tracker (Rankings)
                  </div>
                  <div className="p-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium text-muted-foreground">
                    Competitor Tracker
                  </div>
                  <div className="p-2.5 bg-muted/50 border border-border/50 rounded-lg text-sm font-medium text-muted-foreground">
                    Backlinks Monitor
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
