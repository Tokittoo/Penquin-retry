import { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <div className='my-2'>Vink</div> // This isn't visible. Added this just to fix the custom navbar
  },
  themeSwitch: {
    enabled: false
  },
  searchToggle: {
    enabled: false
  }
};