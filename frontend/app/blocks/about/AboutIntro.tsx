import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import SanityImage from '@/app/components/SanityImage'
import {BlockContainer, BlockWrapper} from '../BlockLayout'

type AboutIntroProps = {
  block: {
    _type: string
    _key: string
    heading?: string
    body?: PortableTextBlock[]
    image?: {
      asset?: {_ref?: string; _id?: string}
      alt?: string
      hotspot?: {x: number; y: number; height: number; width: number}
      crop?: {top: number; bottom: number; left: number; right: number}
    } | null
  }
  index: number
  pageType: string
  pageId: string
}

export default function AboutIntro({block}: AboutIntroProps) {
  const {heading, body, image} = block
  const imageId = image?.asset?._id || image?.asset?._ref

  return (
    <BlockWrapper className="py-16 md:py-24">
      <BlockContainer className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="max-w-xl">
          {heading && (
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight dark:text-white">{heading}</h1>
          )}
          {body && (body as PortableTextBlock[]).length > 0 && (
            <div className="mt-6 text-base md:text-lg leading-relaxed text-black/75 dark:text-white/75">
              <PortableText value={body as PortableTextBlock[]} />
            </div>
          )}
        </div>

        <div className="aspect-[4/3] w-full bg-black/5 dark:bg-white/10 rounded-2xl overflow-hidden">
          {imageId && (
            <SanityImage
              id={imageId}
              hotspot={image?.hotspot}
              crop={image?.crop}
              alt={image?.alt ?? ''}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
