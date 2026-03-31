'use client'

import React, { useRef, useState } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
  wrap,
  AnimatePresence,
} from 'motion/react'
import { Box } from 'lucide-react'

import type { InteractiveDemoBlock as InteractiveDemoBlockType } from '@/payload-types'

const DotGrid = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="dotGridSpecial" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dotGridSpecial)" />
  </svg>
)

const BentoCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div
    className={`bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:border-[var(--color-zuzy-purple)] transition-colors duration-500 shadow-sm ${className}`}
  >
    {children}
  </div>
)

const SwissBentoSlider = () => {
  const baseX = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useAnimationFrame((_t, delta) => {
    if (!isHovered) {
      const moveBy = -0.015 * delta
      baseX.set(baseX.get() + moveBy)
    }
  })

  const x = useTransform(baseX, (v) => `${wrap(-2000, 0, v)}px`)

  const cards = [
    <BentoCard key="1" className="w-[400px] h-[260px] shrink-0">
      <div className="text-xl font-bold flex items-center gap-3">
        <div className="w-10 h-10 bg-[var(--color-zuzy-purple)] rounded-xl flex items-center justify-center shadow-lg">
          <Box className="w-5 h-5 text-white" />
        </div>
        maergo
      </div>
      <p className="text-sm text-muted-foreground mt-auto leading-relaxed">
        {"Maergo's Express Delivery: How ZUZY Helped Achieve Scalability, Speed, and Cost Saving"}
      </p>
    </BentoCard>,
    <div key="2" className="flex flex-col gap-4 w-[200px] shrink-0">
      <BentoCard className="h-[122px] justify-center items-center group">
        <span className="font-bold tracking-widest group-hover:text-[var(--color-zuzy-purple)] transition-colors">
          SHOTGUN
        </span>
      </BentoCard>
      <BentoCard className="h-[122px] justify-center items-center group">
        <span className="font-bold font-serif text-xl group-hover:text-[var(--color-zuzy-cyan)] transition-colors">
          moz://a
        </span>
      </BentoCard>
    </div>,
    <BentoCard key="3" className="w-[400px] h-[260px] shrink-0">
      <div className="text-xl font-bold flex items-center gap-3">
        <div className="w-10 h-10 bg-[var(--color-zuzy-cyan)] rounded-xl flex items-center justify-center shadow-lg">
          <div className="w-5 h-5 rounded-full border-2 border-white"></div>
        </div>
        Chatbase
      </div>
      <p className="text-sm text-muted-foreground mt-auto leading-relaxed">
        Bootstrapped founder builds an AI app with ZUZY and scales to $1M in 5 months.
      </p>
    </BentoCard>,
    <div key="4" className="flex flex-col gap-4 w-[200px] shrink-0">
      <BentoCard className="h-[122px] justify-center items-center group">
        <span className="font-bold text-lg group-hover:text-[var(--color-zuzy-purple)] transition-colors">
          Mobbin
        </span>
      </BentoCard>
      <BentoCard className="h-[122px] justify-center items-center group">
        <span className="font-bold flex items-center gap-2 group-hover:text-[var(--color-zuzy-cyan)] transition-colors">
          HappyTeams
        </span>
      </BentoCard>
    </div>,
    <BentoCard key="5" className="w-[400px] h-[260px] shrink-0">
      <div className="text-xl font-bold flex items-center gap-3">
        <div className="w-10 h-10 bg-foreground rounded-full flex items-center justify-center shadow-lg">
          <div className="w-5 h-2.5 bg-background rounded-full"></div>
        </div>
        Pebblely
      </div>
      <p className="text-sm text-muted-foreground mt-auto leading-relaxed">
        Scaling securely: one million users in 7 months protected with ZUZY Auth
      </p>
    </BentoCard>,
    <div key="6" className="flex flex-col gap-4 w-[200px] shrink-0">
      <BentoCard className="h-[122px] justify-center items-center group">
        <span className="font-bold text-lg group-hover:text-[var(--color-zuzy-cyan)] transition-colors">
          Vercel
        </span>
      </BentoCard>
      <BentoCard className="h-[122px] justify-center items-center group">
        <span className="font-bold tracking-widest group-hover:text-[var(--color-zuzy-purple)] transition-colors">
          STRIPE
        </span>
      </BentoCard>
    </div>,
    <BentoCard key="7" className="w-[400px] h-[260px] shrink-0">
      <div className="text-xl font-bold flex items-center gap-3">
        <div className="w-10 h-10 bg-[#10B981] rounded-xl flex items-center justify-center shadow-lg">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        Supabase
      </div>
      <p className="text-sm text-muted-foreground mt-auto leading-relaxed">
        {"Building the open source Firebase alternative with ZUZY's global database."}
      </p>
    </BentoCard>,
  ]

  return (
    <div
      className="w-full overflow-hidden relative bg-muted/30 py-16 rounded-2xl border border-border shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
    >
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none"></div>

      <motion.div className="flex gap-4 items-stretch px-4 w-max" style={{ x }}>
        <div className="flex gap-4 w-[2000px] shrink-0">{cards}</div>
        <div className="flex gap-4 w-[2000px] shrink-0">{cards}</div>
        <div className="flex gap-4 w-[2000px] shrink-0">{cards}</div>
      </motion.div>
    </div>
  )
}

