import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import type { ImageAsset } from "@/content/types";
import { cn } from "@/lib/cn";

/**
 * The figure wraps the image and decides its shape. These are alternative
 * layouts rather than a base plus tweaks, so they're named variants — mixing
 * two of them (e.g. a min-height and an aspect ratio) would fight.
 */
const frameVariants = cva("relative", {
  variants: {
    frame: {
      minHeight: "min-h-112.5 overflow-hidden rounded-2xl",
      aspect: "aspect-video overflow-hidden rounded-2xl",
      aspectResponsive:
        "aspect-video overflow-hidden rounded-2xl xl:aspect-auto",
      /** No shape of its own — for a figure sized by its parent grid cell. */
      bare: "hidden lg:block",
    },
  },
  defaultVariants: {
    frame: "minHeight",
  },
});

export type ImageFrame = NonNullable<
  VariantProps<typeof frameVariants>["frame"]
>;

/** How the photograph itself is treated, independent of the frame's shape. */
const imageVariants = cva(
  "absolute bottom-0 left-0 h-[170%] w-full object-cover object-center",
  {
    variants: {
      treatment: {
        none: "",
        /** The muted look used by every article and case-study cover. */
        desaturated: "saturate-50",
        /** Overscanned, for a panel that crops the image on both edges. */
        tall: "h-[130%]",
      },
    },
    defaultVariants: {
      treatment: "none",
    },
  },
);

export type ImageTreatment = NonNullable<
  VariantProps<typeof imageVariants>["treatment"]
>;

type ParallaxCoverImageProps = {
  image: ImageAsset;
  /** Extends the image's cover positioning — pass only what differs. */
  className?: string;
  treatment?: ImageTreatment;
  frame?: ImageFrame;
  /** Extends the chosen frame, for layout concerns like grid ordering. */
  figureClassName?: string;
  parallax?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
};

export function ParallaxCoverImage({
  image,
  className,
  treatment,
  frame,
  figureClassName,
  parallax = true,
  priority,
  loading,
}: ParallaxCoverImageProps) {
  const img = (
    <Image
      src={image.src}
      alt={image.alt ?? ""}
      width={image.width}
      height={image.height}
      className={cn(imageVariants({ treatment }), className)}
      priority={priority}
      loading={loading}
    />
  );

  return (
    <figure className={cn(frameVariants({ frame }), figureClassName)}>
      <div className="h-full">
        {parallax ? <div data-parallax-image-on-scroll="">{img}</div> : img}
      </div>
    </figure>
  );
}
