import Image from "next/image";
import { type ComponentPropsWithoutRef } from "react";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";

export function LogoStrip({
  logos,
  className = "opacity-50 grayscale",
  ...rest
}: {
  logos: ImageAsset[];
  className?: string;
} & ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={cn(
        "flex flex-wrap items-center justify-center gap-12 sm:gap-16",
        className,
      )}
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
