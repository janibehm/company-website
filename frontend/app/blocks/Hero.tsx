import {PortableTextBlock} from 'next-sanity'

import ResolvedLink from '@/app/components/ResolvedLink'
import PortableText from '@/app/components/PortableText'
import {projectId, dataset} from '@/sanity/lib/api'
import {ExtractPageBuilderType} from '@/sanity/lib/types'
import {BlockContainer} from './BlockLayout'

type HeroProps = {
  block: ExtractPageBuilderType<'hero'>
  index: number
  pageType: string
  pageId: string
}

export default function Hero({block}: HeroProps) {
  const {heading, eyebrow, subheading, body = [], button, video, videoLoop} = block

  const videoUrl = video?.asset?._ref
    ? `https://cdn.sanity.io/files/${projectId}/${dataset}/${video.asset._ref.replace('file-', '').replace(/-([^-]+)$/, '.$1')}`
    : null

  return (
    <section className="relative overflow-hidden h-[calc(100vh+6rem)] -mt-24">
      {/* Asterisk decoration — bottom right of hero */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        style={{position:'absolute', top:'60%', left:'60%', transform:'translate(-50%,-50%)', width:'28vw', maxWidth:320, opacity:0.18, zIndex:10, pointerEvents:'none', color:'white'}}
      >
        <line x1="50" y1="2" x2="50" y2="98" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
        <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
        <line x1="10.5" y1="10.5" x2="89.5" y2="89.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
        <line x1="89.5" y1="10.5" x2="10.5" y2="89.5" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
      </svg>
      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop={videoLoop === true}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Video layout */}
      {videoUrl && (
        <>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex flex-col pt-24">
            <BlockContainer className="pt-16 md:pt-24 relative">
                {eyebrow && (
                  <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-3 text-white/60">
                    {eyebrow}
                  </p>
                )}
                {heading && (
                  <h1 className="text-[clamp(3.5rem,12.5vw,14rem)] font-bold leading-[0.92] tracking-tight uppercase text-white -ml-1">
                    {heading}
                  </h1>
                )}
                <div className="flex flex-col md:flex-row flex-1 mt-8 sm:mt-12 pb-8 md:pb-24 gap-10 md:gap-0">
                  <div className="md:w-[35%] flex flex-col gap-5">
                    {subheading && (
                      <p className="text-[11px] uppercase tracking-[0.18em] leading-loose font-semibold max-w-[220px] text-white/80">
                        {subheading}
                      </p>
                    )}
                    {body && (body as PortableTextBlock[]).length > 0 && (
                      <div className="text-[11px] uppercase tracking-[0.18em] leading-loose font-semibold max-w-[220px] text-white/80 [&_p]:mb-0">
                        <PortableText value={body as PortableTextBlock[]} />
                      </div>
                    )}
                    {button?.buttonText && button?.link && (
                      <ResolvedLink
                        link={button.link}
                        className="self-start rounded-full flex gap-2 font-mono text-sm whitespace-nowrap items-center py-3 px-6 transition-colors duration-200 bg-white text-black hover:bg-blue hover:text-white"
                      >
                        {button.buttonText}
                      </ResolvedLink>
                    )}
                  </div>
                </div>
              </BlockContainer>
            </div>
        </>
      )}

      {/* Editorial layout (no video) */}
      {!videoUrl && (
        <div className="flex flex-col h-screen pt-24 relative bg-white dark:bg-black">
          {/* Giant heading — bleeds to container edges */}
          <BlockContainer className="pt-16 md:pt-24">
            {eyebrow && (
              <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-3 text-black/40 dark:text-white/40">
                {eyebrow}
              </p>
            )}
            <h1 className="text-[clamp(3.5rem,12.5vw,14rem)] font-bold leading-[0.92] tracking-tight uppercase -ml-1 dark:text-white">
              {heading}
            </h1>
          </BlockContainer>

          {/* Body + image row */}
              <BlockContainer className="relative">
            {/* Left: body / subheading / button + scroll */}
            <div className="md:w-[35%] flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-5">
                {subheading && (
                  <p className="text-[11px] uppercase tracking-[0.18em] leading-loose font-semibold max-w-[220px] dark:text-white/80">
                    {subheading}
                  </p>
                )}
                {body && (body as PortableTextBlock[]).length > 0 && (
                  <div className="text-[11px] uppercase tracking-[0.18em] leading-loose font-semibold max-w-[220px] [&_p]:mb-0 dark:text-white/80">
                    <PortableText value={body as PortableTextBlock[]} />
                  </div>
                )}
                {button?.buttonText && button?.link && (
                  <ResolvedLink
                    link={button.link}
                    className="self-start rounded-full flex gap-2 font-mono text-sm whitespace-nowrap items-center py-3 px-6 transition-colors duration-200 bg-black dark:bg-white hover:bg-blue focus:bg-blue text-white dark:text-black dark:hover:text-white"
                  >
                    {button.buttonText}
                  </ResolvedLink>
                )}
              </div>
            </div>
            {/* Right: empty space */}
            <div className="flex-1" />
          </BlockContainer>
        </div>
      )}
    </section>
  )
}
