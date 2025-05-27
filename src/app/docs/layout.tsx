import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='max-w-8xl mx-auto'>
      <DocsLayout 
        tree={source.pageTree} 
        {...baseOptions} 
        sidebar={{ 
          collapsible: false, 
          className: 'h-[calc(100vh-4rem)] top-16' 
        }} 
      >
        <div className='flex md:pt-16 pt-4'>
          {children}
        </div>
      </DocsLayout>
    </div>
  );
}