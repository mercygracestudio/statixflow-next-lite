import Image from "next/image";
import type { ImageAsset } from "@/content/types";

type ParallaxCoverImageProps = {
  image: ImageAsset;
  className?: string;
  figureClassName?: string;
  parallax?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
};

export function ParallaxCoverImage({
  image,
  className = "absolute bottom-0 left-0 h-[170%] w-full object-cover object-center",
  figureClassName = "relative min-h-112.5 overflow-hidden rounded-2xl",
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
      className={className}
      priority={priority}
      loading={loading}
    />
  );

  return (
    <figure className={figureClassName}>
      <div className="h-full">
        {parallax ? <div data-parallax-image-on-scroll="">{img}</div> : img}
      </div>
    </figure>
  );
}
