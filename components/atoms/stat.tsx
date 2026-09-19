import type { ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Eyebrow } from "./eyebrow";
import { cn } from "@/lib/cn";

/**
 * A number and its label. `size` scales the value and its suffix together —
 * the suffix tracks the value rather than being set per call site.
 */
const statValueVariants = cva("font-medium tracking-tight", {
  variants: {
    size: {
      md: "text-4xl md:text-5xl",
      lg: "text-5xl md:text-6xl xl:text-7xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const statSuffixVariants = cva("", {
  variants: {
    size: {
      md: "text-2xl md:text-3xl",
      lg: "text-3xl md:text-4xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type StatSize = NonNullable<
  VariantProps<typeof statValueVariants>["size"]
>;

type StatProps = VariantProps<typeof statValueVariants> & {
  value: string;
  suffix?: string;
  label: string;
  /**
   * `inline` renders the label as an eyebrow beside the value, broken one word
   * per line. The caller supplies the flex direction via `className`.
   */
  layout?: "stacked" | "inline";
  className?: string;
  /** Positioning for the label — alignment and margin, not type. */
  labelClassName?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "className">;

export function Stat({
  value,
  suffix,
  label,
  size,
  layout = "stacked",
  className,
  labelClassName,
  ...props
}: StatProps) {
  const words = label.split(" ");

  return (
    <div className={className} {...props}>
      <div className={statValueVariants({ size })}>
        {value}
        {suffix && (
          <span className={statSuffixVariants({ size })}>{suffix}</span>
        )}
      </div>

      {layout === "inline" ? (
        <Eyebrow as="p" size="xs" className={labelClassName}>
          {words.map((word, index) => (
            <span key={index}>
              {word}
              {index < words.length - 1 ? <br /> : null}
            </span>
          ))}
        </Eyebrow>
      ) : (
        <p className={cn("mt-1 text-sm text-muted-foreground", labelClassName)}>
          {label}
        </p>
      )}
    </div>
  );
}
