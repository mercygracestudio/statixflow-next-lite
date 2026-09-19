import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/**
 * The small uppercase label above a heading. `tone` and `size` cover every
 * shape this takes across the site — restyle here and every eyebrow follows.
 */
const eyebrowVariants = cva("font-medium tracking-widest uppercase", {
  variants: {
    size: {
      sm: "text-xs",
      /** The tighter label used beside a stat value or inside a table cell. */
      xs: "text-[10px]",
    },
    tone: {
      muted: "text-muted-foreground",
      foreground: "text-foreground",
      /** For dark surfaces, where `muted` has too little contrast. */
      inverse: "text-white/50",
    },
  },
  defaultVariants: {
    size: "sm",
    tone: "muted",
  },
});

export type EyebrowSize = NonNullable<
  VariantProps<typeof eyebrowVariants>["size"]
>;
export type EyebrowTone = NonNullable<
  VariantProps<typeof eyebrowVariants>["tone"]
>;

type EyebrowProps<T extends ElementType> = VariantProps<
  typeof eyebrowVariants
> & {
  /** The element to render. Callers pick this for semantics — `h2` for a footer column heading, `span` inline. */
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size" | "color">;

export function Eyebrow<T extends ElementType = "div">({
  as,
  size,
  tone,
  className,
  children,
  ...props
}: EyebrowProps<T>) {
  const Component = (as ?? "div") as ElementType;

  return (
    <Component
      className={cn(eyebrowVariants({ size, tone }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}
