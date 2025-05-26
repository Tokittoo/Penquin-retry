import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '@/app/layout.config';
import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='mx-18'>
      <DocsLayout tree={source.pageTree} {...baseOptions} sidebar={{ collapsible: false }} nav={{ component: <Navbar /> }} >
        {children}
      </DocsLayout>
    </div>
  );
}