import React from 'react'

type ColorSwatch = {
  name: string
  nameHe: string
  hex: string
  rgb: string
  cssVar: string
}

const brandColors: { category: string; categoryHe: string; colors: ColorSwatch[] }[] = [
  {
    category: 'Primary',
    categoryHe: 'ראשי',
    colors: [
      {
        name: 'Primary',
        nameHe: 'סגול ראשי',
        hex: '#7C3AED',
        rgb: 'rgb(124, 58, 237)',
        cssVar: '--color-primary',
      },
      {
        name: 'Primary Light',
        nameHe: 'סגול בהיר',
        hex: '#A78BFA',
        rgb: 'rgb(167, 139, 250)',
        cssVar: '--color-primary-light',
      },
      {
        name: 'Primary Dark',
        nameHe: 'סגול כהה',
        hex: '#5B21B6',
        rgb: 'rgb(91, 33, 182)',
        cssVar: '--color-primary-dark',
      },
    ],
  },
  {
    category: 'Accent',
    categoryHe: 'משני',
    colors: [
      {
        name: 'Accent (Teal)',
        nameHe: 'טורקיז',
        hex: '#0D9488',
        rgb: 'rgb(13, 148, 136)',
        cssVar: '--color-accent',
      },
      {
        name: 'Accent Light',
        nameHe: 'טורקיז בהיר',
        hex: '#2DD4BF',
        rgb: 'rgb(45, 212, 191)',
        cssVar: '--color-accent-light',
      },
      {
        name: 'Accent Dark',
        nameHe: 'טורקיז כהה',
        hex: '#0F766E',
        rgb: 'rgb(15, 118, 110)',
        cssVar: '--color-accent-dark',
      },
    ],
  },
  {
    category: 'Neutrals',
    categoryHe: 'ניטרלי',
    colors: [
      {
        name: 'Background',
        nameHe: 'רקע',
        hex: '#FFFFFF',
        rgb: 'rgb(255, 255, 255)',
        cssVar: '--background',
      },
      {
        name: 'Foreground',
        nameHe: 'טקסט',
        hex: '#0A0A0A',
        rgb: 'rgb(10, 10, 10)',
        cssVar: '--foreground',
      },
      {
        name: 'Muted',
        nameHe: 'עמום',
        hex: '#F5F5F5',
        rgb: 'rgb(245, 245, 245)',
        cssVar: '--muted',
      },
      {
        name: 'Border',
        nameHe: 'מסגרת',
        hex: '#E5E5E5',
        rgb: 'rgb(229, 229, 229)',
        cssVar: '--border',
      },
    ],
  },
]

export const ColorPaletteComponent: React.FC<{
  heading?: string | null
  disableInnerContainer?: boolean
}> = ({ heading }) => {
  return (
    <section className="container py-16">
      {heading && (
        <h2 className="text-3xl md:text-4xl font-bold mb-12">{heading}</h2>
      )}
      <div className="space-y-12">
        {brandColors.map((group) => (
          <div key={group.category}>
            <h3 className="text-xl font-semibold mb-6 text-muted-foreground">
              {group.categoryHe} / {group.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {group.colors.map((color) => (
                <div
                  key={color.hex}
                  className="rounded-xl border border-border overflow-hidden bg-card"
                >
                  <div
                    className="h-24 w-full"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="p-4 space-y-1">
                    <p className="font-semibold text-sm">{color.nameHe}</p>
                    <p className="text-xs text-muted-foreground">{color.name}</p>
                    <div className="pt-2 space-y-0.5 font-mono text-xs text-muted-foreground">
                      <p>{color.hex}</p>
                      <p>{color.rgb}</p>
                      <p className="text-[10px]">{color.cssVar}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
