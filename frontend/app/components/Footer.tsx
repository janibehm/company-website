import Link from 'next/link'
import {headers} from 'next/headers'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import ResolvedLink from '@/app/components/ResolvedLink'
import type {DereferencedLink} from '@/sanity/lib/types'
import {BlockContainer} from '@/app/blocks/BlockLayout'

const navLinks = [
  {label: 'Work', href: '/work'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
]

const socialLinks = [
  {label: 'LinkedIn', href: 'https://linkedin.com', external: true},
  {label: 'Instagram', href: 'https://instagram.com', external: true},
]

export default async function Footer() {
  const {data: settings} = await sanityFetch({query: settingsQuery})
  const footerHeading = settings?.footerHeading
  const footerButton = settings?.footerButton
  const headerList = await headers()
  const pathname = headerList.get('x-pathname') || ''
  const isContactPage = pathname === '/contact'

  return (
    <footer className="dark:bg-black">
      <style>{`
        @keyframes gradientBorder {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .footer-btn-wrap {
          display: inline-block;
          padding: 3px;
          border-radius: 9999px;
          background: linear-gradient(270deg, #7cbfbf, #a78bfa, #f472b6, #facc15, #7cbfbf);
          background-size: 300% 300%;
          animation: gradientBorder 4s ease infinite;
        }
        .footer-btn-inner {
          display: block;
          background: white;
          border-radius: 9999px;
          transition: background 0.3s;
          padding: 3rem 8rem;
          font-size: 2.5rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: black;
          white-space: nowrap;
        }
        :global(.dark) .footer-btn-inner {
          background: #13141b;
          color: white;
        }
        .footer-btn-inner:hover {
          background: transparent;
          color: white;
        }
      `}</style>
      <BlockContainer>
        {/* Big heading + CTA */}
        {!isContactPage && (footerHeading || footerButton?.buttonText) && (
          <div className="py-16 sm:py-24 flex flex-col items-center gap-10">
            {footerButton?.buttonText && footerButton?.link && (
              <ResolvedLink
                link={footerButton.link as DereferencedLink}
                className="inline-block"
              >
                <span className="footer-btn-wrap">
                  <div className="py-10 px-16 text-3xl font-semibold uppercase tracking-widest text-black dark:text-white whitespace-nowrap rounded-full bg-white dark:bg-gray-950 transition-colors hover:bg-transparent hover:text-white">
                    {footerButton.buttonText}
                  </div>
                </span>
              </ResolvedLink>
            )}
            {footerHeading && (
              <div className="text-[clamp(2.5rem,9vw,8rem)] font-bold leading-[1.05] tracking-tighter uppercase text-center dark:text-white">
                {(() => {
                  const words = footerHeading.split(' ')
                  const mid = Math.ceil(words.length / 2)
                  const firstLine = words.slice(0, mid).join(' ')
                  const secondLine = words.slice(mid).join(' ')
                  return (
                    <>
                      <span className="block">{firstLine}</span>
                      {secondLine && <span className="block">{secondLine}</span>}
                    </>
                  )
                })()}
              </div>
            )}
          </div>
        )}

        {/* Nav + Social columns */}
        <div className="flex gap-16 py-16 sm:py-20">
          <nav>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({label, href}) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-xs uppercase tracking-widest font-semibold hover:opacity-50 transition-opacity dark:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav>
            <ul className="flex flex-col gap-2">
              {socialLinks.map(({label, href, external}) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
                    className="text-xs uppercase tracking-widest font-semibold hover:opacity-50 transition-opacity dark:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </BlockContainer>
    </footer>
  )
}
