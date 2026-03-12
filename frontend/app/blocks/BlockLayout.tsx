import {type ReactNode} from 'react'

type BlockWrapperProps = {
  children: ReactNode
  className?: string
  background?: 'default' | 'dark' | 'light'
}

export function BlockWrapper({children, className = '', background = 'default'}: BlockWrapperProps) {
  const bgClasses = {
    default: 'bg-white dark:bg-black text-black dark:text-white',
    dark: 'bg-black text-white',
    light: 'bg-white text-black',
  }

  return (
    <section className={`py-8 md:py-24 w-full overflow-hidden ${bgClasses[background]} ${className}`}>
      {children}
    </section>
  )
}

type BlockContainerProps = {
  children: ReactNode
  className?: string
}

export function BlockContainer({children, className = ''}: BlockContainerProps) {
  return (
    <div className={`w-full max-w-[1440px] mx-auto px-10 sm:px-16 lg:px-24 xl:px-10 2xl:px-8 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
