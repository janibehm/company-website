'use client'

import {useState} from 'react'
import {type PortableTextBlock} from 'next-sanity'
import CustomPortableText from '@/app/components/PortableText'
import {BlockContainer, BlockWrapper} from '../BlockLayout'

type FaqItem = {
  _key: string
  question?: string
  answer?: PortableTextBlock[]
}

type AboutFaqProps = {
  block: {
    _type: string
    _key: string
    heading?: string
    items?: FaqItem[]
  }
  index: number
  pageType: string
  pageId: string
}

function FaqRow({item}: {item: FaqItem}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-black/10 dark:border-white/10">
      <button
        className="w-full flex justify-between items-center py-5 text-left gap-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="text-lg font-semibold dark:text-white">{item.question}</span>
        <span className="shrink-0 text-xl leading-none dark:text-white">{open ? '−' : '+'}</span>
      </button>
      {open && item.answer && (
        <div className="pb-5 text-base leading-relaxed text-black/70 dark:text-white/70">
          <CustomPortableText value={item.answer} />
        </div>
      )}
    </div>
  )
}

export default function AboutFaq({block}: AboutFaqProps) {
  const {heading = 'FAQ', items = []} = block

  return (
    <BlockWrapper className="py-16 md:py-24">
      <BlockContainer>
        <div className="max-w-3xl mx-auto">
          {heading && (
            <h2 className="text-3xl md:text-4xl font-semibold mb-10 dark:text-white">{heading}</h2>
          )}
          <div className="border-t border-black/10 dark:border-white/10">
            {items.map((item) => (
              <FaqRow key={item._key} item={item} />
            ))}
          </div>
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
