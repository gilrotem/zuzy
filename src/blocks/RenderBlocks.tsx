import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroBlockComponent } from '@/blocks/HeroBlock/Component'
import { FeaturesBlockComponent } from '@/blocks/FeaturesBlock/Component'
import { CTABlockComponent } from '@/blocks/CTABlock/Component'
import { TestimonialsBlockComponent } from '@/blocks/TestimonialsBlock/Component'
import { FAQBlockComponent } from '@/blocks/FAQBlock/Component'
import { PricingBlockComponent } from '@/blocks/PricingBlock/Component'
import { RichContentBlockComponent } from '@/blocks/RichContentBlock/Component'
import { ProcessStepsBlockComponent } from '@/blocks/ProcessStepsBlock/Component'
import { RawHTMLBlock } from '@/blocks/RawHTML/Component'
import { AppCostCalculatorComponent } from '@/blocks/AppCostCalculator/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  heroBlock: HeroBlockComponent,
  featuresBlock: FeaturesBlockComponent,
  ctaBlock: CTABlockComponent,
  testimonialsBlock: TestimonialsBlockComponent,
  faqBlock: FAQBlockComponent,
  pricingBlock: PricingBlockComponent,
  richContentBlock: RichContentBlockComponent,
  processStepsBlock: ProcessStepsBlockComponent,
  rawHtml: RawHTMLBlock,
  appCostCalculator: AppCostCalculatorComponent,
}

export const RenderBlocks: React.FC<{
  blocks: NonNullable<Page['layout']>
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType as keyof typeof blockComponents] as React.FC<any>

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
