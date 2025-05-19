import { cn } from '@/lib/utils'
import React from 'react'

const Headline = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <h1
      className={cn(
        'bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-600 dark:to-white',
        'text-5xl md:text-7xl py-2 relative z-20 font-bold font-sans tracking-tight',
      )}
      {...props}
    />
  )
}

export { Headline }