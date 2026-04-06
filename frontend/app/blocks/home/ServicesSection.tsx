import Link from 'next/link'
import {BlockWrapper, BlockContainer} from '../BlockLayout'
import SanityImage from '../../components/SanityImage'

type ServiceCard = {
  _key: string
  title?: string
  description?: string
  image?: {
    asset?: {_ref?: string; _id?: string}
    alt?: string
    hotspot?: {x: number; y: number; height: number; width: number}
    crop?: {top: number; bottom: number; left: number; right: number}
  } | null
  backgroundColor?: string
}

type ServicesBlock = {
  _type: 'servicesSection'
  _key: string
  heading?: string
  subheading?: string
  linkText?: string
  services?: ServiceCard[]
}

type ServicesSectionProps = {
  block: ServicesBlock
  index: number
  pageType: string
  pageId: string
}

export default function ServicesSection({block}: ServicesSectionProps) {
  const {heading, subheading, linkText, services} = block

  return (
    <BlockWrapper>
      <BlockContainer>

        {heading && (
          <h2 className="relative z-[1] text-3xl md:text-4xl lg:text-5xl font-semibold dark:text-white">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="relative z-[1] text-label-sm max-w-md mt-4 mb-12 md:mb-16 text-gray-600 dark:text-white/80">
            {subheading}
          </p>
        )}
        {!subheading && heading && <div className="mb-12 md:mb-16" />}

        <div className="relative z-[1] grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 w-full">
          {services?.map((service) => (
            <div
              key={service._key}
              className="group relative flex h-full w-full flex-col gap-5 rounded-none border border-black/10 p-5 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-32px_rgba(0,0,0,0.55)] dark:border-white/10"
            >
              {/* Image card */}
              <div
                className="w-full aspect-square rounded-none overflow-hidden p-8 ring-1 ring-black/5 dark:ring-white/10"
              >
                {(service.image?.asset?._id || service.image?.asset?._ref) && (
                  <SanityImage
                    id={(service.image.asset._id || service.image.asset._ref)!}
                    hotspot={service.image.hotspot}
                    crop={service.image.crop}
                    alt={service.image.alt ?? service.title ?? ''}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                )}
              </div>

              {/* Text */}
              <div className="w-full px-1 md:px-2">
                {service.title && (
                  <h3 className="w-full text-left text-lg md:text-xl font-semibold tracking-tight mb-2 dark:text-white">
                    {service.title}
                  </h3>
                )}
                {service.description && (
                  <p className="w-full text-left text-sm leading-relaxed text-gray-600 dark:text-gray-400 flex-grow">
                    {service.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {linkText && (
        <div className="relative z-[1] mt-12 md:mt-16">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 rounded-full border border-black/20 bg-white/75 px-5 py-3 text-ui-sm uppercase tracking-widest transition-all duration-200 hover:border-black/35 hover:bg-white dark:border-white/20 dark:bg-white/[0.04] dark:text-white dark:hover:border-white/35 dark:hover:bg-white/[0.08]"
          >
            <span className="relative">
              {linkText}
              <span className="absolute -bottom-1 left-0 h-[1px] w-full bg-current opacity-40" />
            </span>
            <svg
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
        )}
      </BlockContainer>
    </BlockWrapper>
  )
}
