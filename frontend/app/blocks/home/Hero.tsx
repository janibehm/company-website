import {PortableTextBlock} from 'next-sanity'

import ResolvedLink from '@/app/components/ResolvedLink'
import PortableText from '@/app/components/PortableText'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import {BlockContainer} from '../BlockLayout'
import HeroAnimation from './HeroAnimation'

type HeroProps = {
  block: ExtractPageBuilderType<'hero'>
  index: number
  pageType: string
  pageId: string
}

export default function Hero({block}: HeroProps) {
  const {heading, eyebrow, subheading, body = [], button} = block

  return (
    <section className="relative overflow-hidden h-[100vh] -mt-24 bg-black">
      {/* Wave animation background */}
      <HeroAnimation />

      {/* Bottom fade to black for smooth wave divider transition */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#000000] to-transparent z-[5] pointer-events-none" />

      <div className="relative z-10 h-full flex items-center">
        <BlockContainer className="w-full">
          <div className="md:ml-16 lg:ml-24">
            {eyebrow && (
              <p className="hero-eyebrow mb-3 text-white/80">
                {eyebrow}
              </p>
            )}
            <h1 className="text-[clamp(3rem,8vw,9rem)] font-bold leading-[0.92] tracking-tight uppercase -ml-1 text-white max-w-[12ch]">
              {heading}
            </h1>

            <div className="relative mt-8 sm:mt-12 md:w-[45%] flex flex-col gap-5">
              {subheading && (
                <p className="hero-small-copy text-[12px] md:text-[13px] max-w-sm text-white/80">
                  {subheading}
                </p>
              )}
              {body && (body as PortableTextBlock[]).length > 0 && (
                <div className="hero-small-copy text-[12px] md:text-[13px] normal-case max-w-sm lg:max-w-md text-white/80 [&_p]:mb-0 [&_*]:text-white/80">
                  <PortableText value={body as PortableTextBlock[]} />
                </div>
              )}
              {button?.buttonText && button?.link && (
                <ResolvedLink
                  link={button.link}
                  className="self-start rounded-full flex gap-2 text-ui-sm whitespace-nowrap items-center py-3 px-6 transition-colors duration-200 bg-white text-black hover:bg-blue hover:text-white"
                >
                  {button.buttonText}
                </ResolvedLink>
              )}
            </div>
          </div>
        </BlockContainer>
      </div>
    </section>
  )
}

