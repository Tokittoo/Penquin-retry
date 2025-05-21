'use client'

import * as React from 'react'
import { useAnimate, stagger } from 'motion/react'
import { cn } from '@/lib/utils';

interface TextAnimationProps {
  text: string,
  className?: string,
  delay?: number,
  duration?: number,
  startDelay?: number,
  staggerChildren?: number,
  by?: 'words' | 'chars' | 'lines' | 'none',
  blur?: boolean,
  fade?: boolean,
  ease?: 'easeInOut' | 'easeIn' | 'easeOut',
}

const TextAnimation = ({
  text,
  className,
  delay = 0,
  duration = 0.3,
  staggerChildren = 0.05,
  by = 'chars',
  blur = true,
  fade = false,
  ease = 'easeInOut'
}: TextAnimationProps) => {
  const [scope, animate] = useAnimate();
  const [segments, setSegments] = React.useState<string[] | null>(null);

  React.useEffect(() => {
    let segments: string[] = [];

    switch(by) {
      case 'words':
        segments = text.split(' ');
        break;
      case 'lines':
        segments = text.split('\n');
        break;
      case 'none':
        segments = [text];
        break;
      default:
        segments = text.split('');
        break;
    }

    setSegments(segments);
  }, [by, text]);

  React.useEffect(() => {
    if(segments) {
      const startAnimation = () => {
        animate(
          'span',
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)'
          },
          {
            duration: duration,
            ease: ease,
            delay: stagger(staggerChildren),
          }
        )
      }

      setTimeout(startAnimation, delay * 1000);
    }
  }, [segments, delay])

  if(!segments) return null;

  return (
    <div
      ref={scope}
      className={cn(
        'max-w-4xl mx-auto font-bold text-4xl whitespace-pre-wrap',
        className
      )}
    >
      {
        segments.map((segment, idx) => (
          <span
            style={{
              opacity: fade ? 0 : 1,
              transform: 'translateY(20px)',
              filter: blur ? 'blur(10px)' : 'none',
              display: 'inline-block',
            }}
            // custom styles for different values of by to display the spaces
            className={cn(
              by === 'lines' ? 'block' : 'inline-block whitespace-pre',
              by === 'words' && 'mx-1',
            )}
            key={idx}
          >
            {segment}
          </span>
        ))
      }
    </div>
  )
}

export { TextAnimation }