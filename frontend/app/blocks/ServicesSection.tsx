import Link from 'next/link'
import {BlockWrapper, BlockContainer} from './BlockLayout'
import SanityImage from '../components/SanityImage'

type ServiceCard = {
  _key: string
  title?: string
  description?: string
  image?: {
    asset?: {_ref?: string; _id?: string}
    alt?: string
    hotspot?: {x: number; y: number; height: number; width: number}
    crop?: {top: number; bottom: number; left: number; right: number}
  }
  backgroundColor?: string
}

type ServicesBlock = {
  _type: 'servicesSection'
  _key: string
  heading?: string
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
  const {heading, linkText, services} = block

  return (
    <BlockWrapper>
      <BlockContainer>
        {heading && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-12 md:mb-16 dark:text-white">
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services?.map((service) => (
            <div key={service._key} className="flex flex-col gap-5">
              {/* Image card */}
              {(service.image?.asset?._id || service.image?.asset?._ref) && (
                <div
                  className="rounded-2xl overflow-hidden aspect-[6/7] relative"
                  style={{backgroundColor: service.backgroundColor || '#333'}}
                >
                  <SanityImage
                    id={(service.image.asset._id || service.image.asset._ref)!}
                    hotspot={service.image.hotspot}
                    crop={service.image.crop}
                    alt={service.image.alt ?? service.title ?? ''}
                    width={600}
                    height={750}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Text */}
              {service.title && (
                <h3 className="text-xl md:text-2xl font-semibold dark:text-white">
                  {service.title}
                </h3>
              )}
              {service.description && (
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {linkText && (
        <div className="mt-12 md:mt-16 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold transition-opacity hover:opacity-70 dark:text-white"
          >
            <span className="relative">
              {linkText}
              <span className="absolute left-0 bottom-[-4px] w-full h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400" />
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
