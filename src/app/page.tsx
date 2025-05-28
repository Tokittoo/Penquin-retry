'use client'
import DarkModeToggle from "@/components/DarkModeToggle";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/components/ui/accordion"

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

  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it really that simple?</AccordionTrigger>
      <AccordionContent>
        Yes. Yes it is. No magic tricks, no hidden complexity. Just pure, unadulterated accordion goodness.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Can I customize it?</AccordionTrigger>
      <AccordionContent>
        Absolutely! It's like a chameleon, but for your UI. Change colors, sizes, animations - it's all fair game.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>What about accessibility?</AccordionTrigger>
      <AccordionContent>
        Built-in keyboard navigation, ARIA attributes, and screen reader support. We've got your back, and your users' too.
      </AccordionContent>
    </AccordionItem>
  </Accordion>

      </div>
    </div>
  );
}
