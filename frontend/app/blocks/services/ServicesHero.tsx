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
    <BlockWrapper className="pt-16 md:pt-24 pb-0">
      <BlockContainer>
        <div className="grid grid-cols-1 gap-6 md:gap-8 items-start">
          <div className="w-full px-2 md:px-0">
            <div className="relative w-full rounded-2xl overflow-hidden">
              {(block.image?.asset?._id || block.image?.asset?._ref) && (
                <SanityImage
                  id={(block.image.asset._id || block.image.asset._ref)!}
                  hotspot={block.image.hotspot}
                  crop={block.image.crop}
                  alt={block.image.alt ?? ''}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              )}
              <div className="hidden md:block absolute top-16 right-16 z-20 max-w-xl">
                <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-black dark:text-white">{heading}</h1>
                <p className="mt-8 text-base md:text-lg text-black/80 dark:text-white/80">{body}</p>
              </div>
            </div>
          </div>

          <div className="w-full md:hidden">
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight dark:text-white">{heading}</h1>
            <p className="mt-8 text-base md:text-lg text-black/70 dark:text-white/70">{body}</p>
          </div>
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
