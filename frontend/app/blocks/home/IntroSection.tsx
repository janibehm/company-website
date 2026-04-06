import {type PortableTextBlock} from 'next-sanity'

import PortableText from '@/app/components/PortableText'
import SanityImage from '@/app/components/SanityImage'
import {BlockWrapper, BlockContainer} from '../BlockLayout'

type IntroSectionImage = {
  _type: 'image'
  asset?: {_ref: string; _type: 'reference'}
  hotspot?: {x: number; y: number; height: number; width: number}
  crop?: {top: number; bottom: number; left: number; right: number}
  alt?: string
}

type IntroSectionBlock = {
  _type: 'introSection'
  _key: string
  image?: IntroSectionImage
  heading?: string
  body?: PortableTextBlock[]
}

type IntroSectionProps = {
  block: IntroSectionBlock
  index: number
  pageType: string
  pageId: string
}

export default function IntroSection({block}: IntroSectionProps) {
  const {image, heading, body} = block

  return (
    <BlockWrapper className="relative overflow-hidden pt-0 pb-0 md:pt-0 md:pb-0">
      <div className="intro-waves intro-waves-top pointer-events-none" aria-hidden>
        <svg
          className="h-[56px] w-full md:h-[88px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="intro-gentle-wave-top"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            />
          </defs>
          <g className="intro-parallax intro-parallax-top">
            <use href="#intro-gentle-wave-top" x="48" y="0" fill="rgba(229, 231, 235, 0.65)" />
            <use href="#intro-gentle-wave-top" x="48" y="3" fill="rgba(209, 213, 219, 0.56)" />
            <use href="#intro-gentle-wave-top" x="48" y="5" fill="rgba(156, 163, 175, 0.48)" />
            <use href="#intro-gentle-wave-top" x="48" y="7" fill="#000000" />
          </g>
        </svg>
      </div>

      <BlockContainer>
        <div className="grid grid-cols-1 items-center gap-12 pt-10 pb-10 md:grid-cols-[2fr_3fr] md:gap-16 md:pt-14 md:pb-14 lg:gap-24">
            {/* Image column */}
            {image?.asset?._ref && (
              <div className="relative">
                <SanityImage
                  id={image.asset._ref}
                  hotspot={image.hotspot}
                  crop={image.crop}
                  alt={image.alt ?? ''}
                  width={560}
                  height={480}
                  className="h-auto w-full object-contain"
                />
              </div>
            )}

            {/* Text column */}
            <div className="flex flex-col gap-6">
              {heading && (
                <h2 className="text-4xl font-medium leading-[1.1] tracking-tight dark:text-white md:text-5xl lg:text-6xl">
                  {heading}
                </h2>
              )}
              {body && (body as PortableTextBlock[]).length > 0 && (
                <div className="max-w-xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  <PortableText value={body as PortableTextBlock[]} />
                </div>
              )}
            </div>
          </div>
      </BlockContainer>

      {/*
      <div className="intro-waves" aria-hidden>
        <svg
          className="h-[56px] w-full md:h-[88px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="intro-gentle-wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            />
          </defs>
          <g>
            <use href="#intro-gentle-wave" x="48" y="0" fill="rgba(229, 231, 235, 0.65)" />
            <use href="#intro-gentle-wave" x="48" y="3" fill="rgba(209, 213, 219, 0.56)" />
            <use href="#intro-gentle-wave" x="48" y="5" fill="rgba(156, 163, 175, 0.48)" />
            <use href="#intro-gentle-wave" x="48" y="7" fill="rgba(71, 85, 105, 0.28)" />
          </g>
        </svg>
      </div>
      */}

      <div className="w-full border-t border-black/10 dark:border-white/15" aria-hidden />

      <style jsx>{`
          .intro-waves {
            position: relative;
            width: 100%;
            margin-bottom: -1px;
            line-height: 0;
          }

          .intro-waves-top {
            transform: scaleY(-1);
            margin-bottom: -1px;
          }

          .intro-parallax > use {
            animation: intro-move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
          }

          .intro-parallax-top > use {
            animation-direction: reverse;
          }

          .intro-parallax > use:nth-child(1) {
            animation-delay: -2s;
            animation-duration: 18s;
          }

          .intro-parallax > use:nth-child(2) {
            animation-delay: -3s;
            animation-duration: 26s;
          }

          .intro-parallax > use:nth-child(3) {
            animation-delay: -4s;
            animation-duration: 34s;
          }

          .intro-parallax > use:nth-child(4) {
            animation-delay: -5s;
            animation-duration: 40s;
          }

          @keyframes intro-move-forever {
            0% {
              transform: translate3d(-90px, 0, 0);
            }

            100% {
              transform: translate3d(85px, 0, 0);
            }
          }
        `}</style>
    </BlockWrapper>
  )
}
