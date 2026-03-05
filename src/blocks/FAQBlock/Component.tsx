'use client'

import React, { useState } from 'react'
import type { FAQBlock as FAQBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type FAQItem = NonNullable<FAQBlockProps['items']>[number]

const AccordionItem: React.FC<{
  question: string
  answer: FAQItem['answer']
  isOpen: boolean
  onToggle: () => void
}> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-border">
      <button
        className="w-full text-start py-4 flex justify-between items-center gap-4 font-medium text-lg hover:text-primary transition-colors"
        onClick={onToggle}
        type="button"
      >
        <span>{question}</span>
        <span className={cn('transition-transform shrink-0', { 'rotate-180': isOpen })}>▼</span>
      </button>
      <div
        className={cn('overflow-hidden transition-all duration-300', {
          'max-h-0': !isOpen,
          'max-h-[1000px] pb-4': isOpen,
        })}
      >
        {answer && (
          <RichText data={answer} enableGutter={false} className="text-muted-foreground" />
        )}
      </div>
    </div>
  )
}

export const FAQBlockComponent: React.FC<FAQBlockProps & { disableInnerContainer?: boolean }> = ({
  heading,
  subheading,
  items,
  style = 'accordion',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

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
      <div
        className={cn('max-w-3xl mx-auto', {
          'grid md:grid-cols-2 gap-8 max-w-none': style === 'twoColumns',
        })}
      >
        {items?.map((item, i: number) => {
          if (style === 'list') {
            return (
              <div key={i} className="mb-8">
                <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                {item.answer && (
                  <RichText
                    data={item.answer}
                    enableGutter={false}
                    className="text-muted-foreground"
                  />
                )}
              </div>
            )
          }
          return (
            <AccordionItem
              key={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          )
        })}
      </div>
    </section>
  )
}
