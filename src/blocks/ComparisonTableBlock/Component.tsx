import React from 'react'
import type { ComparisonTableBlock as ComparisonTableBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const ComparisonTableBlockComponent: React.FC<
  ComparisonTableBlockProps & { disableInnerContainer?: boolean }
> = ({ heading, subheading, columns, rows }) => {
  return (
    <section className="container py-16">
      {(heading || subheading) && (
        <div className="text-center mb-12">
          {heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
          {subheading && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subheading}</p>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-start p-4 border-b border-border font-semibold text-muted-foreground text-sm uppercase tracking-wider" />
              {columns?.map((col, i) => (
                <th
                  key={i}
                  className={cn(
                    'p-4 text-center border-b font-semibold',
                    col.highlighted
                      ? 'bg-primary/5 border-primary/20 text-primary'
                      : 'border-border',
                  )}
                >
                  {col.label}
                  {col.highlighted && (
                    <span className="block text-xs font-normal text-primary/70 mt-1">
                      Recommended
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows?.map((row, i) => {
              if (row.isCategory) {
                return (
                  <tr key={i}>
                    <td
                      colSpan={(columns?.length || 0) + 1}
                      className="p-4 pt-8 font-bold text-sm uppercase tracking-wider text-foreground border-b border-border bg-muted/30"
                    >
                      {row.feature}
                    </td>
                  </tr>
                )
              }

              return (
                <tr key={i} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4 border-b border-border/50 font-medium text-sm">
                    {row.feature}
                  </td>
                  {columns?.map((col, j) => {
                    const cellValue = row.values?.[j]?.value || ''
                    const isCheck = cellValue === '✓' || cellValue === 'true'
                    const isCross = cellValue === '✗' || cellValue === 'false'

                    return (
                      <td
                        key={j}
                        className={cn(
                          'p-4 text-center border-b text-sm',
                          col.highlighted ? 'bg-primary/5 border-primary/10' : 'border-border/50',
                        )}
                      >
                        {isCheck ? (
                          <span className="text-green-600 font-bold">✓</span>
                        ) : isCross ? (
                          <span className="text-muted-foreground">✗</span>
                        ) : (
                          <span>{cellValue}</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
