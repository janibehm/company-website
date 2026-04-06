import Link from 'next/link'

import SanityImage from '@/app/components/SanityImage'
import {BlockContainer, BlockWrapper} from '../BlockLayout'

type ProjectHeroProps = {
  block: {
    _type: string
    _key: string
    title?: string
    description?: string
    image?: {
      asset?: {_ref?: string; _id?: string}
      alt?: string
      hotspot?: {x: number; y: number; height: number; width: number}
      crop?: {top: number; bottom: number; left: number; right: number}
    } | null
    linkText?: string
    link?: {
      linkType?: 'href' | 'page' | 'post' | 'contact'
      href?: string
      page?: string | null
      post?: string | null
      openInNewTab?: boolean
    } | null
  }
  index: number
  pageType: string
  pageId: string
}

function resolveLink(link?: ProjectHeroProps['block']['link']) {
  if (!link) return '#'
  if (link.linkType === 'href') return link.href || '#'
  if (link.linkType === 'contact') return '/contact'

  const internalTarget = link.page || link.post
  return internalTarget ? `/${internalTarget}` : '#'
}

export default function ProjectHero({block}: ProjectHeroProps) {
  const title = block.title || 'Project Title'
  const description =
    block.description ||
    'A concise summary of the challenge, the work delivered, and what made this project successful.'

  return (
    <BlockWrapper className="pt-12 md:pt-20 pb-8 md:pb-12">
      <BlockContainer>
        <div className="relative overflow-hidden rounded-2xl bg-black text-white">
          {(block.image?.asset?._id || block.image?.asset?._ref) && (
            <SanityImage
              id={(block.image.asset?._id || block.image.asset?._ref)!}
              hotspot={block.image.hotspot}
              crop={block.image.crop}
              alt={block.image.alt ?? title}
              width={1800}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/25" />

          <div className="relative z-[1] px-6 py-14 md:px-10 md:py-20 lg:px-14 lg:py-24 max-w-4xl">
            <p className="text-label-xs text-white/70 mb-4">Project</p>
            <h1 className="text-[clamp(2.1rem,6vw,5rem)] leading-[0.94] tracking-tight font-semibold uppercase">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-white/85">
              {description}
            </p>

            {block.linkText && (
              <Link
                href={resolveLink(block.link)}
                target={block.link?.linkType === 'href' && block.link?.openInNewTab ? '_blank' : undefined}
                rel={block.link?.linkType === 'href' && block.link?.openInNewTab ? 'noopener noreferrer' : undefined}
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3 text-ui-sm uppercase tracking-widest transition-colors hover:bg-white/20"
              >
                <span>{block.linkText}</span>
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </BlockContainer>
    </BlockWrapper>
  )
}
