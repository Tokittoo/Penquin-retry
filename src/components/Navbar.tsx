import React from 'react'
import DarkModeToggle from './DarkModeToggle'
import Image from 'next/image'
import { LargeSearchToggle } from 'fumadocs-ui/components/layout/search-toggle'
import Link from 'next/link'
import { FaGithub, FaXTwitter } from 'react-icons/fa6';

const navItems = [
  {
    name: 'Docs',
    href: '/docs'
  },
  {
    name: 'Bug Hunting',
    href: '/docs/bug-hunting-toolkit'
  }
]

const Navbar = () => {
  return (
    <div className='h-16 w-full'>
      <div className='fixed w-full inset-x-0 bg-background border-b border-border top-0 z-50 flex justify-between items-center md:px-20 px-8 py-4'>
        <div className='flex'>
          <Link href={'/'} className='flex items-center gap-2'>
            <Image
              src={'/logo.jpg'}
              height={30}
              width={30}
              alt='Logo'
              // className='invert'
              className='rounded-md invert dark:invert-0'
            />
            <h2 className='text-xl font-sans font-bold tracking-tight'>Penquin</h2>
          </Link>
          <ul className='hidden md:flex items-center gap-2 mx-8'>
            {
              navItems.map(l => (
                <li key={l.name} className='text-sm text-muted-foreground hover:text-white transition-colors'>
                  <Link href={l.href}>{l.name}</Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className='flex items-center gap-2'>
          <LargeSearchToggle className='max-md:hidden bg-secondary/90 w-52 hover:text-white/80 hover:bg-secondary' />
          <Link href={'https://github.com/xibhi'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaGithub size={18} /></Link>
          <Link href={'https://x.com/xibhi'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaXTwitter size={18} /></Link>
          <DarkModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
