import SanityImage from '@/app/components/SanityImage'
import {BlockContainer, BlockWrapper} from '../BlockLayout'

type IllustrationSectionProps = {
  block: {
    _type: string
    _key: string
    heading?: string
    subheading?: string
    body?: string
    bullets?: string[]
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

export default function IllustrationSection({block}: IllustrationSectionProps) {
  const {
    heading = 'Kuvasisältö & Sisältörakenne',
    subheading = 'Selkeä sisältö auttaa asiakasta ymmärtämään',
    body = 'Verkkosivujen tärkein tehtävä on kertoa nopeasti, mitä yrityksesi tekee ja miksi se on asiakkaalle hyödyllistä.',
    bullets = [
      'palveluiden esittely',
      'projektit ja referenssit',
      'yritysesittely',
      'kuvasisältö ja visuaalinen materiaali',
    ],
  } = block

  return (
    <BlockWrapper className="py-16 md:py-24">
      <BlockContainer className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-semibold leading-tight dark:text-white">{heading}</h2>
          <h3 className="mt-6 text-xl md:text-2xl font-semibold dark:text-white">{subheading}</h3>
          <p className="mt-4 text-base md:text-lg leading-relaxed text-black/75 dark:text-white/75">{body}</p>
          <ul className="mt-6 list-disc pl-5 space-y-1 text-black/80 dark:text-white/80">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="relative w-full max-w-[800px] aspect-[577/515]">
          <div className="absolute inset-0 bg-black translate-x-[1.25rem] translate-y-[1.25rem]" />
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
      </BlockContainer>
    </BlockWrapper>
  )
}