const FeatureTabsSlider = () => {
  const [activeTab, setActiveTab] = useState(0)

  const features = [
    {
      id: 'database',
      title: 'Database',
      description:
        "Every project is a full Postgres database, the world's most trusted relational database.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      ),
      color: 'text-[var(--color-zuzy-purple)]',
      bg: 'bg-[var(--color-zuzy-purple)]/10',
      illustration: (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-muted/30 rounded-xl border border-border">
          <DotGrid />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="w-64 h-64 relative"
          >
            <div className="absolute inset-0 bg-[var(--color-zuzy-purple)]/20 blur-3xl rounded-full"></div>
            <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-2xl">
              <motion.path d="M40 60 C 40 40, 160 40, 160 60 C 160 80, 40 80, 40 60 Z" fill="none" stroke="var(--color-zuzy-purple)" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
              <motion.path d="M40 60 L 40 140 C 40 160, 160 160, 160 140 L 160 60" fill="none" stroke="var(--color-zuzy-purple)" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }} />
              <motion.path d="M40 100 C 40 120, 160 120, 160 100" fill="none" stroke="var(--color-zuzy-purple)" strokeWidth="2" opacity="0.5"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }} />
              <motion.rect x="60" y="70" width="80" height="4" rx="2" fill="var(--color-zuzy-purple)"
                initial={{ width: 0 }} animate={{ width: 80 }} transition={{ duration: 0.8, delay: 1.5 }} />
              <motion.rect x="60" y="85" width="60" height="4" rx="2" fill="var(--color-zuzy-purple)" opacity="0.5"
                initial={{ width: 0 }} animate={{ width: 60 }} transition={{ duration: 0.8, delay: 1.7 }} />
              <motion.rect x="60" y="110" width="70" height="4" rx="2" fill="var(--color-zuzy-purple)"
                initial={{ width: 0 }} animate={{ width: 70 }} transition={{ duration: 0.8, delay: 1.9 }} />
              <motion.rect x="60" y="125" width="50" height="4" rx="2" fill="var(--color-zuzy-purple)" opacity="0.5"
                initial={{ width: 0 }} animate={{ width: 50 }} transition={{ duration: 0.8, delay: 2.1 }} />
            </svg>
          </motion.div>
        </div>
      ),
    },
    {
      id: 'auth',
      title: 'Authentication',
      description: 'Add user sign ups and logins, securing your data with Row Level Security.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      color: 'text-[var(--color-zuzy-cyan)]',
      bg: 'bg-[var(--color-zuzy-cyan)]/10',
      illustration: (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-muted/30 rounded-xl border border-border">
          <DotGrid />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="w-64 h-64 relative flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[var(--color-zuzy-cyan)]/20 blur-3xl rounded-full"></div>
            <div className="relative z-10 w-48 h-56 bg-card rounded-2xl border border-border shadow-2xl flex flex-col items-center p-6">
              <div className="w-12 h-12 bg-[var(--color-zuzy-cyan)]/10 rounded-full flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-zuzy-cyan)]">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="w-full space-y-4">
                <motion.div className="w-full h-8 bg-muted rounded-md" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.2, duration: 0.5 }}></motion.div>
                <motion.div className="w-full h-8 bg-muted rounded-md" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.4, duration: 0.5 }}></motion.div>
                <motion.div className="w-full h-10 bg-[var(--color-zuzy-cyan)] rounded-md mt-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}></motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      ),
    },
    {
      id: 'storage',
      title: 'Storage',
      description:
        'Store, organize, and serve large files. Any media, including videos and images.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      color: 'text-[#10B981]',
      bg: 'bg-[#10B981]/10',
      illustration: (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-muted/30 rounded-xl border border-border">
          <DotGrid />
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="w-full h-full relative p-8"
          >
            <div className="absolute inset-0 bg-[#10B981]/10 blur-3xl rounded-full"></div>
            <div className="relative z-10 grid grid-cols-3 gap-4 h-full">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
                  className="bg-card rounded-lg border border-border shadow-sm flex items-center justify-center overflow-hidden group"
                >
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      ),
    },
  ]

  return (
    <div className="w-full bg-card rounded-2xl border border-border shadow-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px]">
      {/* Left side: Tabs */}
      <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-border bg-muted/20">
        <h3 className="text-xl font-bold mb-6">Build in a weekend.</h3>

        {features.map((feature, index) => {
          const isActive = activeTab === index
          return (
            <button
              key={feature.id}
              onClick={() => setActiveTab(index)}
              className={`text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                isActive
                  ? 'bg-card shadow-sm border border-border'
                  : 'hover:bg-muted/50 border border-transparent'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-foreground"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? feature.bg : 'bg-muted'
                  } ${isActive ? feature.color : 'text-muted-foreground'} transition-colors duration-300`}
                >
                  {feature.icon}
                </div>
                <span
                  className={`font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {feature.title}
                </span>
              </div>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-muted-foreground mt-2 pl-11 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          )
        })}
      </div>

      {/* Right side: Illustration */}
      <div className="w-full md:w-3/5 p-6 md:p-8 relative bg-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="w-full h-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {features[activeTab].illustration}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export const InteractiveDemoComponent: React.FC<InteractiveDemoBlockType> = ({ heading }) => {
  return (
    <div className="container mx-auto px-4">
      {heading && (
        <h2 className="text-2xl font-bold text-center mb-8">{heading}</h2>
      )}
      <div className="space-y-12">
        <div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-4">Bento Carousel</h3>
          <SwissBentoSlider />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-4">Feature Tabs</h3>
          <FeatureTabsSlider />
        </div>
      </div>
    </div>
  )
}
