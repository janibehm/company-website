'use client'

import {createContext, useContext, useEffect, useState} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  // Return a default value during SSR or if context is not available
  if (!context) {
    return {
      theme: 'light' as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
    }
  }
  return context
}

export default function ThemeProvider({children}: {children: React.ReactNode}) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // On mount, read the theme the inline script already applied — don't touch the DOM
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setThemeState(isDark ? 'dark' : 'light')
    setMounted(true)
  }, [])

  // Apply theme to DOM — only called by user-initiated actions
  const applyTheme = (newTheme: Theme) => {
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    applyTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, setTheme: applyTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
