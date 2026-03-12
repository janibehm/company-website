'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'

const links = [
  {label: 'About', href: '/about'},
  {label: 'Work', href: '/work'},
  {label: 'Contact', href: '/contact'},
]

export default function MobileNav() {
  const [open, setOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      {/* Hamburger button - visible only on mobile, positioned in header flow */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="relative z-[1000] flex flex-col justify-center gap-1.5 w-10 h-10 p-2 md:hidden"
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
        <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map(({label, href}) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-white text-4xl font-bold uppercase tracking-tight"
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
