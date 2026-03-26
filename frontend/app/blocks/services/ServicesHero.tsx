import SanityImage from '@/app/components/SanityImage'
import {BlockContainer, BlockWrapper} from '../BlockLayout'

type ServicesHeroProps = {
  block: {
    _type: string
    _key: string
    heading?: string
    body?: string
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

export default function ServicesHero({block}: ServicesHeroProps) {
  const {
    heading = 'We are a design agency helping your company navigate the web.',
    body = 'Our mission is to build and deploy great looking websites for small to medium sized companies.',
  } = block

  return (
    <BlockWrapper className="py-16 md:py-24">
      <BlockContainer className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="aspect-[4/3] w-full bg-black/5 dark:bg-white/10 rounded-2xl overflow-hidden">
          {(block.image?.asset?._id || block.image?.asset?._ref) && (
            <SanityImage
              id={(block.image.asset._id || block.image.asset._ref)!}
              hotspot={block.image.hotspot}
              crop={block.image.crop}
              alt={block.image.alt ?? ''}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight dark:text-white">{heading}</h1>
          <p className="mt-8 text-base md:text-lg text-black/70 dark:text-white/70">{body}</p>
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
