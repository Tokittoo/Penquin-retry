'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs'
import { Pre, CodeBlock } from 'fumadocs-ui/components/codeblock'

export const InstallationCommand = ({ dirPath }: { dirPath: string }) => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? ''

  return (
    <Tabs defaultValue="npm">
      <TabsList>
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="bun">bun</TabsTrigger>
      </TabsList>

      <TabsContent value="npm">
        <CodeBlock>
          <Pre className='px-6 font-mono'>
            npx shadcn@latest add {baseURL}/registry{dirPath}
          </Pre>
        </CodeBlock>
      </TabsContent>

      <TabsContent value="yarn">
        <CodeBlock lang="bash" keepBackground>
          <Pre className='px-6 font-mono'>
            yarn dlx shadcn@latest add {baseURL}/registry{dirPath}
          </Pre>
        </CodeBlock>
      </TabsContent>

      <TabsContent value="pnpm">
        <CodeBlock lang="bash" keepBackground>
          <Pre className='px-6 font-mono'>
            pnpm dlx shadcn@latest add {baseURL}/registry{dirPath}
          </Pre>
        </CodeBlock>
      </TabsContent>

      <TabsContent value="bun">
        <CodeBlock lang="bash" keepBackground>
          <Pre className='px-6 font-mono'>
            bunx --bun shadcn@latest add {baseURL}/registry{dirPath}
          </Pre>
        </CodeBlock>
      </TabsContent>
    </Tabs>
  )
}
