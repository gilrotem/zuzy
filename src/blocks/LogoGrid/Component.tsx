import React from 'react'
import Image from 'next/image'

type LogoAsset = {
  file: string
  label: string
}

const logoGroups: { title: string; titleHe: string; logos: LogoAsset[] }[] = [
  {
    title: 'Horizontal',
    titleHe: 'אופקי',
    logos: [
      { file: 'logo-horizontal-purple.svg', label: 'Purple' },
      { file: 'logo-horizontal-white.svg', label: 'White' },
      { file: 'logo-horizontal-black.svg', label: 'Black' },
      { file: 'logo-horizontal-cyan.svg', label: 'Cyan' },
      { file: 'logo-horizontal-gradient.svg', label: 'Gradient' },
    ],
  },
  {
    title: 'Vertical',
    titleHe: 'אנכי',
    logos: [
      { file: 'logo-vertical-purple.svg', label: 'Purple' },
      { file: 'logo-vertical-white.svg', label: 'White' },
      { file: 'logo-vertical-black.svg', label: 'Black' },
      { file: 'logo-vertical-cyan.svg', label: 'Cyan' },
      { file: 'logo-vertical-gradient.svg', label: 'Gradient' },
    ],
  },
  {
    title: 'Icon',
    titleHe: 'אייקון',
    logos: [
      { file: 'icon-dark.svg', label: 'Dark' },
      { file: 'icon-white.svg', label: 'White' },
      { file: 'icon-black-outline.svg', label: 'Black Outline' },
      { file: 'icon-cyan.svg', label: 'Cyan' },
      { file: 'icon-purple-lavender.svg', label: 'Purple Lavender' },
    ],
  },
]

export const LogoGridComponent: React.FC<{
  heading?: string | null
  description?: string | null
  disableInnerContainer?: boolean
}> = ({ heading, description }) => {
  return (
    <section className="container py-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>
      )}
      {description && (
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl">{description}</p>
      )}
      <div className="space-y-16">
        {logoGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">
              {group.titleHe} / {group.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {group.logos.map((logo) => {
                const isWhite = logo.file.includes('white')
                return (
                  <div
                    key={logo.file}
                    className={`group relative flex flex-col items-center gap-3 rounded-xl border border-border p-6 transition-shadow hover:shadow-lg ${
                      isWhite ? 'bg-zinc-800' : 'bg-card'
                    }`}
                  >
                    <div className="flex h-20 w-full items-center justify-center">
                      <Image
                        src={`/brand/${logo.file}`}
                        alt={`ZUZY ${group.title} Logo — ${logo.label}`}
                        width={group.title === 'Icon' ? 48 : 160}
                        height={48}
                        className="max-h-12 w-auto object-contain"
                      />
                    </div>
                    <span className={`text-xs ${isWhite ? 'text-zinc-300' : 'text-muted-foreground'}`}>
                      {logo.label}
                    </span>
                    <a
                      href={`/brand/${logo.file}`}
                      download={logo.file}
                      className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/60 text-white text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      Download SVG
                    </a>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
