import Link from 'next/link'
import {sanityFetch} from '@/sanity/lib/live'
import {settingsQuery} from '@/sanity/lib/queries'
import ResolvedLink from '@/app/components/ResolvedLink'
import type {DereferencedLink} from '@/sanity/lib/types'

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

  return (
    <footer className="border-t border-black/10 dark:border-white/10 dark:bg-gray-950">
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
          padding: 2rem 5rem;
          font-size: 1.5rem;
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
      <div className="container">
        {/* Big heading + CTA */}
        {(footerHeading || footerButton?.buttonText) && (
          <div className="py-16 sm:py-24 flex flex-col items-center gap-10">
            {footerButton?.buttonText && footerButton?.link && (
              <span className="footer-btn-wrap">
                <ResolvedLink
                  link={footerButton.link as DereferencedLink}
                  className="footer-btn-inner"
                  style={{
                    display: 'block',
                    padding: '2rem 5rem',
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'black',
                    whiteSpace: 'nowrap',
                    borderRadius: '9999px',
                    background: 'white',
                    transition: 'background 0.3s',
                  }}
                >
                  {footerButton.buttonText}
                </ResolvedLink>
              </span>
            )}
            {footerHeading && (
              <div className="text-[clamp(2.5rem,9vw,8rem)] font-bold leading-[1.05] tracking-tighter uppercase text-center dark:text-white">
                {footerHeading}
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

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between gap-2 border-t border-black/10 dark:border-white/10 py-6 text-[10px] uppercase tracking-widest text-black/50 dark:text-white/50">
          <span>
            &copy;Company. All rights reserved &bull;{' '}
            <Link href="/privacy" className="hover:opacity-70 transition-opacity">
              Privacy
            </Link>
          </span>
          <span>Website by Your Agency</span>
        </div>
      </div>
    </footer>
  )
}
