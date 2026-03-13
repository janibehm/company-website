'use client'

import {useState, useEffect} from 'react'
import MobileNav from '@/app/components/MobileNav'
import ThemeToggle from '@/app/components/ThemeToggle'
import NavLinks from '@/app/components/NavLinks'

export default function Header() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < 10) {
        // Always show at top
        setVisible(true)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        setVisible(true)
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, {passive: true})
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <header
      className={`fixed z-[999] h-24 inset-x-0 top-0 bg-black flex items-center text-white transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full py-6 px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between gap-5">
          {/* Theme toggle - left side (desktop only) */}
          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          {/* Desktop nav - right side */}
          <nav className="hidden md:block">
            <NavLinks />
          </nav>

          {/* Mobile nav - push to right with ml-auto */}
          <div className="md:hidden ml-auto">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  )
}
