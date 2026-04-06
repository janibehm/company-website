import SanityImage from '@/app/components/SanityImage'
import {BlockContainer, BlockWrapper} from '../BlockLayout'

type ProjectOverviewSectionProps = {
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

export default function ProjectOverviewSection({block}: ProjectOverviewSectionProps) {
  const heading = block.heading || 'Overview'
  const subheading = block.subheading || 'Challenge and context'
  const body =
    block.body ||
    'This section introduces the project context, key constraints, and what outcomes the team was aiming for before execution began.'

  return (
    <BlockWrapper className="py-10 md:py-16">
      <BlockContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            {(block.image?.asset?._id || block.image?.asset?._ref) ? (
              <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                <SanityImage
                  id={(block.image?.asset?._id || block.image?.asset?._ref)!}
                  hotspot={block.image?.hotspot}
                  crop={block.image?.crop}
                  alt={block.image?.alt ?? heading}
                  width={1400}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 h-[280px] md:h-[340px]" />
            )}
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 p-6 md:p-8">
            <p className="text-label-xs text-black/45 dark:text-white/45 mb-2">Project</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight dark:text-white mb-5">
              {heading}
            </h2>
            <h3 className="text-lg md:text-xl font-semibold tracking-tight dark:text-white">{subheading}</h3>
            <p className="mt-4 text-base md:text-lg leading-relaxed text-black/75 dark:text-white/75">{body}</p>
          </div>
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
