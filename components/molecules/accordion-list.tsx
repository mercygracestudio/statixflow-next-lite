import { cva } from "class-variance-authority";
import type { AccordionItem } from "@/content/types";
import { Accordion } from "../ui/accordion";
import { cn } from "@/lib/cn";

const dividerVariants = cva("", {
  variants: {
    variant: {
      light: "divide-y divide-border",
      dark: "divide-y divide-white/15",
    },
  },
});

const questionVariants = cva("pr-8 text-xl font-medium", {
  variants: {
    variant: {
      light: "text-foreground",
      dark: "text-white",
    },
  },
});

const barVariants = cva(
  "absolute h-0.5 w-4 transition-transform duration-300 ease-in-out",
  {
    variants: {
      variant: {
        light: "bg-foreground",
        dark: "bg-white",
      },
    },
  },
);

export function AccordionList({
  items,
  variant = "light",
}: {
  items: AccordionItem[];
  variant?: "light" | "dark";
}) {
  return (
    <Accordion className={dividerVariants({ variant })}>
      {items.map((item) => (
        <div key={item.title} data-accordion-item="">
          <button
            className="flex w-full cursor-pointer items-center justify-between py-6 text-left"
            data-accordion-trigger=""
          >
            <span className={questionVariants({ variant })}>
              {item.title}
            </span>
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
              <span className={barVariants({ variant })}></span>
              <span
                className={cn(barVariants({ variant }), "rotate-90")}
                data-accordion-vertical=""
              ></span>
            </span>
          </button>

          <div
            className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out"
            data-accordion-content=""
          >
            <div className="overflow-hidden">
              <div className="space-y-6 pb-6 text-lg leading-relaxed text-muted-foreground">
                <p>{item.content}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Accordion>
  );
}
