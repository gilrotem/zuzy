'use client'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ label?: string }>()

  const label = data?.data?.label || 'Row'

  return <div>{label}</div>
}
