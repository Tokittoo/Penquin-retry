import DarkModeToggle from "@/components/DarkModeToggle";
import { Toggle } from "@/registry/components/ui/toggle";

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

        <Toggle />

      </div>
    </div>
  );
}
