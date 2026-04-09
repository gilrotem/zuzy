'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ label?: string; style?: string }>()

  const label = data?.data?.label
    ? `${data?.data?.style === 'dropdown' ? '▾' : '→'} ${data?.data?.label}`
    : 'Row'

  return <div>{label}</div>
}
