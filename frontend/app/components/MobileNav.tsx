'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'

const links = [
  {label: 'Home', href: '/'},
  {label: 'Services', href: '/services'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Hamburger button - visible only on mobile */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="relative z-[1001] flex flex-col justify-center gap-1.5 w-10 h-10 p-2"
      >
        <span
          className={`block h-0.5 w-full rounded-full bg-white dark:bg-white transition-all duration-300 origin-center ${
            open ? 'translate-y-2 rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-full rounded-full bg-white dark:bg-white transition-opacity duration-300 ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`block h-0.5 w-full rounded-full bg-white dark:bg-white transition-all duration-300 origin-center ${
            open ? '-translate-y-2 -rotate-45' : ''
          }`}
        />
      </button>

      {/* Fullscreen overlay */}
      {open && (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen min-h-screen z-[1000] bg-black flex flex-col items-center justify-center pb-24 gap-8">
          {links.map(({label, href}) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className={`text-white text-4xl font-bold uppercase tracking-tight transition-opacity hover:opacity-60 ${isActive ? 'underline underline-offset-8' : ''}`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}
