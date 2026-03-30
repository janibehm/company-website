import React from 'react'

import Cta from '@/app/blocks/Cta'
import PriceTable from '@/app/blocks/prices/PriceTable'
import Hero from '@/app/blocks/home/Hero'
import Info from '@/app/blocks/home/InfoSection'
import IntroSection from '@/app/blocks/home/IntroSection'
import ProjectsSection from '@/app/blocks/home/ProjectsSection'
import ProcessSection from '@/app/blocks/home/ProcessSection'
import ServicesSection from '@/app/blocks/home/ServicesSection'
import AboutFaq from '@/app/blocks/about/AboutFaq'
import AboutIntro from '@/app/blocks/about/AboutIntro'
import TeamSection from '@/app/blocks/about/TeamSection'
import DesignSection from '@/app/blocks/services/DesignSection'
import IllustrationSection from '@/app/blocks/services/IllustrationSection'
import ServicesHero from '@/app/blocks/services/ServicesHero'
import TechnologiesSection from '@/app/blocks/services/TechnologiesSection'
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
  priceTable: PriceTable,
  hero: Hero,
  infoSection: Info,
  introSection: IntroSection,
  projectsSection: ProjectsSection,
  processSection: ProcessSection,
  servicesSection: ServicesSection,
  aboutFaq: AboutFaq,
  aboutIntro: AboutIntro,
  teamSection: TeamSection,
  servicesHero: ServicesHero,
  designSection: DesignSection,
  illustrationSection: IllustrationSection,
  technologiesSection: TechnologiesSection,
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
