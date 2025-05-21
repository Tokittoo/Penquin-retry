import DarkModeToggle from "@/components/DarkModeToggle";
import { TextAnimation } from "@/registry/components/ui/text-animation";

export default function Home() {
  return (
    <div>
      <DarkModeToggle />
      <div className='flex flex-col gap-4 justify-between items-center'>
        {/* Playground -> */}

        
        <div className="flex gap-2">
          <div className='bg-primary text-primary-foreground p-4 rounded-md'>
            Primary
          </div>
          <div className='bg-secondary text-secondary-foreground p-4 rounded-md'>
            Secondary
          </div>
          <div className='bg-muted text-muted-foreground p-4 rounded-md'>
            Muted
          </div>
          <div className='bg-accent text-accent-foreground p-4 rounded-md'>
            Accent
          </div>
        </div>

        <div className='max-w-4xl mx-auto'>
          <TextAnimation text="Build your own website with ease" by={'chars'} />
        </div>
      </div>
    </div>
  );
}
