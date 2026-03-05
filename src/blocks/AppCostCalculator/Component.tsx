import React from 'react'
import type { AppCostCalculatorBlock as AppCostCalculatorBlockType } from '@/payload-types'
import { AppCostCalculatorClient } from './Component.client'

export const AppCostCalculatorComponent: React.FC<
  AppCostCalculatorBlockType & { disableInnerContainer?: boolean }
> = (props) => {
  return <AppCostCalculatorClient {...props} />
}
