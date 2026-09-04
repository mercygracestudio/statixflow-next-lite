import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { Button } from "../ui/button";
import { LogoStrip } from "../ui/logo-strip";

type HeroSection2Props = {
  backgroundImage: ImageAsset;
  heading: string;
  body: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  logos: ImageAsset[];
};

export function HeroSection2({
  backgroundImage,
  heading,
  body,
  primaryCtaLabel,
  secondaryCtaLabel,
  logos,
}: HeroSection2Props) {
  return (
    <section className="container mx-auto px-4" data-page-intro-animation="">
      <div className="relative overflow-hidden rounded-2xl p-10 md:p-20">
        <Image
          src={backgroundImage.src}
          alt={backgroundImage.alt ?? ""}
          width={backgroundImage.width}
          height={backgroundImage.height}
          priority
          className="absolute inset-0 z-1 size-full object-cover object-bottom-right"
        />
        <div className="relative z-3 space-y-8 md:space-y-10">
          <div className="mx-auto max-w-2xl text-center text-balance text-white">
            <h1
              className="mb-2 text-5xl font-bold sm:text-6xl md:text-8xl"
              data-page-intro-animation-unmask-text=""
            >
              {heading}
            </h1>
            <p
              className="text-lg leading-relaxed text-white/80 md:text-2xl"
              data-page-intro-animation-move-up=""
            >
              {body}
            </p>
          </div>

          <div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            data-page-intro-animation-move-up=""
          >
            <Button
              href="#"
              label={primaryCtaLabel}
              className="bg-white px-6 py-3 text-base text-black"
            />

            <Button
              href="#"
              variant="link"
              label={secondaryCtaLabel}
              className="text-white"
            />
          </div>

          <LogoStrip
            logos={logos}
            className="gap-6 opacity-80 sm:gap-12"
            data-page-intro-animation-move-up=""
          />
        </div>

        <div className="absolute top-0 right-10 left-10 z-2 h-full">
          <div className="bg-white-stripe h-full"></div>
        </div>
      </div>
    </section>
  );
}
