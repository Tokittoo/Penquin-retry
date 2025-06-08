import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[5rem] md:grid-cols-3',
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        'group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-border bg-background p-6 transition duration-200 dark:shadow-neutral-800/30',
        'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]',
        className,
      )}
    >
      <div className='transition duration-200 group-hover/bento:translate-x-3'>
        <div className='my-2 font-sans text-lg font-bold text-neutral-600 dark:text-neutral-200'>
          {title}
        </div>
        <div className='font-sans text-sm font-normal text-neutral-600 dark:text-neutral-300'>
          {description}
        </div>
      </div>
    </div>
  );
};
