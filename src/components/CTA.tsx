import React from 'react'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'


const CTA = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-8 mx-auto mt-24 mb-12'>
      <h1 className='font-sans tracking-tight text-3xl font-bold mx-8 text-center'>No signups. No setup. Just productivity.</h1>
      <Button className='gap-0 hover:gap-2 transition-all duration-200 w-max' asChild>
        <Link href={'/docs'}>
          Get Started free <IconArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export default CTA
