import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <div className='flex flex-col'>
        <h1 className='text-xl font-semibold font-sans tracking-tight'>Qwit UI</h1>
        <p className='text-muted-foreground'>Not your ordinary library</p>
      </div>
    ),
  },
  githubUrl: 'https://github.com/M-SaaD-H',
};