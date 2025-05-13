import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'flex items-center justify-center gap-2 text-nowrap text-sm rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadow-sm cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-neutral-950 text-white hover:bg-neutral-950/80 dark:bg-neutral-100 dark:text-black dark:hover:bg-neutral-100/80',
        secondary: 'bg-gray-200 text-black hover:bg-gray-200/80 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-800/80',
        destructive: 'bg-red-700 text-white hover:bg-red-700/80',
        outline: 'border border-gray-300 hover:bg-zinc-200 dark:border-neutral-700 dark:hover:bg-zinc-800',
        hidden: 'hover:bg-zinc-200 dark:hover:bg-zinc-800 shadow-none'
      },
      size: {
        default: 'px-5 py-2',
        small: 'px-3 py-1 gap-1.5 text-sm',
        large: 'px-6 py-3',
        icon: 'size-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }