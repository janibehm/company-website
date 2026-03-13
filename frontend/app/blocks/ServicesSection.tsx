import Link from 'next/link'
import {BlockWrapper, BlockContainer} from './BlockLayout'

type ServiceCard = {
  _key: string
  title?: string
  items?: string[]
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
      <style>{`
        @keyframes gradientBorder {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .service-card-wrap {
          padding: 2px;
          border-radius: 0.5rem;
          background: linear-gradient(270deg, #7cbfbf, #a78bfa, #f472b6, #facc15, #7cbfbf);
          background-size: 300% 300%;
          animation: gradientBorder 4s ease infinite;
        }
      `}</style>
      <BlockContainer>
        {heading && (
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center mb-12 md:mb-16 dark:text-white">
            {heading}
          </h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {services?.map((service) => (
            <div key={service._key} className="service-card-wrap">
              <div className="rounded-lg bg-white dark:bg-black p-6 md:p-8 h-full">
                {service.title && (
                  <h3 className="text-xl md:text-2xl font-semibold dark:text-white mb-6">
                    {service.title}
                  </h3>
                )}

                {service.items && service.items.length > 0 && (
                  <ul className="space-y-4">
                    {service.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>

        {linkText && (
          <div className="mt-12 md:mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold hover:opacity-50 transition-opacity dark:text-white"
            >
              {linkText}
            <svg
              className="w-4 h-4"
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
