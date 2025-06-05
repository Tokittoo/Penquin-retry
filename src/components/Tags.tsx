'use client'

import React from 'react'
import { IconBrandFramerMotion, IconBrandNextjs, IconBrandReact, IconBrandTailwind } from '@tabler/icons-react'
import { motion } from 'motion/react'

type ItemType = {
  name: string,
  logo: React.ReactNode
}

const items: ItemType[] = [
  {
    name: 'Next.js',
    logo: <IconBrandNextjs size={28} />
  },
  {
    name: 'React',
    logo: <IconBrandReact size={28} />
  },
  {
    name: 'Tailwind CSS',
    logo: <IconBrandTailwind size={28} />
  },
  {
    name: 'Motion',
    logo: <IconBrandFramerMotion size={28} />
  }
]

export const Tags = () => {
  return (
    <div className='flex'>
      {
        items.map(i => (
          <TagItem item={i} key={i.name} />
        ))
      }
    </div>
  )
}

const TagItem = ({ item }: { item: ItemType }) => {
  return (
    <motion.div
      layout
      whileHover={'animate'}
      whileTap={'animate'}
      initial={'initial'}
      className='flex'
    >
      <motion.div
        variants={{
          animate: { paddingRight: 2 }
        }}
        transition={{
          type: 'spring'
        }}
        className='flex items-center'
      >
        {item.logo}
      </motion.div>
      <motion.div
        variants={{
          initial: { width: 0 },
          animate: { width: 'auto' },
          exit: { width: 0 }
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          mass: 0.5
        }}
        className='overflow-hidden whitespace-nowrap'
      >
        {item.name}
      </motion.div>
    </motion.div>
  )
}