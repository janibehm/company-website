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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold dark:text-white">
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="text-label-sm max-w-md mt-4 mb-12 md:mb-16 text-gray-600 dark:text-white/80">
            {subheading}
          </p>
        )}
        {!subheading && heading && <div className="mb-12 md:mb-16" />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 w-full">
          {services?.map((service) => (
            <div key={service._key} className="flex flex-col gap-4 h-full w-full">
              {/* Image card */}
              <div className="w-full aspect-square rounded-2xl overflow-hidden p-8">
                {(service.image?.asset?._id || service.image?.asset?._ref) && (
                  <SanityImage
                    id={(service.image.asset._id || service.image.asset._ref)!}
                    hotspot={service.image.hotspot}
                    crop={service.image.crop}
                    alt={service.image.alt ?? service.title ?? ''}
                    width={300}
                    height={300}
                    className="w-full h-full object-contain object-center"
                  />
                )}
              </div>

              {/* Text */}
              <div className="w-full pl-2 md:pl-3">
                {service.title && (
                  <h3 className="w-full text-left text-lg md:text-xl font-semibold underline mb-2 dark:text-white">
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
        <div className="mt-12 md:mt-16">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-ui-sm uppercase tracking-widest underline transition-opacity hover:opacity-70 dark:text-white"
          >
            <span>{linkText}</span>
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
