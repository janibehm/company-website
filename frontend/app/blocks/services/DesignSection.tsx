import SanityImage from '@/app/components/SanityImage'
import {BlockContainer, BlockWrapper} from '../BlockLayout'

type DesignSectionProps = {
  block: {
    _type: string
    _key: string
    heading?: string
    subheading?: string
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

export default function DesignSection({block}: DesignSectionProps) {
  const {
    heading = 'Design',
    subheading = 'Viestintää joka jää mieleen',
    body = 'Ihmiset muodostavat käsityksen yrityksestä sekunneissa verkkosivulle saapuessaan. Visuaalinen selkeys ja esitystapa ratkaisevat usein, jatkaako kävijä sivun tutkimista vai poistuu.',
  } = block

  return (
    <BlockWrapper className="py-10 md:py-24">
      <BlockContainer className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="hidden md:block relative w-full max-w-[800px] aspect-[577/515]">
          <div className="absolute inset-0 bg-black translate-x-[-1.25rem] translate-y-[1.25rem]" />
          <div className="relative h-full w-full bg-black/10 dark:bg-white/15 overflow-hidden">
            {(block.image?.asset?._id || block.image?.asset?._ref) && (
              <SanityImage
                id={(block.image.asset._id || block.image.asset._ref)!}
                hotspot={block.image.hotspot}
                crop={block.image.crop}
                alt={block.image.alt ?? ''}
                width={800}
                height={715}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight dark:text-white">{heading}</h2>
          {(block.image?.asset?._id || block.image?.asset?._ref) && (
            <div className="md:hidden mt-6 mb-0 relative w-full max-w-[640px] mx-auto aspect-[577/515]">
              <div className="relative h-full w-full overflow-hidden">
                <SanityImage
                  id={(block.image.asset._id || block.image.asset._ref)!}
                  hotspot={block.image.hotspot}
                  crop={block.image.crop}
                  alt={block.image.alt ?? ''}
                  width={800}
                  height={715}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <h3 className="mt-6 text-xl md:text-2xl font-semibold dark:text-white">{subheading}</h3>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-black/75 dark:text-white/75">{body}</p>
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
