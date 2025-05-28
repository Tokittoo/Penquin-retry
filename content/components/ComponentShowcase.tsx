'use client'

import React, { useState } from 'react'
import { CodeBlock, Pre } from 'fumadocs-ui/components/codeblock'

export const ComponentShowcase = ({ component, code }: { component: React.ReactNode, code: string }) => {
  const [isCode, setIsCode] = useState(false);

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <div
          className={`cursor-pointer border-b transition-colors ${isCode ? 'text-muted-foreground' : 'text-white border-b-white'}`}
          onClick={() => setIsCode(false)}
        >
          Preview
        </div>
        <div
          className={`cursor-pointer border-b transition-colors ${isCode ? 'text-white border-b-white' : 'text-muted-foreground'}`}
          onClick={() => setIsCode(true)}
        >
          Code
        </div>
      </div>

      {isCode ? (
        <CodeBlock lang="tsx" keepBackground className='max-h-[25rem] overflow-auto'>
          <Pre className="px-6 font-mono">
            {code}
          </Pre>
        </CodeBlock>
      ) : (
        <div className='h-[25rem] w-full rounded-xl border border-border p-4 flex flex-col justify-center items-center'>
          {component}
        </div>
      )}
    </div>
  )
}