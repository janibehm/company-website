import Link from 'next/link'
import {BlockWrapper, BlockContainer} from './BlockLayout'
import ResolvedLink from '../components/ResolvedLink'
import {DereferencedLink} from '@/sanity/lib/types'

type ServiceCard = {
  _key: string
  title?: string
  items?: string[]
  linkText?: string
  link?: DereferencedLink
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
        @keyframes animatedLine {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animated-line {
          position: relative;
        }
        .animated-line::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 2px;
          border-radius: 1px;
          background: linear-gradient(90deg, #18e2e2, #a78bfa, #f472b6, #18e2e2);
          background-size: 200% 100%;
          animation: animatedLine 3s linear infinite;
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
            <div
              key={service._key}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 md:p-8 flex flex-col"
            >
              {service.title && (
                <h3 className="text-xl md:text-2xl font-semibold dark:text-white mb-6">
                  {service.title}
                </h3>
              )}

              {service.items && service.items.length > 0 && (
                <ul className="space-y-4 flex-1">
                  {service.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                      <svg
                        className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0"
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

              {service.linkText && service.link && (
                <div className="mt-6 pt-4">
                  <ResolvedLink
                    link={service.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest transition-opacity hover:opacity-70 dark:text-white animated-line"
                  >
                    {service.linkText}
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
                  </ResolvedLink>
                </div>
              )}
            </div>
          ))}
        </div>

        {linkText && (
          <div className="mt-12 md:mt-16 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-semibold transition-opacity hover:opacity-70 dark:text-white animated-line"
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
