import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import SanityImage from '@/app/components/SanityImage'
import {BlockWrapper, BlockContainer} from '../BlockLayout'

type IntroSectionImage = {
  _type: 'image'
  asset?: {_ref: string; _type: 'reference'}
  hotspot?: {x: number; y: number; height: number; width: number}
  crop?: {top: number; bottom: number; left: number; right: number}
  alt?: string
}

type IntroSectionBlock = {
  _type: 'introSection'
  _key: string
  image?: IntroSectionImage
  heading?: string
  body?: PortableTextBlock[]
}

type IntroSectionProps = {
  block: IntroSectionBlock
  index: number
  pageType: string
  pageId: string
}

export default function IntroSection({block}: IntroSectionProps) {
  const {image, heading, body} = block

  return (
    <>
      {/* Organic wave divider */}
      {/*
      <div className="w-full pointer-events-none">
        <img
          src="/images/hero_wave.svg"
          alt=""
          className="block w-full h-auto"
        />
      </div>
      */}
      <BlockWrapper>
        <BlockContainer>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-16 lg:gap-24 items-center">
          {/* Image column */}
          {image?.asset?._ref && (
            <div className="relative">
              <SanityImage
                id={image.asset._ref}
                hotspot={image.hotspot}
                crop={image.crop}
                alt={image.alt ?? ''}
                width={560}
                height={480}
                className="w-full h-auto object-contain"
              />
            </div>
          )}

          {/* Text column */}
          <div className="flex flex-col gap-6">
            {heading && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.1] tracking-tight dark:text-white">
                {heading}
              </h2>
            )}
            {body && (body as PortableTextBlock[]).length > 0 && (
              <div className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-xl">
                <PortableText value={body as PortableTextBlock[]} />
              </div>
            )}
          </div>
        </div>
      </BlockContainer>
    </BlockWrapper>
    </>
  )
}
