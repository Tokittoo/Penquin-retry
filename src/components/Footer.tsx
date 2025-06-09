import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { Button } from './ui/Btn'

const footLinks = [
  {
    name: 'Components',
    href: '/docs/components'
  },
  {
    name: 'Blocks',
    href: '/docs/blocks'
  },
  {
    name: 'templates',
    href: '/docs/templates'
  },
  {
    name: 'Snippets',
    href: '/docs/snippets'
  }
]

const socialLinks = [
  {
    name: 'Twitter / X',
    href: 'https://x.com/_MSaaDH'
  },
  {
    name: 'GitHub',
    href: 'https://github.com/M-SaaD-H'
  }
]

const Footer = () => {
  return (
    <div className='p-8 md:px-44'>
      <div className='flex justify-between items-center gap-4 max-md:flex-col'>
        <div className='flex flex-col gap-2'>
          <div className='flex gap-2 items-center'>
            <Image
              src={'/logo.png'}
              height={30}
              width={30}
              alt='Logo'
              className='rounded-md invert dark:invert-0'
            />
            <h2 className='text-2xl font-sans font-bold tracking-tight'>Vink</h2>
          </div>
          <p>A product by <Link className='underline hover:text-muted-foreground' href={'https://saad.works'} target={'_blank'}>Saad</Link></p>
        </div>
        <div className='flex gap-8 md:my-12 md:mx-18'>
          <ul>
            {
              footLinks.map(l => (
                <li key={l.href} className='hover:text-muted-foreground my-2'>
                  <Link href={l.href}>{l.name}</Link>
                </li>
              ))
            }
          </ul>
          <ul>
            {
              socialLinks.map(l => (
                <li key={l.href} className='hover:text-muted-foreground my-2'>
                  <Link target={'_blank'} href={l.href}>{l.name}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className='flex justify-between items-center max-md:mt-8'>
        <p className='text-muted-foreground text-sm'>&copy; 2025, All rights reserved.</p>
        <div className='flex items-center gap-2'>
          <Button size={'small'} asChild className='text-xs my-4 md:mr-8'>
            <Link href={'https://docs.google.com/forms/d/e/1FAIpQLSdW_VUC9xYiM3rSU78XUqEy1aauzOE6ooBbl4UEHCJY6b39GA/viewform?usp=dialog'} target={'_blank'}>
              Submit Your Feedback
            </Link>
          </Button>
          <Link href={'https://github.com/M-SaaD-H/vink'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaGithub size={18} /></Link>
          <Link href={'https://x.com/_MSaaDH'} target={'_blank'} className='p-2 rounded-full cursor-pointer'><FaXTwitter size={18} /></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
