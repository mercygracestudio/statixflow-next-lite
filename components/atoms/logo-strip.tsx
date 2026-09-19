import Image from "next/image";
import { type ComponentPropsWithoutRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";

const logoStripVariants = cva("flex flex-wrap items-center justify-center", {
  variants: {
    tone: {
      /** Greyed back, for a strip that sits under other content. */
      muted: "opacity-50 grayscale",
      /** Full colour, for a strip that is the content. */
      solid: "opacity-80",
    },
    density: {
      default: "gap-12 sm:gap-16",
      tight: "gap-6 sm:gap-12",
    },
  },
  defaultVariants: {
    tone: "muted",
    density: "default",
  },
});

export type LogoStripTone = NonNullable<
  VariantProps<typeof logoStripVariants>["tone"]
>;

export function LogoStrip({
  logos,
  tone,
  density,
  className,
  ...rest
}: {
  logos: ImageAsset[];
} & VariantProps<typeof logoStripVariants> &
  ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={cn(logoStripVariants({ tone, density }), className)}
    >
      {logos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt ?? ""}
          width={logo.width}
          height={logo.height}
          loading="lazy"
        />
      ))}
    </div>
  );
}
