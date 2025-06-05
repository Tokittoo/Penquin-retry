import React from 'react'
import { BentoGrid, BentoGridItem } from '@/components/BentoGrid'

const Features = () => {
  return (
    <div className='md:max-w-3xl mx-auto'>
      <h1 className='mt-16 bg-clip-text text-transparent py-2 max-md:mx-6 relative z-20 font-bold font-sans tracking-tight text-4xl md:text-7xl bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-700 dark:to-white'>
        Features
      </h1>
      <BentoGrid className='md:max-w-3xl max-w-[calc(100%-2rem)] mx-auto my-8 md:auto-rows-[12rem]'>
        {features.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  )
}

const features = [
  {
    title: 'Ready-to-Use Components',
    description: 'Use prebuilt UI components that work out of the box — no extra styling or logic needed.',
    className: 'md:col-span-2'
  },
  {
    title: 'Composable Blocks',
    description: 'Drag-and-drop layout blocks that save hours of repetitive structure work.',
    className: 'md:col-span-1'
  },
  {
    title: 'Smart Snippets',
    description: 'Snippets for common logic and patterns — write smarter, not harder.',
    className: 'md:col-span-1'
  },
  {
    title: 'Templates that Scale',
    description: 'Jumpstart your next project with battle-tested templates and folder structures.',
    className: 'md:col-span-2'
  }
]

export default Features