import React from 'react'

import Cta from '@/app/blocks/Cta'
import Hero from '@/app/blocks/Hero'
import Info from '@/app/blocks/InfoSection'
import IntroSection from '@/app/blocks/IntroSection'
import ProjectsSection from '@/app/blocks/ProjectsSection'
import ProcessSection from '@/app/blocks/ProcessSection'
import ServicesSection from '@/app/blocks/ServicesSection'
import {dataAttr} from '@/sanity/lib/utils'
import {PageBuilderSection} from '@/sanity/lib/types'

type BlockProps = {
  index: number
  block: PageBuilderSection
  pageId: string
  pageType: string
}

type BlocksType = {
  [key: string]: React.FC<BlockProps>
}

const Blocks = {
  callToAction: Cta,
  hero: Hero,
  infoSection: Info,
  introSection: IntroSection,
  projectsSection: ProjectsSection,
  processSection: ProcessSection,
  servicesSection: ServicesSection,
} as BlocksType

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({block, index, pageId, pageType}: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== 'undefined') {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
          pageId: pageId,
          pageType: pageType,
        })}
      </div>
    )
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    {key: block._key},
  )
}
