'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

const links = [
  {label: 'Home', href: '/'},
  {label: 'Services', href: '/services'},
  {label: 'Projects', href: '/projects'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
]

export default function NavLinks() {
  const pathname = usePathname()

  return (
    <ul
      role="list"
      className="flex items-center gap-4 md:gap-6 leading-5 text-ui-xs sm:text-base tracking-tight"
    >
      {links.map(({label, href}) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <li key={href}>
            <Link
              href={href}
              className={`transition-opacity hover:opacity-60 ${isActive ? 'underline underline-offset-4' : ''}`}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
